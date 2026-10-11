// ---------- 1. Select the elements we need ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

const MAX_LENGTH = 200;

const CATEGORY_LABELS = {
  personal: "Personal",
  work: "Work",
  study: "Study",
};

// ---------- 2. The data: one array is the single source of truth ----------
let notes = [];

// ---------- 3. Draw the notes on the page ----------
function render() {
  list.replaceChildren(); // clear the old list

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note", `category-${note.category}`);

    const body = document.createElement("div");

    const text = document.createElement("p");
    text.classList.add("note-text");
    text.textContent = note.text; // textContent keeps user text safe

    const meta = document.createElement("p");
    meta.classList.add("note-meta");

    const label = document.createElement("span");
    label.classList.add("category-label");
    label.textContent = CATEGORY_LABELS[note.category];

    const date = document.createElement("span");
    date.textContent = note.createdAt;

    const del = document.createElement("button");
    del.type = "button";
    del.classList.add("delete-btn");
    del.textContent = "Delete";
    del.addEventListener("click", () => deleteNote(note.id));

    meta.append(label, date);
    body.append(text, meta);
    li.append(body, del);
    list.appendChild(li);
  });

  count.textContent = countMessage(notes.length);
}

function countMessage(total) {
  if (total === 0) return "You have no notes yet.";
  if (total === 1) return "You have 1 note.";
  return `You have ${total} notes.`;
}

// ---------- 4. Add a note ----------
function formatDate(date) {
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Date.now() alone can repeat if two notes are added in the same millisecond,
// so make sure each new id is bigger than the one before it.
let lastId = 0;

function newId() {
  lastId = Math.max(Date.now(), lastId + 1);
  return lastId;
}

function addNote(text, category) {
  notes.push({
    id: newId(),
    text: text,
    category: category,
    createdAt: formatDate(new Date()),
  });
  render();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  render();
}

// ---------- 5. Validation ----------
function showError(message) {
  errorMessage.textContent = message;
}

function validate(text) {
  if (text === "") return "Please type a note first.";
  if (text.length > MAX_LENGTH) return "Notes must be 200 characters or fewer.";
  return ""; // no problem found
}

// ---------- 6. Listen for the form ----------
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page reload

  const text = input.value.trim();
  const problem = validate(text);

  if (problem !== "") {
    showError(problem);
    input.focus();
    return; // stop here: nothing is added
  }

  showError(""); // a valid note clears any old error
  addNote(text, categorySelect.value);
  input.value = "";
  input.focus();
});

// ---------- 7. Draw once when the page first loads ----------
render();
