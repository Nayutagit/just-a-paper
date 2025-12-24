# Nist AI Stock Portfolio & Project Strategy Specification

**最終更新日**: 2025年12月25日
**プロジェクト**: Crowdsourcing AI Image Generation Expansion
**場所**: `/Users/nayuta/.gemini/Nayuta_Brain/01_Projects/just-a-paper/imagestock`

---

## 1. プロジェクト目標 (User Goal)

### **メインゴール: クラウドソーシングでのAI画像生成案件の大量獲得**
CrowdWorks等のプラットフォームにおいて、「画像生成AI」を用いた制作案件（商品画像、広告素材、イラスト等）を大量に受注・制作できる体制を構築する。

**戦略ポイント:**
1.  **圧倒的なポートフォリオ**: 「作れないものはない」レベルの守備範囲を提示する。
    *   人物（日本人、リアル、美容、ビジネス）
    *   商品（Amazon白背景、ブランドイメージ、ガジェット）
    *   特殊（3D、アニメ、ベクター、SF）
2.  **デザイン力のアピール**: 単に画像が出せるだけでなく、Webや広告として成立する「デザイン感覚」を持っていること（Nist Studioブランド）を証明する。
3.  **即応体制**: 生成用プロンプトを体系化し、依頼から納品までのリードタイムを最小化する。

---

## 2. ポートフォリオ仕様 (Site Spec)

### **名称**
**Nist AI Stock (Nist Studio AI Portfolio)**

### **技術スタック**
*   **HTML5 / CSS3**: Vanilla実装。軽量・高速。
*   **JavaScript**: Vanilla JS。外部ライブラリ依存なし。
*   **Hosting**: GitHub Pages / XServer (予定)

### **デザインシステム (Nist Studio Style)**
`nyctstudio-web` のブランドデザインを継承。
*   **Color Palette**:
    *   Base: `#2a2a2a` (Dark Concrete)
    *   Accent: `#FCC800` (Neon Gold - ニストゴールド)
    *   Sub: `#00A4D8` (Teal - Tech/Clean)
*   **Typography**:
    *   Main: `Zen Maru Gothic` (筑紫丸ゴシック系) - 親しみやすさとモダンさ
    *   Serif: `Zen Old Mincho` - 高級感・伝統
*   **UI Elements**:
    *   **Glassmorphism**: カードやヘッダーに半透明ぼかし処理。
    *   **Neon Glow**: ホバー時やアクティブ時の発光表現。
    *   **Interactive Grid**: フィルタリング時のスムーズな遷移。

### **機能要件**
1.  **カテゴリフィルタリング**:
    *   `data-category` 属性による複数カテゴリ対応（例: `ec photo` は EC と Product 両方にヒット）。
    *   現在のフィルタ: `Photography`, `Anime`, `Watercolor`, `SF Movie`, `3D Art`, `Flat Design`, `EC / Product`, `Food`, `Music`, `Education`.
2.  **モーダル詳細表示**:
    *   画像の拡大表示。
    *   **Prompt表示**: 実際に生成に使用したプロンプトを表示（技術力の証明）。
    *   **Use Case**: 具体的な利用シーンの提案テキスト。
    *   **Display ID**: `NST-XXX` 管理番号の表示。

---

## 3. アセット管理 & 命名規則

### **ディレクトリ構成**
```
imagestock/
├── index.html        # メインページ
├── style.css         # Nist Studio デザインCSS
├── script.js         # データ(imageData)とロジック
├── SPECIFICATION.md  # 本仕様書
└── img/              # 画像アセット
    ├── nayuta_*.png  # 人物（モデル）
    ├── ec_*.png      # EC商品写真
    ├── anime.png     # アニメタッチ
    └── ...
```

### **ID体系 (NST-XXX)**
*   `NST-001` ~ `NST-020`: アート・コンセプト（Anime, SF, Watercolor）
*   `NST-017` ~ `NST-019`: 人物モデル・基本セット
*   `NST-021` ~ `NST-029`: 特定カテゴリ（Food, Music, Text）
*   `NST-030` ~ `NST-039`: **EC Commercial** (Tech, Street, Lifestyle, Beauty, Business)
*   `NST-040` ~ : 特殊アセット (3D, Flat)

### **EC商材カテゴリ (実装済み)**
1.  **Brand (Gadget/Tech)**: `ec_gadget` - 黒背景、ネオン、高級感。
2.  **Amazon (White)**: `ec_product_2` - 完全白背景、ボトル。
3.  **Apparel (Street)**: `ec_fashion` - スニーカー、コンクリ背景。
4.  **Beauty (Skin)**: `ec_beauty` - 日本人女性、スキンケア、透明感。
5.  **Business (Office)**: `ec_business` - 日本人女性、PC、オフィス。
6.  **Wellness (Yoga)**: `ec_wellness` - ヨガ、朝の光、健康食品。
7.  **Relax (Home)**: `ec_relax` - ルームウェア、夜のリラックス。

---

## 4. 今後の拡張計画 (Action Items)

1.  **プロンプトライブラリの整備**:
    *   `script.js` 内のプロンプトをDB化し、案件ごとに微調整して即出しできるツール化を検討。
2.  **LPへの統合**:
    *   CrowdWorksのプロフィールや提案文に、このポートフォリオのURL (`just-a-paper.com/imagestock/`) を記載し、実績としての強度を高める。
3.  **デモ動画の追加**:
    *   画像だけでなく、Runway Gen-2等を使用した「数秒のショート動画広告」カテゴリの追加（ニーズ増のため）。

---
**Note**: This document is a living specification. Update whenever new categories or strategic goals are added.
