console.log('welcome to notes app. This is app.js');

document.body.style.backgroundImage = "linear-gradient(to bottom right,#ff4dff,#ffe6ff)";

const card = document.querySelector('.card-body');
card.style.backgroundImage = "linear-gradient(to bottom right,#ff4dff,#ffe6ff)";


showNotes();//as soon as it reloads it will show wt user marked notes.  because wen user refresh page all marked notes will vanish,so after refresh as soon as this function(showNotes()) will be called so that all notes again visible to users.


//If user adds a note, add it to the localstorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else if (addTxt.value.length == 0) {
        alert("Please add notes before adding to your Marked notes section");
        exit();
    }
    else {
        notesObj = JSON.parse(notes);
    }

    if (addTitle.value.length == 0) {
        alert("Please add Note title before proceeding with making notes");
        exit();
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);

    showNotes();

    document.body.style.backgroundImage = "linear-gradient(to bottom right,#ff00ff,red)";
    const head = document.querySelector('.head');
    head.style.color = "white";
    const headdd = document.querySelector('.headdd');
    headdd.style.color = "white";
    const card = document.querySelector('.card-body');
    card.style.backgroundImage = "linear-gradient(to bottom right,#ff00ff,red)";


    let notecards = document.getElementsByClassName('notecard');
    Array.from(notecards).forEach(function (element) {

        element.style.boxShadow = "-8px 10px 30px 7px black";

    });


});

function showNotes() {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {                                  //this if else-in that code once again not needed
        notesObj = JSON.parse(notes);       //previous only we defined it
    }                                    //once again if u write also no problem.


    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="notecard my-3 mx-4" style="width: 18rem; background-color:purple; box-shadow:-8px 10px 20px 7px purple;">
               <div class="card-header" style="color:white;font-size:1.7em;font-family:Impact;">
               <h2>${element.title}</h2>
               </div>
                <div class="card-body">
                
                    <p class="card-text" style="font-size:20px; font-family:Times; color:white; overflow:auto;">${element.text}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary" style="font-family:Arial;">Delete Note</button>
                </div>
            </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to Show! Use "Add a Note" section above to add notes.`;
    }




}

//function to delete a note
function deleteNote(index) {
    //   console.log("I am deleting",index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

    document.body.style.backgroundImage = "linear-gradient(to bottom right,#ff4dff,#ffe6ff)";

    const card = document.querySelector('.card-body');
    card.style.backgroundImage = "linear-gradient(to bottom right,#ff4dff,#ffe6ff)";
}



let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!',inputVal);

    let notecards = document.getElementsByClassName('notecard');
    Array.from(notecards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let cardhead = element.getElementsByTagName("h2")[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(inputVal) || cardhead.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    });

});


/*
further features!
1.Add Title
2.Mark a note as important
3.separate notes by user
4.sync and host to web server
*/