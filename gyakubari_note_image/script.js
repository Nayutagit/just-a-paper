// DOM Elements
const canvasArea = document.getElementById('canvasArea');
const bgImage = document.getElementById('bgImage');
const bgInput = document.getElementById('bgInput');
const resetBgBtn = document.getElementById('resetBgBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Text/Control Elements
const elements = {
    main: {
        text: document.getElementById('textMain'),
        size: document.getElementById('sizeMain'),
        lh: document.getElementById('lhMain'),
        layer: document.getElementById('layerMain')
    }
};

// Shadow Controls
const shadowControls = {
    blur: document.getElementById('shadowBlur'),
    dist: document.getElementById('shadowDist'),
    opacity: document.getElementById('shadowOpacity')
};

// Initial Render
function updateDisplay() {
    // Shadow Calculation: Assuming 45deg for "Distance"
    const dist = parseInt(shadowControls.dist.value);
    const blur = parseInt(shadowControls.blur.value);
    const alpha = shadowControls.opacity.value;

    // Simple 45deg projection
    const offset = Math.round(dist * 0.7);
    const shadowStyle = `${offset}px ${offset}px ${blur}px rgba(0,0,0,${alpha})`;

    // Main Layer
    // Using innerText or textContent with whitespace-pre-wrap might be safer, but innerHTML allows manual breaks
    elements.main.layer.innerHTML = elements.main.text.value.replace(/\n/g, '<br>');
    elements.main.layer.style.fontSize = `${elements.main.size.value}px`;
    elements.main.layer.style.lineHeight = elements.main.lh.value;
    elements.main.layer.style.textShadow = shadowStyle;
}

// Event Listeners for Controls
Object.values(elements).forEach(el => {
    el.text.addEventListener('input', updateDisplay);
    if (el.size) el.size.addEventListener('input', updateDisplay);
    if (el.lh) el.lh.addEventListener('input', updateDisplay);
});

// Shadow Listeners
Object.values(shadowControls).forEach(el => {
    el.addEventListener('input', updateDisplay);
});

// Image Upload with Dynamic Resizing
bgInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            bgImage.src = e.target.result;
            // Wait for image to load to get dimensions
            bgImage.onload = () => {
                canvasArea.style.width = `${bgImage.naturalWidth}px`;
                canvasArea.style.height = `${bgImage.naturalHeight}px`;
            }
        }
        reader.readAsDataURL(file);
    }
});

// Reset Background
resetBgBtn.addEventListener('click', () => {
    bgImage.src = './default_bg.jpg';
    bgInput.value = '';
});

// Dragging Logic
let activeItem = null;
let activeX = 0;
let activeY = 0;

document.querySelectorAll('.text-layer').forEach(item => {
    item.addEventListener('mousedown', dragStart);
});

function dragStart(e) {
    activeItem = this;
    activeX = e.clientX - activeItem.offsetLeft;
    activeY = e.clientY - activeItem.offsetTop;

    // Convert transforms to absolute positioning context if needed
    // The simplified version just relies on top/left

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
}

function drag(e) {
    if (!activeItem) return;
    e.preventDefault();
    let x = e.clientX - activeX;
    let y = e.clientY - activeY;

    activeItem.style.left = `${x}px`;
    activeItem.style.top = `${y}px`;
    activeItem.style.transform = 'none'; // clear centering if present
}

function dragEnd() {
    activeItem = null;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', dragEnd);
}

// Download
downloadBtn.addEventListener('click', async () => {
    try {
        downloadBtn.textContent = '生成中...';
        downloadBtn.disabled = true;

        // Dynamic size from current canvas
        const w = parseInt(canvasArea.style.width) || bgImage.naturalWidth || 1280;
        const h = parseInt(canvasArea.style.height) || bgImage.naturalHeight || 670;

        // Clone
        const wrapper = document.createElement('div');
        wrapper.style.position = 'fixed';
        wrapper.style.left = '-9999px';
        wrapper.style.top = '-9999px';

        const clone = canvasArea.cloneNode(true);
        clone.style.transform = 'none';
        clone.style.width = `${w}px`;
        clone.style.height = `${h}px`;

        wrapper.appendChild(clone);
        document.body.appendChild(wrapper);

        const canvas = await html2canvas(clone, {
            width: w,
            height: h,
            useCORS: true,
            scale: 1,
            backgroundColor: null
        });

        const link = document.createElement('a');
        link.download = 'note_thumbnail.jpg';
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();

        document.body.removeChild(wrapper);
        downloadBtn.textContent = '画像を保存する';
        downloadBtn.disabled = false;

    } catch (err) {
        console.error(err);
        alert('画像の保存に失敗しました');
        downloadBtn.textContent = '画像を保存する';
        downloadBtn.disabled = false;
    }
});

// Init
updateDisplay();
