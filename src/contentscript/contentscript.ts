console.log("Auto collect is starting");

const chatInput = document.getElementsByClassName("chat-input").item(0);

const observer = new MutationObserver(function () {
  const bonus = document.getElementsByClassName("claimable-bonus__icon");

  if (bonus && bonus[0]) {
    bonus[0].dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
  }
});

observer.observe(chatInput, {
  attributes: true,
  childList: true,
  subtree: true,
});
