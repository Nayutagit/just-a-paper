const imageData = {
    'anime': {
        title: '朗読劇の情景',
        desc: 'ナレーション収録スタジオにおけるエモーショナルな瞬間。深みのある夕闇のバックスタイルと、キャラクターの細やかな表情を追求しました。',
        prompt: 'High-quality anime style illustration of a female narrator reading a script in a modern recording studio, soft dramatic lighting, Makoto Shinkai style, emotional expression, detailed background with microphone and acoustic foam.',
        img: 'img/anime.png'
    },
    'photo': {
        title: '瀬戸内の夕暮れ',
        desc: '瀬戸内海の多島美と、夕日に染まる空のグラデーション。プロフェッショナルな風景写真のような解像感と空気感を再現。',
        prompt: 'Cinematic wide shot of the Seto Inland Sea in Japan at sunset, ultra-realistic, high dynamic range, 8k, serene atmosphere, professional photography style.',
        img: 'img/photo.png'
    },
    'watercolor': {
        title: '春の縁側',
        desc: '日本の原風景を感じさせる温かみのある水彩画。猫が眠る穏やかな時間、桜の舞う庭園を淡い色彩で表現しました。',
        prompt: 'Peaceful watercolor painting of a traditional Japanese house with a small garden and a cat sleeping on the porch, soft pastel colors, delicate brushstrokes, Ghibli-esque atmosphere.',
        img: 'img/watercolor.png'
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
const modalPrompt = document.getElementById('modalPrompt');

function openModal(id) {
    const data = imageData[id];
    if (!data) return;

    modalImg.src = data.img;
    modalTitle.innerText = data.title;
    modalDesc.innerText = data.desc;
    modalPrompt.innerText = data.prompt;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close on outside click
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        closeModal();
    }
});
