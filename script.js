//let library = [];
let libData = {
  library: []
}

window.addEventListener('load', () => {
  let saved = JSON.parse(localStorage.getItem("libData"));
  if (saved !== null) {
    libData = saved;
  }
  updateLibrary();
})


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
libData.library.push(bookie);

//Displaying the library
const libraryDisplay = document.querySelector('.librarydisplay');
function updateLibrary () {
  while (libraryDisplay.firstChild) {
    libraryDisplay.removeChild(libraryDisplay.firstChild);
  }
  let bookCount = 0;
  libData.library.forEach(element => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute("data-index", bookCount);
    card.innerHTML = `
    <div>
    <h3> ${element.name}</h3>
    <hr>
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
      buttonManager.deleteBook(button.getAttribute("data-index"));
    }); 
  });

  let readButtons = document.querySelectorAll('.readtoggle');
  readButtons.forEach((button) => {
    button.addEventListener('click', ()=> {
      buttonManager.toggleRead(button.getAttribute("data-index"));
    }); 
  });
}


//Adding books to the library
const buttonManager = (() => {
  const addButton = document.querySelector('#addbook');
  addButton.addEventListener('click', () => {
    addBookToLibrary();
  });

  const saveButton = document.querySelector('#savelib');
  saveButton.addEventListener('click', ()=> {
    localStorage.setItem("libData", JSON.stringify(libData));
  })

  //add booleans for read and unread show status
  const showAll = document.querySelector('#showall');
  const hideRead = document.querySelector('#hideread');
  const hideUnread = document.querySelector('#hideunread');

  const clearLibrary = document.querySelector('#clearlib');
  clearLibrary.addEventListener('click', ()=> {
    libData.library = [];
    updateLibrary();
  })

  function addBookToLibrary() {
    let book = new Book(document.querySelector('#title').value,document.querySelector('#author').value,document.querySelector('#pagecount').value,document.querySelector('input[name=inputType]:checked').value);
    libData.library.push(book);
    updateLibrary();
  }

  function deleteBook(target) {
    libData.library.splice(target,1);
    updateLibrary();
  }

  function toggleRead(target) {
    console.log("read!");
    libData.library[target].readBook();
    updateLibrary();
  }

  return {addBookToLibrary, deleteBook, toggleRead}
})();