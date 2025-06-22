# YouTube Theme Changer Extension

This repository contains a simple Chrome extension that allows you to customize YouTube's appearance. The popup menu uses a sleek gradient design and lets you set a background color or your own image, pick from several font styles, choose a font color, and apply the changes instantly. The **You Theme** page lets you save custom themes which are then listed in the "Pre-made Theme" dropdown. A built-in **Theme store** shows image-based themes bundled with the extension and lets you preview and apply them. All settings are stored using Chrome's local storage so larger background images can be used without hitting synchronization limits.

## Features
1. Change the page background color or set a custom image that fills the screen and stays fixed while scrolling.
2. Select from a wide range of font styles—including Helvetica, Calibri, Segoe UI and more—that override all text on the page. The dropdown shows each font using its own style for easy preview.
3. Switch the font color between white and black (applies to all text).
4. Create your own themes in the **You Theme** page; choose whether to use a background color or a custom image and the theme will appear in the "Pre-made Theme" drop-down.
5. Browse built-in themes through the **Theme store**, open their details and use them with a single click.
6. Add your own built-in themes by editing the `storeThemes` array in `popup.js`. Store themes only use images, so set a `bgImage` data URI or image path along with optional font settings.

## Installation
1. Open Google Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode** (toggle in the top right corner).
3. Click **Load unpacked** and select the `youtube-theme-extension` folder.

After loading, open YouTube and click the extension icon to access the popup menu. Selecting a color, font or image applies the change immediately on the page. Use the **You Theme** button to save your own presets. The **Theme store** lets you preview built-in themes and apply them. Custom background images automatically cover the screen and remain fixed as you scroll.
