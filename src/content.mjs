export const site = {
  name: 'Hsiun',
  title: 'Hsiun — 寫點程式，也寫點生活',
  description: '記錄程式、設計與生活。把學到的事寫下來，也把平凡的日子好好收藏。',
};

export const categories = {
  articles: { label: '文章', title: '想法，寫下來就有了形狀。', description: '關於程式、設計，以及那些值得多想一下的事。', number: '01' },
  diary: { label: '日記', title: '普通日子，也值得收藏。', description: '放慢一點，記下生活裡不經意的小事。', number: '02' },
  tools: { label: '小工具', title: '小小工具，少一點麻煩。', description: '把日常的小需求，變成簡單好用的點子。', number: '03' },
  works: { label: '作品', title: '把腦中的想像，做出來。', description: '一些實驗、一些練習，和持續創作的痕跡。', number: '04' },
};

// Dates are ISO calendar dates. Content is trusted, local author-written data.
export const articles = [
  {
    slug: 'a-space-to-think', category: 'articles', tag: '設計思考',
    title: '為自己留一個，慢慢思考的地方',
    summary: '在快速滾動的世界裡，重新打造一個屬於自己的數位角落。關於這個部落格，也關於記錄的意義。',
    date: '2026-09-09', minutes: 3, art: 'orbit', featured: true,
    body: [
      { type: 'paragraph', text: '有些想法，在心裡停留很久，卻一直沒有被好好說完。這個部落格就是為了那些想法而存在：一個不用急著回答、不必追上誰，可以慢慢整理自己的地方。' },
      { type: 'heading', text: '從一個小小的角落開始' },
      { type: 'paragraph', text: '打開編輯器的時候，我問自己：我希望別人來到這裡，先看見什麼？最後留下來的答案很簡單，是內容，也是一個人認真生活的痕跡。於是拿掉不必要的裝飾，留下舒服的留白、清楚的文字，和願意分享的事情。' },
      { type: 'quote', text: '寫下來，不是因為已經想得很完整，而是為了讓自己想得更清楚。' },
      { type: 'heading', text: '在這裡，會記錄什麼？' },
      { type: 'list', items: ['學習程式的過程：遇見問題、拆解問題，再把理解寫下來。', '生活裡的小事：一本書、一段散步，或一個突然出現的念頭。', '動手做的東西：從簡單的小工具，到慢慢成形的作品。'] },
      { type: 'heading', text: '讓記錄成為日常' },
      { type: 'paragraph', text: '我不打算用更新次數衡量這個地方。比起每週必須交出什麼，更想練習留心：今天有沒有一件值得記下來的事？如果有，就從一段話開始。或許過一陣子回頭看，這些小小片段就會連成自己的路。' },
    ],
  },
  {
    slug: 'less-but-clearer', category: 'articles', tag: '前端開發',
    title: '少寫一點，讓程式碼說得更清楚',
    summary: '從命名到拆分職責，練習寫出讓未來的自己也能一眼讀懂的程式。',
    date: '2026-09-07', minutes: 2, art: 'grid',
    body: [
      { type: 'paragraph', text: '整理程式碼時，我常發現最難讀的地方並不是演算法，而是那些需要猜測的名字。好的命名能讓閱讀的人把注意力留在邏輯本身。' },
      { type: 'heading', text: '把意圖放進名字裡' },
      { type: 'paragraph', text: '與其把資料叫做 data，把處理函式叫做 handle，不如先問它代表什麼、要完成什麼。讓函式專心處理一件事，通常也會讓命名變得容易。' },
      { type: 'code', language: 'JavaScript', text: "function getPublishedArticles(articles) {\n  return articles.filter(article => article.published);\n}\n\nconst latestArticles = getPublishedArticles(articles)\n  .slice(0, 3);" },
      { type: 'heading', text: '讓抽象晚一點出現' },
      { type: 'paragraph', text: '看到兩段相似程式，不一定要立刻建立一個通用框架。先確認它們是不是為了同一個原因而改變。如果只是外表相似，保持分開可能更好理解。' },
      { type: 'list', items: ['先把程式寫清楚，再考慮縮短。', '把內容、畫面與互動各自放好。', '註解說明原因，讓程式本身說明做法。'] },
      { type: 'quote', text: '可讀性，是留給下一位維護者的體貼。那個人很可能就是未來的自己。' },
    ],
  },
  {
    slug: 'space-in-design', category: 'articles', tag: '介面設計',
    title: '留白，是介面裡安靜的設計',
    summary: '當每個元素都想被看見，試著退一步，讓重要的內容有呼吸的空間。',
    date: '2026-09-04', minutes: 2, art: 'arch',
    body: [
      { type: 'paragraph', text: '第一次調整卡片版面時，我試著讓所有東西更醒目：標題放大、標籤上色、按鈕加深。結果畫面反而失去重點。真正有幫助的調整，是把卡片之間的距離拉開。' },
      { type: 'heading', text: '空間也能表達關係' },
      { type: 'paragraph', text: '靠近的元素看起來像是一組，隔得遠的內容則像不同段落。標題與摘要之間的距離、卡片與卡片之間的間隔，都在替讀者整理資訊。' },
      { type: 'list', items: ['先決定最想讓讀者看見的內容。', '讓同一組資訊靠近，讓不同區塊有足夠間距。', '用一致的間距節奏，減少不必要的視覺雜訊。'] },
      { type: 'heading', text: '留白不是剩下的地方' },
      { type: 'paragraph', text: '我開始把留白當成一個主動選擇，而不是把內容塞進去之後剩下的空間。當畫面不再急著說完一切，閱讀也變得從容了一點。' },
    ],
  },
  {
    slug: 'small-steps', category: 'articles', tag: '學習筆記',
    title: '學習新事物，從一個小實驗開始',
    summary: '不用等準備好所有知識。選一個問題，做出最小的版本，再慢慢往前。',
    date: '2026-09-01', minutes: 2, art: 'steps',
    body: [
      { type: 'paragraph', text: '每次開始學習新工具，總會不小心收集太多教學。筆記越記越厚，真正動手的時間卻越來越少。後來我替自己換了一個起點：先做出一件很小、但真的能用的東西。' },
      { type: 'heading', text: '把問題縮到能開始的大小' },
      { type: 'paragraph', text: '想學網頁互動，就先做一個能開關的選單。想理解資料整理，就拿自己的閱讀清單試試看。問題越具體，越容易知道下一步要查什麼。' },
      { type: 'list', items: ['寫下一個可以明確驗證的目標。', '花一小段時間做出第一版。', '記下遇到的問題與自己的解法。', '完成後再選擇下一個值得改善的地方。'] },
      { type: 'quote', text: '一個做完的小實驗，往往比十個還沒開始的大計畫更有力量。' },
    ],
  },
];

export const diary = [
  {
    slug: 'an-unhurried-afternoon', category: 'diary', tag: '日常片刻',
    title: '今天，讓自己慢一點',
    summary: '把待辦清單暫時放下，泡一杯茶，聽窗外的聲音。原來不趕路的下午也很好。',
    date: '2026-09-08', minutes: 2, art: 'waves',
    body: [
      { type: 'paragraph', text: '下午三點，把開了一整天的編輯器關掉，去泡了一杯茶。水壺滾起來的聲音很熟悉，卻好像很久沒有專心聽過。' },
      { type: 'heading', text: '空下來的時間' },
      { type: 'paragraph', text: '今天沒有安排什麼特別的事。把窗戶打開，讓風把桌上的紙吹動一點。原本覺得應該再做點什麼，後來想想，或許這樣坐著也沒有關係。休息不用總是為了讓下一段工作更有效率。' },
      { type: 'quote', text: '有些下午，光是好好度過，就已經足夠。' },
      { type: 'paragraph', text: '茶慢慢變涼，日光從桌面移到地板上。等我再次打開電腦，心裡反而清楚了一點。那些急著要完成的事情，明天也還有時間。' },
    ],
  },
  {
    slug: 'walking-without-a-route', category: 'diary', tag: '散步記錄',
    title: '沒有目的地的散步',
    summary: '轉進平常不會走的小巷，發現熟悉的街區，其實還有很多沒注意過的風景。',
    date: '2026-09-05', minutes: 2, art: 'arch',
    body: [
      { type: 'paragraph', text: '出門的時候沒有打開地圖。走到路口，選了平常不會轉的方向，就這樣開始今天的散步。' },
      { type: 'heading', text: '熟悉地方的新角度' },
      { type: 'paragraph', text: '巷口有一盆長得很好的九重葛，隔壁的窗臺排著幾個不同顏色的杯子。這些大概一直都在，只是以前經過的時候，我正在看手機或想下一件事情。' },
      { type: 'list', items: ['聽見一台老電風扇運轉的聲音。', '看見光穿過樹葉，在牆上留下晃動的影子。', '發現回家的路，可以有很多種走法。'] },
      { type: 'paragraph', text: '走了半個多小時，繞回原本的路口。沒有抵達什麼特別的地方，卻覺得今天多了一點可以記住的東西。' },
    ],
  },
  {
    slug: 'three-small-good-things', category: 'diary', tag: '生活練習',
    title: '這星期的三件小事',
    summary: '修好一個小問題、讀完幾頁書、吃到喜歡的早餐。把微小的開心，也好好記下來。',
    date: '2026-09-02', minutes: 2, art: 'dots',
    body: [
      { type: 'paragraph', text: '這星期沒有發生什麼大事，但睡前回想，還是有一些值得留下來的片刻。' },
      { type: 'heading', text: '一個終於解開的問題' },
      { type: 'paragraph', text: '卡了兩天的版面問題，最後是少了一個 min-width: 0。找到原因的那一刻，突然笑了出來。有時候困難看起來很大，答案卻可以這麼小。' },
      { type: 'heading', text: '幾頁書，和一份早餐' },
      { type: 'paragraph', text: '早起十分鐘，坐下來吃完早餐，順便讀了幾頁放在桌邊的書。沒有急著滑開訊息，這一天的開始變得很不一樣。' },
      { type: 'quote', text: '生活的好，有時候需要停下來，才看得見。' },
      { type: 'paragraph', text: '最後一件小事，是把這些寫了下來。希望未來忙碌的自己看到時，還能想起當時的心情。' },
    ],
  },
];

export const tools = [
  { slug: 'word-counter', title: '文字計數器', summary: '貼上文字，快速掌握字數、段落與預估閱讀時間，讓寫作多一點餘裕。', tag: '寫作輔助', icon: 'text', status: '構想介紹' },
  { slug: 'color-notebook', title: '配色小筆記', summary: '收藏喜歡的顏色，整理成自己的配色靈感，讓下一次創作有個起點。', tag: '設計靈感', icon: 'palette', status: '構想介紹' },
  { slug: 'focus-timer', title: '專注計時器', summary: '留一段時間給眼前的事。用簡單的工作與休息節奏，慢慢完成每個小目標。', tag: '日常效率', icon: 'clock', status: '構想介紹' },
];

export const works = [
  { slug: 'personal-space', title: '一個自己的數位角落', summary: '以文字與留白為主角的個人網站，探索閱讀、記錄與自我表達的可能。', tag: '網站設計', art: 'orbit', year: '2026', status: '示範專案' },
  { slug: 'daily-fragments', title: '日常碎片', summary: '把短短的生活筆記排成卡片，練習用最少的元素，留下有溫度的片刻。', tag: '介面練習', art: 'dots', year: '2026', status: '示範專案' },
  { slug: 'rhythm-of-motion', title: '動態的節奏', summary: '關於淡入、位移與細微回饋的小實驗，讓介面互動更自然、更從容。', tag: '互動實驗', art: 'steps', year: '2026', status: '示範專案' },
];

export const collections = { articles, diary, tools, works };
