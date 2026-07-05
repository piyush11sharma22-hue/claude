# Outreach Assistant — Chrome Extension

A companion to the **AI Sales Team** skills. Capture the person or company on the page you're viewing (LinkedIn, a company site, Instagram, X), generate a hyper-personalized email or DM with Claude, and drop it straight into your compose box.

This is the "real data" half of the system: the Claude skills know *how* to write great outreach; this extension gives them the *actual* signals from the page in front of you.

## What it does

1. **Capture** — reads the visible text of the active tab (role, headline, recent post, company details).
2. **Generate** — sends those signals + your offer to the Anthropic API and gets back a personalized message grounded in a real hook (never a fabricated compliment).
3. **Insert / Copy** — drops the message into the Gmail / LinkedIn / X compose box, or copies it.

## Install (unpacked)

1. `chrome://extensions` → toggle **Developer mode** on (top right).
2. **Load unpacked** → select this `extension/` folder.
3. Click the extension's **Details → Extension options** (or the ⚙︎ in the popup) and paste your **Anthropic API key** (get one at console.anthropic.com). Pick a model (defaults to Claude Opus 4.8).

## Use

1. Open a LinkedIn profile / company page / Instagram or X profile.
2. Click the extension icon → **Capture this page**.
3. Fill in your offer, channel, and goal → **Generate message**.
4. **Insert into compose box**, or **Copy**.

## How it's built (Manifest V3)

```
extension/
├── manifest.json              # permissions: activeTab, scripting, storage; host: api.anthropic.com
├── background/service-worker.js  # ONLY place the API key is used; calls /v1/messages
├── content/
│   ├── extract.js             # pulls visible signals from the active tab
│   └── autofill.js            # inserts text into Gmail/LinkedIn/X compose boxes
├── popup/                     # the UI (capture → generate → insert)
└── options/                   # store API key + model choice
```

- The API key lives in `chrome.storage.local` and is sent **only** to `api.anthropic.com` — never to page scripts.
- Content functions run on demand via `chrome.scripting.executeScript` (using `activeTab`), so the extension has no standing access to your browsing.
- API calls use `POST https://api.anthropic.com/v1/messages` with `anthropic-version: 2023-06-01` and `anthropic-dangerous-direct-browser-access: true` (required for browser-origin calls).

## Responsible use

- The generator is instructed to build on a **real** signal and to **never fabricate** specific facts about a person.
- It **drafts** — you review and send. Follow the outreach rules that apply to you (CAN-SPAM / GDPR / CASL): accurate sender info, a real reason for contact, and honor opt-outs.
- LinkedIn, Instagram, and X prohibit automated scraping and bulk messaging in their ToS. This tool reads only the single page you're actively viewing and never auto-sends — keep it that way.

## Icons

No icon files are bundled (Chrome shows a default puzzle-piece icon). To add your own, drop `icon16.png`, `icon48.png`, `icon128.png` in an `icons/` folder and add an `"icons"` block plus `"default_icon"` under `"action"` in `manifest.json`.
