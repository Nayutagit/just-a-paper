/* ==========================================================================
   Animal Island - Cozy Game Engine & Logic
   ========================================================================== */

// --- 1. 音響効果 (Web Audio API) ---
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSound(type) {
    if (!audioCtx) return;
    
    // オーディオコンテキストがサスペンドされている場合は再開
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    switch (type) {
        case 'click':
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.setValueAtTime(150, now + 0.05);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
            break;
        case 'pickup':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            osc.start(now);
            osc.stop(now + 0.15);
            break;
        case 'rustle': // 木を揺らす音
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(120, now);
            osc.frequency.exponentialRampToValueAtTime(40, now + 0.3);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
            break;
        case 'pop': // アイテムが落ちる音
            osc.type = 'sine';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
            break;
        case 'fanfare': // なかよし度アップ / 仲間入り
            osc.type = 'sine';
            // C5 -> E5 -> G5 -> C6
            const freqs = [523.25, 659.25, 783.99, 1046.50];
            const duration = 0.1;
            freqs.forEach((freq, idx) => {
                const stepTime = now + (idx * duration);
                osc.frequency.setValueAtTime(freq, stepTime);
            });
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.setValueAtTime(0.2, now + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            osc.start(now);
            osc.stop(now + 0.5);
            break;
    }
}

// --- 2. 画像アセット管理 ---
const assets = {
    grass: new Image(),
    player: new Image(),
    cat: new Image(),
    rabbit: new Image(),
    dog: new Image(),
    apple: new Image(),
    shell: new Image()
};

// 画像の背景透過処理（Flood Fillアルゴリズム）
// 端から繋がっている白またはグレー（市松模様背景）を透明にする
function removeBackground(image) {
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    const width = canvas.width;
    const height = canvas.height;

    const visited = new Uint8Array(width * height);
    const queue = [];

    // 背景色と判定する基準（R,G,Bが近い＆高輝度）
    function isBgPixel(r, g, b, a) {
        if (a === 0) return true;
        // 白背景 (#fff)
        const isWhite = (r > 235 && g > 235 && b > 235);
        // 市松模様（チェッカーボード）の薄いグレー
        const isGray = (r > 200 && g > 200 && b > 200 && Math.abs(r - g) < 15 && Math.abs(g - b) < 15);
        return isWhite || isGray;
    }

    // 四辺をシードとしてキューに追加
    for (let x = 0; x < width; x++) {
        queue.push({x, y: 0});
        queue.push({x, y: height - 1});
        visited[x] = 1;
        visited[x + (height - 1) * width] = 1;
    }
    for (let y = 1; y < height - 1; y++) {
        queue.push({x: 0, y});
        queue.push({x: width - 1, y});
        visited[y * width] = 1;
        visited[(width - 1) + y * width] = 1;
    }

    // BFSで背景塗りつぶし透過
    while (queue.length > 0) {
        const curr = queue.shift();
        const idx = (curr.x + curr.y * width) * 4;
        const r = data[idx];
        const g = data[idx+1];
        const b = data[idx+2];
        const a = data[idx+3];

        if (isBgPixel(r, g, b, a)) {
            data[idx+3] = 0; // アルファを0（透明）に

            const neighbors = [
                {x: curr.x + 1, y: curr.y},
                {x: curr.x - 1, y: curr.y},
                {x: curr.x, y: curr.y + 1},
                {x: curr.x, y: curr.y - 1}
            ];

            neighbors.forEach(n => {
                if (n.x >= 0 && n.x < width && n.y >= 0 && n.y < height) {
                    const nIdx = n.x + n.y * width;
                    if (visited[nIdx] === 0) {
                        visited[nIdx] = 1;
                        queue.push(n);
                    }
                }
            });
        }
    }

    ctx.putImageData(imgData, 0, 0);
    const newImg = new Image();
    newImg.src = canvas.toDataURL();
    return newImg;
}

// 画像ソース設定
assets.grass.src = 'assets/grass.png';
assets.player.src = 'assets/player.png';
assets.cat.src = 'assets/cat.png';
assets.rabbit.src = 'assets/rabbit.png';
assets.dog.src = 'assets/dog.png';
assets.apple.src = 'assets/apple.png';
assets.shell.src = 'assets/shell.png';

// 全てのアセット読み込み完了チェック
let assetsLoaded = 0;
const totalAssets = Object.keys(assets).length;

Object.keys(assets).forEach(key => {
    const img = assets[key];
    img.onload = () => {
        // grass以外の画像に対して背景除去（透過処理）を実行
        if (key !== 'grass') {
            const processedImg = removeBackground(img);
            processedImg.onload = () => {
                assets[key] = processedImg; // 透過画像に差し替え
                assetsLoaded++;
                if (assetsLoaded === totalAssets) {
                    console.log("All assets loaded and transparency processed.");
                }
            };
        } else {
            assetsLoaded++;
            if (assetsLoaded === totalAssets) {
                console.log("All assets loaded.");
            }
        }
    };
});

// --- 3. ゲームステート ---
const state = {
    playerName: 'ななし',
    currentLocation: 'island', // 'island' or 'camp'
    currentTime: 'day',        // 'day', 'sunset', 'night'
    inventory: {
        apple: 0,
        shell: 0
    },
    // 動物たちのステータス
    animals: {
        cat: {
            id: 'cat',
            name: 'ミケ',
            species: 'ねこ',
            suffix: 'ニャ',
            img: assets.cat,
            met: false,
            love: 0,
            quest: {
                target: 'apple',
                count: 3,
                text: 'リンゴを 3こ もってきてほしいニャ！',
                clearedText: 'リンゴおいしいニャ！ありがとう！キャンプにいってもいいニャア。'
            },
            questCleared: false,
            inCamp: false,
            talkCount: 0,
            x: 200, y: 300,
            targetX: 200, targetY: 300,
            walkTimer: 0,
            facing: 'left'
        },
        rabbit: {
            id: 'rabbit',
            name: 'モモ',
            species: 'うさぎ',
            suffix: 'ぴょん',
            img: assets.rabbit,
            met: false,
            love: 0,
            quest: {
                target: 'shell',
                count: 3,
                text: 'ピンクの かいがらを 3こ あつめてほしいぴょん！',
                clearedText: 'わぁ、きれいなかぃがら！ありがとうぴょん。キャンプでいっしょに遊ぼう！'
            },
            questCleared: false,
            inCamp: false,
            talkCount: 0,
            x: 500, y: 250,
            targetX: 500, targetY: 250,
            walkTimer: 0,
            facing: 'right'
        },
        dog: {
            id: 'dog',
            name: 'ポチ',
            species: 'いぬ',
            suffix: 'ワン',
            img: assets.dog,
            met: false,
            love: 0,
            quest: {
                target: 'apple_and_shell', // 特殊クエスト
                count: 2, // リンゴ2個、貝殻2個
                text: 'リンゴを2こと、かいがらを2こ ほしいワン！',
                clearedText: 'どっちも大すきんだワン！ありがとう！キャンプの仲間にしてほしいワン！'
            },
            questCleared: false,
            inCamp: false,
            talkCount: 0,
            x: 350, y: 500,
            targetX: 350, targetY: 500,
            walkTimer: 0,
            facing: 'left'
        }
    },
    // 落ちているアイテム
    groundItems: [],
    // 木の情報
    trees: [
        { x: 150, y: 180, hasApple: true, shakeTimer: 0 },
        { x: 450, y: 150, hasApple: true, shakeTimer: 0 },
        { x: 600, y: 400, hasApple: true, shakeTimer: 0 }
    ],
    // キャンプの家具/装飾オブジェクト位置
    campObjects: [
        { type: 'tent', x: 200, y: 200, width: 120, height: 100 },
        { type: 'bonfire', x: 200, y: 350, width: 60, height: 60, frame: 0 },
        { type: 'stump', x: 120, y: 360, width: 44, height: 36 },
        { type: 'stump', x: 280, y: 360, width: 44, height: 36 }
    ]
};

// --- 4. プレイヤーオブジェクト ---
const player = {
    x: 300,
    y: 400,
    speed: 3.5,
    width: 60,
    height: 70,
    vx: 0,
    vy: 0,
    facing: 'front', // 'front', 'left', 'right', 'back'
    isWalking: false,
    walkCycle: 0,
    targetX: null, // タップ移動用
    targetY: null
};

// --- 5. DOM要素の取得 ---
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('start-screen');
const mainScreen = document.getElementById('main-screen');
const nameInput = document.getElementById('player-name');
const startBtn = document.getElementById('start-btn');
const displayPlayerName = document.getElementById('display-player-name');
const timeBtn = document.getElementById('time-btn');
const locationBtn = document.getElementById('location-btn');
const actionBtn = document.getElementById('action-btn');
const bagBtn = document.getElementById('bag-btn');
const friendsBtn = document.getElementById('friends-btn');
const dialogueBox = document.getElementById('dialogue-box');
const dialogueSpeaker = document.getElementById('dialogue-speaker');
const dialogueText = document.getElementById('dialogue-text');
const dialogueNextBtn = document.getElementById('dialogue-next-btn');
const questActionBtn = document.getElementById('quest-action-btn');
const bagModal = document.getElementById('bag-modal');
const closeBagBtn = document.getElementById('close-bag-btn');
const friendsModal = document.getElementById('friends-modal');
const closeFriendsBtn = document.getElementById('close-friends-btn');
const toast = document.getElementById('toast');

// ジョイスティック要素
const joystickContainer = document.getElementById('joystick-container');
const joystickBase = document.getElementById('joystick-base');
const joystickStick = document.getElementById('joystick-stick');

// --- 6. イベントリスナーの設定 ---

// スタートボタン
startBtn.addEventListener('click', () => {
    initAudio();
    playSound('click');
    const enteredName = nameInput.value.trim();
    if (enteredName) {
        state.playerName = enteredName;
    } else {
        state.playerName = 'なゆた'; // デフォルト名
    }
    displayPlayerName.textContent = state.playerName;
    
    startScreen.classList.remove('active');
    mainScreen.classList.add('active');
    
    // ゲーム画面のリサイズと初期化
    resizeCanvas();
    spawnGroundItems();
    
    // ループ開始
    requestAnimationFrame(gameLoop);
});

// リサイズ対応
window.addEventListener('resize', resizeCanvas);
function resizeCanvas() {
    if (!mainScreen.classList.contains('active')) return;
    const rect = mainScreen.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}

// 時間帯切り替え
timeBtn.addEventListener('click', () => {
    playSound('click');
    if (state.currentTime === 'day') {
        state.currentTime = 'sunset';
        timeBtn.textContent = '🌇';
        showToast("夕方になりました");
    } else if (state.currentTime === 'sunset') {
        state.currentTime = 'night';
        timeBtn.textContent = '🌙';
        showToast("夜になりました");
    } else {
        state.currentTime = 'day';
        timeBtn.textContent = '☀️';
        showToast("朝になりました");
    }
});

// 場所切り替え（島 ⇄ キャンプ）
locationBtn.addEventListener('click', () => {
    playSound('click');
    // ダイアログが開いていたら閉じる
    closeDialogue();

    if (state.currentLocation === 'island') {
        state.currentLocation = 'camp';
        locationBtn.textContent = '⛵ 島へもどる';
        player.x = 200; // キャンプの中央付近にスポーン
        player.y = 480;
        player.targetX = null;
        player.targetY = null;
        showToast("キャンプ場に到着しました！");
    } else {
        state.currentLocation = 'island';
        locationBtn.textContent = '🏡 キャンプへ';
        player.x = 300;
        player.y = 400;
        player.targetX = null;
        player.targetY = null;
        showToast("アニマルアイランドへ戻りました");
    }
});

// バッグ開閉
bagBtn.addEventListener('click', () => {
    playSound('click');
    updateInventoryUI();
    bagModal.classList.remove('hidden');
});
closeBagBtn.addEventListener('click', () => {
    playSound('click');
    bagModal.classList.add('hidden');
});

// ともだち手帳開閉
friendsBtn.addEventListener('click', () => {
    playSound('click');
    updateFriendsUI();
    friendsModal.classList.remove('hidden');
});
closeFriendsBtn.addEventListener('click', () => {
    playSound('click');
    friendsModal.classList.add('hidden');
});

// トースト通知
function showToast(message) {
    toast.textContent = message;
    toast.classList.remove('hidden');
    // アニメーションのリセット
    toast.style.animation = 'none';
    toast.offsetHeight; // トリガー用
    toast.style.animation = 'popInToast 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 2500);
}

// --- 7. ジョイスティック操作 (スマホ用) ---
let joystickActive = false;
let joystickStartPos = { x: 0, y: 0 };
const maxJoystickDist = 40;

joystickContainer.addEventListener('touchstart', (e) => {
    joystickActive = true;
    initAudio();
    const touch = e.touches[0];
    const rect = joystickBase.getBoundingClientRect();
    joystickStartPos = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
    handleJoystickMove(touch.clientX, touch.clientY);
});

window.addEventListener('touchmove', (e) => {
    if (!joystickActive) return;
    const touch = e.touches[0];
    handleJoystickMove(touch.clientX, touch.clientY);
});

window.addEventListener('touchend', () => {
    if (!joystickActive) return;
    joystickActive = false;
    joystickStick.style.transform = 'translate(0px, 0px)';
    player.vx = 0;
    player.vy = 0;
    player.isWalking = false;
});

function handleJoystickMove(clientX, clientY) {
    let dx = clientX - joystickStartPos.x;
    let dy = clientY - joystickStartPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > maxJoystickDist) {
        dx = (dx / dist) * maxJoystickDist;
        dy = (dy / dist) * maxJoystickDist;
    }

    joystickStick.style.transform = `translate(${dx}px, ${dy}px)`;

    // プレイヤー移動ベクトル設定 (強さに応じてスピード調整)
    const normX = dx / maxJoystickDist;
    const normY = dy / maxJoystickDist;
    player.vx = normX * player.speed;
    player.vy = normY * player.speed;
    
    // タップ移動の目標位置をクリア
    player.targetX = null;
    player.targetY = null;
}

// キーボード操作 (PC用)
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    initAudio();
    // 矢印キー等のスクロール防止
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(e.key.toLowerCase())) {
        e.preventDefault();
    }
});
window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// タップ（クリック）でその場所へ移動
canvas.addEventListener('click', (e) => {
    // ジョイスティック側をタップした場合は無視
    const jRect = joystickContainer.getBoundingClientRect();
    if (e.clientX >= jRect.left && e.clientX <= jRect.right &&
        e.clientY >= jRect.top && e.clientY <= jRect.bottom) {
        return;
    }

    // ダイアログ表示中は画面タップで次へ進むようにする
    if (!dialogueBox.classList.contains('hidden')) {
        const dRect = dialogueBox.getBoundingClientRect();
        if (e.clientX >= dRect.left && e.clientX <= dRect.right &&
            e.clientY >= dRect.top && e.clientY <= dRect.bottom) {
            return; // ダイアログ内のボタンに任せる
        }
        dialogueNextBtn.click();
        return;
    }

    // モーダルオープン時は背景タップで閉じる
    if (!bagModal.classList.contains('hidden')) {
        bagModal.classList.add('hidden');
        return;
    }
    if (!friendsModal.classList.contains('hidden')) {
        friendsModal.classList.add('hidden');
        return;
    }

    // プレイヤーの目標地点を設定
    const rect = canvas.getBoundingClientRect();
    player.targetX = e.clientX - rect.left;
    player.targetY = e.clientY - rect.top;
});

// --- 8. 会話システム ---
let currentSpeaker = null;
let dialogueStep = 0;

function startDialogue(animal) {
    currentSpeaker = animal;
    dialogueStep = 0;
    dialogueBox.classList.remove('hidden');
    actionBtn.classList.add('hidden');
    
    // 動物を向き合わせる
    animal.facing = (player.x < animal.x) ? 'left' : 'right';
    player.facing = (player.x < animal.x) ? 'right' : 'left';
    player.targetX = null;
    player.targetY = null;
    
    animal.met = true;
    updateDialogue();
}

function updateDialogue() {
    dialogueSpeaker.textContent = currentSpeaker.name;
    const a = currentSpeaker;
    const suffix = a.suffix || 'ワン';
    
    let text = "";
    questActionBtn.classList.add('hidden');
    dialogueNextBtn.classList.remove('hidden');

    if (a.love >= 100 && !a.inCamp) {
        // なかよし度MAXでまだキャンプにいない
        if (dialogueStep === 0) {
            text = `${state.playerName}ちゃん！ キャンプに誘ってくれてうれしい${suffix}！`;
        } else if (dialogueStep === 1) {
            text = `さっそく キャンプ場にいくね！これからは ずっといっしょだよ✨`;
            dialogueNextBtn.textContent = "ともだちになる！ ✨";
        } else {
            a.inCamp = true;
            playSound('fanfare');
            showToast(`${a.name}がキャンプの仲間になりました！`);
            closeDialogue();
            return;
        }
    } else if (a.inCamp) {
        // キャンプ招待後
        const lines = {
            day: [
                `キャンプ場、とってもいごこちがいいよ〜。`,
                `${state.playerName}ちゃん、いっしょにのんびりしよう${suffix}。`
            ],
            sunset: [
                `夕焼けがキレイだねぇ。`,
                `キャンプファイヤーのじかんだね！ワクワク。`
            ],
            night: [
                `ふわぁ… もうねむい時間だねぇ。おやすみなさい。`,
                `夜のキャンプも しずかで大すきなんだ。`
            ]
        };
        const activeLines = lines[state.currentTime];
        text = activeLines[dialogueStep % activeLines.length];
        
        if (dialogueStep > 0) {
            closeDialogue();
            return;
        }
        }
    } else if (a.questCleared) {
        // クエストは完了しているが、まだキャンプに誘っていない
        if (dialogueStep === 0) {
            text = a.quest.clearedText;
        } else if (dialogueStep === 1) {
            text = `ねぇ、${state.playerName}ちゃん。わたしのこと、キャンプに誘ってくれないかな？`;
            questActionBtn.textContent = "キャンプに誘う 🏡";
            questActionBtn.classList.remove('hidden');
            dialogueNextBtn.classList.add('hidden'); // ボタン選択にゆだねる
        }
    } else {
        // クエスト未クリア
        if (dialogueStep === 0) {
            // 挨拶
            const greeting = {
                day: `やあ！ ${state.playerName}ちゃん、こんにちは！`,
                sunset: `${state.playerName}ちゃん、もうすぐ日が暮れるね。`,
                night: `こんばんは、${state.playerName}ちゃん。いい夜だね。`
            };
            text = greeting[state.currentTime];
        } else if (dialogueStep === 1) {
            // お願いの提示
            text = a.quest.text;
        } else if (dialogueStep === 2) {
            // クエスト受け入れ・確認
            const hasItems = checkQuestItems(a);
            if (hasItems) {
                text = "おっ！もってきてくれたんだね！";
                questActionBtn.textContent = "プレゼントする 🎁";
                questActionBtn.classList.remove('hidden');
                dialogueNextBtn.classList.add('hidden');
            } else {
                text = `あつまったら プレゼントしてほしいな。まってるね！`;
                dialogueNextBtn.textContent = "バイバイ";
            }
        } else {
            closeDialogue();
            return;
        }
    }

    dialogueText.textContent = text;
}

dialogueNextBtn.addEventListener('click', () => {
    playSound('click');
    dialogueStep++;
    updateDialogue();
});

questActionBtn.addEventListener('click', () => {
    const a = currentSpeaker;
    
    if (a.love >= 100 && !a.inCamp) {
        // キャンプ入り確定
        dialogueStep++;
        updateDialogue();
    } else if (a.questCleared) {
        // キャンプへの勧誘
        a.love = 100;
        playSound('fanfare');
        dialogueStep = 0;
        updateDialogue();
    } else {
        // クエストのアイテムを渡す
        consumeQuestItems(a);
        a.questCleared = true;
        a.love = 100; // 今回は一発でなかよし度MAX
        playSound('fanfare');
        showToast(`${a.name}のお願いを叶えた！なかよし度アップ！`);
        dialogueStep = 0; // クリアテキストへ
        updateDialogue();
    }
});

function closeDialogue() {
    dialogueBox.classList.add('hidden');
    currentSpeaker = null;
}

function checkQuestItems(animal) {
    const q = animal.quest;
    if (q.target === 'apple') {
        return state.inventory.apple >= q.count;
    } else if (q.target === 'shell') {
        return state.inventory.shell >= q.count;
    } else if (q.target === 'apple_and_shell') {
        return state.inventory.apple >= q.count && state.inventory.shell >= q.count;
    }
    return false;
}

function consumeQuestItems(animal) {
    const q = animal.quest;
    if (q.target === 'apple') {
        state.inventory.apple -= q.count;
    } else if (q.target === 'shell') {
        state.inventory.shell -= q.count;
    } else if (q.target === 'apple_and_shell') {
        state.inventory.apple -= q.count;
        state.inventory.shell -= q.count;
    }
    updateInventoryUI();
}

// --- 9. UI更新 ---
function updateInventoryUI() {
    document.getElementById('count-apple').textContent = state.inventory.apple;
    document.getElementById('count-shell').textContent = state.inventory.shell;
}

function updateFriendsUI() {
    Object.values(state.animals).forEach(a => {
        const card = document.getElementById(`card-${a.id}`);
        const statusText = card.querySelector('.friend-status');
        const loveBar = document.getElementById(`love-${a.id}`);

        if (a.inCamp) {
            card.classList.add('met');
            statusText.textContent = "キャンプの仲間 ✨";
            loveBar.style.width = "100%";
        } else if (a.met) {
            card.classList.add('met');
            statusText.textContent = `島であそんでいる (なかよし度: ${a.love}%)`;
            loveBar.style.width = `${a.love}%`;
        } else {
            card.classList.remove('met');
            statusText.textContent = "まだ出会っていない";
            loveBar.style.width = "0%";
        }
    });
}

// --- 10. ゲーム世界生成とロジック ---

// アイテムのランダムスポーン
function spawnGroundItems() {
    state.groundItems = [];
    // 最初は適当な位置にいくつかスポーン
    for (let i = 0; i < 4; i++) {
        spawnItem('apple');
        spawnItem('shell');
    }
}

function spawnItem(type) {
    // Canvasの大きさ以内のランダム位置 (木の近くや端すぎない場所)
    const margin = 50;
    const x = margin + Math.random() * (600 - margin * 2);
    const y = 150 + Math.random() * (450 - 150); // 芝生エリア内
    state.groundItems.push({
        type,
        x,
        y,
        width: 32,
        height: 32,
        floatOffset: Math.random() * Math.PI
    });
}

// 木を揺らす
function shakeTree(tree) {
    playSound('rustle');
    tree.shakeTimer = 30; // 30フレーム揺れる
    
    if (tree.hasApple) {
        tree.hasApple = false;
        setTimeout(() => {
            playSound('pop');
            state.groundItems.push({
                type: 'apple',
                x: tree.x + (Math.random() * 40 - 20),
                y: tree.y + 70 + (Math.random() * 20),
                width: 32,
                height: 32,
                floatOffset: 0
            });
            showToast("リンゴが落ちてきた！");
        }, 300);
    } else {
        showToast("いまは実がなっていないようだ。");
    }
}

// 毎フレーム更新ロジック
function update() {
    // 1. キーボード移動処理
    if (!joystickActive && dialogueBox.classList.contains('hidden')) {
        let dx = 0;
        let dy = 0;
        if (keys['w'] || keys['arrowup']) dy = -player.speed;
        if (keys['s'] || keys['arrowdown']) dy = player.speed;
        if (keys['a'] || keys['arrowleft']) dx = -player.speed;
        if (keys['d'] || keys['arrowright']) dx = player.speed;

        player.vx = dx;
        player.vy = dy;
        player.targetX = null; // キー操作されたらタップ移動クリア
        player.targetY = null;
    }

    // 2. タップ移動処理
    if (player.targetX !== null && player.targetY !== null && dialogueBox.classList.contains('hidden')) {
        const dx = player.targetX - player.x;
        const dy = player.targetY - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 5) {
            player.vx = (dx / dist) * player.speed;
            player.vy = (dy / dist) * player.speed;
        } else {
            player.vx = 0;
            player.vy = 0;
            player.targetX = null;
            player.targetY = null;
        }
    }

    // 3. プレイヤー位置更新と向き
    if (dialogueBox.classList.contains('hidden')) {
        player.x += player.vx;
        player.y += player.vy;

        // 画面外はみ出し防止
        player.x = Math.max(30, Math.min(canvas.width - 30, player.x));
        player.y = Math.max(120, Math.min(canvas.height - 50, player.y)); // 上部ヘッダーより下

        if (player.vx !== 0 || player.vy !== 0) {
            player.isWalking = true;
            player.walkCycle += 0.15;
            
            // 向きの設定
            if (Math.abs(player.vx) > Math.abs(player.vy)) {
                player.facing = player.vx > 0 ? 'right' : 'left';
            } else {
                player.facing = player.vy > 0 ? 'front' : 'back';
            }
        } else {
            player.isWalking = false;
        }
    } else {
        player.isWalking = false;
    }

    // 4. 動物たちの移動・AI
    Object.values(state.animals).forEach(a => {
        // キャンプにいる場合はキャンプ内に、そうでない場合は島に表示
        if ((state.currentLocation === 'camp' && a.inCamp) || (state.currentLocation === 'island' && !a.inCamp)) {
            // ランダム歩行
            a.walkTimer--;
            if (a.walkTimer <= 0) {
                // 次の目的地
                a.targetX = 100 + Math.random() * (canvas.width - 200);
                a.targetY = 200 + Math.random() * (canvas.height - 300);
                a.walkTimer = 180 + Math.random() * 240; // 3〜7秒間隔
            }

            // 会話中でなければ移動
            if (currentSpeaker !== a) {
                const adx = a.targetX - a.x;
                const ady = a.targetY - a.y;
                const adist = Math.sqrt(adx * adx + ady * ady);

                if (adist > 4) {
                    const speed = 1.0;
                    a.x += (adx / adist) * speed;
                    a.y += (ady / adist) * speed;
                    a.facing = adx > 0 ? 'right' : 'left';
                }
            }
        }
    });

    // 5. 地面のアイテムとの当たり判定 (自動拾い)
    if (dialogueBox.classList.contains('hidden')) {
        for (let i = state.groundItems.length - 1; i >= 0; i--) {
            const item = state.groundItems[i];
            const dist = Math.sqrt((player.x - item.x) ** 2 + (player.y - item.y) ** 2);
            if (dist < 40) {
                // 収集
                state.inventory[item.type]++;
                playSound('pickup');
                showToast(`${item.type === 'apple' ? '🍎 リンゴ' : '🐚 かいがら'} をひろった！`);
                state.groundItems.splice(i, 1);
                updateInventoryUI();

                // 20%の確率で別のアイテムをどこかにスポーン
                setTimeout(() => {
                    if (state.groundItems.length < 6) {
                        spawnItem(Math.random() > 0.5 ? 'apple' : 'shell');
                    }
                }, 5000);
            }
        }
    }

    // 木の揺れタイマー更新
    state.trees.forEach(t => {
        if (t.shakeTimer > 0) t.shakeTimer--;
    });

    // キャンプの焚き火アニメーション
    const bonfire = state.campObjects.find(o => o.type === 'bonfire');
    if (bonfire) {
        bonfire.frame = (bonfire.frame + 0.15) % 4; // 4フレームのアニメーション
    }

    // 6. アクションボタンの制御 (島探索時のみ)
    if (state.currentLocation === 'island' && dialogueBox.classList.contains('hidden')) {
        let actionTarget = null;
        let actionType = '';

        // 近い動物を探す
        Object.values(state.animals).forEach(a => {
            if (!a.inCamp) {
                const dist = Math.sqrt((player.x - a.x) ** 2 + (player.y - a.y) ** 2);
                if (dist < 60) {
                    actionTarget = a;
                    actionType = 'talk';
                }
            }
        });

        // 近い木を探す
        if (!actionTarget) {
            state.trees.forEach(t => {
                const dist = Math.sqrt((player.x - t.x) ** 2 + (player.y - (t.y + 50)) ** 2);
                if (dist < 70) {
                    actionTarget = t;
                    actionType = 'shake';
                }
            });
        }

        if (actionTarget) {
            actionBtn.classList.remove('hidden');
            if (actionType === 'talk') {
                actionBtn.textContent = `${actionTarget.name}と話す 💬`;
                actionBtn.onclick = () => startDialogue(actionTarget);
            } else if (actionType === 'shake') {
                actionBtn.textContent = '木をゆらす 🌳';
                actionBtn.onclick = () => shakeTree(actionTarget);
            }
        } else {
            actionBtn.classList.add('hidden');
        }
    } else if (state.currentLocation === 'camp' && dialogueBox.classList.contains('hidden')) {
        // キャンプでは動物と話すアクションのみ
        let talkTarget = null;
        Object.values(state.animals).forEach(a => {
            if (a.inCamp) {
                const dist = Math.sqrt((player.x - a.x) ** 2 + (player.y - a.y) ** 2);
                if (dist < 60) {
                    talkTarget = a;
                }
            }
        });

        if (talkTarget) {
            actionBtn.classList.remove('hidden');
            actionBtn.textContent = `${talkTarget.name}と話す 💬`;
            actionBtn.onclick = () => startDialogue(talkTarget);
        } else {
            actionBtn.classList.add('hidden');
        }
    } else {
        actionBtn.classList.add('hidden');
    }
}

// 描画ロジック
function draw() {
    // キャンバスクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. 地面 (芝生) のタイル描画
    if (assets.grass.complete && assets.grass.naturalWidth !== 0) {
        const pattern = ctx.createPattern(assets.grass, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = '#81c784'; // フォールバックの緑色
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 2. キャンプ専用の背景装飾 (テントや焚き火) の描画
    if (state.currentLocation === 'camp') {
        // キャンプマット（草地の上に敷く敷物）をシンプルに描く
        ctx.fillStyle = '#ffe082';
        ctx.beginPath();
        ctx.ellipse(200, 380, 150, 80, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#ffd54f';
        ctx.stroke();
    }

    // 描画オブジェクトをY座標順にソートする (Y-sorting)
    const drawQueue = [];

    // プレイヤーを追加
    drawQueue.push({
        y: player.y,
        draw: () => drawPlayer()
    });

    // 状況（ロケーション）に応じた要素の追加
    if (state.currentLocation === 'island') {
        // 落ちているアイテム
        state.groundItems.forEach(item => {
            drawQueue.push({
                y: item.y,
                draw: () => drawItem(item)
            });
        });

        // 木
        state.trees.forEach(tree => {
            drawQueue.push({
                y: tree.y + 60, // 根元をソートの基準にする
                draw: () => drawTree(tree)
            });
        });

        // 島にいる動物
        Object.values(state.animals).forEach(a => {
            if (!a.inCamp) {
                drawQueue.push({
                    y: a.y,
                    draw: () => drawAnimal(a)
                });
            }
        });
    } else {
        // キャンプにいる動物
        Object.values(state.animals).forEach(a => {
            if (a.inCamp) {
                drawQueue.push({
                    y: a.y,
                    draw: () => drawAnimal(a)
                });
            }
        });

        // キャンプの家具・装飾
        state.campObjects.forEach(obj => {
            drawQueue.push({
                y: obj.y + (obj.height || 50),
                draw: () => drawCampObject(obj)
            });
        });
    }

    // Y座標で昇順ソートして順番に描画
    drawQueue.sort((a, b) => a.y - b.y);
    drawQueue.forEach(item => item.draw());

    // 3. ライティング効果（時間帯による半透明オーバーレイ）
    if (state.currentTime === 'sunset') {
        ctx.fillStyle = 'rgba(255, 120, 0, 0.25)'; // オレンジフィルター
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (state.currentTime === 'night') {
        ctx.fillStyle = 'rgba(10, 15, 60, 0.45)'; // 濃紺フィルター
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 焚き火の近くなら光が当たって明るくする（簡易ランタン効果）
        if (state.currentLocation === 'camp') {
            const bonfire = state.campObjects.find(o => o.type === 'bonfire');
            if (bonfire) {
                const gradient = ctx.createRadialGradient(
                    bonfire.x + bonfire.width/2, bonfire.y + bonfire.height/2, 10,
                    bonfire.x + bonfire.width/2, bonfire.y + bonfire.height/2, 120
                );
                gradient.addColorStop(0, 'rgba(255, 200, 100, 0.4)');
                gradient.addColorStop(1, 'rgba(10, 15, 60, 0)');
                
                ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(bonfire.x + bonfire.width/2, bonfire.y + bonfire.height/2, 120, 0, 2*Math.PI);
                ctx.fill();
                ctx.globalCompositeOperation = 'source-over'; // 元に戻す
            }
        }
    }
}

// プレイヤー描画
function drawPlayer() {
    const scale = player.isWalking ? (1 + Math.abs(Math.sin(player.walkCycle)) * 0.05) : 1;
    const w = player.width;
    const h = player.height * scale;
    const x = player.x - w / 2;
    const y = player.y - h;

    ctx.save();
    // 左右反転処理
    if (player.facing === 'left') {
        ctx.translate(player.x, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(assets.player, -w/2, y, w, h);
    } else {
        ctx.drawImage(assets.player, x, y, w, h);
    }
    
    // 足元の影
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.beginPath();
    ctx.ellipse(player.x, player.y - 2, 22, 8, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
}

// 動物描画
function drawAnimal(animal) {
    const size = 64;
    const x = animal.x - size / 2;
    const y = animal.y - size;

    ctx.save();
    
    // 足元の影
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.beginPath();
    ctx.ellipse(animal.x, animal.y - 2, 20, 7, 0, 0, 2 * Math.PI);
    ctx.fill();

    // 左右反転処理
    if (animal.facing === 'left') {
        ctx.translate(animal.x, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(animal.img, -size/2, y, size, size);
    } else {
        ctx.drawImage(animal.img, x, y, size, size);
    }

    // 会話可能マーク (接近時に吹き出しフワフワ)
    const dist = Math.sqrt((player.x - animal.x) ** 2 + (player.y - animal.y) ** 2);
    if (dist < 60 && dialogueBox.classList.contains('hidden')) {
        const markY = y - 15 + Math.sin(Date.now() / 150) * 4;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = '#ffb74d';
        ctx.lineWidth = 2;
        ctx.beginPath();
        // 吹き出しマークを描く
        ctx.arc(animal.x, markY, 8, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.font = 'bold 10px sans-serif';
        ctx.fillStyle = '#f57c00';
        ctx.textAlign = 'center';
        ctx.fillText('💬', animal.x, markY + 3.5);
    }

    ctx.restore();
}

// 落ちているアイテムの描画 (ふわふわ浮く)
function drawItem(item) {
    item.floatOffset += 0.05;
    const floatY = Math.sin(item.floatOffset) * 4;
    const img = item.type === 'apple' ? assets.apple : assets.shell;

    // 影
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.beginPath();
    ctx.ellipse(item.x, item.y + 12, 12, 5, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.drawImage(img, item.x - item.width/2, item.y - item.height/2 + floatY, item.width, item.height);
}

// 木の描画
function drawTree(tree) {
    let shakeX = 0;
    if (tree.shakeTimer > 0) {
        shakeX = Math.sin(tree.shakeTimer * 0.8) * 8;
    }

    const tx = tree.x;
    const ty = tree.y;

    // 木の影
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.beginPath();
    ctx.ellipse(tx, ty + 70, 35, 12, 0, 0, 2 * Math.PI);
    ctx.fill();

    // 幹の描画 (茶色の台形)
    ctx.fillStyle = '#8d6e63';
    ctx.beginPath();
    ctx.moveTo(tx - 12, ty + 70);
    ctx.lineTo(tx + 12, ty + 70);
    ctx.lineTo(tx + 8, ty + 10);
    ctx.lineTo(tx - 8, ty + 10);
    ctx.closePath();
    ctx.fill();

    // 葉の描画 (緑の丸を重ねてフサフサにする)
    ctx.fillStyle = '#4caf50';
    ctx.beginPath();
    ctx.arc(tx + shakeX, ty + 10, 48, 0, 2*Math.PI);
    ctx.arc(tx - 24 + shakeX, ty - 10, 38, 0, 2*Math.PI);
    ctx.arc(tx + 24 + shakeX, ty - 10, 38, 0, 2*Math.PI);
    ctx.arc(tx + shakeX, ty - 30, 42, 0, 2*Math.PI);
    ctx.fill();

    // 木に実っているリンゴの描画
    if (tree.hasApple) {
        ctx.drawImage(assets.apple, tx - 16 + shakeX, ty - 8, 20, 20);
        ctx.drawImage(assets.apple, tx + 12 + shakeX, ty - 22, 20, 20);
    }
}

// キャンプオブジェクト描画
function drawCampObject(obj) {
    const ox = obj.x;
    const oy = obj.y;

    if (obj.type === 'tent') {
        // テント
        ctx.fillStyle = '#ef5350'; // 赤いテント
        ctx.beginPath();
        ctx.moveTo(ox, oy + obj.height);
        ctx.lineTo(ox + obj.width/2, oy);
        ctx.lineTo(ox + obj.width, oy + obj.height);
        ctx.closePath();
        ctx.fill();

        // テントの入り口
        ctx.fillStyle = '#3e2723';
        ctx.beginPath();
        ctx.moveTo(ox + obj.width/3, oy + obj.height);
        ctx.lineTo(ox + obj.width/2, oy + obj.height/2);
        ctx.lineTo(ox + obj.width * 2/3, oy + obj.height);
        ctx.closePath();
        ctx.fill();
    } else if (obj.type === 'bonfire') {
        // 焚き火
        // 薪の描画
        ctx.fillStyle = '#5d4037';
        ctx.fillRect(ox + 10, oy + 40, 40, 10);
        ctx.fillRect(ox + 15, oy + 32, 30, 10);

        // 炎の描画（フレームによるアニメーションとゆらぎ）
        const fireColors = ['#ff9100', '#ff3d00', '#ffea00'];
        const numFlames = 3;
        ctx.fillStyle = fireColors[Math.floor(obj.frame) % fireColors.length];
        
        ctx.beginPath();
        ctx.moveTo(ox + 15, oy + 35);
        ctx.quadraticCurveTo(ox + 30, oy - 10 + (Math.sin(Date.now() / 80) * 8), ox + 45, oy + 35);
        ctx.closePath();
        ctx.fill();
    } else if (obj.type === 'stump') {
        // 切り株
        ctx.fillStyle = '#8d6e63';
        ctx.fillRect(ox, oy + 10, obj.width, obj.height - 10);
        ctx.fillStyle = '#d7ccc8';
        ctx.beginPath();
        ctx.ellipse(ox + obj.width/2, oy + 10, obj.width/2, 6, 0, 0, 2*Math.PI);
        ctx.fill();
    }
}

// --- 11. ゲームメインループ ---
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
