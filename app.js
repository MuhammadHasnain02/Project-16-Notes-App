// ------------------<<< Main Elements >>>------------------
let formSect = document.getElementById("formSect")
let noteSect = document.getElementById("noteSect")

// Input & Button elements
let userNoteName = document.getElementById("userNoteName")
let createNoteBtn = document.getElementById("createNoteBtn")

let noteName = document.getElementById("noteName")
let note = document.getElementById("note")

// --- Show notes when page loads ---
showNotes();

// ------------------<<< Create New Note >>>------------------

createNoteBtn.addEventListener("click" , () => {

    let name = userNoteName.value.trim()
    if (name === "") return;

    // Get previous data (as string)
    let oldData = localStorage.getItem("notes") || "";

    // Add new note line (with separator)
    let newData = oldData + userNoteName.value + "~" + "" + "|";

    // Save back to storage
    localStorage.setItem("notes", newData);
    showNotes()
    userNoteName.value = ""

})

// ------------------<<< Display Notes >>>------------------

function showNotes(filter = "") {

    noteSect.innerHTML = "";
    let stored = localStorage.getItem("notes");
    if (!stored) return;

    let allNotes = stored.split("|").filter((x) => x !== "");

    allNotes.forEach((item, index) => {
        let [name, text] = item.split("~");
        
        if (name.toLowerCase().includes(filter.toLowerCase())) {
            
            noteSect.innerHTML += 
            `
            <div id="noteCard" class="bg-gray-200 px-6 py-5 space-y-2 rounded-xl">
    
                <div class="flex justify-between">
                    <p class="text-purple-500 font-semibold" id="noteName">${name}</p>
                    <button class="text-gray-500 hover:cursor-pointer" onclick="delNote(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
                <div class="">
                    <textarea cols="42" rows="5" placeholder="Write note ..." id="note" oninput="updateText(${index}, this.value)"
                    class="border-2 border-gray-300 text-gray-500  rounded-xl px-4 py-3 focus-within:outline-none placeholder:text-gray-500">${text}</textarea>
                </div>
    
            </div>
            `

        }

    });

}

// ------------------<<< Update Note Text >>>------------------

function updateText(index, value) {

    let stored = localStorage.getItem("notes").split("|").filter((x) => x !== "");
    let [name] = stored[index].split("~");
    stored[index] = name + "~" + value;
    localStorage.setItem("notes", stored.join("|") + "|");

}

// ------------------<<< Delete Note >>>------------------

function delNote(index) {

    let stored = localStorage.getItem("notes").split("|").filter((x) => x !== "");
    stored.splice(index, 1);
    localStorage.setItem("notes", stored.join("|") + "|");
    showNotes();

}

// ------------------<<< Search Notes >>>------------------

userNoteName.addEventListener("input" , () => {
    showNotes(userNoteName.value.trim())
})