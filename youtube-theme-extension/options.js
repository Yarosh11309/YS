document.addEventListener('DOMContentLoaded', () => {
  const themeName = document.getElementById('themeName');
  const themeBgColor = document.getElementById('themeBgColor');
  const themeBgImage = document.getElementById('themeBgImage');
  const themeFontStyle = document.getElementById('themeFontStyle');
  const themeFontColor = document.getElementById('themeFontColor');
  const addThemeBtn = document.getElementById('addTheme');
  const themesContainer = document.getElementById('themesContainer');

  function renderThemes(themes) {
    themesContainer.innerHTML = '';
    themes.forEach((t, i) => {
      const div = document.createElement('div');
      const color = t.fontColor ? ` - ${t.fontColor}` : '';
      const img = t.bgImage ? ' - image' : '';
      div.textContent = `${i + 1}. ${t.name} - ${t.bgColor} - ${t.fontStyle}${color}${img}`;
      themesContainer.appendChild(div);
    });
  }

  chrome.storage.local.get('themes', (data) => {
    const themes = data.themes || [];
    renderThemes(themes);
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
        renderThemes(themes);
        themeName.value = '';
        themeBgColor.value = '#ffffff';
        themeFontStyle.value = '';
        themeFontColor.value = '';
        themeBgImage.value = '';
      });
    });
  }
});
