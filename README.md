# WordDefiner Extension

This project is a Chrome Extension that shows the definition of a selected word or phrase on a web page. When a user highlights a word, the extension fetches its definition from a Dictionary API and displays it in a floating box near the selection.

## Files

### manifest.json

Contains metadata about the extension, including name, version, permissions, and links to background and content scripts.

### background.js

The background script listens for events and messages from the content script, handling operations like tab updates and user interactions.

### content.js

The content script listens for text selection changes on the webpage, fetches definitions from an external API, and displays the definition in a styled floating box.

### popup.html

An optional HTML file for a popup interface that may contain additional functionality for the extension (e.g., settings, options, etc.).

### popup.js

Handles the functionality for any UI in the popup, such as showing a summary of the word definitions or interacting with the background script.

## Key Features

- **Text Selection**: Allows users to highlight text on any webpage.
- **Definition Fetching**: Uses the Dictionary API to retrieve definitions for selected text.
- **Floating Box**: Displays the word's definition in a floating box next to the selected text.
- **Styling**: The definition box has a clean, minimalist design and is positioned dynamically next to the selected text.

## Example Workflow

1. User highlights a word on any webpage.
2. The content script captures the selection and sends it to the Dictionary API.
3. The fetched definition is displayed in a floating box near the selected word.
4. The box remains open until the selection changes or is deselected.

## APIs Used

- **Dictionary API**: Fetches word definitions from an open-source API.

## Styling

- The definition box has a minimalist design with a white background, black border, and a shadow effect.
- It automatically adjusts its position and displays the definition in a readable format.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
