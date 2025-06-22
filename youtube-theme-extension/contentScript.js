function applyStyles(data) {
  if (data.bgColor) {
    document.documentElement.style.backgroundColor = data.bgColor;
    document.body.style.backgroundColor = data.bgColor;
    const app = document.querySelector('ytd-app');
    if (app) {
      app.style.backgroundColor = data.bgColor;
    }
  }
  if (data.fontStyle) {
    document.documentElement.style.fontFamily = data.fontStyle;
    document.body.style.fontFamily = data.fontStyle;
    const app = document.querySelector('ytd-app');
    if (app) {
      app.style.fontFamily = data.fontStyle;
    }
  }
  if (data.bgImage) {
    document.documentElement.style.backgroundImage = `url(${data.bgImage})`;
    document.documentElement.style.backgroundSize = 'cover';
    document.body.style.backgroundImage = `url(${data.bgImage})`;
    document.body.style.backgroundSize = 'cover';
    const app = document.querySelector('ytd-app');
    if (app) {
      app.style.backgroundImage = `url(${data.bgImage})`;
      app.style.backgroundSize = 'cover';
    }
  }
}

chrome.storage.sync.get(['bgColor', 'fontStyle', 'bgImage'], applyStyles);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'refresh') {
    chrome.storage.sync.get(['bgColor', 'fontStyle', 'bgImage'], applyStyles);
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync') {
    const data = {
      bgColor: changes.bgColor ? changes.bgColor.newValue : undefined,
      fontStyle: changes.fontStyle ? changes.fontStyle.newValue : undefined,
      bgImage: changes.bgImage ? changes.bgImage.newValue : undefined
    };
    applyStyles(data);
  }
});
