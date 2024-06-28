/* Things to do:
- Gather hightlighted text
  - Make menu under highlighted text
    - Menu should kind of look like [ - | Zoom Level: # | + ]
    - Zoom level should be a number 1-5 where 3 is the original text, 1 is the most simplified text, and 5 is the most detailed text
  - Be able to take highlighted text and send it to an OpenAI API call
  - Replace highlighted text with OpenAI API response 
    - After replacement the menu should look like [ - | Zoom Level: # | +  | ↺ ]
    - Latest replaced text should be stored under corresponding zoom level and highlighted text
  - Zoom levels 1 and 5 should not be accessible until corresponding zoome level 2 or 4 exist
  - While waiting for the call, disable functionality of the buttons and show some loading icon
*/

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Popup from "./components/Popup";

const getSelection = () => {
  return new Promise((resolve, reject) => {
    if (window.getSelection) {
      resolve(window.getSelection().toString());
    } else if (document.getSelection) {
      resolve(document.getSelection().toString());
    } else if (document.selection) {
      resolve(document.selection.createRange().text.toString());
    } else reject();
  });
};

const createPopup = (selection) => {
  const popupContainer = document.createElement("div");
  document.body.appendChild(popupContainer);
  ReactDOM.render(<Popup text={selection} />, popupContainer);
};

chrome.runtime.onMessage.addListener(async (request, sender, response) => {
  const { type } = request;
  if (type === "LOAD") {
    try {
      const selection = await getSelection();
      if (selection) {
        createPopup(selection);
        response({ success: true });
      } else {
        response({ success: false });
      }
    } catch (e) {
      response({ success: false });
    }
  }
});

const handleMouseUp = async () => {
  if (document.body.dataset.extensionEnabled === "true") {
    const selection = await getSelection();
    if (selection) {
      createPopup(selection);
    }
  }
};

document.addEventListener("mouseup", handleMouseUp);
