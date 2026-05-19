# KBAI Progress Tracker

A small browser-based progress tracker for Georgia Tech CS7637 KBAI. It tracks weekly course tasks, ARC-AGI work logs, grade estimates, deadlines, and weekly planning cards.

## Project Structure

```text
kbai-progress-tracker/
  index.html       # App shell and static markup
  styles.css       # Visual styling
  course-data.js   # Course schedule, tasks, deadlines, and grade items
  storage.js       # Browser cache, JSON data file, import, and export logic
  app.js           # UI rendering, interactions, progress, and grade calculations
```

## Running Locally

Open `index.html` in Google Chrome or Microsoft Edge.

Chrome or Edge is recommended because the tracker can auto-save progress to a local JSON file using the File System Access API.

## Saving Progress

Use the Storage panel in the app:

- `Create data file`: creates a durable JSON progress file.
- `Connect file`: reconnects an existing progress file.
- `Save snapshot`: writes the latest state to the connected file or exports a backup.
- `Export backup`: downloads a JSON backup.
- `Import backup`: restores from a JSON backup.

For cross-device sync, save the JSON data file in a synced folder such as Google Drive, iCloud Drive, or Dropbox.

## Reusing For Another Course

Most course-specific content is in `course-data.js`.

To reuse the tracker for another class, replace:

- `WEEKS`
- `GRADE_ITEMS`

The storage and UI logic can stay mostly unchanged.

## Privacy

Do not commit your real progress data file to a public repo. It may contain grades, personal notes, blockers, or study history.
