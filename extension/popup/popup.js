import { extractPageSignals } from "../content/extract.js";
import { insertIntoCompose } from "../content/autofill.js";

const $ = (id) => document.getElementById(id);
let signals = null;

async function activeTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

function setStatus(msg) {
  $("status").textContent = msg || "";
}

$("openOptions").addEventListener("click", (e) => {
  e.preventDefault();
  chrome.runtime.openOptionsPage();
});

$("capture").addEventListener("click", async () => {
  setStatus("");
  const tab = await activeTab();
  try {
    const [res] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractPageSignals,
    });
    signals = res.result;
    $("captured").classList.remove("hidden");
    $("captured").textContent =
      `Captured: ${signals.heading || signals.title} · ${signals.site} · ` +
      `${signals.bodyText.length} chars of context`;
    $("generate").disabled = false;
  } catch (e) {
    setStatus("Could not read this page: " + e.message);
  }
});

$("generate").addEventListener("click", async () => {
  if (!signals) return setStatus("Capture the page first.");
  const payload = {
    signals,
    offer: $("offer").value.trim(),
    channel: $("channel").value,
    goal: $("goal").value.trim(),
    sender: $("sender").value.trim(),
  };
  $("generate").disabled = true;
  setStatus("Generating…");
  const resp = await chrome.runtime.sendMessage({ type: "GENERATE", payload });
  $("generate").disabled = false;
  if (!resp?.ok) return setStatus(resp?.error || "Generation failed.");
  $("result").value = resp.text;
  $("resultWrap").classList.remove("hidden");
  setStatus(`Done · ${resp.model}`);
});

$("copy").addEventListener("click", async () => {
  await navigator.clipboard.writeText($("result").value);
  setStatus("Copied to clipboard.");
});

$("insert").addEventListener("click", async () => {
  const tab = await activeTab();
  try {
    const [res] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: insertIntoCompose,
      args: [$("result").value],
    });
    setStatus(
      res.result && res.result.startsWith("inserted")
        ? "Inserted into the compose box."
        : "No compose box found — use Copy and paste it in."
    );
  } catch (e) {
    setStatus("Insert failed: " + e.message + " — use Copy instead.");
  }
});

// Restore the user's last offer/sender for convenience.
chrome.storage.local.get(["lastOffer", "lastSender"]).then(({ lastOffer, lastSender }) => {
  if (lastOffer) $("offer").value = lastOffer;
  if (lastSender) $("sender").value = lastSender;
});
["offer", "sender"].forEach((id) =>
  $(id).addEventListener("change", () =>
    chrome.storage.local.set({ lastOffer: $("offer").value, lastSender: $("sender").value })
  )
);
