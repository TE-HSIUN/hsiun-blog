# Hsiun 部落格

以原生 HTML、CSS、JavaScript ES Modules 製作的靜態部落格。沒有執行期套件或外部字型依賴；內容在建置時產生 HTML，停用 JavaScript 仍能閱讀與導覽。

## 本機開發

需要 Node.js 22 或以上，不需安裝套件。

```sh
npm run dev
```

開啟終端顯示的本機網址，預設為 `http://localhost:4173`。修改內容、樣式或互動模組後會自動重建並重新整理。若連接埠被占用，可用 `PORT=4174 npm run dev` 指定其他連接埠。

```sh
npm run build       # 產生 dist，會清空舊的建置輸出
npm run check       # 驗證所有靜態頁面、連結與基本語意
npm run preview     # 建置後啟動本機靜態伺服器
CHECK_URL=http://localhost:4173 npm run check # 另行驗證 HTTP、404 與轉址
```

## 結構與內容管理

- `src/content.mjs`：品牌、分類、文章、日記、小工具與作品資料。
- `src/templates.mjs`：共用導覽、卡片、頁尾、分類與閱讀版型。
- `index.html`：共用 HTML 外殼，內含建置用欄位；請透過開發伺服器預覽。
- `style.css`：設計變數、元件樣式、桌面／平板／手機版與減少動畫設定。
- `public/js/`：導覽與動畫，各自依職責拆分；`script.js` 是互動入口。
- `scripts/`：零相依的建置、開發伺服器、靜態驗證。
- `public/`：原樣複製到輸出根目錄的公開資源。
- `dist/`：建置輸出，不要直接修改。

在 `src/content.mjs` 的 `articles` 或 `diary` 加入紀錄，即可產生獨立閱讀頁。`slug` 使用小寫英文、數字與連字號，發布後應保持穩定；`category` 要與所屬集合一致。`date` 使用 `YYYY-MM-DD`；文章與日記按日期由新到舊排列。`minutes` 是可自行調整的閱讀時間。設定一篇文章 `featured: true` 作為首頁精選，其他最新文章用卡片呈現。

每篇的 `body` 是內容區塊陣列：

```js
body: [
  { type: 'paragraph', text: '一段內文。' },
  { type: 'heading', text: '段落標題' },
  { type: 'quote', text: '一段引用。' },
  { type: 'list', items: ['第一點', '第二點'] },
  { type: 'code', language: 'JavaScript', text: 'const message = "Hello";' },
]
```

文字由版型統一轉義，不需自行加入 HTML。封面 `art` 可選 `orbit`、`grid`、`arch`、`steps`、`waves`、`dots`。工具與作品是介紹卡；若尚未提供可用產品或網址，請維持介紹狀態。示範標記在版型內集中管理；只有替換為真實內容後才應移除。

## 設計與可及性

全站繁體中文。CSS 開頭的自訂屬性控制品牌色、留白背景、邊框、圓角與動態曲線。桌面三欄、1000px 以下兩欄、640px 以下單欄。行動導覽支援鍵盤、Escape、點外部關閉與斷點切換；無 JavaScript 時顯示完整導覽。動畫尊重系統「減少動態效果」偏好，內容不會因動畫未執行而隱藏。

## 發布

現有 `.openai/hosting.json` 指向 Sites 專案並設定 `static.directory: "dist"`。執行建置與檢查後，透過 Sites 保存版本並發布。一般靜態主機也可直接使用 `dist/`，需支援目錄下的 `index.html`，並將未知路徑回傳 `404.html` 與 HTTP 404。沒有伺服器端 API、資料庫或環境密鑰需求。

第一版包含 13 個頁面：首頁、4 個分類、4 篇文章、3 篇日記與 404。所有內容為示範；小工具不提供運算功能，作品不代表真實已完成專案。
