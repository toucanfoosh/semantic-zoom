chrome.runtime.onInstalled.addListener(function () {
  console.log("Extension installed");
  // Set up extension defaults, initialize storage, etc.
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  console.log("Tab changed", activeInfo);
  // Perform actions when the user switches tabs
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "logMessage") {
    console.log("Message received from content script:", message.content);
  }
  // Send a response back to the sender
  sendResponse({ status: "Message received" });
  return true; // Keep the messaging channel open for asynchronous response
});
