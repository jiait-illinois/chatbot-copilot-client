function generateEndpoint(title, url, graphic) {
  let chaturl = url.replace('canvas?', 'webchat?');
  let chattitle = title;
  let chatgraphic = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
  chatgraphic = graphic || chatgraphic;

  const launcher = document.createElement("button");
  launcher.id = "open-chat";
  launcher.type = "button";
  launcher.setHTMLUnsafe(chatgraphic);
  launcher.setAttribute("aria-label", "Open chatbot");
  launcher.setAttribute("aria-expanded", "false");

  const popup = document.createElement("section");
  popup.className = "copilot-popup";
  popup.dataset.open = "false";
  popup.setAttribute("role", "dialog");
  popup.setAttribute("aria-label", "Chat Assistant");

  popup.innerHTML = `
    <div class="copilot-header" role="complementary" aria-label="Chat Assistant">
      <span id="copilot-title" class="copilot-title">${chattitle}</span>
      <button class="copilot-close" type="button" aria-label="Close chatbot">&times;</button>
    </div>
    <div id="copilot-wrapper">
      <iframe class="copilot-frame" title="${chattitle} chatbot" referrerpolicy="strict-origin-when-cross-origin"></iframe>
    </div>
  `;

  const closeButton = popup.querySelector(".copilot-close");
  const iframe = popup.querySelector(".copilot-frame");

  let loaded = false;

  function setOpen(open) {
    if (chaturl === '') {
      console.error("WEB_APP_URL is not set.");
      return;
    }
    if (open && !loaded) {
      popup.querySelector(".copilot-title").textContent = chattitle;
      iframe.src = chaturl;
      iframe.title = `${chattitle} chatbot`;
      loaded = true;
    }

    popup.dataset.open = String(open);
    launcher.setAttribute("aria-expanded", String(open));
    launcher.setAttribute(
      "aria-label",
      open ? "Close chatbot" : "Open chatbot"
    );

    if (open) {
      closeButton.focus();
    } else {
      launcher.focus();
    }
  }

  showChat = () => setOpen(true);

  launcher.addEventListener("click", () => {
    setOpen(popup.dataset.open !== "true");
  });

  closeButton.addEventListener("click", () => {
    setOpen(false);
  });

  document.addEventListener("DOMContentLoaded", () => {
    document.body.append(popup, launcher);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && popup.dataset.open === "true") {
      setOpen(false);
    }
  });
}
