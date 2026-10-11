// ---------- 1. Select the elements we need ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");

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

    meta.append(label, date);
    body.append(text, meta);
    li.append(body, del);
    list.appendChild(li);
  });
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

function addNote(text, category) {
  notes.push({
    id: Date.now(),
    text: text,
    category: category,
    createdAt: formatDate(new Date()),
  });
  render();
}

// ---------- 5. Listen for the form ----------
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page reload

  const text = input.value.trim();
  if (text === "") return;

  addNote(text, categorySelect.value);
  input.value = "";
  input.focus();
});

// ---------- 6. Draw once when the page first loads ----------
render();
