# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You type a note, pick a category (Personal, Work or Study), and it appears as a colour-coded card. Your notes are saved in the browser, so they are still there after you refresh the page. It was built as Project 1 of the Web Foundations course.

## Features

- Add a note with a category: Personal, Work or Study
- Each note shows its text, a category label, the date and time it was created, and a Delete button
- Each category has its own card colour
- Validation with a clear error message for an empty note or a note over 200 characters
- Delete a single note
- Live search that ignores upper and lower case and matches notes containing every word typed
- A "No notes match your search." message when nothing is found
- A note count that reads correctly for zero, one and many notes
- Notes are saved with `localStorage` and survive a page refresh
- Responsive layout: the form stacks vertically on screens 600px wide or narrower

## How to run it locally

There is nothing to install, because the app uses no libraries or build tools.

1. Download or clone the repository:
   ```
   git clone https://github.com/ibrahim-warsame/quicknotes-app.git
   cd quicknotes-app
   ```
2. Open `index.html` in a browser. In VS Code you can also right-click `index.html` and choose **Open with Live Server**.

## Project files

| File | What it does |
|---|---|
| `index.html` | The page structure: header, the "Add a note" form, search, the notes list and the footer |
| `style.css` | Layout, note cards, category colours and the phone layout |
| `script.js` | Adding, deleting, validating, searching and saving notes |

## What I learned

- **Keep the data in one place and redraw from it.** The `notes` array is the single source of truth. Every change updates the array, saves it, and then calls `render()` to rebuild the list. That way the screen always matches the data.
- **Never put user text into `innerHTML`.** I build each card with `createElement` and `textContent`. When I tested a note containing `<img src=x onerror=alert(1)>`, it appeared as plain text and did not run.
- **`localStorage` only stores strings.** I save with `JSON.stringify` and load with `JSON.parse`. Because anyone can edit saved data in DevTools, loading has to cope with damaged or missing data instead of trusting it.
- **`Date.now()` is not always a unique id.** Two notes added in the same millisecond got the same id, so deleting one removed the other. A small helper that makes every new id bigger than the last fixed it.
- **Small commits tell a story.** Committing after each task (structure, styling, adding notes, validation, storage and search) made it easy to see what changed and to find mistakes.
