 

const RSS2JSON_KEY = "ygra0orowky5cpb6fucxvzjijwhy3fukpadlnass";

const RSS2JSON_BASE = "https://api.rss2json.com/v1/api.json";
const FX_URL = "https://api.frankfurter.app/latest?from=USD&to=BRL";

 
const CATEGORY_FEEDS = {
  general: "https://g1.globo.com/rss/g1/",
  business: "https://g1.globo.com/rss/g1/economia/",
  technology: "https://g1.globo.com/rss/g1/tecnologia/",
  sports: "https://ge.globo.com/rss/geral/",
  entertainment: "https://g1.globo.com/rss/g1/pop-arte/",
  health: "https://g1.globo.com/rss/g1/ciencia-e-saude/",
  science: "https://g1.globo.com/rss/g1/ciencia-e-saude/"
};

class NewsService {
  async topHeadlines(category) {
    const feedUrl = CATEGORY_FEEDS[category] || CATEGORY_FEEDS.general;
    return this.#fetchFeed(feedUrl);
  }

  async search(query) {
     
    const items = await this.#fetchFeed(CATEGORY_FEEDS.general, 40);
    const needle = this.#normalize(query);
    return items.filter(item => {
      const haystack = this.#normalize(`${item.title} ${item.description}`);
      return haystack.includes(needle);
    });
  }

  #normalize(text) {
    return (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  async #fetchFeed(feedUrl, count = 12) {
    const params = new URLSearchParams({ rss_url: feedUrl, count: String(count) });
    if (RSS2JSON_KEY) params.set("api_key", RSS2JSON_KEY);

    const response = await fetch(`${RSS2JSON_BASE}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`O serviço de notícias respondeu com erro ${response.status}.`);
    }
    const data = await response.json();
    if (data.status !== "ok") {
      throw new Error(data.message || "Não foi possível carregar as notícias agora.");
    }
    return (data.items || []).map(item => this.#toRawArticle(item));
  }

  #toRawArticle(item) {
     
    const plainDescription = (item.description || "").replace(/<[^>]*>/g, "").trim();
    return {
      title: item.title,
      description:
        plainDescription.length > 160 ? `${plainDescription.slice(0, 160)}…` : plainDescription,
      url: item.link,
      urlToImage: item.thumbnail || (item.enclosure && item.enclosure.link) || "",
      source: { name: item.author || "G1" },
      publishedAt: item.pubDate ? item.pubDate.replace(" ", "T") : null
    };
  }
}

class Article {
  constructor(raw) {
    this.title = raw.title;
    this.description = raw.description || "";
    this.url = raw.url;
    this.image = raw.urlToImage || "";
    this.source = raw.source && raw.source.name ? raw.source.name : "Fonte desconhecida";
    this.publishedAt = raw.publishedAt ? new Date(raw.publishedAt) : null;
  }

  get id() {
    return this.url;
  }

  get timeAgo() {
    if (!this.publishedAt || isNaN(this.publishedAt)) return "";
    const diffMin = Math.round((Date.now() - this.publishedAt.getTime()) / 60000);
    if (diffMin < 1) return "agora mesmo";
    if (diffMin < 60) return `${diffMin} min atrás`;
    const diffH = Math.round(diffMin / 60);
    if (diffH < 24) return `${diffH} h atrás`;
    return this.publishedAt.toLocaleDateString("pt-BR");
  }
}

class FavoritesStore {
  constructor(key = "pauta_recortes") {
    this.key = key;
    this.items = this.#load();
  }

  #load() {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || [];
    } catch {
      return [];
    }
  }

  #save() {
    localStorage.setItem(this.key, JSON.stringify(this.items));
  }

  has(id) {
    return this.items.some(item => item.id === id);
  }

  toggle(article) {
    if (this.has(article.id)) {
      this.items = this.items.filter(item => item.id !== article.id);
    } else {
      this.items.unshift({
        id: article.id,
        title: article.title,
        source: article.source,
        url: article.url
      });
    }
    this.#save();
    return this.has(article.id);
  }

  remove(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.#save();
  }
}

const statusEl = document.getElementById("status");
const leadEl = document.getElementById("lead-story");
const listEl = document.getElementById("story-list");
const tabsEl = document.getElementById("section-tabs");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const fxTicker = document.getElementById("fx-ticker");
const dateEl = document.getElementById("today-date");
const clippingsToggle = document.getElementById("clippings-toggle");
const clippingsTray = document.getElementById("clippings-tray");
const clippingsCount = document.getElementById("clippings-count");

const news = new NewsService();
const favorites = new FavoritesStore();

function setStatus(message, kind = "info") {
  statusEl.hidden = false;
  statusEl.textContent = message;
  statusEl.classList.toggle("status--error", kind === "error");
}

function clearStatus() {
  statusEl.hidden = true;
  statusEl.textContent = "";
}

function renderDate() {
  const formatted = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(new Date());
  dateEl.textContent = formatted;
}

async function loadFx() {
  try {
    const response = await fetch(FX_URL);
    if (!response.ok) throw new Error("falha na cotação");
    const data = await response.json();
    const rate = data.rates && data.rates.BRL;
    fxTicker.textContent = rate
      ? `Dólar hoje: R$ ${rate.toFixed(2).replace(".", ",")}`
      : "Cotação do dólar indisponível";
  } catch {
    fxTicker.textContent = "Cotação do dólar indisponível";
  }
}

 

function buildFavoriteButton(article) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "favorite-btn";
  btn.setAttribute("aria-label", "Guardar como recorte");
  btn.textContent = favorites.has(article.id) ? "★" : "☆";
  btn.addEventListener("click", () => {
    const saved = favorites.toggle(article);
    btn.textContent = saved ? "★" : "☆";
    renderClippings();
  });
  return btn;
}

function buildLead(article) {
  const wrap = document.createElement("div");
  wrap.className = "lead";
  if (article.image) {
    wrap.style.backgroundImage = `url("${article.image}")`;
  }

  const scrim = document.createElement("div");
  scrim.className = "lead__scrim";

  const source = document.createElement("span");
  source.className = "lead__source";
  source.textContent = article.source;

  const title = document.createElement("h2");
  title.className = "lead__title";
  const link = document.createElement("a");
  link.href = article.url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = article.title;
  title.appendChild(link);

  const meta = document.createElement("div");
  meta.className = "lead__meta";
  const time = document.createElement("span");
  time.textContent = article.timeAgo;
  meta.appendChild(time);
  meta.appendChild(buildFavoriteButton(article));

  scrim.append(source, title, meta);
  wrap.appendChild(scrim);
  return wrap;
}

function buildStoryRow(article) {
  const row = document.createElement("div");
  row.className = "story-row";

  const thumb = document.createElement("img");
  thumb.className = "story-row__thumb";
  thumb.loading = "lazy";
  thumb.alt = "";
  thumb.src = article.image || "";
  thumb.onerror = () => { thumb.style.visibility = "hidden"; };

  const body = document.createElement("div");
  const title = document.createElement("h3");
  title.className = "story-row__title";
  const link = document.createElement("a");
  link.href = article.url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = article.title;
  title.appendChild(link);

  const desc = document.createElement("p");
  desc.className = "story-row__desc";
  desc.textContent = article.description;

  const meta = document.createElement("p");
  meta.className = "story-row__meta";
  const sourceSpan = document.createElement("span");
  sourceSpan.textContent = article.source;
  const dot = document.createElement("span");
  dot.className = "dot";
  dot.textContent = "·";
  const timeSpan = document.createElement("span");
  timeSpan.textContent = article.timeAgo;
  meta.append(sourceSpan, dot, timeSpan);

  body.append(title, desc, meta);
  row.append(thumb, body, buildFavoriteButton(article));
  return row;
}

function renderArticles(rawArticles) {
  leadEl.replaceChildren();
  listEl.replaceChildren();

  if (!rawArticles.length) {
    setStatus("Nada em pauta para isso agora. Tente outro termo.", "info");
    return;
  }
  clearStatus();

  const [firstRaw, ...restRaw] = rawArticles;
  leadEl.appendChild(buildLead(new Article(firstRaw)));
  restRaw.forEach(raw => listEl.appendChild(buildStoryRow(new Article(raw))));
}

function renderClippings() {
  clippingsTray.replaceChildren();
  clippingsCount.textContent = String(favorites.items.length);

  if (!favorites.items.length) {
    const empty = document.createElement("p");
    empty.className = "clippings__empty";
    empty.textContent = "Nenhum recorte guardado ainda.";
    clippingsTray.appendChild(empty);
    return;
  }

  favorites.items.forEach(item => {
    const row = document.createElement("div");
    row.className = "clippings__item";

    const link = document.createElement("a");
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = item.title;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Remover";
    removeBtn.addEventListener("click", () => {
      favorites.remove(item.id);
      renderClippings();
    });

    row.append(link, removeBtn);
    clippingsTray.appendChild(row);
  });
}

 
async function loadCategory(category) {
  setStatus("Buscando o que está em pauta…");
  try {
    const articles = await news.topHeadlines(category);
    renderArticles(articles);
  } catch (err) {
    setStatus(err.message, "error");
  }
}

async function runSearch(query) {
  setStatus(`Procurando por "${query}"…`);
  try {
    const articles = await news.search(query);
    renderArticles(articles);
  } catch (err) {
    setStatus(err.message, "error");
  }
}

 

tabsEl.addEventListener("click", event => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  tabsEl.querySelectorAll(".section-tab").forEach(tab => tab.classList.remove("active"));
  button.classList.add("active");
  searchInput.value = "";
  loadCategory(button.dataset.category);
});

let debounceTimer;
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  const value = searchInput.value.trim();
  if (!value) return;
  debounceTimer = setTimeout(() => runSearch(value), 600);
});

searchButton.addEventListener("click", () => {
  const value = searchInput.value.trim();
  if (value) runSearch(value);
});

searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    const value = searchInput.value.trim();
    if (value) runSearch(value);
  }
});

clippingsToggle.addEventListener("click", () => {
  clippingsTray.hidden = !clippingsTray.hidden;
});
 

renderDate();
loadFx();
renderClippings();
loadCategory("general");