document.addEventListener('DOMContentLoaded', () => {
  const bgColor = document.getElementById('bgColor');
  const fontStyle = document.getElementById('fontStyle');
  const bgImage = document.getElementById('bgImage');
  const themeSelect = document.getElementById('themeSelect');
  const saveBtn = document.getElementById('save');

  // Load saved options
  chrome.storage.sync.get(['bgColor', 'fontStyle', 'bgImage', 'themes'], (data) => {
    if (data.bgColor) bgColor.value = data.bgColor;
    if (data.fontStyle) fontStyle.value = data.fontStyle;
    if (data.themes) populateThemes(data.themes);
  });

  function populateThemes(themes) {
    themes.forEach((t, i) => {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = t.name;
      themeSelect.appendChild(option);
    });
  }

  themeSelect.addEventListener('change', () => {
    chrome.storage.sync.get('themes', (data) => {
      const theme = data.themes && data.themes[themeSelect.value];
      if (theme) {
        bgColor.value = theme.bgColor || '#ffffff';
        fontStyle.value = theme.fontStyle || '';
      }
    });
  });

  saveBtn.addEventListener('click', () => {
    const files = bgImage.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        saveOptions(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      saveOptions();
    }
  });

  function saveOptions(imageData) {
    const data = {
      bgColor: bgColor.value,
      fontStyle: fontStyle.value
    };
    if (imageData) data.bgImage = imageData;
    chrome.storage.sync.set(data);
  }
});
