//book constructor
function Book(title, author, isbn){
  this.title = title
  this.author = author
  this.isbn = isbn
}

//ui constructor
function UI(){

}

//add prototype method
//Add book to list
UI.prototype.addBookToList = function(book){

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

//add prototype method
//clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''
}

//add prototype method
//show alert
UI.prototype.showAlert = function(message, className){

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

    //show success
    ui.showAlert('Book Added!', 'success')

    //clear fields
    ui.clearFields()
  }
})

//add prototype method
//delete book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove()
  }
}

//event listener for delete book
document.getElementById('book-list').addEventListener('click', function(e){

  e.preventDefault();

  //instantiate UI
  const ui = new UI()

  ui.deleteBook(e.target)

  //show message
  ui.showAlert('Book Removed!', 'success')

})
