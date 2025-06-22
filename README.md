# YouTube Theme Changer Extension

This repository contains a simple Chrome extension that allows you to customize YouTube's appearance. The popup menu is styled with a modern design and lets you set a background color or your own image, pick from several font styles, choose a font color, and apply the changes instantly. Administrators can also create pre-made themes in the **You Theme** page. A separate **Theme store** inside the popup shows previews of these themes. All settings are stored using Chrome's local storage so larger background images can be used without hitting synchronization limits.

## Features
1. Change the page background color or set a custom image that fills the screen and stays fixed while scrolling.
2. Select from a variety of font styles that override all text on the page.
3. Switch the font color between white and black (applies to all text).
4. Add pre-made themes in the **You Theme** page (administrator mode), including custom background images.
5. Browse administrator themes through the **Theme store** with clickable thumbnails and details.

## Installation
1. Open Google Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode** (toggle in the top right corner).
3. Click **Load unpacked** and select the `youtube-theme-extension` folder.

After loading, open YouTube and click the extension icon to access the popup menu. Selecting a color, font or image applies the change immediately on the page. Use the **You Theme** button to manage pre-made themes and upload background images for them. The **Theme store** lets you preview themes without leaving the popup. Custom background images automatically cover the screen and remain fixed as you scroll.
