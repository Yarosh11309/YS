// Built-in themes for the Theme store. Images can be embedded as data URIs or
// use a relative path which will be resolved with `chrome.runtime.getURL`.
const storeThemes = [
  {
    name: 'Sunny Day',
    description: 'Bright colors and comic font.',
    fontStyle: 'Comic Sans MS',
    fontColor: '#000000',
    bgImage:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA8CAIAAAB+RarbAAAAY0lEQVR4nO3PAQ3AIADAMMC/HOTghbv4k71VsM179viT9XXA2wzXGa4zXGe4znCd4TrDdYbrDNcZrjNcZ7jOcJ3hOsN1husM1xmuM1xnuM5wneE6w3WG6wzXGa4zXGe4znDdA/8wAwcclW70AAAAAElFTkSuQmCC'
  },
  {
    name: 'Midnight',
    description: 'Dark background with white text.',
    fontStyle: 'Arial',
    fontColor: '#FFFFFF',
    bgImage:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA8CAIAAAB+RarbAAAAY0lEQVR4nO3PAQ3AIADAMEAIStCJ3rv4k71VsM197viT9XXA2wzXGa4zXGe4znCd4TrDdYbrDNcZrjNcZ7jOcJ3hOsN1husM1xmuM1xnuM5wneE6w3WG6wzXGa4zXGe4znDdA2tSAWh3Olc5AAAAAElFTkSuQmCC'
  },
  {
    name: 'Ocean',
    description: 'Deep blue tones and modern font.',
    fontStyle: 'Trebuchet MS',
    fontColor: '#FFFFFF',
    bgImage:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA8CAIAAAB+RarbAAAAY0lEQVR4nO3PQRHAIADAMOCJMDQhfy62uy5R0M59z/iT9XXA2wzXGa4zXGe4znCd4TrDdYbrDNcZrjNcZ7jOcJ3hOsN1husM1xmuM1xnuM5wneE6w3WG6wzXGa4zXGe4znDdA5f3AUC0D5AUAAAAAElFTkSuQmCC'
  },
  {
    name: 'Fiery Sunset',
    description: 'Warm gradient with bold text.',
    fontStyle: 'Impact',
    fontColor: '#FFFFFF',
    bgImage:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA8CAIAAAB+RarbAAAAYElEQVR4nO3PAQ3AIADAMEAr/i2Ai5PsrYJtnj1+Zb0O+JrhOsN1husM1xmuM1xnuM5wneE6w3WG6wzXGa4zXGe4znCd4TrDdYbrDNcZrjNcZ7jOcJ3hOsN1husM1xmuu80OAduWWy5+AAAAAElFTkSuQmCC'
  }
];

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

  const mainPage = document.getElementById('mainPage');
  const storePage = document.getElementById('storePage');
  const youThemePage = document.getElementById('youThemePage');
  const thumbnails = document.getElementById('thumbnails');
  const themeDetails = document.getElementById('themeDetails');
  const themesContainer = document.getElementById('themesContainer');
  const youThemeBtn = document.getElementById('youThemeBtn');
  const storeBtn = document.getElementById('storeBtn');
  const addThemeBtn = document.getElementById('addTheme');
  const themeName = document.getElementById('themeName');
  const themeBgColor = document.getElementById('themeBgColor');
  const themeBgImage = document.getElementById('themeBgImage');
  const themeFontStyle = document.getElementById('themeFontStyle');
  const themeFontColor = document.getElementById('themeFontColor');

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
    themeSelect.innerHTML = '<option value="">None</option>';
    themes.forEach((t, i) => {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = t.name;
      themeSelect.appendChild(option);
    });
  }

  function resolveImage(img) {
    if (!img) return null;
    return /^data:|^https?:/.test(img) ? img : chrome.runtime.getURL(img);
  }

  function renderStore(themes) {
    thumbnails.innerHTML = '';
    themeDetails.style.display = 'none';
    thumbnails.style.display = 'flex';
    themes.forEach((t, i) => {
      const div = document.createElement('div');
      div.className = 'thumb';
      div.style.width = '80px';
      div.style.height = '60px';
      div.style.cursor = 'pointer';
      div.style.border = '1px solid #ccc';
      div.style.backgroundImage = `url(${resolveImage(t.bgImage)})`;
      div.style.backgroundSize = 'cover';
      div.style.backgroundPosition = 'center';
      div.addEventListener('click', () => showDetails(t));
      thumbnails.appendChild(div);
    });
  }

  function showDetails(theme) {
    thumbnails.style.display = 'none';
    themeDetails.style.display = 'block';
    themeDetails.innerHTML = '';
    const back = document.createElement('button');
    back.textContent = '\u2190 Back';
    back.className = 'backBtn';
    themeDetails.appendChild(back);
    back.addEventListener('click', () => {
      themeDetails.style.display = 'none';
      thumbnails.style.display = 'flex';
    });
    const title = document.createElement('h4');
    title.textContent = theme.name;
    themeDetails.appendChild(title);
    const preview = document.createElement('div');
    preview.style.width = '100%';
    preview.style.height = '80px';
    preview.style.backgroundImage = `url(${resolveImage(theme.bgImage)})`;
    preview.style.backgroundSize = 'cover';
    preview.style.backgroundPosition = 'center';
    themeDetails.appendChild(preview);
    const font = document.createElement('p');
    font.style.fontFamily = theme.fontStyle || 'inherit';
    font.textContent = `Font: ${theme.fontStyle || 'Default'}`;
    themeDetails.appendChild(font);
    const color = document.createElement('p');
    color.style.color = theme.fontColor || '#000000';
    color.textContent = `Font color: ${theme.fontColor || 'Default'}`;
    themeDetails.appendChild(color);
    if (theme.description) {
      const desc = document.createElement('p');
      desc.textContent = theme.description;
      themeDetails.appendChild(desc);
    }
    const useBtn = document.createElement('button');
    useBtn.textContent = 'Use theme';
    themeDetails.appendChild(useBtn);
    useBtn.addEventListener('click', () => {
      applyThemeFromStore(theme);
    });
  }

  function renderYouThemes(themes) {
    themesContainer.innerHTML = '';
    themes.forEach((t, i) => {
      const div = document.createElement('div');
      const color = t.fontColor ? ` - ${t.fontColor}` : '';
      const img = t.bgImage ? ' - image' : '';
      div.textContent = `${i + 1}. ${t.name} - ${t.bgColor} - ${t.fontStyle}${color}${img}`;
      themesContainer.appendChild(div);
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
        if (theme.bgImage) {
          currentBgImage = theme.bgImage;
          document.querySelector('input[value="image"]').checked = true;
          colorRow.style.display = 'none';
          imageRow.style.display = 'block';
        } else {
          document.querySelector('input[value="color"]').checked = true;
          colorRow.style.display = 'block';
          imageRow.style.display = 'none';
          currentBgImage = null;
        }
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

  function applyThemeFromStore(theme) {
    const data = {
      fontStyle: theme.fontStyle || '',
      fontColor: theme.fontColor || ''
    };
    if (theme.bgImage) {
      data.bgImage = resolveImage(theme.bgImage);
    }
    const done = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'refresh' });
        }
      });
    };
    chrome.storage.local.set(data, () => {
      const keys = ['bgColor'];
      if (!theme.bgImage) keys.push('bgImage');
      chrome.storage.local.remove(keys, done);
    });
  }

  function loadStore() {
    renderStore(storeThemes);
  }

  function loadYouThemes() {
    chrome.storage.local.get('themes', (data) => {
      const themes = data.themes || [];
      renderYouThemes(themes);
      populateThemes(themes);
    });
  }

  youThemeBtn.addEventListener('click', () => {
    mainPage.style.display = 'none';
    storePage.style.display = 'none';
    youThemePage.style.display = 'block';
    loadYouThemes();
  });

  storeBtn.addEventListener('click', () => {
    mainPage.style.display = 'none';
    youThemePage.style.display = 'none';
    storePage.style.display = 'block';
    loadStore();
  });

  document.querySelectorAll('.backBtn').forEach((btn) => {
    btn.addEventListener('click', () => {
      youThemePage.style.display = 'none';
      storePage.style.display = 'none';
      mainPage.style.display = 'block';
    });
  });

  addThemeBtn.addEventListener('click', () => {
    const files = themeBgImage.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => saveTheme(reader.result);
      reader.readAsDataURL(files[0]);
    } else {
      saveTheme(null);
    }
  });

  function saveTheme(imageData) {
    chrome.storage.local.get('themes', (data) => {
      const themes = data.themes || [];
      const theme = {
        name: themeName.value,
        bgColor: themeBgColor.value,
        fontStyle: themeFontStyle.value,
        fontColor: themeFontColor.value
      };
      if (imageData) theme.bgImage = imageData;
      themes.push(theme);
      chrome.storage.local.set({ themes }, () => {
        renderYouThemes(themes);
        populateThemes(themes);
        themeName.value = '';
        themeBgColor.value = '#ffffff';
        themeFontStyle.value = '';
        themeFontColor.value = '';
        themeBgImage.value = '';
      });
    });
  }
});
