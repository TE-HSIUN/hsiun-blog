import { categories, site } from './content.mjs';

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

export const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const spark = '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="5" aria-hidden="true"><path d="M20 2v36M2 20h36M7.3 7.3l25.4 25.4M7.3 32.7 32.7 7.3"/></svg>';

export function header(active = '') {
  return `<header class="site-header" data-header>
    <div class="container nav-shell">
      <a class="logo" href="/" aria-label="Hsiun 首頁">hsiun<span class="logo-dot">.</span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="開啟導覽選單" hidden><span></span><span></span></button>
      <nav class="primary-nav" id="primary-nav" aria-label="主要導覽">${Object.entries(categories).map(([key, category]) => `<a href="/${key}/"${active === key ? ' aria-current="page"' : ''}>${category.label}</a>`).join('')}</nav>
      <span class="nav-note"><span class="status-dot"></span>持續記錄中</span>
    </div>
  </header>`;
}

export function footer() {
  return `<footer class="site-footer"><div class="container footer-inner"><div><a class="logo" href="/" aria-label="Hsiun 首頁">hsiun<span class="logo-dot">.</span></a><p>把學到的事寫下來，把平凡的日子收藏。</p></div><div class="footer-note"><span>© ${new Date().getFullYear()} Hsiun</span><span>用心生活，慢慢更新。<span class="footer-spark">✳</span></span></div></div></footer>`;
}

export function cover(variant = 'orbit', extraClass = '') {
  const shapes = {
    orbit: '<div class="orbit-rings"><i></i><i></i><i></i><i></i></div><span class="orbit-core"></span><span class="art-cross">＋</span>',
    grid: '<div class="tile-grid">' + '<i></i>'.repeat(9) + '</div><span class="art-cross">＋</span>',
    arch: '<div class="arch-shape"><i></i><i></i><i></i></div><span class="art-cross">＋</span>',
    steps: '<div class="step-shapes"><i></i><i></i><i></i></div><span class="art-cross">＋</span>',
    waves: '<div class="wave-shapes"><i></i><i></i><i></i></div>',
    dots: '<div class="dot-shapes">' + '<i></i>'.repeat(16) + '</div>',
  };
  return `<div class="cover cover--${escapeHtml(variant)} ${extraClass}" aria-hidden="true"><span class="art-corner">HS / 隨筆</span>${shapes[variant] ?? shapes.orbit}<span class="art-caption">${({orbit:'留一點空間，給想像。',grid:'少一點，更清楚。',arch:'讓內容，自在呼吸。',steps:'一步一步，慢慢來。',waves:'日子，慢慢地過。',dots:'收藏，生活的小事。'})[variant] ?? ''}</span><span class="art-index">✳</span></div>`;
}

function metadata(post) {
  return `<div class="post-meta"><time datetime="${post.date}">${post.date.replaceAll('-', '.')}</time><span class="meta-dot">·</span><span>${post.minutes} 分鐘閱讀</span></div>`;
}

export function postCard(post) {
  return `<article class="post-card" data-reveal><a class="card-link" href="/${post.category}/${post.slug}/">${cover(post.art)}<div class="card-body"><span class="tag">${escapeHtml(post.tag)}</span><h3>${escapeHtml(post.title)}</h3><p>${escapeHtml(post.summary)}</p><div class="card-bottom">${metadata(post)}<span class="card-arrow">${arrow}</span></div></div></a></article>`;
}

export function sectionHeading(key, label = categories[key].label) {
  return `<div class="section-heading"><h2><span class="section-number">${categories[key].number}</span>${label}</h2><a class="text-link" href="/${key}/">查看所有${categories[key].label}${arrow}</a></div>`;
}

export function homePage({ articles, diary, tools, works }) {
  const featured = articles.find(post => post.featured) ?? articles[0];
  const latest = articles.filter(post => post !== featured).slice(0, 3);
  return `
    <section class="hero" aria-labelledby="welcome-title">
      <div class="hero-main">
        <p class="eyebrow"><span class="tiny-spark">✳</span>嗨，我是 Hsiun</p>
        <h1 id="welcome-title">寫點程式，<br>也寫點<span class="blue-word">生活<span class="word-dot">。</span></span></h1>
      </div>
      <div class="hero-aside">
        <div class="hero-symbol">${spark}</div>
        <p>一個記錄思考與創作的小角落。<br>分享程式、設計，還有日常裡的靈光。</p>
        <a class="text-link" href="#latest">往下探索<span class="down-arrow">${arrow}</span></a>
      </div>
    </section>
    ${featured ? featuredCard(featured) : ''}
    <section class="content-section" id="latest" aria-labelledby="latest-title">
      ${sectionHeading('articles', '<span id="latest-title">最新文章</span>')}
      <div class="card-grid">${latest.map(postCard).join('')}</div>
    </section>
    <section class="content-section diary-section" aria-label="日記">
      ${sectionHeading('diary', '日常片刻')}
      <div class="card-grid">${diary.slice(0, 3).map(diaryCard).join('')}</div>
    </section>
    <section class="content-section" aria-label="小工具">
      ${sectionHeading('tools')}
      <div class="card-grid">${tools.slice(0, 3).map(toolCard).join('')}</div>
    </section>
    <section class="content-section" aria-label="作品">
      ${sectionHeading('works', '最近做的東西')}
      <div class="card-grid">${works.slice(0, 3).map(workCard).join('')}</div>
    </section>
    ${sampleNote()}`;
}

function featuredCard(post) {
  return `
    <section class="featured-section" aria-labelledby="featured-title">
      <a class="featured-card" href="/${post.category}/${post.slug}/">
        <div class="featured-copy">
          <div class="featured-label">
            <span class="tiny-spark">✳</span>精選文章
            <span class="pill">${escapeHtml(post.tag)}</span>
          </div>
          <h2 id="featured-title">${escapeHtml(post.title).replace('，', '，<br>')}</h2>
          <p>${escapeHtml(post.summary)}</p>
          <div class="featured-bottom">${metadata(post)}<span class="round-arrow">${arrow}</span></div>
        </div>
        ${cover(post.art, 'featured-art')}
      </a>
    </section>`;
}

function sampleNote() {
  return '<p class="sample-note"><span class="status-dot"></span>目前文章、日記、小工具與作品皆為示範內容。</p>';
}

function diaryCard(post) {
  const [, month, day] = post.date.split('-');
  return `<article class="diary-card" data-reveal><a class="card-link" href="/diary/${post.slug}/"><div class="diary-top"><span class="diary-date"><strong>${day}</strong><span>${month} 月</span></span><span class="tag">${escapeHtml(post.tag)}</span></div><h3>${escapeHtml(post.title)}</h3><p>${escapeHtml(post.summary)}</p><div class="card-bottom">${metadata(post)}<span class="card-arrow">${arrow}</span></div></a></article>`;
}

function toolIcon(name) {
  const paths = {
    text: '<path d="M5 6h14M12 6v13M8 19h8M5 6v3m14-3v3"/>',
    palette: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><circle cx="16.5" cy="16.5" r="3.5"/>',
    clock: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6m-3 0v3"/>',
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">${paths[name] ?? paths.text}</svg>`;
}

export function toolCard(item) {
  return `<article class="tool-card" data-reveal><div class="tool-top"><span class="tool-icon tool-icon--${item.icon}">${toolIcon(item.icon)}</span><span class="quiet-badge">${escapeHtml(item.status)}</span></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p><span class="tool-tag">${escapeHtml(item.tag)}</span></article>`;
}

export function workCard(item) {
  return `<article class="work-card" data-reveal>${cover(item.art)}<div class="card-body"><div class="work-label"><span class="tag">${escapeHtml(item.tag)}</span><span class="work-year">${item.year}</span></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p><span class="work-status">${escapeHtml(item.status)}</span></div></article>`;
}

export function categoryPage(key, items) {
  const category = categories[key];
  const renderCard = key === 'tools' ? toolCard : key === 'works' ? workCard : postCard;
  return `<header class="page-heading"><a class="text-link back-link" href="/">${arrow}回到首頁</a><p class="eyebrow"><span class="tiny-spark">✳</span>${category.label}</p><h1>${category.title}</h1><p class="page-description">${category.description}</p></header><section class="category-content" aria-label="${category.label}列表"><div class="collection-heading"><h2>所有${category.label}<span class="count-badge">${String(items.length).padStart(2, '0')}</span></h2><span>${key === 'articles' || key === 'diary' ? '由新到舊' : '靈感與創作記錄'}</span></div>${items.length ? `<div class="card-grid">${items.map(renderCard).join('')}</div>` : '<p class="empty-state">這裡正在慢慢整理，新的記錄很快就來。</p>'}</section>${sampleNote()}`;
}

function renderBlock(block) {
  const text = escapeHtml(block.text ?? '');
  switch (block.type) {
    case 'paragraph': return `<p>${text}</p>`;
    case 'heading': return `<h2>${text}</h2>`;
    case 'quote': return `<blockquote><p>${text}</p></blockquote>`;
    case 'list': return `<ul>${block.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
    case 'code': return `<figure class="code-block"><figcaption>${escapeHtml(block.language)}</figcaption><pre tabindex="0" aria-label="${escapeHtml(block.language)} 程式碼"><code>${text}</code></pre></figure>`;
    default: throw new Error(`Unknown content block: ${block.type}`);
  }
}

export function readingPage(post) {
  const category = categories[post.category];
  return `
    <article class="reading-page">
      <header class="reading-header">
        <a class="text-link back-link" href="/${post.category}/">${arrow}返回${category.label}</a>
        <div class="reading-label">
          <span class="tag">${escapeHtml(post.tag)}</span><span class="quiet-badge">示範內容</span>
        </div>
        <h1>${escapeHtml(post.title)}</h1>
        <p class="reading-summary">${escapeHtml(post.summary)}</p>
        <div class="reading-byline">
          <span class="author-mark" aria-hidden="true">h.</span><span>Hsiun</span>${metadata(post)}
        </div>
      </header>
      ${cover(post.art, 'reading-cover')}
      <div class="prose">${post.body.map(renderBlock).join('')}</div>
      <div class="reading-end">
        <span class="tiny-spark">✳</span><p>謝謝你讀到這裡。</p>
        <a class="text-link back-link" href="/${post.category}/">${arrow}繼續閱讀${category.label}</a>
      </div>
    </article>`;
}

export function notFoundPage() {
  return `<section class="not-found"><p class="error-number">404<span>✳</span></p><h1>這一頁，暫時走丟了。</h1><p>也許網址有誤，或內容已經搬家。<br>回到首頁，找點其他靈感吧。</p><a class="primary-button" href="/">回到首頁${arrow}</a></section>`;
}

export function renderDocument(shell, { content, title = site.title, description = site.description, active = '', ogType = 'website' }) {
  const values = { title: escapeHtml(title), description: escapeHtml(description), ogType, header: header(active), content, footer: footer() };
  return shell.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? '');
}
