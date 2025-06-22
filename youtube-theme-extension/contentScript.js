function applyStyles(data) {
  if (data.bgColor) {
    document.documentElement.style.backgroundColor = data.bgColor;
  }
  if (data.fontStyle) {
    document.body.style.fontFamily = data.fontStyle;
  }
  if (data.bgImage) {
    document.documentElement.style.backgroundImage = `url(${data.bgImage})`;
    document.documentElement.style.backgroundSize = 'cover';
  }
}

chrome.storage.sync.get(['bgColor', 'fontStyle', 'bgImage'], applyStyles);

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
