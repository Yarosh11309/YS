document.addEventListener('DOMContentLoaded', () => {
  const themeName = document.getElementById('themeName');
  const themeBgColor = document.getElementById('themeBgColor');
  const themeFontStyle = document.getElementById('themeFontStyle');
  const themeFontColor = document.getElementById('themeFontColor');
  const addThemeBtn = document.getElementById('addTheme');
  const themesContainer = document.getElementById('themesContainer');

  function renderThemes(themes) {
    themesContainer.innerHTML = '';
    themes.forEach((t, i) => {
      const div = document.createElement('div');
      const color = t.fontColor ? ` - ${t.fontColor}` : '';
      div.textContent = `${i+1}. ${t.name} - ${t.bgColor} - ${t.fontStyle}${color}`;
      themesContainer.appendChild(div);
    });
  }

  chrome.storage.local.get('themes', (data) => {
    const themes = data.themes || [];
    renderThemes(themes);
  });

  addThemeBtn.addEventListener('click', () => {
    chrome.storage.local.get('themes', (data) => {
      const themes = data.themes || [];
      themes.push({
        name: themeName.value,
        bgColor: themeBgColor.value,
        fontStyle: themeFontStyle.value,
        fontColor: themeFontColor.value
      });
      chrome.storage.local.set({ themes }, () => {
        renderThemes(themes);
        themeName.value = '';
        themeBgColor.value = '#ffffff';
        themeFontStyle.value = '';
        themeFontColor.value = '';
      });
    });
  });
});
