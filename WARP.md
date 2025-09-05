# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Chrome extension that enables users to download images by holding Alt/Option and double-clicking on them. The extension works with both `<img>` elements and elements with CSS `background-image` properties.

## Architecture

The extension follows Chrome Extension Manifest V3 architecture with two main components:

- **Content Script** (`content.js`): Injected into all web pages, listens for Alt+double-click events on images
- **Background Service Worker** (`background.js`): Handles the actual download process using Chrome's downloads API

The communication flow is: Content Script detects Alt+double-click → sends message to Background Worker → Background Worker initiates download.

## Development Commands

### Loading the Extension for Testing
```bash
# Open Chrome and navigate to chrome://extensions/
# Enable "Developer mode"
# Click "Load unpacked" and select this directory
```

### Reloading After Changes
```bash
# Go to chrome://extensions/
# Click the reload button on the extension card
# Or use Ctrl+R (Cmd+R on Mac) while on the extensions page
```

### Testing the Extension
The extension requires manual testing in the browser:
1. Load the extension in Chrome
2. Navigate to any webpage with images
3. Hold Alt/Option and double-click on an image
4. Verify the image downloads to your default download folder

### Debugging
- **Content Script**: Use browser DevTools Console on any webpage
- **Background Script**: Go to chrome://extensions/, click "Details" on the extension, then "Inspect views: background page"

## File Structure

- `manifest.json`: Extension configuration and permissions
- `content.js`: Handles user interaction and image detection
- `background.js`: Manages download operations
- `README.md`: Basic project description
- `.gitignore`: Standard ignore patterns for macOS and potential build tools

## Key Implementation Details

### Image Detection Logic
The content script handles two cases:
1. Direct `<img>` elements: Uses `img.currentSrc || img.src`
2. CSS background images: Parses `backgroundImage` style property with regex

### Filename Extraction
The background script attempts to extract meaningful filenames from URLs by:
1. Parsing the URL pathname
2. Taking the last segment after splitting on "/"
3. Removing query parameters
4. URL decoding the result
5. Falling back to "image" if parsing fails

### Download Behavior
Downloads are initiated with `saveAs: false`, meaning files go directly to the default download folder without prompting the user.

## Permissions

The extension requires:
- `downloads`: For downloading files through Chrome's downloads API
- `<all_urls>`: Content script runs on all websites to detect image interactions
