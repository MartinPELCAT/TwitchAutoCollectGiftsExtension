console.log("Auto collect is starting");

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

observer.observe(document, {
  attributes: true,
  childList: true,
  subtree: true,
});
