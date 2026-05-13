# JARVIS Interface

A browser-based JARVIS-style assistant built with HTML, CSS, and JavaScript.

## Features

- Voice command activation by clicking the glowing core
- Speech recognition using Web Speech API
- Voice responses using Speech Synthesis
- Commands for opening Google, opening GitHub, searching, checking the time, and identity queries
- Responsive futuristic UI with animated rings and status feedback

## Voice commands

- `hello` or `hey`
- `open google`
- `open github`
- `search for <your query>`
- `time`
- `identity`

## Files

- `index.html` — application UI and structure
- `style.css` — visual styling and responsive layout
- `jarvis.js` — voice recognition logic, command handling, and speech output

## Usage

1. Open `index.html` in a supported browser such as Chrome or Edge.
2. Allow microphone access when prompted.
3. Click the central core to start listening.
4. Speak one of the supported commands.

## Notes

- The app uses browser-native Web Speech APIs, so it works best on modern Chromium-based browsers.
- If voice recognition is unavailable, the status text will show a compatibility warning.

## License

This project is released under the MIT License.
