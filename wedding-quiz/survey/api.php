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

        $status = $_POST['status'] ?? 'draft';
        $answersJson = $_POST['answers'] ?? '';
        $answers = json_decode($answersJson, true);

        if (empty($answers)) {
            echo json_encode(['status' => 'error', 'message' => '回答データが正しく解析できませんでした。']);
            exit;
        }

        $photoPaths = [];
        for ($i = 1; $i <= 3; $i++) {
            $fileKey = 'photo' . $i;
            if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['error'] === UPLOAD_ERR_OK) {
                $tmpName = $_FILES[$fileKey]['tmp_name'];
                $originalName = $_FILES[$fileKey]['name'];
                $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
                
                if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                    $newFileName = 'survey_' . $role . '_photo_' . $i . '.' . $ext;
                    $destPath = $uploadsDir . '/' . $newFileName;
                    
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

        $saveFile = $dataDir . '/survey_' . $role . '.json';
        $existingData = [];
        if (file_exists($saveFile)) {
            $content = file_get_contents($saveFile);
            $existingData = json_decode($content, true) ?: [];
        }

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

    case 'delete_photo':
        if (!in_array($role, $allowedRoles)) {
            echo json_encode(['status' => 'error', 'message' => '無効な役割（Role）です。']);
            exit;
        }

        $photoNum = intval($_GET['photo_num'] ?? $_POST['photo_num'] ?? 0);
        if ($photoNum < 1 || $photoNum > 3) {
            echo json_encode(['status' => 'error', 'message' => '無効な写真番号です。']);
            exit;
        }

        // サーバー上の画像ファイルを削除
        $pattern = $uploadsDir . '/survey_' . $role . '_photo_' . $photoNum . '.*';
        $deletedCount = 0;
        foreach (glob($pattern) as $file) {
            if (unlink($file)) {
                $deletedCount++;
            }
        }

        // JSONデータ内の写真パスを消去
        $saveFile = $dataDir . '/survey_' . $role . '.json';
        $updatedData = null;
        if (file_exists($saveFile)) {
            $content = file_get_contents($saveFile);
            $data = json_decode($content, true) ?: [];
            
            if (isset($data['photos']['photo' . $photoNum])) {
                unset($data['photos']['photo' . $photoNum]);
                $data['updated_at'] = date('Y-m-d H:i:s');
                file_put_contents($saveFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
                $updatedData = $data;
            }
        }

        echo json_encode([
            'status' => 'success', 
            'message' => '写真を削除しました。',
            'deleted_count' => $deletedCount,
            'data' => $updatedData
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
            $file = $dataDir . '/survey_' . $target . '.json';
            if (file_exists($file)) {
                unlink($file);
            }
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
