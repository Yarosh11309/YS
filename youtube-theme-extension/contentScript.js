function applyStyles(data) {
  const app = document.querySelector('ytd-app');
  const setStyle = (prop, value) => {
    document.documentElement.style[prop] = value || '';
    document.body.style[prop] = value || '';
    if (app) app.style[prop] = value || '';
  };

  setStyle('backgroundColor', data.bgColor);
  setStyle('fontFamily', data.fontStyle);
  setStyle('color', data.fontColor);

  if (data.bgImage) {
    const val = `url(${data.bgImage})`;
    setStyle('backgroundImage', val);
    setStyle('backgroundSize', 'cover');
  } else {
    setStyle('backgroundImage', '');
  }
}

chrome.storage.sync.get(['bgColor', 'fontStyle', 'fontColor', 'bgImage'], applyStyles);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'refresh') {
    chrome.storage.sync.get(['bgColor', 'fontStyle', 'fontColor', 'bgImage'], applyStyles);
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync') {
    const data = {
      bgColor: changes.bgColor ? changes.bgColor.newValue : undefined,
      fontStyle: changes.fontStyle ? changes.fontStyle.newValue : undefined,
      fontColor: changes.fontColor ? changes.fontColor.newValue : undefined,
      bgImage: changes.bgImage ? changes.bgImage.newValue : undefined
    };
    applyStyles(data);
  }
});
