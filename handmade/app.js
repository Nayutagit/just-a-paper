// ==========================================================================
// Application State & Data (Tsumugu - 紡ぐ)
// ==========================================================================

let currentLang = 'ja';
const cart = [];

// Single Creator Data (Pseudonym: Akimi)
const creator = {
  id: "akimi",
  name: { ja: "Akimiさん", en: "Akimi-san" },
  age: { ja: "78歳", en: "78 years old" },
  avatar: "./assets/products/001-1.jpg", // Using a piece of patchwork as a representative avatar
  bio: {
    ja: "タンスの奥に眠っていた古い着物の端切れや、思い出の詰まったお気に入りの服の残り布などを使い、丁寧にパッチワークを仕立てています。一針一針縫い進める時間が、日々の心穏やかなひとときです。昔ながらの布をアップサイクルし、新しい命を吹き込んでいます。",
    en: "Stitches elegant patchwork quilts and crafts using vintage kimono fragments and memorable textile scraps. The quiet flow of needlework brings calm to her daily routine. She loves upcycling historical fabrics, breathing warm new life into them."
  }
};

// 3 Products with multiple images (001-1 to 003-3)
const products = [
  {
    id: "001",
    images: [
      "./assets/products/001-1.jpg",
      "./assets/products/001-2.jpg",
      "./assets/products/001-3.jpg"
    ],
    category: "quilt",
    creatorId: "akimi",
    price: 36000,
    title: { ja: "伝統和柄の藍染キルトマット", en: "Indigo Traditional Wagara Quilt" },
    size: { ja: "90cm × 120cm", en: "35.4 x 47.2 inches" },
    materials: { ja: "和柄古布（綿・麻）、藍染め生地、キルト芯", en: "Vintage Cotton & Hemp, Indigo Dye, Batting" },
    story: {
      ja: "深みのある藍染の古布を組み合わせたマルチキルトマット。長い年月を経て柔らかくなった布地が、独特の優しい肌触りを提供します。壁掛けタペストリーやラグ、ベッドやこたつの上にかけるマルチカバーとして年中お使いいただけます。",
      en: "A gorgeous multipurpose quilt made from aged indigo textiles. The soft, weathered fabrics from old wrapping cloths offer a gentle touch. Perfect as a wall tapestry, accent rug, or cozy lap blanket."
    }
  },
  {
    id: "002",
    images: [
      "./assets/products/002-1.jpg",
      "./assets/products/002-2.jpg",
      "./assets/products/002-3.jpg"
    ],
    category: "bag",
    creatorId: "akimi",
    price: 6800,
    title: { ja: "花咲くハギレの丸底トートバッグ", en: "Blossoming Scraps Round Tote Bag" },
    size: { ja: "幅30cm × 高さ25cm × マチ10cm", en: "W11.8 x H9.8 x D3.9 inches" },
    materials: { ja: "綿（和柄・洋柄ミックス）、リネンキャンバス", en: "Cotton (Mixed patterns), Linen Canvas" },
    story: {
      ja: "洋服の残り布や和柄の端切れをパズルのように配置し、温かみのあるトートバッグに仕上げました。丸い底がかわいらしく、お財布やポーチを入れてちょっとしたお出かけに最適です。型崩れしにくいよう内側もしっかり補強しています。",
      en: "Piecemeal patchwork matching Western florals with Japanese motifs. Features a charming rounded base, ideal for holding your essentials on casual strolls. Sturdily lined for daily durability."
    }
  },
  {
    id: "003",
    images: [
      "./assets/products/003-1.jpg",
      "./assets/products/003-2.jpg",
      "./assets/products/003-3.jpg"
    ],
    category: "quilt",
    creatorId: "akimi",
    price: 11000,
    title: { ja: "幾何学模様のパッチワーククッションカバー", en: "Geometric Mosaic Cushion Cover" },
    size: { ja: "45cm × 45cm", en: "17.7 x 17.7 inches" },
    materials: { ja: "着物シルク、正絹、ウール、裏地綿", en: "Kimono Silk, Pure Silk, Wool, Cotton lining" },
    story: {
      ja: "絹糸が織りなす独特の艶感がある着物地を使用し、モダンな幾何学模様に仕立てました。手仕事の精密さが際立つ作品で、お部屋をパッと華やかに演出してくれます。ジッパー開閉式で、カバーのみ手洗い可能です。",
      en: "Crafted from lustrous kimono silks to create a modern geometric design. Its outstanding precision showcases grandma's expertise, adding heritage style to any room. Hidden zipper enclosure."
    }
  }
];

// Translation Dictionary
const translations = {
  ja: {
    // Navigation
    "nav-about": "紡ぐについて",
    "nav-gallery": "作品一覧",
    "nav-creators": "作り手について",
    "nav-contact": "お問い合わせ",
    
    // Hero
    "hero-subtitle": "おばあちゃんの手が縫い合わせる、ぬくもりの物語",
    "hero-title": "時を紡ぎ、想いを繋ぐ パッチワーク",
    "hero-desc": "日本の温かいおばあちゃんの手から、海を越えてあなたの元へ。ひとつひとつ異なる布が織りなす、世界にたった一つの手仕事をお届けします。",
    "hero-cta-view": "作品を見る",
    "hero-cta-story": "私たちの想い",
    
    // About
    "about-tag": "CONCEPT",
    "about-title": "おばあちゃんの針仕事に、新しい光を",
    "about-p1": "「タンスの奥に眠っていた着物の端切れ、お気に入りの洋服の残り布。」それらを一枚一枚、丁寧に縫い合わせるパッチワーク。日本の「もったいない」の精神と、家族を想う温かさから生まれる手仕事です。",
    "about-p2": "私たちの祖母は、時間を忘れて一針一針に想いを込めてきました。しかし、年齢を重ねるにつれ、その素晴らしい作品たちが人目に触れず、そのままになってしまうことも少なくありません。",
    "about-p3": "「紡ぐ (Tsumugu)」は、そんなおばあちゃんの温かい作品を世に広め、次の世代へ、そして世界中の人々の手に届けるプロジェクトです。作品が購入されることで、おばあちゃんのお小遣いとやりがいに繋がり、ご家族にとっては大切な遺品や思い出を誇らしく整理するきっかけになります。",
    
    // Gallery
    "gallery-tag": "COLLECTION",
    "gallery-title": "ぬくもりを纏う作品たち",
    "gallery-subtitle": "すべてが世界にひとつだけ。おばあちゃんが選んだ布地とデザインのハーモニーをお楽しみください。",
    "filter-all": "すべて",
    "filter-bag": "バッグ・ポーチ",
    "filter-quilt": "キルト・インテリア",
    "filter-kitchen": "キッチン・小物",
    
    // Creators
    "creators-tag": "CREATOR",
    "creators-title": "作り手について",
    "creators-subtitle": "作品の背景にある、作り手の温かい人生をご紹介します。",
    
    // Contact
    "contact-title": "想いを伝える・お問い合わせ",
    "contact-desc": "作品に関する質問や、おばあちゃんへの温かいメッセージ、また「自分の家にも祖母の作品がたくさんあるので広めてほしい」といったご相談も大歓迎です。お気軽にお問い合わせください。",
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
    "modal-story-title": "この作品のストーリー",
    "btn-buy-shopify": "Shopifyで購入する",
    "btn-add-cart": "カートに入れる",
    
    // Cart
    "cart-title-your": "あなたのカート",
    "cart-subtotal": "小計:",
    "cart-shipping-notice": "※ 送料は購入手続き時に計算されます。",
    "cart-checkout": "購入手続きへ (Shopify)",
    "cart-added": "カートに追加しました！",
    "cart-empty": "カートは空です"
  },
  en: {
    // Navigation
    "nav-about": "Story",
    "nav-gallery": "Gallery",
    "nav-creators": "Creator",
    "nav-contact": "Contact",
    
    // Hero
    "hero-subtitle": "Warm stories stitched by grandmother's gentle hands",
    "hero-title": "Spinning Time, Stitched with Love",
    "hero-desc": "Handcrafted patchwork from sweet Japanese grandma, delivered across the ocean to you. One-of-a-kind treasures composed of historical textile pieces.",
    "hero-cta-view": "View Creations",
    "hero-cta-story": "Read Our Story",
    
    // About
    "about-tag": "OUR MISSION",
    "about-title": "Giving New Life to Grandma's Needlework",
    "about-p1": "\"A sleeve scrap from a vintage kimono hidden in a drawer, a cut off from a favorite dress.\" These distinct fabrics are woven together, patch by patch. Born from the Japanese spirit of 'Mottainai' (to value and not waste) and family love.",
    "about-p2": "Our grandmother spent hours lost in quiet focus, infusing warmth into every stitch. Yet, as she ages, many of these masterpieces remain tucked away, unseen by the world.",
    "about-p3": "\"Tsumugu\" (meaning 'to spin thread' or 'weave together') is a project dedicated to sharing these beautiful works globally. Every sale directly supports grandma's livelihood and pride, while offering families a proud way to organize and pass down cherished heirlooms.",
    
    // Gallery
    "gallery-tag": "COLLECTION",
    "gallery-title": "Warmth In Every Patch",
    "gallery-subtitle": "Every creation is unique. Appreciate the harmony of textiles and designs chosen by the grandmother.",
    "filter-all": "All Items",
    "filter-bag": "Bags & Pouches",
    "filter-quilt": "Quilts & Interiors",
    "filter-kitchen": "Kitchenware & Accents",
    
    // Creators
    "creators-tag": "THE CREATOR",
    "creators-title": "About the Creator",
    "creators-subtitle": "Introducing the gentle hands and rich life behind the needlework.",
    
    // Contact
    "contact-title": "Send a Message / Inquire",
    "contact-desc": "Feel free to ask questions about our items, send warm messages to the grandmother, or contact us if you are interested in sharing your own grandmother's work.",
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
    "modal-story-title": "The Story of this Piece",
    "btn-buy-shopify": "Buy on Shopify",
    "btn-add-cart": "Add to Cart",
    
    // Cart
    "cart-title-your": "Your Cart",
    "cart-subtotal": "Subtotal:",
    "cart-shipping-notice": "* Shipping calculated during checkout.",
    "cart-checkout": "Proceed to Checkout (Shopify)",
    "cart-added": "Added to cart!",
    "cart-empty": "Your cart is empty"
  }
};

// ==========================================================================
// Initialization & Event Binding
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initTranslations();
  renderProducts("all");
  renderCreator();
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
    renderProducts(document.querySelector(".filter-btn.active").dataset.filter);
    renderCreator();
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
// Gallery Rendering
// ==========================================================================

function renderProducts(filter = "all") {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";
  
  const filtered = products.filter(p => filter === "all" || p.category === filter);
  
  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("data-id", p.id);
    
    // Main image is the first index in the images array
    const mainImg = p.images[0];
    
    card.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${mainImg}" alt="${p.title[currentLang]}" class="product-img" loading="lazy">
        <span class="product-creator-badge">${creator.name[currentLang]}</span>
      </div>
      <div class="product-info">
        <div class="product-meta-row">
          <span class="product-category" data-i18n="filter-${p.category}">${translations[currentLang][`filter-${p.category}`]}</span>
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
// Creator Single Rendering
// ==========================================================================

function renderCreator() {
  const container = document.getElementById("creator-single-container");
  container.innerHTML = "";
  
  const card = document.createElement("div");
  card.className = "creator-single-card";
  
  card.innerHTML = `
    <div class="creator-avatar-wrapper">
      <img src="${creator.avatar}" alt="${creator.name[currentLang]}" class="creator-avatar">
      <div class="creator-avatar-accent"></div>
    </div>
    <div class="creator-info-content">
      <h3 class="creator-name">${creator.name[currentLang]}</h3>
      <span class="creator-age">${creator.age[currentLang]}</span>
      <p class="creator-bio">${creator.bio[currentLang]}</p>
    </div>
  `;
  container.appendChild(card);
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
  document.getElementById("modal-creator-tag").textContent = `${creator.name[currentLang]} (${creator.age[currentLang]})`;
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
    
    // Thumbnail Click Event to Switch Main Image
    thumb.addEventListener("click", () => {
      mainImgElem.src = imgUrl;
      
      // Update active state class
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
  document.body.style.overflow = "hidden"; // Prevent background scroll
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
        <span class="cart-item-creator">${creator.name[currentLang]}</span>
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

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.body.style.overflow = "";
}

// Mock Shopify Checkout Integration
function triggerShopifyCheckout(checkoutItems) {
  if (checkoutItems.length === 0) return;
  
  const itemNames = checkoutItems.map(item => `- ${item.title[currentLang]}`).join("\n");
  const priceDisplay = formatPrice(checkoutItems.reduce((sum, i) => sum + i.price, 0));
  
  const confirmMsg = currentLang === 'ja' 
    ? `【ニストスタジオ Shopify決済連携デモ】\n\n以下の作品を購入手続き（Shopifyのレジ画面）に進みますか？\n\n${itemNames}\n\n合計: ${priceDisplay}\n\n※このデモでは、ニストスタジオのShopify決済画面への接続窓口を表示しています。本番環境では、Shopifyの「購入ボタン (Buy Button)」またはストアフロントAPIを介して、安全にクレジットカードやPayPal等での決済画面へ遷移します。`
    : `[Nist Studio Shopify Checkout Integration Demo]\n\nProceed to checkout for the following unique creations?\n\n${itemNames}\n\nTotal: ${priceDisplay}\n\n*Note: This is a demo integration window linking to Nist Studio's Shopify store. In production, this securely forwards to Shopify's checkout page via the Shopify Buy Button SDK / Storefront API.`;
  
  if (confirm(confirmMsg)) {
    const successMsg = currentLang === 'ja'
      ? `ありがとうございます！\nShopify決済画面（外部ページ）を呼び出しました。\n（※実際の実装では、Shopify管理画面で発行したチェックアウトURLへリダイレクトされます）`
      : `Redirecting to Shopify Secure Checkout...\n(In real deployment, this redirects you to your custom Shopify cart checkout URL)`;
    alert(successMsg);
    
    cart.length = 0;
    updateCartUI();
    closeCart();
  }
}

// ==========================================================================
// Event Bindings
// ==========================================================================

function bindEvents() {
  // Gallery Filters
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter-btn.active").classList.remove("active");
      btn.classList.add("active");
      renderProducts(btn.dataset.filter);
    });
  });
  
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
      triggerShopifyCheckout([p]);
    }
  });
  
  // Checkout button in drawer
  document.getElementById("checkout-btn").addEventListener("click", () => {
    triggerShopifyCheckout(cart);
  });
  
  // Contact Form Submission (Mocked)
  document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("form-name").value;
    
    const successMsg = currentLang === 'ja'
      ? `メッセージを送信しました！\nありがとうございました、${name}様。おばあちゃんへ温かい想いをお届けします。`
      : `Thank you, ${name}! Your message has been sent successfully. We will share your kind words with the grandmother.`;
      
    alert(successMsg);
    document.getElementById("contact-form").reset();
  });
}
