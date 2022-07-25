let library = [];

class Book {
  constructor(name, author, pages, read) {
    this.name = name
    this.author = author
    this.pages = pages
    this.read = read
  }

  info() {
    return `${this.name} by ${this.author}, ${this.pages} pages, ${this.read}`
  }

  readBook() {
    if (this.read == "Read") {
      this.read = "Unread";
    } else {
      this.read = "Read";
    }
  }
}

const bookie = new Book("Example book", "An incredible author", 300, "Unread");
library.push(bookie);

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
    <p>Pages: ${element.pages}</p>
    <p>Read: ${element.read}</p>
    </div>
    <div class="buttons">
     <button class="delete" data-index="${bookCount}">Delete</button>
     <button class="readtoggle" data-index="${bookCount}">Read/Unread</button>
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
      toggleRead(button.getAttribute("data-index"));
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
  let book = new Book(document.querySelector('#title').value,document.querySelector('#author').value,document.querySelector('#pagecount').value,document.querySelector('input[name=inputType]:checked').value);
  library.push(book);
  updateLibrary();
}

function deleteBook(target) {
  library.splice(target,1);
  updateLibrary();
}

function toggleRead(target) {
  console.log("read!");
  library[target].readBook();
  updateLibrary();
}