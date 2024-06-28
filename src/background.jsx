let isEnabled = false;

const toggleExtension = async (tabId) => {
  isEnabled = !isEnabled;
  const action = isEnabled ? "enable" : "disable";

  await chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: (action) => {
      if (action === "enable") {
        document.body.dataset.extensionEnabled = "true";
      } else {
        delete document.body.dataset.extensionEnabled;
      }
    },
    args: [action],
  });

  updateIcon();
};

const updateIcon = () => {
  const iconPath = isEnabled
    ? "images/icon-enabled.png"
    : "images/icon-disabled.png";
  chrome.action.setIcon({ path: iconPath });
};

chrome.action.onClicked.addListener((tab) => {
  toggleExtension(tab.id);
});
