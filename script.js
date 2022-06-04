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
console.log(bookie.info())

function addBookToLibrary() {
    
}