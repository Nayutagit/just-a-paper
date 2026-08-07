<?php
// api.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$dataDir = __DIR__ . '/data';
if (!file_exists($dataDir)) {
    mkdir($dataDir, 0777, true);
}

$stateFile = $dataDir . '/state.json';

// クイズの正解データ（カンニング防止のためサーバー側で保持・判定）
$quizAnswers = [
    1 => 'A', // 第1問の正解: A
    2 => 'B', // 第2問の正解: B
    3 => 'A', // 第3問の正解: A
    4 => 'C'  // 第4問の正解: C
];

// 初期状態
$initialState = [
    'phase' => 'WAITING', // WAITING, QUESTION, SHOW_ANSWER, LEADERBOARD
    'currentQuestion' => 1,
    'questionActive' => false,
    'questionStartTime' => 0,
    'players' => [], // ['Taro' => ['points' => 0, 'answered' => false, 'lastAnswerCorrect' => false, 'lastPointsEarned' => 0]]
    'answers' => []   // ['1' => ['Taro' => ['answer' => 'A', 'time' => 1.5, 'points' => 15]]]
];

// 状態の読み込み
function loadState($file, $initial) {
    if (!file_exists($file)) {
        file_put_contents($file, json_encode($initial, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return $initial;
    }
    $content = file_get_contents($file);
    $data = json_decode($content, true);
    return is_array($data) ? $data : $initial;
}

// 状態の保存
function saveState($file, $data) {
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
}

$state = loadState($stateFile, $initialState);
$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {
    case 'get':
        echo json_encode($state, JSON_UNESCAPED_UNICODE);
        break;

    case 'reset':
        $state = $initialState;
        saveState($stateFile, $state);
        echo json_encode(['status' => 'success', 'message' => 'ゲーム状態を初期化しました。', 'state' => $state], JSON_UNESCAPED_UNICODE);
        break;

    case 'join':
        $name = trim($_POST['name'] ?? $_GET['name'] ?? '');
        if (empty($name)) {
            echo json_encode(['status' => 'error', 'message' => 'ニックネームを入力してください。']);
            exit;
        }
        
        // プレイヤー追加（重複チェック）
        if (!isset($state['players'][$name])) {
            $state['players'][$name] = [
                'points' => 0,
                'answered' => false,
                'lastAnswerCorrect' => false,
                'lastPointsEarned' => 0,
                'joinedAt' => time()
            ];
            saveState($stateFile, $state);
        }
        
        echo json_encode([
            'status' => 'success',
            'player' => $state['players'][$name],
            'state' => $state
        ], JSON_UNESCAPED_UNICODE);
        break;

    case 'add_demo_players':
        // デモ用のプレイヤーをまとめて追加
        $demoNames = ['タクヤ', 'マイ', 'ケンタ', 'サクラ', 'ユウト', 'ヒナ', 'リョウ', 'ナナ', 'シュン', 'ユイ', 'ハルト', 'アオイ'];
        $added = 0;
        foreach ($demoNames as $name) {
            if (!isset($state['players'][$name]) && count($state['players']) < 37) {
                $state['players'][$name] = [
                    'points' => 0,
                    'answered' => false,
                    'lastAnswerCorrect' => false,
                    'lastPointsEarned' => 0,
                    'isDemo' => true,
                    'joinedAt' => time()
                ];
                $added++;
            }
        }
        if ($added > 0) {
            saveState($stateFile, $state);
        }
        echo json_encode(['status' => 'success', 'added' => $added, 'state' => $state], JSON_UNESCAPED_UNICODE);
        break;

    case 'submit_answer':
        $name = trim($_POST['name'] ?? $_GET['name'] ?? '');
        $questionNum = intval($_POST['question'] ?? $_GET['question'] ?? 0);
        $answer = strtoupper(trim($_POST['answer'] ?? $_GET['answer'] ?? ''));
        $timeTaken = floatval($_POST['time_taken'] ?? $_GET['time_taken'] ?? 0); // 秒

        if (!isset($state['players'][$name])) {
            echo json_encode(['status' => 'error', 'message' => 'プレイヤーが登録されていません。']);
            exit;
        }

        if ($state['phase'] !== 'QUESTION' || $state['currentQuestion'] !== $questionNum) {
            echo json_encode(['status' => 'error', 'message' => '現在は回答受付時間外です。']);
            exit;
        }

        // すでに回答済みかチェック
        if (isset($state['answers'][$questionNum][$name])) {
            echo json_encode(['status' => 'error', 'message' => 'すでに回答済みです。']);
            exit;
        }

        // 正誤判定
        $correctAnswer = $quizAnswers[$questionNum] ?? '';
        $isCorrect = ($answer === $correctAnswer);
        
        // ポイント計算
        $pointsEarned = 0;
        if ($isCorrect) {
            // 基本点: 10点
            $pointsEarned = 10;
            // 回答速度ボーナス: 早く答えるほど加算（最大20秒として、早く答えるほど最大10点加算）
            $timeLimit = 20.0;
            $bonus = max(0, min(10, round((($timeLimit - $timeTaken) / $timeLimit) * 10)));
            $pointsEarned += $bonus;
        }

        // 記録
        $state['answers'][$questionNum][$name] = [
            'answer' => $answer,
            'time' => $timeTaken,
            'points' => $pointsEarned,
            'isCorrect' => $isCorrect
        ];
        
        // プレイヤー個人の一時状態更新
        $state['players'][$name]['answered'] = true;
        $state['players'][$name]['lastAnswerCorrect'] = $isCorrect;
        $state['players'][$name]['lastPointsEarned'] = $pointsEarned;
        $state['players'][$name]['points'] += $pointsEarned;

        saveState($stateFile, $state);

        echo json_encode([
            'status' => 'success',
            'pointsEarned' => $pointsEarned,
            'totalPoints' => $state['players'][$name]['points'],
            'isCorrect' => $isCorrect
        ], JSON_UNESCAPED_UNICODE);
        break;

    case 'update_state':
        // メイン画面からの進行状況のコントロール
        $phase = $_POST['phase'] ?? $_GET['phase'] ?? '';
        $questionNum = isset($_POST['question']) ? intval($_POST['question']) : (isset($_GET['question']) ? intval($_GET['question']) : null);
        
        if (!empty($phase)) {
            $state['phase'] = $phase;
            
            // フェーズ切り替えに伴う初期化処理
            if ($phase === 'QUESTION') {
                $state['questionActive'] = true;
                $state['questionStartTime'] = time();
                if ($questionNum !== null) {
                    $state['currentQuestion'] = $questionNum;
                }
                
                // 全プレイヤーの「回答済み」フラグをリセット
                foreach ($state['players'] as $pName => $pData) {
                    $state['players'][$pName]['answered'] = false;
                }
            } elseif ($phase === 'SHOW_ANSWER') {
                $state['questionActive'] = false;
                
                // 未回答のプレイヤーがいたら自動で不正解にする処理
                foreach ($state['players'] as $pName => $pData) {
                    if (!$pData['answered']) {
                        $q = $state['currentQuestion'];
                        $state['answers'][$q][$pName] = [
                            'answer' => '',
                            'time' => 20,
                            'points' => 0,
                            'isCorrect' => false
                        ];
                        $state['players'][$pName]['answered'] = true;
                        $state['players'][$pName]['lastAnswerCorrect'] = false;
                        $state['players'][$pName]['lastPointsEarned'] = 0;
                    }
                }
            }
        }
        
        saveState($stateFile, $state);
        echo json_encode(['status' => 'success', 'state' => $state], JSON_UNESCAPED_UNICODE);
        break;

    case 'submit_demo_answers':
        // デモプレイヤーの回答をシミュレート
        $questionNum = intval($_POST['question'] ?? $_GET['question'] ?? 0);
        if ($state['phase'] !== 'QUESTION' || $state['currentQuestion'] !== $questionNum) {
            echo json_encode(['status' => 'error', 'message' => '現在は回答受付時間外です。']);
            exit;
        }

        $correctAnswer = $quizAnswers[$questionNum] ?? '';
        $options = ['A', 'B', 'C', 'D'];
        $updated = 0;

        foreach ($state['players'] as $name => $player) {
            if (isset($player['isDemo']) && $player['isDemo'] && !isset($state['answers'][$questionNum][$name])) {
                $isCorrect = (rand(1, 10) <= 6); // 正解率60%
                if ($isCorrect) {
                    $ans = $correctAnswer;
                } else {
                    $wrongOpts = array_filter($options, function($o) use ($correctAnswer) { return $o !== $correctAnswer; });
                    $ans = $wrongOpts[array_rand($wrongOpts)];
                }
                
                $timeTaken = rand(15, 185) / 10.0;
                
                $points = 0;
                if ($isCorrect) {
                    $points = 10 + max(0, min(10, round(((20.0 - $timeTaken) / 20.0) * 10)));
                }

                $state['answers'][$questionNum][$name] = [
                    'answer' => $ans,
                    'time' => $timeTaken,
                    'points' => $points,
                    'isCorrect' => $isCorrect
                ];
                
                $state['players'][$name]['answered'] = true;
                $state['players'][$name]['lastAnswerCorrect'] = $isCorrect;
                $state['players'][$name]['lastPointsEarned'] = $points;
                $state['players'][$name]['points'] += $points;
                $updated++;
            }
        }

        if ($updated > 0) {
            saveState($stateFile, $state);
        }
        echo json_encode(['status' => 'success', 'simulated_count' => $updated, 'state' => $state], JSON_UNESCAPED_UNICODE);
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => '不明なアクションです。']);
        break;
}
