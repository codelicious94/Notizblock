let titles = [];
let notes = [];

let trashTitle = [];
let trashNote = [];

load();
loadTrash();

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += /*HTML*/ `
    <div class="positionCenter">
        <div class="noteSection">
            <div><h1>Meine Notizen:</h1></div>
            <input id="title" class="inputfieldTitle" type="text" placeholder="Titel">
            <textarea id="note" class="inputfieldNote" type="text" placeholder="Notiz schreiben..."></textarea>
            <button class="noteButton" onclick="addNote()">Notiz speichern</button>
        </div>
    </div>`

    for (let i = 0; i < titles.length && i < notes.length; i++) {
        const title = titles[i];
        const note = notes[i];

        content.innerHTML += /*HTML*/ `
            <div class="myNote">
                <b><span>Titel: </span></b><p>${titles[i]}</p>
                <b><span>Notiz: </span></b><p>${notes[i]}</p>
                <button class="deleteButton" onclick="deleteNote(${i})">Notiz löschen</button>
            </div>`;
    }
}

function renderTrash() {
    let trashContainer = document.getElementById("NoteDeleted")
    trashContainer.innerHTML = '';

    for (let i = 0; i < trashTitle.length && i < trashNote.length; i++) {
        trashContainer.innerHTML += /*HTML*/ `
            <div class="myTrash">
                <b><span>Titel: </span></b><p>${trashTitle[i]}</p>
                <b><span>Notiz: </span></b><p>${trashNote[i]}</p>
                <button onclick="restoreNote(${i})">Notiz wiederherstellen</button>
                <button onclick="fullDelete(${i})">Notiz vollständig löschen</button>
            </div>`;
    }
}
    
function addNote() {
    let title = document.getElementById('title').value;
    let note = document.getElementById('note').value;

    if (title == "") {
        alert("Bitte gib einen Titel ein");
        return;
    }
    if (note == "") {
        alert("Bitte geben Sie eine Notiz ein");
        return;
    }

    titles.push(title);
    notes.push(note);

    render();
    save();
}

function waste(i) {
    let trashContainer = document.getElementById('DeletedNote')
    
    document.getElementById('DeletedNote').innerHTML += /*HTML*/ `  
        <div class="myTrash">
            <p>${trashTitle[i]}</p>
            <p>${trashNote[i]}</p>
        <div>
            <button onclick="deleteTrash(${i})">
            <img src="img/delete.png">
            </button>
        </div>
    </div> 
    `;
  }

function deleteNote(i) {
    trashTitle.push(titles[i]);
    trashNote.push(notes[i]);

    titles.splice(i, 1);
    notes.splice(i, 1);

    saveTrash();
    render();
    save();
}

function deleteTrash(i) {
    trashTitle.splice(i, 1);
    trashNote.splice(i, 1);

    saveTrash();
    renderTrash();
}

function fullDelete(i) {
    if (i >= 0 && i < trashTitle.length && i < trashNote.length) {
        trashTitle.splice(i, 1);
        trashNote.splice(i, 1);

        saveTrash();

        renderTrash();
    } else {
        console.error("Ungültige Notiz.");
    }
}

function save() {
    let titleAsText = JSON.stringify(titles);
    localStorage.setItem('titles', titleAsText);

    let noteAsText = JSON.stringify(notes);
    localStorage.setItem('notes', noteAsText);
}

function saveTrash(){
    let trashTitleAsText = JSON.stringify(trashTitle);
    let trashNoteAsText = JSON.stringify(trashNote);

    localStorage.setItem('trashTitle', trashTitleAsText);
    localStorage.setItem('trashNote', trashNoteAsText);
}

function load() {
    let titleAsText = localStorage.getItem('titles');
    let noteAsText = localStorage.getItem('notes');
    if (titleAsText && noteAsText) {
        titles = JSON.parse(titleAsText);
        notes = JSON.parse(noteAsText);
    }
}

function loadTrash(){
    let trashTitleAsText = localStorage.getItem('trashTitle');
    let trashNoteAsText = localStorage.getItem('trashNote');

   if(trashTitleAsText && trashNoteAsText){ 
        trashTitle = JSON.parse(trashTitleAsText);
        trashNote = JSON.parse(trashNoteAsText);
   }
}

function restoreNote(i) {
    let restoredTitle = trashTitle.splice(i, 1)[0];
    let restoredNote = trashNote.splice(i, 1)[0];

    titles.push(restoredTitle);
    notes.push(restoredNote);

    saveTrash();
    save();
    renderTrash();
    render();
}