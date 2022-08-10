console.log("Auto collect is starting");

const waithForChatToAppear = (selector: string) =>
  new Promise<Element>((resolve) => {
    const foundObject = document.querySelectorAll(selector).item(0);
    if (foundObject) return resolve(foundObject);

    const observer = new MutationObserver(function () {
      const foundObject = document.querySelectorAll(selector).item(0);
      if (foundObject) {
        observer.disconnect();
        return resolve(foundObject);
      }
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  });

const setupBonusChestObserver = (containerToWatch: Element) => {
  const observer = new MutationObserver(function () {
    const bonus = document
      .getElementsByClassName("claimable-bonus__icon")
      .item(0);

    bonus?.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
  });

  observer.observe(containerToWatch, {
    childList: true,
    subtree: true,
  });
};

waithForChatToAppear(".chat-input").then((chatInput) => {
  setupBonusChestObserver(chatInput);
});
