// Service worker: the ONLY place that touches the Anthropic API key.
// The popup asks it to generate outreach; it never exposes the key to page content.

const API_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
const DEFAULT_MODEL = "claude-opus-4-8";

function buildSystemPrompt() {
  return [
    "You write hyper-personalized cold outreach that gets replies.",
    "You are given raw signals scraped from a web page the user is viewing (a person or company),",
    "plus the user's offer and chosen channel. Produce outreach for ONE specific person.",
    "",
    "Hard rules:",
    "- Build the message on a REAL signal from the captured page (a role, a recent post, company news, a launch).",
    "- NEVER fabricate a specific fact, compliment, or metric that isn't supported by the input. If you have no",
    "  concrete signal, use a role/industry angle and keep it shorter and lower-commitment.",
    "- First line must be about THEM and impossible to have sent to anyone else.",
    "- Exactly one CTA, easy to say yes to. No walls of links. No 'I hope this finds you well', no buzzwords.",
    "- Match the channel's rules:",
    "    email: 50-125 words, plus 2 subject-line options under ~45 chars.",
    "    linkedin: a connection note under 300 chars OR a 2-4 sentence DM (no hard pitch).",
    "    instagram / x: 1-3 casual sentences that reference their content.",
    "- Write like a human talking, not a brochure.",
    "",
    "Output ONLY the message content (and subject lines for email). No preamble, no explanation, no meta-commentary.",
  ].join("\n");
}

function buildUserPrompt({ signals, offer, channel, goal, sender }) {
  return [
    `CHANNEL: ${channel}`,
    goal ? `GOAL OF MESSAGE: ${goal}` : "",
    "",
    "MY OFFER / WHO I AM:",
    offer || "(not provided — infer a reasonable generic B2B offer and note assumptions minimally)",
    sender ? `\nSIGN OFF AS: ${sender}` : "",
    "",
    "CAPTURED PAGE SIGNALS (source of the personalization hook):",
    `- site: ${signals.site}`,
    `- url: ${signals.url}`,
    `- title: ${signals.title}`,
    `- heading: ${signals.heading}`,
    `- og/meta: ${signals.ogTitle} | ${signals.metaDescription}`,
    signals.selection ? `- USER HIGHLIGHTED (prioritize as the hook): ${signals.selection}` : "",
    `- visible text (excerpt): ${signals.bodyText}`,
  ]
    .filter(Boolean)
    .join("\n");
}

async function generateOutreach(payload) {
  const { apiKey, model } = await chrome.storage.local.get(["apiKey", "model"]);
  if (!apiKey) {
    return { ok: false, error: "No API key set. Open the extension Options and paste your Anthropic API key." };
  }

  const body = {
    model: model || DEFAULT_MODEL,
    max_tokens: 1200,
    system: buildSystemPrompt(),
    messages: [{ role: "user", content: buildUserPrompt(payload) }],
  };

  let res;
  try {
    res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": ANTHROPIC_VERSION,
        // Required for direct calls from a browser/extension origin.
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    return { ok: false, error: "Network error calling Anthropic: " + e.message };
  }

  if (!res.ok) {
    let detail = "";
    try {
      const j = await res.json();
      detail = j?.error?.message || JSON.stringify(j);
    } catch {
      detail = await res.text();
    }
    return { ok: false, error: `API error ${res.status}: ${detail}` };
  }

  const data = await res.json();
  const text = (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  return { ok: true, text, model: data.model, usage: data.usage };
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type === "GENERATE") {
    generateOutreach(msg.payload).then(sendResponse);
    return true; // keep the message channel open for the async response
  }
});
