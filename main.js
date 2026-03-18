// Landing config
const BOT_USERNAME = "@mac_of_the_day_bot";
const AUTHOR_URL = "https://klambiatti.github.io/links/";

// Deep-link (safe even if bot ignores start param)
const BOT_LINK = `https://t.me/${BOT_USERNAME.replace(/^@/, "")}?start=from_site`;

function setLinks() {
  const botLinks = document.querySelectorAll("[data-bot-link]");
  botLinks.forEach((a) => {
    a.setAttribute("href", BOT_LINK);
    a.setAttribute("aria-label", "Открыть бота в Telegram (откроется в Telegram)");
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
  });

  const author = document.querySelector("[data-author-link]");
  if (author) {
    author.setAttribute("href", AUTHOR_URL);
    author.setAttribute("target", "_blank");
    author.setAttribute("rel", "noopener noreferrer");
  }
}

function setYear() {
  const el = document.getElementById("year");
  if (!el) return;
  el.textContent = String(new Date().getFullYear());
}

function faqSingleOpen() {
  const items = Array.from(document.querySelectorAll(".faq details"));
  if (!items.length) return;
  items.forEach((d) => {
    d.addEventListener("toggle", () => {
      if (!d.open) return;
      items.forEach((other) => {
        if (other !== d) other.open = false;
      });
    });
  });
}

function addOutboundTrackingHint() {
  // Optional analytics hooks (no keys):
  // - Plausible: add script in index.html and set data-domain.
  // - GA4: add gtag snippet.
  //
  // This is intentionally empty to keep MVP static and privacy-friendly.
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getDayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function rotateQuestions() {
  const QUESTIONS = [
    "Какой маленький шаг сейчас возможен?",
    "Что во мне просит внимания — тихо и без спешки?",
    "Где сегодня я могу быть к себе мягче?",
    "Что я уже делаю достаточно хорошо?",
    "Что мне важно сохранить в этом дне?",
    "Что я могу отпустить — хотя бы на сегодня?",
    "Какое чувство сейчас самое честное?",
    "Что мне хочется поддержать в себе?",
    "Где мне нужна простая забота?",
    "Что я выбираю не ускорять?",
    "Что меня тихо радует — даже если чуть-чуть?",
    "Как я могу быть на своей стороне сегодня?",
  ];

  const dayKey = getDayKey();
  const storageKey = `karta-dnya:q:${dayKey}`;
  const stored = localStorage.getItem(storageKey);
  const initial = stored || pickRandom(QUESTIONS);
  localStorage.setItem(storageKey, initial);

  // 1) Mock question in hero
  const heroQ = document.querySelector("[data-rotating-question]");
  if (heroQ) heroQ.textContent = initial;

  // 2) Single rotating pill in "Примеры вопросов"
  const rotator = document.querySelector(".quote-rotator");
  const rotatorText = rotator?.querySelector(".quote-rotator__text");
  if (!rotator || !rotatorText) return;

  let idx = Math.max(0, QUESTIONS.indexOf(initial));
  if (idx === -1) idx = 0;
  rotatorText.textContent = QUESTIONS[idx];

  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  function setText(next) {
    if (!prefersReduced) {
      rotator.classList.add("is-switching");
      setTimeout(() => {
        rotatorText.textContent = next;
        rotator.classList.remove("is-switching");
      }, 140);
    } else {
      rotatorText.textContent = next;
    }
  }

  function nextQuestion() {
    idx = (idx + 1) % QUESTIONS.length;
    setText(QUESTIONS[idx]);
  }

  rotator.addEventListener("click", nextQuestion);

  if (!prefersReduced) {
    let timer = window.setInterval(nextQuestion, 5200);
    rotator.addEventListener("mouseenter", () => window.clearInterval(timer));
    rotator.addEventListener("mouseleave", () => {
      timer = window.setInterval(nextQuestion, 5200);
    });
  }
}

function revealOnScroll() {
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) return;

  const nodes = Array.from(document.querySelectorAll(".reveal"));
  if (!nodes.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-revealed");
        io.unobserve(e.target);
      });
    },
    { root: null, threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  nodes.forEach((n) => io.observe(n));
}

setLinks();
setYear();
faqSingleOpen();
addOutboundTrackingHint();
rotateQuestions();
revealOnScroll();
