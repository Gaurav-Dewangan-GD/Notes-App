/*
Feature that are added
1.Input area to add text
2.Convert the text to specific cards
3.Delete function for each cards
4.Filter out cards u  <!-- </div> -->sing search 
*/

/* Feature to adds
1.Add title
2.Mark a note a important
3.pin note
4.user based profile for different notes
5.sync and host to web server
*/



// if user add note to local storage
let addBtn = document.getElementById('addBtn');
showNotes();

// to listen for text
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    // the browser storage for a particular
    //system is called localStorage which is available
    //as a prototype to use in javascript

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = []; //creating a notes object
        //with some properties for each element
    }
    else {
        notesObj = JSON.parse(notes); //it parses the string obtained from user
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = ""; //to empty the values for next iteration of text
    console.log(notesObj);

    // A function to show notes on the actual Page

    showNotes();
});

// to actually view elements on page
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        // adds the first word as header
        const first = element.split(' ')[0];
        html += `
      <div class="noteCard card my-2 mx-2" style="width: 18rem;">
          <div class="card-body">
              <h5 class="card-title">${first}</h5>
              <p class="card-text">${element}</p>
              <button id = "${index}"onclick = "deleteNode(this.id)" class="btn btn-primary" id="addBtn">Delete Note</button>
              </div>
              </div>`;
            //   we have given the delete node button the id of each new element
            //added to it for easier identificatio of card to be deleted
    });
    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    } else {
        notesElem.innerHTML = `<h5>Nothing to show!Add note to get started</h5>`;
    }
}

// function to delete a node
function deleteNode(index){
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1); //only deletes in local variable
    // console.log(notesObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input",function(){
    // console.log("input event fired!")
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
      let cardTxt = element.getElementsByTagName('p')[0].innerText;
      if(cardTxt.includes(inputVal)){
            element.style.display = "block";
      }else{
        element.style.display = "none"; 
      }
    //   console.log(cardTxt);
    });
});




