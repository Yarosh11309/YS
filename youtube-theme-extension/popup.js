document.addEventListener('DOMContentLoaded', () => {
  const bgColor = document.getElementById('bgColor');
  const fontStyle = document.getElementById('fontStyle');
  const fontColor = document.getElementById('fontColor');
  const bgImage = document.getElementById('bgImage');
  const bgModeRadios = document.querySelectorAll('input[name="bgMode"]');
  const colorRow = document.getElementById('colorRow');
  const imageRow = document.getElementById('imageRow');
  const themeSelect = document.getElementById('themeSelect');
  const saveBtn = document.getElementById('save');

  // Load saved options
  let currentBgImage = null;
  chrome.storage.local.get(['bgColor', 'fontStyle', 'fontColor', 'bgImage', 'themes'], (data) => {
    if (data.bgColor) bgColor.value = data.bgColor;
    if (data.fontStyle) fontStyle.value = data.fontStyle;
    if (data.fontColor) fontColor.value = data.fontColor;
    if (data.themes) populateThemes(data.themes);
    if (data.bgImage) {
      currentBgImage = data.bgImage;
      document.querySelector('input[value="image"]').checked = true;
      colorRow.style.display = 'none';
      imageRow.style.display = 'block';
    }
  });

  function populateThemes(themes) {
    themes.forEach((t, i) => {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = t.name;
      themeSelect.appendChild(option);
    });
  }

  bgModeRadios.forEach((r) => {
    r.addEventListener('change', () => {
      if (r.value === 'image' && r.checked) {
        colorRow.style.display = 'none';
        imageRow.style.display = 'block';
      } else if (r.value === 'color' && r.checked) {
        colorRow.style.display = 'block';
        imageRow.style.display = 'none';
      }
    });
  });

  themeSelect.addEventListener('change', () => {
    chrome.storage.local.get('themes', (data) => {
      const theme = data.themes && data.themes[themeSelect.value];
      if (theme) {
        bgColor.value = theme.bgColor || '#ffffff';
        fontStyle.value = theme.fontStyle || '';
        if (theme.fontColor) fontColor.value = theme.fontColor;
      }
    });
  });

  saveBtn.addEventListener('click', () => {
    const useImage = document.querySelector('input[name="bgMode"]:checked').value === 'image';
    const files = bgImage.files;
    if (useImage && files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        saveOptions(reader.result, true);
      };
      reader.readAsDataURL(files[0]);
    } else {
      saveOptions(null, useImage);
    }
  });

  function saveOptions(imageData, useImage) {
    const data = {
      bgColor: bgColor.value,
      fontStyle: fontStyle.value,
      fontColor: fontColor.value
    };
    if (useImage) {
      if (imageData) {
        data.bgImage = imageData;
        currentBgImage = imageData;
      } else if (currentBgImage) {
        data.bgImage = currentBgImage;
      }
    }
    chrome.storage.local.set(data, () => {
      const afterSave = () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'refresh'});
          }
        });
      };
      if (!useImage) {
        chrome.storage.local.remove('bgImage', afterSave);
        currentBgImage = null;
      } else {
        afterSave();
      }
    });
  }
});
