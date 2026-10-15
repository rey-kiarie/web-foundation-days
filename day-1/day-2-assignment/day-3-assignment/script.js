let notes = [
    { id: 1, text: "Buy milk and bread", category: "personal" },
    { id: 2, text: "Finish the day-3-assignment", category: "study" },
    { id: 3, text: "Email the project report to grace", category: "work" },
    { id: 4, text: "Revise javascript arrays", category: "study" },
    { id: 5, text: "Call mum", category: "personal" }
];

function countbycategory() {
    return notes.reduce((counts, note) => {
        counts[note.category] = (counts[note.category] || 0) + 1;
        return counts;
    }, { personal: 0, study: 0, work: 0 });
}

// 1. search notes, ignoring uppercase and lowercase
function searchNotes(word) {
    return notes.filter(note =>
        note.text.toLowerCase().includes(String(word).toLowerCase())
    );
}

console.log("3. category counts:", countbycategory());
// expected: (personal: 2, study: 2, work: 1)


// 4. create a summary of the notes
function getSummary() {
    let counts = countbycategory();
    let total = notes.length;

    return `You have ${total} notes (${counts.personal} personal, ${counts.study} study, ${counts.work} work)`;
}

console.log("4. summary:", getSummary());
// expected: You have 5 notes (2 personal, 2 study, 1 work)

// 5. Check if a note with already exists
function isDuplicate(text) {
    let cleanedText = String(text).trim().toLowerCase();

    return notes.some(note => note.text.trim().toLowerCase() === cleanedText);
}

console.log("5. isDuplicate:", isDuplicate("call mum"));
// expected: true

console.log("5. check for a new text isDuplicate:", isDuplicate("read a novel"));
// expected: false

// Add a note only if it's valid
function addNote(text, category) {
    let cleanedText = String(text).trim();

    if (cleanedText.length < 1 || cleanedText.length > 200) {
        console.log("Note rejected: text must be 1–200 characters.");
        return false;
    }

    if (!["personal", "work", "study"].includes(category)) {
        console.log("Note rejected: invalid category.");
        return false;
    }

    if (isDuplicate(cleanedText)) {
        console.log("Note rejected: this note already exists.");
        return false;
    }

    let newId = notes.length === 0
        ? 1
        : Math.max(...notes.map(note => note.id)) + 1;

    notes.push({
        id: newId,
        text: cleanedText,
        category: category
    });

    return true;
}

console.log("6. Add valid note:", addNote("Read a novel", "personal"));
// Expected: true

console.log("Add duplicate note:", addNote("  READ A NOVEL  ", "personal"));
// Expected: false
// Reason: Note rejected: this note already exists.

console.log("Add invalid category:", addNote("Prepare dinner", "home"));
// Expected: false
// Reason: Note rejected: invalid category.

console.log("Add empty note:", addNote("   ", "personal"));
// Expected: false
// Reason: Note rejected: text must be 1–200 characters.

console.log("Final notes:", notes);
// Expected: 6 notes after the one successful addition.
