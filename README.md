# Alt Double-Click to Download Image (Chrome Extension)

Hold **Option/Alt** and **double-click** any image (or element with a CSS background-image) to download it instantly to your Downloads folder. Uses the Chrome `downloads` API, so it works even when sites set CORS or funky headers.

## Features
- ⌥ + double-click to save image
- Works with `<img>` and most `background-image` elements
- Zero popups, no dialogs, files drop straight into **Downloads**

## Install (Developer Mode)
1. Clone this repo or download it as a folder.
2. Open Chrome → `chrome://extensions`
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select this folder.

## Usage
- Browse to any page with images.
- Hold **Option (⌥)** and **double-click** the image.
- The image saves to your Downloads directory.

## Files
- `manifest.json` – MV3 manifest (declares `downloads` permission, scripts, icons)
- `background.js` – receives messages and calls `chrome.downloads.download(...)`
- `content.js` – listens for ⌥ + double-click, extracts image URL, sends to background

## Customizations
### No modifier (just double-click)
In `content.js`, remove this line:
```js
if (!e.altKey) return;