// ==========================================================================
// Application State & Data (Tsumugu - 紡ぐ)
// ==========================================================================

let currentLang = 'ja';
const cart = [];

// Stripe Checkout URL (Shared across all products)
const STRIPE_CHECKOUT_URL = 'https://buy.stripe.com/5kQ4gB1MXa8M7uudVrbV60b';

// 6 Products (All are patchwork pouches around 20cm)
const products = [
  {
    id: "001",
    images: [
      "./assets/products/001-1.jpg",
      "./assets/products/001-2.jpg",
      "./assets/products/001-3.jpg"
    ],
    price: 3800,
    title: { ja: "パッチワークポーチ 001", en: "Patchwork Pouch 001" },
    size: { ja: "約 幅20cm × 高さ14cm × マチ4cm", en: "Approx. W7.8 x H5.5 x D1.5 inches" },
    materials: { ja: "ハギレ綿、麻、中綿、ファスナー", en: "Cotton & Linen scraps, Batting, Zipper" },
    story: {
      ja: "祖母が手仕事で一つ一つ仕立てた、世界にひとつだけのパッチワークポーチです。手縫いならではの温かみのある風合いをお楽しみください。化粧品や小物の整理に使いやすいサイズです。",
      en: "A one-of-a-kind patchwork pouch hand-sewn by a grandmother. Enjoy the warm, unique texture of manual handiwork. Perfect size for cosmetics and everyday essentials."
    }
  },
  {
    id: "002",
    images: [
      "./assets/products/002-1.jpg",
      "./assets/products/002-2.jpg",
      "./assets/products/002-3.jpg"
    ],
    price: 3500,
    title: { ja: "パッチワークポーチ 002", en: "Patchwork Pouch 002" },
    size: { ja: "約 幅18cm × 高さ13cm × マチ5cm", en: "Approx. W7.0 x H5.1 x D1.9 inches" },
    materials: { ja: "ハギレ綿、麻、中綿、ファスナー", en: "Cotton & Linen scraps, Batting, Zipper" },
    story: {
      ja: "様々なハギレを組み合わせて手縫いされたポーチです。底にマチがあるため、小さく見えて収納力があります。日常使いにちょうど良い、温もりあるデザインです。",
      en: "Stitched together from various beautiful scrap fabrics. Features a gusseted bottom for extra capacity. A simple, warm addition to your daily essentials."
    }
  },
  {
    id: "003",
    images: [
      "./assets/products/003-1.jpg",
      "./assets/products/003-2.jpg",
      "./assets/products/003-3.jpg"
    ],
    price: 4200,
    title: { ja: "パッチワークポーチ 003", en: "Patchwork Pouch 003" },
    size: { ja: "約 幅22cm × 高さ15cm × マチ3cm", en: "Approx. W8.6 x H5.9 x D1.1 inches" },
    materials: { ja: "ハギレ綿、麻、中綿、ファスナー", en: "Cotton & Linen scraps, Batting, Zipper" },
    story: {
      ja: "ハギレの組み合わせと丁寧な針目が特徴のパッチワークポーチです。少し幅広のサイズ感で、ステーショナリーやガジェット小物の収納にも便利です。",
      en: "Characterized by unique textile harmony and delicate stitches. Slightly wider silhouette, convenient for organizing pens, stationery, or mobile accessories."
    }
  },
  {
    id: "004",
    images: [
      "./assets/products/004-1.jpg",
      "./assets/products/004-2.jpg",
      "./assets/products/004-3.jpg",
      "./assets/products/004-4.jpg"
    ],
    price: 3900,
    title: { ja: "パッチワークポーチ 004", en: "Patchwork Pouch 004" },
    size: { ja: "約 幅20cm × 高さ13cm × マチ4cm", en: "Approx. W7.8 x H5.1 x D1.5 inches" },
    materials: { ja: "ハギレ綿、麻、中綿、ファスナー", en: "Cotton & Linen scraps, Batting, Zipper" },
    story: {
      ja: "ハギレの優しいグラデーションが美しい手縫いのポーチです。メイク用品などをスッキリ整理できます。",
      en: "A beautifully hand-sewn pouch with a soft gradation of fabric scraps. Great for arranging cosmetics."
    }
  },
  {
    id: "005",
    images: [
      "./assets/products/005-1.jpg",
      "./assets/products/005-2.jpg",
      "./assets/products/005-3.jpg",
      "./assets/products/005-4.jpg",
      "./assets/products/005-5.jpg",
      "./assets/products/005-6.jpg"
    ],
    price: 4500,
    title: { ja: "パッチワークポーチ 005", en: "Patchwork Pouch 005" },
    size: { ja: "約 幅22cm × 高さ16cm × マチ3cm", en: "Approx. W8.6 x H6.3 x D1.1 inches" },
    materials: { ja: "ハギレ綿、麻、中綿、ファスナー", en: "Cotton & Linen scraps, Batting, Zipper" },
    story: {
      ja: "細やかなパッチワークのステッチが特徴の作品です。平らなシルエットで、バッグの中でもかさばりません。",
      en: "Characterized by detailed patchwork stitches. Slim design that fits easily inside your bag."
    }
  },
  {
    id: "006",
    images: [
      "./assets/products/006-1.jpg",
      "./assets/products/006-2.jpg",
      "./assets/products/006-3.jpg"
    ],
    price: 3600,
    title: { ja: "パッチワークポーチ 006", en: "Patchwork Pouch 006" },
    size: { ja: "約 幅19cm × 高さ14cm × マチ4cm", en: "Approx. W7.4 x H5.5 x D1.5 inches" },
    materials: { ja: "ハギレ綿、麻、中綿、ファスナー", en: "Cotton & Linen scraps, Batting, Zipper" },
    story: {
      ja: "落ち着いた和風のハギレを組み合わせたパッチワークポーチです。シンプルで実用的なデザインです。",
      en: "A simple, practical patchwork pouch pieced from calm Japanese scrap fabrics."
    }
  }
];

// Translation Dictionary
const translations = {
  ja: {
    // Navigation
    "nav-about": "紡ぐについて",
    "nav-gallery": "作品一覧",
    "nav-contact": "お問い合わせ",
    
    // Hero
    "hero-subtitle": "祖母の手仕事、ぬくもりのパッチワーク",
    "hero-title": "手縫いで仕立てた、パッチワークポーチ",
    "hero-desc": "日本の祖母がハギレを一枚一枚丁寧に縫い合わせたポーチです。ひとつとして同じものはない、手仕事のぬくもりをお届けします。",
    "hero-cta-view": "作品を見る",
    "hero-cta-story": "紡ぐについて",
    
    // About
    "about-tag": "ABOUT",
    "about-title": "ものを大切にする心から生まれたポーチ",
    "about-p1": "タンスに眠っていた古い着物の端切れや、お気に入りの服の残り布などをパッチワークポーチとしてアップサイクルしました。日本の「もったいない」の精神と、家族を想う温かさから生まれる手仕事です。",
    "about-p2": "作品はすべて1点限りです。実用に耐えるよう丁寧に仕立てられており、普段使いや贈り物、また海外の方へのお土産にも最適です。作品が購入されることで、祖母のやりがいやお小遣い作りに繋がります。",
    
    // Gallery
    "gallery-tag": "COLLECTION",
    "gallery-title": "パッチワークポーチ",
    "gallery-subtitle": "すべて手縫いの1点ものです。ひとつひとつ異なる表情とデザインをお楽しみください。",
    
    // Contact
    "contact-title": "お問い合わせ",
    "contact-desc": "作品に関するご質問や、温かいメッセージがございましたら、こちらからお気軽にお問い合わせください。",
    "form-label-name": "お名前 / Name",
    "form-label-email": "メールアドレス / Email",
    "form-label-msg": "メッセージ / Message",
    "form-submit": "送信する",
    
    // Footer
    "footer-tagline": "日本の優しい手が紡いだ、ぬくもりの物語を世界へ。",
    "footer-menu-title": "メニュー",
    
    // Modals
    "modal-size": "サイズ:",
    "modal-materials": "素材:",
    "modal-story-title": "この作品について",
    "btn-buy-stripe": "Stripeで購入する",
    "btn-add-cart": "カートに入れる",
    
    // Cart
    "cart-title-your": "あなたのカート",
    "cart-subtotal": "小計:",
    "cart-shipping-notice": "※ 送料は購入手続き時に計算されます。",
    "cart-checkout": "購入手続きへ (Stripe)",
    "cart-added": "カートに追加しました！",
    "cart-empty": "カートは空です"
  },
  en: {
    // Navigation
    "nav-about": "About",
    "nav-gallery": "Creations",
    "nav-contact": "Contact",
    
    // Hero
    "hero-subtitle": "Warm stories stitched by grandmother's gentle hands",
    "hero-title": "Handmade Patchwork Pouches",
    "hero-desc": "Handcrafted pouches sewn by a Japanese grandmother using scrap fabrics. Delivering the warm, simple texture of true handwork.",
    "hero-cta-view": "View Pouches",
    "hero-cta-story": "About Tsumugu",
    
    // About
    "about-tag": "ABOUT",
    "about-title": "Upcycled with Care and Mottainai Spirit",
    "about-p1": "Upcycled into functional pouches using forgotten kimono cuts and clothing scraps. Born from the Japanese tradition of 'Mottainai' (to value and not waste) and genuine family care.",
    "about-p2": "Every item is a unique, one-of-a-kind piece crafted for daily use. Perfect as a cozy gift or souvenir. Purchases support grandma's hobby and sense of purpose.",
    
    // Gallery
    "gallery-tag": "COLLECTION",
    "gallery-title": "Patchwork Pouches",
    "gallery-subtitle": "Every creation is unique. Appreciate the rustic harmony of patterns hand-sewn by a grandmother.",
    
    // Contact
    "contact-title": "Inquiries",
    "contact-desc": "Feel free to ask questions about our pouches or send warm messages here.",
    "form-label-name": "Name",
    "form-label-email": "Email Address",
    "form-label-msg": "Message",
    "form-submit": "Send Message",
    
    // Footer
    "footer-tagline": "Bringing warm stories hand-spun by Japanese grandma to the world.",
    "footer-menu-title": "Links",
    
    // Modals
    "modal-size": "Size:",
    "modal-materials": "Materials:",
    "modal-story-title": "About this Piece",
    "btn-buy-stripe": "Buy on Stripe",
    "btn-add-cart": "Add to Cart",
    
    // Cart
    "cart-title-your": "Your Cart",
    "cart-subtotal": "Subtotal:",
    "cart-shipping-notice": "* Shipping calculated during checkout.",
    "cart-checkout": "Proceed to Checkout (Stripe)",
    "cart-added": "Added to cart!",
    "cart-empty": "Your cart is empty"
  }
};

// ==========================================================================
// Initialization & Event Binding
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initTranslations();
  renderProducts();
  bindEvents();
});

// Initialize translations
function initTranslations() {
  const switchBtn = document.getElementById("lang-switch");
  switchBtn.addEventListener("click", () => {
    currentLang = currentLang === 'ja' ? 'en' : 'ja';
    switchBtn.querySelector(".lang-text").textContent = currentLang === 'ja' ? 'EN' : 'JP';
    document.documentElement.lang = currentLang;
    updateDOMTranslation();
    renderProducts();
  });
  updateDOMTranslation();
}

// Update all static text in DOM marked with data-i18n
function updateDOMTranslation() {
  document.querySelectorAll("[data-i18n]").forEach(elem => {
    const key = elem.getAttribute("data-i18n");
    if (translations[currentLang][key]) {
      if (elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA') {
        elem.placeholder = translations[currentLang][key];
      } else {
        elem.textContent = translations[currentLang][key];
      }
    }
  });
}

// Format currency based on language
function formatPrice(amount) {
  if (currentLang === 'ja') {
    return `¥${amount.toLocaleString()}`;
  } else {
    const usd = Math.round(amount / 150);
    return `$${usd.toLocaleString()} USD`;
  }
}

// ==========================================================================
// Gallery Rendering (Renders all 6 pouches)
// ==========================================================================

function renderProducts() {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";
  
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("data-id", p.id);
    
    card.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${p.images[0]}" alt="${p.title[currentLang]}" class="product-img" loading="lazy">
        <span class="product-creator-badge">Handmade</span>
      </div>
      <div class="product-info">
        <div class="product-meta-row">
          <span class="product-category">Pouch</span>
          <span class="product-price">${formatPrice(p.price)}</span>
        </div>
        <h3 class="product-card-title">${p.title[currentLang]}</h3>
        <p class="product-card-desc">${p.story[currentLang]}</p>
        <div class="product-card-footer">
          <button class="btn btn-primary btn-block btn-details" data-id="${p.id}">
            ${currentLang === 'ja' ? '詳細を見る' : 'View Details'}
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  
  // Re-bind details button clicks
  document.querySelectorAll(".btn-details").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openModal(btn.dataset.id);
    });
  });
}

// ==========================================================================
// Modal Control (Product Detail with Multi-image thumbnails)
// ==========================================================================

function openModal(productId) {
  const p = products.find(prod => prod.id === productId);
  if (!p) return;
  
  const modal = document.getElementById("product-modal");
  const mainImgElem = document.getElementById("modal-img");
  const thumbsContainer = document.getElementById("modal-thumbnails");
  
  // Set basic data
  mainImgElem.src = p.images[0];
  document.getElementById("modal-title").textContent = p.title[currentLang];
  document.getElementById("modal-price").textContent = formatPrice(p.price);
  document.getElementById("modal-size-val").textContent = p.size[currentLang];
  document.getElementById("modal-materials-val").textContent = p.materials[currentLang];
  document.getElementById("modal-story-val").textContent = p.story[currentLang];
  
  // Generate Thumbnails
  thumbsContainer.innerHTML = "";
  p.images.forEach((imgUrl, idx) => {
    const thumb = document.createElement("img");
    thumb.src = imgUrl;
    thumb.alt = `${p.title[currentLang]} sub ${idx + 1}`;
    thumb.className = `modal-thumb ${idx === 0 ? 'active' : ''}`;
    
    thumb.addEventListener("click", () => {
      mainImgElem.src = imgUrl;
      thumbsContainer.querySelectorAll(".modal-thumb").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
    });
    
    thumbsContainer.appendChild(thumb);
  });
  
  // Store reference ID on actions
  const buyBtn = document.getElementById("modal-buy-btn");
  const cartBtn = document.getElementById("modal-cart-btn");
  buyBtn.dataset.id = p.id;
  cartBtn.dataset.id = p.id;
  
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("product-modal");
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

// ==========================================================================
// Cart System
// ==========================================================================

function addToCart(productId) {
  const p = products.find(prod => prod.id === productId);
  if (!p) return;
  
  // Prevent duplicate items (since patchwork is 1-of-1)
  if (cart.some(item => item.id === productId)) {
    alert(currentLang === 'ja' ? 'この作品は1点限りのため、すでにカートに入っています。' : 'This unique item is already in your cart.');
    return;
  }
  
  cart.push(p);
  updateCartUI();
  
  const trigger = document.getElementById("cart-trigger");
  trigger.classList.add("pulse");
  setTimeout(() => trigger.classList.remove("pulse"), 500);
}

function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);
  if (index > -1) {
    cart.splice(index, 1);
    updateCartUI();
  }
}

function updateCartUI() {
  document.querySelector(".cart-count").textContent = cart.length;
  
  const container = document.getElementById("cart-items-container");
  container.innerHTML = "";
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message" style="text-align:center; padding:40px 0; color:var(--text-muted);">
        ${translations[currentLang]["cart-empty"]}
      </div>
    `;
    document.getElementById("cart-total-price").textContent = formatPrice(0);
    return;
  }
  
  let total = 0;
  cart.forEach(p => {
    total += p.price;
    const item = document.createElement("div");
    item.className = "cart-item";
    
    item.innerHTML = `
      <img src="${p.images[0]}" alt="${p.title[currentLang]}" class="cart-item-img">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${p.title[currentLang]}</h4>
        <span class="cart-item-creator">Handmade</span>
        <span class="cart-item-price">${formatPrice(p.price)}</span>
      </div>
      <button class="cart-item-remove" data-id="${p.id}" aria-label="Remove item">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;
    container.appendChild(item);
  });
  
  document.getElementById("cart-total-price").textContent = formatPrice(total);
  
  container.querySelectorAll(".cart-item-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFromCart(btn.dataset.id);
    });
  });
}

function openCart() {
  document.getElementById("cart-drawer").classList.add("open");
  document.body.style.overflow = "hidden";
}

// Proceed to Stripe checkout
function triggerStripeCheckout(checkoutItems) {
  if (checkoutItems.length === 0) return;
  
  const itemNames = checkoutItems.map(item => `- ${item.title[currentLang]}`).join("\n");
  const priceDisplay = formatPrice(checkoutItems.reduce((sum, i) => sum + i.price, 0));
  
  const confirmMsg = currentLang === 'ja' 
    ? `以下の作品の決済手続きに進みますか？\n\n${itemNames}\n\n合計: ${priceDisplay}\n\n※「OK」をクリックすると、Stripeの決済画面（外部ページ）へ移動します。`
    : `Proceed to checkout for the following creations?\n\n${itemNames}\n\nTotal: ${priceDisplay}\n\n*Clicking OK redirects you to the Stripe checkout page.`;
  
  if (confirm(confirmMsg)) {
    window.open(STRIPE_CHECKOUT_URL, '_blank');
    
    // Clear cart after checkout trigger
    cart.length = 0;
    updateCartUI();
    closeCart();
  }
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.body.style.overflow = "";
}

// ==========================================================================
// Event Bindings
// ==========================================================================

function bindEvents() {
  // Modal Closes
  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.getElementById("product-modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("product-modal")) {
      closeModal();
    }
  });
  
  // Cart Toggle
  document.getElementById("cart-trigger").addEventListener("click", openCart);
  document.getElementById("cart-close").addEventListener("click", closeCart);
  document.getElementById("cart-drawer").addEventListener("click", (e) => {
    if (e.target === document.getElementById("cart-drawer")) {
      closeCart();
    }
  });
  
  // Cart Actions in Modal
  document.getElementById("modal-cart-btn").addEventListener("click", (e) => {
    addToCart(e.currentTarget.dataset.id);
    closeModal();
    openCart();
  });
  
  document.getElementById("modal-buy-btn").addEventListener("click", (e) => {
    const p = products.find(prod => prod.id === e.currentTarget.dataset.id);
    if (p) {
      closeModal();
      triggerStripeCheckout([p]);
    }
  });
  
  // Checkout button in drawer
  document.getElementById("checkout-btn").addEventListener("click", () => {
    triggerStripeCheckout(cart);
  });
  
  // Contact Form Submission (Mocked)
  document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("form-name").value;
    
    const successMsg = currentLang === 'ja'
      ? `メッセージを送信しました！\nありがとうございました、${name}様。`
      : `Thank you, ${name}! Your message has been sent successfully.`;
      
    alert(successMsg);
    document.getElementById("contact-form").reset();
  });
}
