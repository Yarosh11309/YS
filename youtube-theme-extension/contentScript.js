const STYLE_ID = 'yt-theme-extension-styles';

function applyStyles(data) {
  const app = document.querySelector('ytd-app');
  const setStyle = (prop, value) => {
    document.documentElement.style[prop] = value || '';
    document.body.style[prop] = value || '';
    if (app) app.style[prop] = value || '';
  };

  setStyle('backgroundColor', data.bgColor);

  if (data.bgImage) {
    const val = `url(${data.bgImage})`;
    setStyle('backgroundImage', val);
    setStyle('backgroundSize', 'cover');
    setStyle('backgroundRepeat', 'no-repeat');
  } else {
    setStyle('backgroundImage', '');
  }

  // Inject style element to override fonts and colors across the page
  let styleEl = document.getElementById(STYLE_ID);
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    document.head.appendChild(styleEl);
  }

  const font = data.fontStyle ? `font-family: ${data.fontStyle} !important;` : '';
  const color = data.fontColor ? `color: ${data.fontColor} !important;` : '';
  if (font || color) {
    styleEl.textContent = `* { ${font} ${color} }`;
  } else {
    styleEl.textContent = '';
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
