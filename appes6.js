//Book class
class Book {

  //constructor
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }

}

//UI class
class UI {

  //method
  addBookToList(book){
    //get list
    const list = document.getElementById('book-list')

    //create tr element
    const row = document.createElement('tr')

    //insert columns
    row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="" class="delete">X</a></td>
  `

    //append to list
    list.appendChild(row)
  }

  //method
  showAlert(message, className){
    //create div
    const div = document.createElement('div')

    //add classes
    div.className = `alert ${className}`

    //add text
    div.appendChild(document.createTextNode(message))

    //get parent
    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form')

    //insert alert
    container.insertBefore(div, form)

    //timeout after 3 sec
    setTimeout(function(){
      document.querySelector('.alert').remove()
    }, 3000)
  }

  //method
  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove()
    }
  }

  //method
  clearFields(){
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
  }
}

//local storage class
class Store {

  //static method
  static getBooks(){
    let books
    if(localStorage.getItem('books') === null){
      books = []
    }else{
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books
  }

  //static method
  static displayBooks() {

    const books = Store.getBooks()

    books.forEach(function(book){
      const ui = new UI()

      //add book to ui
      ui.addBookToList(book)

    })

  }

  //static method
  static addBook(book) {

    const books = Store.getBooks()

    books.push(book)

    localStorage.setItem('books', JSON.stringify(books))

  }

  //static method
  static removeBook(isbn){

    const books = Store.getBooks()

    books.forEach(function(book, index){
      if(book.isbn === isbn){
        books.splice(index, 1)
      }
    })

    localStorage.setItem('books', JSON.stringify(books))
  }
}

//dom load event
document.addEventListener('DOMContentLoaded',Store.displayBooks)

//event listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  e.preventDefault()

  //get form values
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const isbn = document.getElementById('isbn').value

  //instantiate a book
  const book = new Book(title, author, isbn)

  //instantiate UI
  const ui = new UI()

  //validate
  if(title === '' || author === '' || isbn === ''){
    //error alert
    ui.showAlert('Please fill in all fields', 'error')
  }else{
    //add book to list
    ui.addBookToList(book)

    //add book to local storage
    Store.addBook(book)

    //show success
    ui.showAlert('Book Added!', 'success')

    //clear fields
    ui.clearFields()
  }
})

//event listener for delete book
document.getElementById('book-list').addEventListener('click', function(e){

  e.preventDefault();

  //instantiate UI
  const ui = new UI()

  ui.deleteBook(e.target)

  //remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

  //show message
  ui.showAlert('Book Removed!', 'success')

})
