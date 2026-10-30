/**
 * Shared helpers for overlays (mobile menu, command palette): a counted scroll lock, so two overlays closing and
 * opening in the same tick cannot unlock the page by mistake, and "inert" for everything behind a dialog.
 */
let locks = 0;

export function lockScroll(): () => void {
  locks += 1;
  document.body.style.overflow = "hidden";
  let done = false;
  return () => {
    if (done) return;
    done = true;
    locks = Math.max(0, locks - 1);
    if (locks === 0) document.body.style.overflow = "";
  };
}

/** Makes every direct child of <body> except those in `keep` (and scripts) inert, so focus and screen readers stay in the dialog. Returns the undo. */
export function inertExcept(keep: Array<Element | null>): () => void {
  const changed: Element[] = [];
  Array.from(document.body.children).forEach((el) => {
    if (keep.includes(el) || el.tagName === "SCRIPT" || el.hasAttribute("inert")) return;
    el.setAttribute("inert", "");
    changed.push(el);
  });
  return () => changed.forEach((el) => el.removeAttribute("inert"));
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

/** Keeps Tab and Shift+Tab inside `root`. Use as a keydown handler. */
export function trapTab(e: KeyboardEvent, root: HTMLElement | null) {
  if (e.key !== "Tab" || !root) return;
  const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null || el === document.activeElement);
  if (!items.length) {
    e.preventDefault();
    return;
  }
  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement;
  if (e.shiftKey && (active === first || !root.contains(active))) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && (active === last || !root.contains(active))) {
    e.preventDefault();
    first.focus();
  }
}
