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
if (!file_exists($dataDir)) {
    mkdir($dataDir, 0777, true);
}

$action = $_GET['action'] ?? $_POST['action'] ?? '';
$role = $_GET['role'] ?? $_POST['role'] ?? '';

// 許可された役割
$allowedRoles = ['groom', 'bride', 'nayuta_groom', 'nayuta_bride'];

switch ($action) {
    case 'save':
        if (!in_array($role, $allowedRoles)) {
            echo json_encode(['status' => 'error', 'message' => '無効な役割（Role）です。']);
            exit;
        }

        // POSTデータの取得（JSON文字列）
        $rawInput = file_get_contents('php://input');
        $inputData = json_decode($rawInput, true);

        if (!$inputData || !isset($inputData['answers'])) {
            // 通常のPOST送信の場合のフォールバック
            $answers = $_POST['answers'] ?? null;
            if (is_string($answers)) {
                $answers = json_decode($answers, true);
            }
        } else {
            $answers = $inputData['answers'];
        }

        if (empty($answers)) {
            echo json_encode(['status' => 'error', 'message' => '回答データが空です。']);
            exit;
        }

        $saveFile = $dataDir . '/survey_' . $role . '.json';
        $saveData = [
            'role' => $role,
            'updated_at' => date('Y-m-d H:i:s'),
            'answers' => $answers
        ];

        file_put_contents($saveFile, json_encode($saveData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

        echo json_encode(['status' => 'success', 'message' => '回答を保存しました。', 'data' => $saveData], JSON_UNESCAPED_UNICODE);
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
        // テストデータ等のリセット用
        $target = $_GET['target'] ?? $_POST['target'] ?? '';
        if (in_array($target, $allowedRoles)) {
            $file = $dataDir . '/survey_' . $target . '.json';
            if (file_exists($file)) {
                unlink($file);
            }
            echo json_encode(['status' => 'success', 'message' => $target . 'のデータを削除しました。']);
        } else {
            echo json_encode(['status' => 'error', 'message' => '削除対象が無効です。']);
        }
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => '不明なアクションです。']);
        break;
}
