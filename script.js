let library = [];

function Book(name, author, pages, read) {
  this.name = name
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.info = function () {
  return `${this.name} by ${this.author}, ${this.pages} pages, ${this.read}`
}

const bookie = new Book("lotr", "jrr", 300, "unread");
library.push(bookie);
//console.log(bookie.info())

//Displaying the library
const libraryDisplay = document.querySelector('.librarydisplay');
function updateLibrary () {
  while (libraryDisplay.firstChild) {
    libraryDisplay.removeChild(libraryDisplay.firstChild);
  }
  let bookCount = 0;
  library.forEach(element => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute("data-index", bookCount);
    card.innerHTML = `
    <div>
    <p>Title: ${element.name}</p>
    <p>Author: ${element.author}</p>
    <p>Pagecount: ${element.pages}</p>
    <p>Read: ${element.read}</p>
    </div>
    <div class="buttons">
     <button class="delete" data-index="${bookCount}">Delete</button>
     <button class="readtoggle">Read/Unread</button>
    </div>
    `
    libraryDisplay.appendChild(card);
    bookCount++;
  });

  let deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', ()=> {
      deleteBook(button.getAttribute("data-index"));
    }); 
  });

  let readButtons = document.querySelectorAll('.readtoggle');
  readButtons.forEach((button) => {
    button.addEventListener('click', ()=> {
      toggleRead();
    }); 
  });
}

updateLibrary();

//Adding books to the library
const addButton = document.querySelector('#addbook');
addButton.addEventListener('click', () => {
  addBookToLibrary();
});

function addBookToLibrary() {
  let book = new Book(document.querySelector('#title').value,document.querySelector('#author').value,document.querySelector('#pagecount').value,document.querySelector('#readbool').value);
  //console.log(book.info);
  library.push(book);
  //console.log(library);
  updateLibrary();
}

function deleteBook(target) {
  library.splice(target,1);
  updateLibrary();
}

function toggleRead() {
  console.log("read!");
}