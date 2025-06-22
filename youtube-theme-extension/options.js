document.addEventListener('DOMContentLoaded', () => {
  const themeName = document.getElementById('themeName');
  const themeBgColor = document.getElementById('themeBgColor');
  const themeFontStyle = document.getElementById('themeFontStyle');
  const addThemeBtn = document.getElementById('addTheme');
  const themesContainer = document.getElementById('themesContainer');

  function renderThemes(themes) {
    themesContainer.innerHTML = '';
    themes.forEach((t, i) => {
      const div = document.createElement('div');
      div.textContent = `${i+1}. ${t.name} - ${t.bgColor} - ${t.fontStyle}`;
      themesContainer.appendChild(div);
    });
  }

  chrome.storage.sync.get('themes', (data) => {
    const themes = data.themes || [];
    renderThemes(themes);
  });

  addThemeBtn.addEventListener('click', () => {
    chrome.storage.sync.get('themes', (data) => {
      const themes = data.themes || [];
      themes.push({
        name: themeName.value,
        bgColor: themeBgColor.value,
        fontStyle: themeFontStyle.value
      });
      chrome.storage.sync.set({ themes }, () => {
        renderThemes(themes);
        themeName.value = '';
      });
    });
  });
});
