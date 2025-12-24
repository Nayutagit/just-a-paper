const imageData = {
    'anime': {
        title: '朗読劇の情景',
        desc: 'ナレーション収録スタジオにおけるエモーショナルな瞬間。深みのある夕闇のバックスタイルと、キャラクターの細やかな表情を追求しました。',
        useCase: 'YouTubeの朗読動画、オーディオブックのメインビジュアル、声優・ナレーターの活動紹介ページ。',
        prompt: 'High-quality anime style illustration of a female narrator reading a script in a modern recording studio, soft dramatic lighting, Makoto Shinkai style, emotional expression, detailed background with microphone and acoustic foam.',
        img: 'img/anime.png'
    },
    'anime_kids': {
        title: '子供たちの笑顔',
        desc: '公園で遊ぶ純粋な子供たちの表情を、温かみのあるアニメ調で描写。泥だらけになっても笑い合う、物語の一場面を切り取った一枚。',
        useCase: '知育コンテンツ、子供向けの読み聞かせ動画、ファミリー層向けブログのアイキャッチ、教育サービス。',
        prompt: 'High-quality anime style illustration of kids playing in a park, smiling, muddy clothes, bright and warm atmosphere, sunset lighting.',
        img: 'img/anime_kids.jpg'
    },
    'anime_elderly': {
        title: '穏やかな老後',
        desc: 'リビングで手を取り合う老夫婦。優しさと信頼に包まれた空気感を、落ち着いたトーンのアニメスタイルで表現。',
        useCase: '介護・福祉サービスの紹介、ライフプラン設計、シニア向けメディア、「家族の絆」をテーマにしたコンテンツ。',
        prompt: 'High-quality anime style illustration of an elderly couple sitting on a sofa, holding hands, gentle smiles, soft home lighting, peaceful and emotional atmosphere.',
        img: 'img/anime_elderly.jpg'
    },
    'photo': {
        title: '瀬戸内の夕暮れ',
        desc: '瀬戸内海の多島美と、夕日に染まる空のグラデーション。プロフェッショナルな風景写真のような解像感と空気感を再現。',
        useCase: '旅行・観光メディアのヘッダー、宿泊施設のWebサイト、癒やし系ポッドキャストのカバー画像。',
        prompt: 'Cinematic wide shot of the Seto Inland Sea in Japan at sunset, ultra-realistic, high dynamic range, 8k, serene atmosphere, professional photography style.',
        img: 'img/photo.png'
    },
    'photo_artisan': {
        title: '職人の眼差し',
        desc: '日本の伝統工芸を支える職人のポートレート。柔らかな自然光と浅い被写界深度で、その年輪と情熱を克明に捉えました。',
        useCase: '企業のブランディング資料、伝統文化のインタビュー記事、高品質なプロダクト紹介ページ。',
        prompt: 'Professional close-up portrait of an elderly artisan in a traditional Japanese workshop, soft natural lighting, shallow depth of field, high resolution, 8k, realistic texture, emotional and storytelling photography.',
        img: 'img/photo_artisan.png'
    },
    'photo_street_snap': {
        title: '雨上がりの静寂',
        desc: '何気ない日本の住宅街。雨に濡れたアスファルトの質感や電柱の影など、日常の瞬間を切り取ったスナップ写真風の一枚。',
        useCase: '都市生活をテーマにしたコラム、エッセイNoteの挿絵、ストリートファッション・カルチャーの背景。',
        prompt: 'A realistic handheld snapshot of a quiet Japanese residential street after rain, wet dark asphalt reflecting power lines and houses, puddles on the ground, slightly overcast soft lighting, amateur photography look, high detail, high grain, cinematic but direct.',
        img: 'img/photo_street_snap.jpg'
    },
    'photo_ramen': {
        title: '立ち上る湯気',
        desc: '地元の食堂で提供される一杯。レンズのボケ味とライティングにより、食欲をそそる素材のディテールと店内の空気感を再現。',
        useCase: '地域メディアのグルメ紹介、フードデリバリーサイトのメインビジュアル、料理・レシピ関連記事。',
        prompt: 'A realistic close-up photo of a steaming bowl of ramen on a worn wooden table in a dimly lit local diner, natural lighting from a nearby window, shadows, focus on the texture of the soup and noodles, cinematic handheld shot, slightly blurry background, ISO grain.',
        img: 'img/photo_ramen.jpg'
    },
    'photo_bench': {
        title: '夕暮れの追憶',
        desc: '公園の片隅、長い影が伸びる夕暮れ時。35mmフィルムのような質感と、ノスタルジックな黄金色の光が感情に訴えかける一枚。',
        useCase: '情緒的な文章の背景、メンタルヘルス・カウンセリングサイト、物語性のあるSNS投稿。',
        prompt: 'A realistic medium shot of an old wooden park bench at dusk, long shadows, dry leaves on the ground, warm golden hour sunlight, low angle, shot on 35mm film, slight motion blur, emotional and nostalgic atmosphere, extremely high resolution.',
        img: 'img/photo_bench.jpg'
    },
    'photo_woman_1': {
        title: '窓辺の光と透明感',
        desc: '柔らかな朝の光に包まれた日本人女性のポートレート。コダック Portra 400風の色彩設計と微細な粒子感が、肌の質感と透明感を強調しています。',
        useCase: 'ライフスタイルメディアのインタビュー記事、美容・スキンケアブランドの広告、自然体なブランドイメージの構築。',
        prompt: 'A realistic portrait of a beautiful Japanese woman by a sunlit window, soft morning light, wearing a white cotton shirt, slight film grain, soft focus background, Kodak Portra 400 aesthetic, natural skin texture, warm and airy atmosphere, extremely high resolution.',
        img: 'img/photo_woman_1.jpg'
    },
    'watercolor': {
        title: '春の縁側',
        desc: '日本の原風景を感じさせる温かみのある水彩画。猫が眠る穏やかな時間、桜の舞う庭園を淡い色彩で表現しました。',
        useCase: 'グリーティングカード、癒やし系アプリ、季節のニュースレター、ライフスタイルブランド。',
        prompt: 'Peaceful watercolor painting of a traditional Japanese house with a small garden and a cat sleeping on the porch, soft pastel colors, delicate brushstrokes, Ghibli-esque atmosphere.',
        img: 'img/watercolor.png'
    },
    'watercolor_autumn': {
        title: '秋の錦鯉',
        desc: '秋の深まりを感じさせる石橋と紅葉の情景。水面に浮かぶ落ち葉と、優雅に泳具錦鯉を繊細なタッチで描写。',
        useCase: '和食料亭のWebサイト、季節のキャンペーン広告、日本の伝統文化を紹介するインバウンド向けメディア。',
        prompt: 'Delicate watercolor painting of an ancient stone bridge over a koi pond in a traditional Japanese garden during autumn, vibrant maple leaves falling on the water, soft sunbeams filtering through the trees, dreamy and peaceful atmosphere, Ghibli style color palette, high resolution.',
        img: 'img/watercolor_autumn.jpg'
    },
    'sf_city': {
        title: '不夜城の鼓動',
        desc: 'ネオンとホログラムが交錯する近未来のメガロポリス。降りしきる雨と空中を往来するビークルが、サイバーパンクな世界観を構築。',
        useCase: 'IT・最新テクノロジー関連のニュース、SF・ファンタジー系の動画制作、未来予測コラム。',
        prompt: 'Cinematic wide angle shot of a colossal futuristic neon-noir city with flying vehicles and massive holographic screens, Blade Runner 2049 aesthetic, rain-slicked streets reflecting vibrant cyan and magenta lights, immense scale, high-end SF movie cinematography, ultra-detailed textures, 8k resolution.',
        img: 'img/sf_city.png'
    },
    'sf_planet': {
        title: '未知の境界線',
        desc: '二層の月が浮かぶ、彼方の惑星。巨大なクリスタル・モノリスと発光する植物が、静寂の中に神秘的な畏怖を感じさせる。',
        useCase: '科学ポッドキャスト、宇宙開発関連の記事、SF小説の表紙、メタバース空間のコンセプト。',
        prompt: 'Epic shot of a mysterious alien planet landscape with twin moons, bioluminescent flora glowing in the twilight, a lone astronaut standing before a massive ancient crystalline monolith, cinematic lighting, Interstellar-esque atmosphere, breathtaking scale, hyper-realistic, 8k, concept art.',
        img: 'img/sf_planet.png'
    }
};

// Filter logic
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        cards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Modal logic
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalUseCase = document.getElementById('modalUseCase');
const modalPrompt = document.getElementById('modalPrompt');

function openModal(id) {
    const data = imageData[id];
    if (!data) return;

    modalImg.src = data.img;
    modalTitle.innerText = data.title;
    modalDesc.innerText = data.desc;
    modalUseCase.innerText = data.useCase;
    modalPrompt.innerText = data.prompt;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function copyPrompt() {
    const text = modalPrompt.innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('Prompt copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Close on outside click
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        closeModal();
    }
});
