# How to Setup Pinot Time Clock / 勤怠システム設定手順

スマホで打刻したデータを、あなたのGoogleスプレッドシートに記録するための設定手順です。
（所要時間：約3分）

## Step 1: スプレッドシートの準備
1. ブラウザで新しいGoogleスプレッドシートを作成します。
2. 名前を「Pinot勤怠記録」などに変更します。
3. メニューの **「拡張機能」** > **「Apps Script」** をクリックします。

## Step 2: スクリプトの貼り付け
4. 開いた画面のコード（`myFunction`など）をすべて消して、以下のコードを貼り付けてください。

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  var now = new Date();
  var dateStr = Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy/MM/dd');
  var timeStr = Utilities.formatDate(now, 'Asia/Tokyo', 'HH:mm:ss');
  
  sheet.appendRow([dateStr, timeStr, data.staff, data.action, data.timestamp]);
  
  var output = ContentService.createTextOutput(JSON.stringify({result: 'success'}));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['日付', '時刻', 'スタッフ名', 'アクション', '端末時刻']);
  }
}
```

5. ツールバーのディスク・アイコン💾を押して保存します（プロジェクト名は適当でOK）。

## Step 3: 公開（デプロイ）
6. 右上の **「デプロイ」** ボタン > **「新しいデプロイ」** を選択。
7. 「種類の選択」の歯車アイコン⚙️ > **「ウェブアプリ」** を選択。
8. 以下の設定にします：
    - **説明**: 勤怠アプリ
    - **次のユーザーとして実行**: **自分** (Me)
    - **アクセスできるユーザー**: **全員** (Anyone) ⚠️重要！これを選択しないと動きません。
9. **「デプロイ」** をクリック。
10. 「アクセスを承認」などを求められたら、自分のアカウントを選び、**「Advanced (詳細)」 > 「Go to ... (安全ではないページに移動)」** を選んで**許可 (Allow)** します。

## Step 4: URLのコピー
11. 発行された **「ウェブアプリのURL」** ( `https://script.google.com/macros/s/...` から始まる長いURL) をコピーします。

## Step 5: アプリとの連携
12. [Pinot Time Clock](/pinot_wine/staff.html) ページを開きます。
13. 下部の「System Settings」を開きます。
14. コピーしたURLを貼り付けて「Save URL」を押します。

**完了です！**
これで「出勤」ボタンを押すと、スプレッドシートに日時が自動で記録されます。
スプレッドシートなら、月末にそのまま印刷したり、PDF/CSVで書き出すことができます。
