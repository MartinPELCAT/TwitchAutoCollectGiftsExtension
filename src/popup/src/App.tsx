import React, { useEffect } from "react";
import Button from "./components/Button";

function App() {
  const hideChat = () => {
    const modifyDOM = () => {
      const el = document.getElementsByClassName(
        "chat-scrollable-area__message-container"
      )[0];

      el && el.remove();
      return document.body.innerHTML;
    };

    chrome.tabs?.executeScript({
      code: "(" + modifyDOM + ")();",
    });
  };

  const autoCollect = () => {
    const modifyDOM = () => {
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
      return document.body.innerHTML;
    };

    chrome.tabs?.executeScript({
      code: "(" + modifyDOM + ")();",
    });
  };

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
      console.log(tab);
    });
  }, []);

  return (
    <div className="bg-gray-400 text-center py-1 lg:px-4 w-64">
      <div className="p-2 items-center leading-none block" role="alert">
        <Button
          buttonText="Auto collect + Hide chat"
          onClick={() => {
            hideChat();
            autoCollect();
          }}
        />
        <Button buttonText="Hide chat" onClick={hideChat} />
        <Button buttonText="Auto collect" onClick={autoCollect} />
      </div>
    </div>
  );
}

export default App;
