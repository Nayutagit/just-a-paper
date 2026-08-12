<?php
// survey/api.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$dataDir = __DIR__ . '/../data';
$uploadsDir = __DIR__ . '/../uploads';

if (!file_exists($dataDir)) {
    mkdir($dataDir, 0777, true);
}
if (!file_exists($uploadsDir)) {
    mkdir($uploadsDir, 0777, true);
}

$action = $_GET['action'] ?? $_POST['action'] ?? '';
$role = $_GET['role'] ?? $_POST['role'] ?? '';
$allowedRoles = ['groom', 'bride', 'nayuta_groom', 'nayuta_bride'];

switch ($action) {
    case 'save':
        if (!in_array($role, $allowedRoles)) {
            echo json_encode(['status' => 'error', 'message' => '無効な役割（Role）です。']);
            exit;
        }

        // multipart/form-data または通常のPOST経由でデータを受け取る
        $status = $_POST['status'] ?? 'draft'; // draft または submitted
        $answersJson = $_POST['answers'] ?? '';
        $answers = json_decode($answersJson, true);

        if (empty($answers)) {
            echo json_encode(['status' => 'error', 'message' => '回答データが正しく解析できませんでした。']);
            exit;
        }

        // 画像アップロードの処理
        $photoPaths = [];
        for ($i = 1; $i <= 3; $i++) {
            $fileKey = 'photo' . $i;
            if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['error'] === UPLOAD_ERR_OK) {
                $tmpName = $_FILES[$fileKey]['tmp_name'];
                $originalName = $_FILES[$fileKey]['name'];
                $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
                
                // 拡張子制限 (jpg, jpeg, png, gif, webp)
                if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                    $newFileName = 'survey_' . $role . '_photo_' . $i . '.' . $ext;
                    $destPath = $uploadsDir . '/' . $newFileName;
                    
                    // 既存の同一番号の画像を削除 (拡張子が異なる場合を考慮して全検索＆削除)
                    $pattern = $uploadsDir . '/survey_' . $role . '_photo_' . $i . '.*';
                    foreach (glob($pattern) as $oldFile) {
                        unlink($oldFile);
                    }

                    if (move_uploaded_file($tmpName, $destPath)) {
                        $photoPaths[$fileKey] = 'uploads/' . $newFileName;
                    }
                }
            }
        }

        // 既存データの読み込み (画像パスなどを維持するため)
        $saveFile = $dataDir . '/survey_' . $role . '.json';
        $existingData = [];
        if (file_exists($saveFile)) {
            $content = file_get_contents($saveFile);
            $existingData = json_decode($content, true) ?: [];
        }

        // 画像パスの統合 (新しいアップロードがあれば上書き、なければ既存を維持)
        $mergedPhotos = $existingData['photos'] ?? [];
        foreach ($photoPaths as $k => $v) {
            $mergedPhotos[$k] = $v;
        }

        $saveData = [
            'role' => $role,
            'status' => $status,
            'updated_at' => date('Y-m-d H:i:s'),
            'answers' => $answers,
            'photos' => $mergedPhotos
        ];

        file_put_contents($saveFile, json_encode($saveData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

        echo json_encode([
            'status' => 'success', 
            'message' => 'データを保存しました。', 
            'data' => $saveData
        ], JSON_UNESCAPED_UNICODE);
        break;

    case 'get':
        $results = [];
        foreach ($allowedRoles as $r) {
            $file = $dataDir . '/survey_' . $r . '.json';
            if (file_exists($file)) {
                $content = file_get_contents($file);
                $data = json_decode($content, true);
                if ($data) {
                    $results[$r] = $data;
                }
            } else {
                $results[$r] = null;
            }
        }
        echo json_encode(['status' => 'success', 'results' => $results], JSON_UNESCAPED_UNICODE);
        break;

    case 'clear':
        $target = $_GET['target'] ?? $_POST['target'] ?? '';
        if (in_array($target, $allowedRoles)) {
            // JSONの削除
            $file = $dataDir . '/survey_' . $target . '.json';
            if (file_exists($file)) {
                unlink($file);
            }
            // 画像の削除
            $pattern = $uploadsDir . '/survey_' . $target . '_photo_*.*';
            foreach (glob($pattern) as $imgFile) {
                unlink($imgFile);
            }
            echo json_encode(['status' => 'success', 'message' => $target . 'のデータをクリアしました。']);
        } else {
            echo json_encode(['status' => 'error', 'message' => '削除対象が無効です。']);
        }
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => '不明なアクションです。']);
        break;
}
