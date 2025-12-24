const imageData = {
    'anime': {
        displayId: 'NST-001',
        title: '朗読劇の情景',
        desc: 'ナレーション収録スタジオにおけるエモーショナルな瞬間。深みのある夕闇のバックスタイルと、キャラクターの細やかな表情を追求しました。',
        useCase: 'YouTubeの朗読動画、オーディオブックのメインビジュアル、声優・ナレーターの活動紹介ページ。',
        prompt: 'High-quality anime style illustration of a female narrator reading a script in a modern recording studio, soft dramatic lighting, Makoto Shinkai style, emotional expression, detailed background with microphone and acoustic foam.',
        img: 'img/anime.png'
    },
    'anime_kids': {
        displayId: 'NST-002',
        title: '子供たちの笑顔',
        desc: '公園で遊ぶ純粋な子供たちの表情を、温かみのあるアニメ調で描写。泥だらけになっても笑い合う、物語の一場面を切り取った一枚。',
        useCase: '知育コンテンツ、子供向けの読み聞かせ動画、ファミリー層向けブログのアイキャッチ、教育サービス。',
        prompt: 'High-quality anime style illustration of kids playing in a park, smiling, muddy clothes, bright and warm atmosphere, sunset lighting.',
        img: 'img/anime_kids.jpg'
    },
    'anime_elderly': {
        displayId: 'NST-003',
        title: '穏やかな老後',
        desc: 'リビングで手を取り合う老夫婦。優しさと信頼に包まれた空気感を、落ち着いたトーンのアニメスタイルで表現。',
        useCase: '介護・福祉サービスの紹介、ライフプラン設計、シニア向けメディア、「家族の絆」をテーマにしたコンテンツ。',
        prompt: 'High-quality anime style illustration of an elderly couple sitting on a sofa, holding hands, gentle smiles, soft home lighting, peaceful and emotional atmosphere.',
        img: 'img/anime_elderly.jpg'
    },
    'photo': {
        displayId: 'NST-004',
        title: '瀬戸内の夕暮れ',
        desc: '瀬戸内海の多島美と、夕日に染まる空のグラデーション。プロフェッショナルな風景写真のような解像感と空気感を再現。',
        useCase: '旅行・観光メディアのヘッダー、宿泊施設のWebサイト、癒やし系ポッドキャストのカバー画像。',
        prompt: 'Cinematic wide shot of the Seto Inland Sea in Japan at sunset, ultra-realistic, high dynamic range, 8k, serene atmosphere, professional photography style.',
        img: 'img/photo.png'
    },
    'photo_artisan': {
        displayId: 'NST-005',
        title: '職人の眼差し',
        desc: '日本の伝統工芸を支える職人のポートレート。柔らかな自然光と浅い被写界深度で、その年輪と情熱を克明に捉えました。',
        useCase: '企業のブランディング資料、伝統文化のインタビュー記事、高品質なプロダクト紹介ページ。',
        prompt: 'Professional close-up portrait of an elderly artisan in a traditional Japanese workshop, soft natural lighting, shallow depth of field, high resolution, 8k, realistic texture, emotional and storytelling photography.',
        img: 'img/photo_artisan.png'
    },
    'photo_street_snap': {
        displayId: 'NST-006',
        title: '雨上がりの静寂',
        desc: '何気ない日本の住宅街。雨に濡れたアスファルトの質感や電柱の影など、日常の瞬間を切り取ったスナップ写真風の一枚。',
        useCase: '都市生活をテーマにしたコラム、エッセイNoteの挿絵、ストリートファッション・カルチャーの背景。',
        prompt: 'A realistic handheld snapshot of a quiet Japanese residential street after rain, wet dark asphalt reflecting power lines and houses, puddles on the ground, slightly overcast soft lighting, amateur photography look, high detail, high grain, cinematic but direct.',
        img: 'img/photo_street_snap.jpg'
    },
    'photo_ramen': {
        displayId: 'NST-007',
        title: '立ち上る湯気',
        desc: '地元の食堂で提供される一杯。レンズのボケ味とライティングにより、食欲をそそる素材のディテールと店内の空気感を再現。',
        useCase: '地域メディアのグルメ紹介、フードデリバリーサイトのメインビジュアル、料理・レシピ関連記事。',
        prompt: 'A realistic close-up photo of a steaming bowl of ramen on a worn wooden table in a dimly lit local diner, natural lighting from a nearby window, shadows, focus on the texture of the soup and noodles, cinematic handheld shot, slightly blurry background, ISO grain.',
        img: 'img/photo_ramen.jpg'
    },
    'photo_bench': {
        displayId: 'NST-008',
        title: '夕暮れの追憶',
        desc: '公園の片隅、長い影が伸びる夕暮れ時。35mmフィルムのような質感と、ノスタルジックな黄金色の光が感情に訴えかける一枚。',
        useCase: '情緒的な文章の背景、メンタルヘルス・カウンセリングサイト、物語性のあるSNS投稿。',
        prompt: 'A realistic medium shot of an old wooden park bench at dusk, long shadows, dry leaves on the ground, warm golden hour sunlight, low angle, shot on 35mm film, slight motion blur, emotional and nostalgic atmosphere, extremely high resolution.',
        img: 'img/photo_bench.jpg'
    },
    'photo_woman_1': {
        displayId: 'NST-009',
        title: '窓辺の光と透明感',
        desc: '柔らかな朝の光に包まれた日本人女性のポートレート。コダック Portra 400風の色彩設計と微細な粒子感が、肌の質感と透明感を強調しています。',
        useCase: 'ライフスタイルメディアのインタビュー記事、美容・スキンケアブランドの広告、自然体なブランドイメージの構築。',
        prompt: 'A realistic portrait of a beautiful Japanese woman by a sunlit window, soft morning light, wearing a white cotton shirt, slight film grain, soft focus background, Kodak Portra 400 aesthetic, natural skin texture, warm and airy atmosphere, extremely high resolution.',
        img: 'img/photo_woman_1.jpg'
    },
    'photo_woman_2': {
        displayId: 'NST-010',
        title: '渋谷の鼓動とフラッシュ',
        desc: '夜の渋谷、ストリートの喧騒を強めのフラッシュで切り取った一枚。35mmフィルム特有の高コントラストな色彩と粒子感が、生々しいリアリティを生んでいます。',
        useCase: 'ストリートファッション誌、都会のライフスタイルをテーマにしたSNS、エッジの効いたカルチャー紹介。',
        prompt: 'A realistic gritty snapshot of a cute Japanese woman on a Shibuya street at night, harsh camera flash, heavy film grain, blurry city lights in the background, candid expression, 35mm film aesthetic, high contrast, vibrant colors, nostalgic but modern look.',
        img: 'img/photo_woman_2.jpg'
    },
    'photo_woman_3': {
        displayId: 'NST-011',
        title: '雨音とモノクローム',
        desc: '雨のカフェにて、物思いにふける女性の肖像。富士フイルム Neopan 400風の階調豊かなモノクロームが、窓からの柔らかい光と陰影を芸術的に表現。',
        useCase: '内省的なエッセイやブログの挿絵、ドキュメンタリー番組のビジュアル、シックな空間デザインのコンセプト。',
        prompt: 'A realistic black and white film portrait of a Japanese woman sitting in a moody cafe on a rainy day, soft lighting from the window, visible film grain, artistic shadows, shot on Fujifilm Neopan 400, emotional and timeless atmosphere, detailed textures.',
        img: 'img/photo_woman_3.jpg'
    },
    'watercolor': {
        displayId: 'NST-012',
        title: '春の縁側',
        desc: '日本の原風景を感じさせる温かみのある水彩画。猫が眠る穏やかな時間、桜の舞う庭園を淡い色彩で表現しました。',
        useCase: 'グリーティングカード、癒やし系アプリ、季節のニュースレター、ライフスタイルブランド。',
        prompt: 'Peaceful watercolor painting of a traditional Japanese house with a small garden and a cat sleeping on the porch, soft pastel colors, delicate brushstrokes, Ghibli-esque atmosphere.',
        img: 'img/watercolor.png'
    },
    'watercolor_autumn': {
        displayId: 'NST-013',
        title: '秋の錦鯉',
        desc: '秋の深まりを感じさせる石橋と紅葉の情景。水面に浮かぶ落ち葉と、優雅に泳具錦鯉を繊細なタッチで描写。',
        useCase: '和食料亭のWebサイト、季節のキャンペーン広告、日本の伝統文化を紹介するインバウンド向けメディア。',
        prompt: 'Delicate watercolor painting of an ancient stone bridge over a koi pond in a traditional Japanese garden during autumn, vibrant maple leaves falling on the water, soft sunbeams filtering through the trees, dreamy and peaceful atmosphere, Ghibli style color palette, high resolution.',
        img: 'img/watercolor_autumn.jpg'
    },
    'sf_city': {
        displayId: 'NST-014',
        title: '不夜城の鼓動',
        desc: 'ネオンとホログラムが交錯する近未来のメガロポリス。降りしきる雨と空中を往来するビークルが、サイバーパンクな世界観を構築。',
        useCase: 'IT・最新テクノロジー関連のニュース、SF・ファンタジー系の動画制作、未来予測コラム。',
        prompt: 'Cinematic wide angle shot of a colossal futuristic neon-noir city with flying vehicles and massive holographic screens, Blade Runner 2049 aesthetic, rain-slicked streets reflecting vibrant cyan and magenta lights, immense scale, high-end SF movie cinematography, ultra-detailed textures, 8k resolution.',
        img: 'img/sf_city.png'
    },
    'sf_planet': {
        displayId: 'NST-015',
        title: '未知の境界線',
        desc: '二層の月が浮かぶ、彼方の惑星。巨大なクリスタル・モノリスと発光する植物が、静寂の中に神秘的な畏怖を感じさせる。',
        useCase: '科学ポッドキャスト、宇宙開発関連の記事、SF小説の表紙、メタバース空間のコンセプト。',
        prompt: 'Epic shot of a mysterious alien planet landscape with twin moons, bioluminescent flora glowing in the twilight, a lone astronaut standing before a massive ancient crystalline monolith, cinematic lighting, Interstellar-esque atmosphere, breathtaking scale, hyper-realistic, 8k, concept art.',
        img: 'img/sf_planet.png'
    },
    'retro_citypop': {
        displayId: 'NST-016',
        title: 'シティポップ・ドリーム',
        desc: '80年代を彷彿とさせるネオンカラーと未来的な都市風景。トレンディな女性とコンバーチブルカーが、ノスタルジックな物語を紡ぐ。',
        useCase: 'Lo-Fi Hip Hopチャンネル、レトロフューチャーなイベント告知、アパレルのビジュアル。',
        prompt: 'A trendy and nostalgic 80s Japanese City Pop style illustration of a stylish woman driving a convertible car along a coastal highway at twilight. Vibrant pink, purple, and blue neon colors.',
        img: 'img/city_pop.jpg'
    },
    'nayuta_standard': {
        displayId: 'NST-017',
        title: 'プロフェッショナルな響き',
        desc: 'ナレーターNayutaのスタンダードなポートレート。信頼感と知性を感じさせる表情、プロフェッショナルなスタジオの空気感。',
        useCase: 'ボイスサンプルのカバー画像、公式プロフィールのメインビジュアル、ビジネス系記事のアイキャッチ。',
        prompt: '(Based on reference) A professional studio portrait of a handsome Japanese male narrator named Nayuta, wearing a crisp white shirt, soft studio lighting, neutral background, trustworthy and intelligent expression, high-end commercial photography, 8k resolution.',
        img: 'img/nayuta_standard.png'
    },
    // Placeholders for pending generation
    'nayuta_teacher': {
        displayId: 'NST-018',
        title: '信頼の教育者',
        desc: '教育現場やセミナーをイメージさせる、親しみやすく信頼できる講師としてのNayuta。',
        useCase: 'オンラインスクールのLP、教育系コンテンツ、セミナー告知。',
        prompt: 'A friendly and professional photo of a Japanese male teacher standing in a modern bright classroom, wearing smart casual business attire, smiling warmly, soft natural light from windows, educational atmosphere, depth of field.',
        img: 'img/nayuta_teacher.png'
    },
    'nayuta_fashion': {
        displayId: 'NST-019',
        title: '都市とスタイル',
        desc: '洗練されたストリートファッションを身に纏ったNayuta。都会的な背景とシネマティックなライティングが際立つ一枚。',
        useCase: 'アパレルブランドのルックブック、ファッション誌の広告、ライフスタイル提案。',
        prompt: 'Cinematic fashion portrait of a stylish Japanese man in an urban night setting, wearing a tailored coat, city lights in the background causing beautiful bokeh, cool color grading, moody and sophisticated atmosphere, editorial photography style.',
        img: 'img/nayuta_fashion.png'
    },
    'nayuta_young_casual': {
        displayId: 'NST-020',
        title: '休日のストリート',
        desc: '若々しいカジュアルスタイルのNayuta。自然光の下、リラックスした表情で佇む。',
        useCase: '若者向けサービスのLP、カジュアルブランドの広告、SNSプロフィール。',
        prompt: 'A candid street snap of a trendy young Japanese man wearing a casual hoodie and denim jacket, walking on a sunny street in Tokyo, relaxed and energetic vibe, natural sunlight, high shutter speed, street fashion photography.',
        img: 'img/nayuta_young_casual.png'
    },
    'nayuta_young_student': {
        displayId: 'NST-021',
        title: '知の探求',
        desc: 'カフェや図書館で学ぶ、知的な学生風のNayuta。PCやノートを広げ、真剣な眼差しを見せる。',
        useCase: '学習アプリの広告、大学のパンフレット、スタートアップの採用。',
        prompt: 'A young Japanese student studying seriously in a quiet library with a laptop and notebooks, wearing glasses and a knit sweater, soft warm lighting, studious and focused expression, academic atmosphere, high details.',
        img: 'img/nayuta_young_student.png'
    },
    'nayuta_young_creative': {
        displayId: 'NST-022',
        title: 'クリエイティブ・マインド',
        desc: 'カメラを手に街を歩く、あるいはスケッチブックに向かう、創造性あふれる若き日のNayuta。',
        useCase: 'アートスクールの紹介、クリエイター募集、ポートフォリオサイト。',
        prompt: 'An artistic portrait of a young creative Japanese man holding a vintage film camera, standing in an art studio or loft, messy hair, wearing a loose shirt, soft window light, inspiring and artistic mood, film grain texture.',
        img: 'img/nayuta_young_creative.png'
    },
    'ec_product': {
        displayId: 'NST-023',
        title: 'プロダクトの輝き (Pink)',
        desc: 'ECサイト向けのクリーンで高品質な商品写真。パステルカラーのプロップを使用し、ブランドの世界観を演出。',
        useCase: 'Instagram広告、ブランドサイトのラインナップ紹介、D2Cブランドのキービジュアル。',
        prompt: 'Professional product photography of a sleek white skincare lotion bottle standing on a geometric pastel pink podium.',
        img: 'img/ec_product.png'
    },
    'ec_product_2': {
        displayId: 'NST-029',
        title: 'プロダクトの輝き (White)',
        desc: 'Amazon/楽天などで求められる、完全白背景の商品写真。被写体を際立たせるライティングと反射の表現。',
        useCase: 'Amazon・楽天の商品詳細ページ、カタログ画像、切り抜き用の素材。',
        prompt: 'High-end commercial product photography of a white skincare bottle, isolated on pure white background, soft studio lighting, reflection below.',
        img: 'img/ec_product_2.png'
    },
    'ec_gadget': {
        displayId: 'NST-030',
        title: 'Tech & Style',
        desc: '最新ガジェットの高級感と先進性を表現した広告ビジュアル。ネオンライティングと浮遊感のある構図。',
        useCase: 'ガジェット製品のLP、クラウドファンディングのメイン画像、テック系メディアの記事。',
        prompt: 'Professional commercial product photography of sleek black wireless earbuds floating in mid-air, dynamic angle, dramatic studio lighting, dark background with blue neon rim light, high detail, 4k.',
        img: 'img/ec_gadget.png'
    },
    'ec_apparel': {
        displayId: 'NST-031',
        title: 'Street Culture',
        desc: 'ストリートカルチャーの熱量を切り取ったスニーカーフォト。コンクリートの質感と自然光がリアリティを生む。',
        useCase: 'アパレルブランドのInstagram、新作スニーカーのルックブック、Webマガジンの特集。',
        prompt: 'High-quality product photography of colorful street-style sneakers placed on a concrete block, urban background, bright natural lighting, sharp focus, hypebeast aesthetic, trend.',
        img: 'img/ec_apparel.jpg'
    },
    'ec_interior': {
        displayId: 'NST-032',
        title: 'Organic Lifestyle',
        desc: '日常の豊かさを描くライフスタイルフォト。柔らかな自然光と心地よい影が、商品のストーリーを伝える。',
        useCase: 'インテリア雑貨のブランドサイト、SNS広告、ライフスタイル誌の挿絵。',
        prompt: 'Minimalist product photography of a ceramic aroma diffuser on a wooden table, cozy home interior background with sunlight streaming in, soft shadows, lifestyle aesthetic, organic mood.',
        img: 'img/ec_interior.png'
    },
    'ec_beauty': {
        displayId: 'NST-033',
        title: 'Clear Beauty',
        desc: 'スキンケア広告向けの、透明感あふれる女性ポートレート。窓辺の自然光で、肌の質感をリアルかつ美しく表現。',
        useCase: '化粧品ブランドのキービジュアル、エステサロンのLP、美容コラムのアイキャッチ。',
        prompt: 'Close-up beauty portrait of a cute Japanese woman with glowing clear skin, gently touching her cheek, soft natural window lighting, minimalist white background, clean and fresh atmosphere, high-end skincare advertisement aesthetic, 8k resolution, sharp focus on eyes.',
        img: 'img/ec_beauty.png'
    },
    'ec_business': {
        displayId: 'NST-034',
        title: 'Trusted Workflow',
        desc: '信頼感のあるオフィスシーン。自然な明るさと親しみやすい笑顔で、企業のクリーンなイメージを訴求。',
        useCase: 'コーポレートサイトの採用ページ、SaaS製品の導入事例、ビジネスセミナーの告知。',
        prompt: 'Waist-up shot of a professional Japanese office lady in a clean white blouse using a laptop in a modern bright office, looking at the camera with a friendly and trustworthy smile, soft daylight, corporate website material, high quality, authentic look.',
        img: 'img/ec_business.png'
    },
    'ec_fashion': {
        displayId: 'NST-035',
        title: 'City Walker',
        desc: 'トレンド感のあるストリートスナップ。表参道の木漏れ日の中で、アパレルの魅力を自然な表情と共に表現。',
        useCase: 'アパレルブランドのECサイト、ファッション誌のWeb記事、SNS広告。',
        prompt: 'Full body fashion shot of a stylish young Japanese woman wearing a beige trench coat and jeans, walking on a stylish street in Omotesando, smiling naturally at the camera, sunlight filtering through trees, shallow depth of field, fashion magazine style, energetic and cute.',
        img: 'img/ec_fashion.jpg'
    },
    'ec_wellness': {
        displayId: 'NST-036',
        title: 'Morning Yoga',
        desc: '健康的なライフスタイルを象徴するヨガシーン。柔らかな朝の光が、ウェルネスブランドのクリーンな世界観を演出。',
        useCase: 'フィットネスジムの広告、ヨガウェアのカタログ、健康食品のLP。',
        prompt: 'A fit and cute Japanese woman doing yoga stretches in a sunlit living room, wearing pastel colored activewear, healthy and energetic vibe, morning light streaming in, wellness lifestyle photography, natural make-up.',
        img: 'img/ec_wellness.png'
    },
    'ec_relax': {
        displayId: 'NST-037',
        title: 'Cozy Evening',
        desc: 'リラックスした夜のひととき。ルームウェアの柔らかさと温かい照明が、心地よい暮らしのイメージを顧客に届ける。',
        useCase: 'ルームウェアブランドの広告、インテリア雑貨のEC、不動産のライフスタイル提案。',
        prompt: 'Relaxed portrait of a cute Japanese woman wearing fluffy roomwear sitting on a beige sofa holding a mug, warm and cozy lighting, evening atmosphere, comfortable lifestyle, authentic home interior background, soft focus.',
        img: 'img/ec_relax.jpg'
    },
    '3d_character': {
        displayId: 'NST-040',
        title: 'Friendly Robot',
        desc: 'Pixarスタイルの3Dキャラクター。親しみやすい表情と高品質なレンダリングで、テック企業のナビゲーターに最適。',
        useCase: 'チャットボットのアイコン、Tech企業のLP、マニュアル動画のキャラクター。',
        prompt: 'A cute, high-quality 3D rendered character of a friendly robot helper, Pixar style, glossy plastic texture, studio lighting, soft pastel background, 8k resolution, 3d art.',
        img: 'img/3d_character.png'
    },
    'flat_design': {
        displayId: 'NST-041',
        title: 'Startup Team',
        desc: 'Tech企業向けのフラットデザイン・イラストレーション。多様性のあるチームと先進的なイメージを、清潔感のあるベクターアートで表現。',
        useCase: 'SaaS製品のLP、コーポレートサイトのMV、ピッチ資料の挿絵。',
        prompt: 'Modern flat vector illustration of a diverse startup team working around a desk with laptops, vibrant corporate colors (blue and yellow), clean lines, minimalism, abstract background elements, suitable for tech website.',
        img: 'img/flat_design.png'
    },
    'food_restaurant': {
        displayId: 'NST-024',
        title: '至福の一皿',
        desc: 'シズル感たっぷりの料理写真。湯気や照り、色彩の鮮やかさが食欲を刺激する、レストラン向けのハイクオリティな一枚。',
        useCase: 'グルメサイトの店舗ページ、飲食店のメニューブック、SNSの飯テロ投稿。',
        prompt: 'Delicious and appetizing food photography for a restaurant.',
        img: 'img/food_restaurant.png'
    },
    'music_vibe': {
        displayId: 'NST-025',
        title: '音の風景',
        desc: '音楽イベントやDJのプレイ風景。躍動感あふれる光と影が、その場の熱気とバイブスを伝える。',
        useCase: 'クラブイベントのフライヤー、アーティストのジャケット写真、音楽フェスの公式サイト。',
        prompt: 'Energetic music event photography with vibrant lighting.',
        img: 'img/music_vibe.png'
    },
    'text_ad': {
        displayId: 'NST-026',
        title: 'メッセージを届ける',
        desc: 'キャッチコピーを入れるための余白（ネガティブスペース）を意識した構図。広告バナーやポスターの背景として最適。',
        useCase: 'WEB広告バナー、キャンペーンポスター、文字入れ用Instagramストーリー背景。',
        prompt: 'Ad background image with negative space for text.',
        img: 'img/text_ad.png'
    },
    '3d_character': {
        displayId: 'NST-027',
        title: 'コラボレーションの形',
        desc: '多様な人々が協力し合う様子を、温かみのある3Dクレイレンダリングで表現。',
        useCase: 'チームビルディングの研修資料、スタートアップの採用ページ、協調性をテーマにした記事。',
        prompt: 'A cute and friendly 3D clay rendering of a diverse group of people.',
        img: 'https://placehold.co/600x400/161b22/fcc800?text=3D+Clay'
    },
    'flat_business': {
        displayId: 'NST-028',
        title: 'ビジネス・イノベーション',
        desc: '現代的なフラットデザインで描く、ビジネスチームのディスカッション風景。クリーンで洗練された印象。',
        useCase: 'テック企業の公式サイト、BtoBサービスの紹介資料、プレゼンテーションスライド。',
        prompt: 'Modern flat vector illustration of a business team discussion.',
        img: 'https://placehold.co/600x400/161b22/fcc800?text=Flat+Design'
    }
};

// Filter Logic with URL Routing
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

// Function to update active button state
function updateActiveButtons(filterValue) {
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-filter') === filterValue) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Function to apply filter to cards
function applyFilter(filter) {
    cards.forEach(card => {
        // Get the card's categories (space separated)
        const categories = card.getAttribute('data-category').split(' ');

        // Check if 'all' is selected OR if the card's categories include the filter
        // Special case: 'nayuta' filter might match 'nayuta' in composite categories even if not exact match (already covered by split)
        if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize on Load
function init() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category') || 'all';

    updateActiveButtons(category);
    applyFilter(category);
}

// Event Listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update URL
        const newUrl = new URL(window.location);
        if (filter === 'all') {
            newUrl.searchParams.delete('category');
        } else {
            newUrl.searchParams.set('category', filter);
        }
        window.history.pushState({}, '', newUrl);

        updateActiveButtons(filter);
        applyFilter(filter);
    });
});

// Handle Back/Forward Browser Buttons
window.addEventListener('popstate', () => {
    init();
});

// Run Init
init();

// Modal logic (unchanged)
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalUseCase = document.getElementById('modalUseCase');
const modalPrompt = document.getElementById('modalPrompt');
const modalId = document.getElementById('modalId'); // New element for ID

function openModal(id) {
    const data = imageData[id];
    if (!data) return;

    modalImg.src = data.img;
    modalTitle.innerText = data.title;
    modalDesc.innerText = data.desc;
    modalUseCase.innerText = data.useCase;
    modalPrompt.innerText = data.prompt;
    if (modalId) modalId.innerText = `ID: ${data.displayId}`; // Set ID

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

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        closeModal();
    }
});
