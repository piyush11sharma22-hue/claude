// Pure function, injected into the active tab via chrome.scripting.executeScript({ func }).
// Its return value comes back to the popup. Must be self-contained (no closure refs) —
// its source is serialized and run in the page context.
//
// We deliberately grab loosely-structured visible text and let the model find the hook,
// rather than relying on brittle per-site CSS selectors that break constantly.
export function extractPageSignals() {
  const clip = (s, n) => (s || "").replace(/\s+/g, " ").trim().slice(0, n);

  const meta = (name) => {
    const el =
      document.querySelector(`meta[property="${name}"]`) ||
      document.querySelector(`meta[name="${name}"]`);
    return el ? el.getAttribute("content") : "";
  };

  const host = location.hostname.replace(/^www\./, "");
  let site = "website";
  if (host.includes("linkedin.com")) site = "linkedin";
  else if (host.includes("instagram.com")) site = "instagram";
  else if (host.includes("twitter.com") || host.includes("x.com")) site = "x";

  const firstText = (selectors) => {
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el && el.textContent && el.textContent.trim()) return clip(el.textContent, 200);
    }
    return "";
  };

  const heading = firstText(["h1", '[data-testid="UserName"]', "header h2"]);
  const bodyText = clip(document.body ? document.body.innerText : "", 4000);
  const selection = clip(window.getSelection ? String(window.getSelection()) : "", 1500);

  return {
    site,
    url: location.href,
    title: clip(document.title, 300),
    metaDescription: clip(meta("og:description") || meta("description"), 500),
    ogTitle: clip(meta("og:title"), 300),
    heading,
    selection, // if the user highlighted something specific, prioritize it as the hook
    bodyText,
    capturedAt: new Date().toISOString(),
  };
}
