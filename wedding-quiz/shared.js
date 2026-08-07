// shared.js
// クイズデータの定義
const QUIZ_DATA = [
    {
        id: 1,
        question: "新郎「魁」が今まで貰ったプレゼントで一番嬉しかったものは？",
        options: {
            A: "旅行のアルバム (偲桜手作り)",
            B: "オーダーメイドの財布",
            C: "お揃いのスニーカー",
            D: "高級な万年筆"
        },
        correct: "A"
    },
    {
        id: 2,
        question: "新婦「偲桜」が新郎「魁」に「これだけは直してほしい！」と思っていることは？",
        options: {
            A: "靴下を脱ぎっぱなしにする",
            B: "すぐにスマホを失くす",
            C: "買い物での決断が遅すぎる",
            D: "朝起きるのが遅すぎる"
        },
        correct: "B"
    },
    {
        id: 3,
        question: "新郎「魁」が「実は偲桜のこういうところが一番尊敬できる」と思っているのは？",
        options: {
            A: "誰にでも笑顔で接するところ",
            B: "仕事に対するプロ意識が高いところ",
            C: "怒ってもすぐに許してくれるところ",
            D: "料理の味付けがいつも完璧なところ"
        },
        correct: "A"
    },
    {
        id: 4,
        question: "お互いの記憶力テスト！二人が初めてデートした場所は？",
        options: {
            A: "みなとみらいの観覧車",
            B: "下北沢の古着屋巡り",
            C: "江の島の海沿いカフェ",
            D: "京都の嵐山散策"
        },
        correct: "C"
    }
];

// APIへの共通Fetch関数
const API_URL = 'api.php';

async function apiCall(action, params = {}) {
    const formData = new FormData();
    formData.append('action', action);
    for (const [key, val] of Object.entries(params)) {
        formData.append(key, val);
    }
    
    try {
        const response = await fetch(`${API_URL}?t=${Date.now()}`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (e) {
        console.error("API Call Error: ", e);
        return { status: 'error', message: e.message };
    }
}

// 状態取得
async function getGameState() {
    return await apiCall('get');
}

// 参加登録
async function joinGame(name) {
    return await apiCall('join', { name });
}

// 回答送信
async function submitAnswer(name, question, answer, timeTaken) {
    return await apiCall('submit_answer', { name, question, answer, time_taken: timeTaken });
}

// 管理用：状態更新
async function updateGameState(phase, question = null) {
    const params = { phase };
    if (question !== null) {
        params.question = question;
    }
    return await apiCall('update_state', params);
}

// 管理用：リセット
async function resetGameState() {
    return await apiCall('reset');
}

// 管理用：デモプレイヤー追加
async function addDemoPlayers() {
    return await apiCall('add_demo_players');
}

// 管理用：デモプレイヤーの回答シミュレート
async function submitDemoAnswers(question) {
    return await apiCall('submit_demo_answers', { question });
}
