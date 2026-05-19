const sidebar = document.querySelector("#sidebar");
const pageContent = document.querySelector("#pageContent");
const overlay = document.querySelector("#sidebarOverlay");
const openButton = document.querySelector("#openSidebar");
const closeButton = document.querySelector("#closeSidebar");

const floatingClasses = [
  "left-3",
  "top-16",
  "bottom-2",
  "rounded-2xl",
  "shadow-2xl",
  "shadow-zinc-950/15",
  "backdrop-blur",
  "bg-white/95",
];

const pinnedClasses = [
  "left-0",
  "top-0",
  "bottom-0",
  "rounded-none",
  "shadow-none",
  "bg-white",
];

const openButtonHomeClasses = ["left-4", "top-4"];
const openButtonPinnedClasses = ["left-[11.75rem]", "top-3"];

let closeTimer;
let isPinned = false;

function setClasses(element, classNames, enabled) {
  classNames.forEach((className) => {
    element?.classList.toggle(className, enabled);
  });
}

function setPinnedStyles(pinned) {
  setClasses(sidebar, floatingClasses, !pinned);
  setClasses(sidebar, pinnedClasses, pinned);
}

function resetOpenButton() {
  setClasses(openButton, openButtonPinnedClasses, false);
  setClasses(openButton, openButtonHomeClasses, true);
  openButton?.classList.remove("hidden", "pointer-events-none");
  closeButton?.classList.add("hidden", "opacity-0", "pointer-events-none");
}

function showSidebar() {
  window.clearTimeout(closeTimer);
  sidebar?.classList.remove("-translate-x-[calc(100%+1rem)]");
  overlay?.classList.remove("hidden");
  openButton?.setAttribute("aria-expanded", "true");
}

function hideSidebar() {
  isPinned = false;
  resetOpenButton();
  setPinnedStyles(false);
  sidebar?.classList.add("-translate-x-[calc(100%+1rem)]");
  pageContent?.classList.remove("sm:pl-64");
  overlay?.classList.add("hidden");
  openButton?.setAttribute("aria-expanded", "false");
  openButton?.setAttribute("aria-label", "開啟側邊欄");
}

function scheduleHideSidebar() {
  if (isPinned) {
    return;
  }

  closeTimer = window.setTimeout(hideSidebar, 160);
}

function pinSidebar() {
  isPinned = true;
  setPinnedStyles(true);
  showSidebar();
  pageContent?.classList.add("sm:pl-64");
  closeButton?.classList.add("hidden", "opacity-0", "pointer-events-none");
  openButton?.classList.remove("hidden");
  openButton?.setAttribute("aria-label", "收合側邊欄");
  setClasses(openButton, openButtonHomeClasses, false);
  setClasses(openButton, openButtonPinnedClasses, true);
}

function togglePinnedSidebar() {
  if (isPinned) {
    hideSidebar();
    return;
  }

  pinSidebar();
}

openButton?.addEventListener("mouseenter", showSidebar);
openButton?.addEventListener("mouseleave", scheduleHideSidebar);
openButton?.addEventListener("click", togglePinnedSidebar);
sidebar?.addEventListener("mouseenter", showSidebar);
sidebar?.addEventListener("mouseleave", scheduleHideSidebar);
closeButton?.addEventListener("click", hideSidebar);
overlay?.addEventListener("click", hideSidebar);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideSidebar();
  }
});
