<<<<<<< HEAD
// Landing config (placeholders)
const BOT_USERNAME = "@<BOT_USERNAME>";
const AUTHOR_USERNAME = "<author_username>";

// Prefer deep-link start param from site
const BOT_LINK = `https://t.me/${BOT_USERNAME.replace(/^@/, "")}?start=from_site`;
const AUTHOR_TG = `https://t.me/${AUTHOR_USERNAME}`;
=======
// Landing config
const BOT_USERNAME = "@mac_of_the_day_bot";
const AUTHOR_USERNAME = "<author_username>";

// Deep-link (safe even if bot ignores start param)
const BOT_LINK = `https://t.me/${BOT_USERNAME.replace(/^@/, "")}?start=from_site`;
const AUTHOR_TG = AUTHOR_USERNAME.includes("<") ? "#" : `https://t.me/${AUTHOR_USERNAME}`;
>>>>>>> b0e36e4 (Initial landing)

function setLinks() {
  const botLinks = document.querySelectorAll("[data-bot-link]");
  botLinks.forEach((a) => {
    a.setAttribute("href", BOT_LINK);
    a.setAttribute("aria-label", "Открыть бота в Telegram (откроется в Telegram)");
<<<<<<< HEAD
  });

  const author = document.querySelector("[data-author-link]");
  if (author) author.setAttribute("href", AUTHOR_TG);
=======
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
  });

  const author = document.querySelector("[data-author-link]");
  if (author) {
    author.setAttribute("href", AUTHOR_TG);
    author.setAttribute("target", "_blank");
    author.setAttribute("rel", "noopener noreferrer");
    if (AUTHOR_TG === "#") author.setAttribute("aria-disabled", "true");
  }
>>>>>>> b0e36e4 (Initial landing)
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

setLinks();
setYear();
faqSingleOpen();
addOutboundTrackingHint();
