console.log("Welcome to notes app. This is app.js");
shownotes();

//If user add a note, it will be added to the localstroge

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }

    notesobj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    // addTxt.value = "";
    console.log(notesobj);

    shownotes();
});

function shownotes() {
    
let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
        <div class="notesCard card mx-2 my-2" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Note ${index+1}</h5>
                  <p class="card-text">${element}</p>
                  <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Delete note</button>
                </div>
              </div>
        `
    });

    let notesElm = document.getElementById('notes');
    if(notesobj.length != 0){
        notesElm.innerHTML = html;
    }else{
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

function deletenote(index) {
    console.log("I am deleting ", index);

    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }

    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));

    shownotes();
}



let search = document.getElementById('searchid');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('notesCard');

    console.log(inputVal);
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})
