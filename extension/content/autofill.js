// Pure function injected via chrome.scripting.executeScript({ func, args: [text] }).
// Best-effort insert of `text` into the compose box on the active page.
// Tries the focused editable element first, then common Gmail / LinkedIn / generic targets.
// Returns a short status string so the popup can report success or fall back to copy.
export function insertIntoCompose(text) {
  const setNativeValue = (el, value) => {
    // Works for <textarea>/<input> incl. React-controlled fields.
    const proto = el instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
    if (setter) setter.call(el, value);
    else el.value = value;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  };

  const setContentEditable = (el, value) => {
    el.focus();
    // Replace content while keeping the editor's own change detection happy.
    el.textContent = "";
    const parts = value.split("\n");
    parts.forEach((line, i) => {
      el.appendChild(document.createTextNode(line));
      if (i < parts.length - 1) el.appendChild(document.createElement("br"));
    });
    el.dispatchEvent(new InputEvent("input", { bubbles: true }));
  };

  const tryEl = (el) => {
    if (!el) return false;
    if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) {
      setNativeValue(el, text);
      return true;
    }
    if (el.isContentEditable) {
      setContentEditable(el, text);
      return true;
    }
    return false;
  };

  // 1. The element the user has focused.
  if (tryEl(document.activeElement)) return "inserted:active";

  // 2. Known compose targets, most specific first.
  const selectors = [
    'div[aria-label="Message Body"]',                 // Gmail body
    'div[g_editable="true"]',                          // Gmail (older)
    "div.msg-form__contenteditable",                  // LinkedIn messaging
    'div[contenteditable="true"][role="textbox"]',    // LinkedIn / generic rich text
    'div[data-testid="dmComposerTextInput"]',         // X DMs
    "textarea",                                        // generic
    'div[contenteditable="true"]',                     // generic rich editor
  ];
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (tryEl(el)) return "inserted:" + sel;
  }

  return "not_found"; // popup will keep the Copy button as the fallback
}
