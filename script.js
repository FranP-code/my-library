const library = []

function Book(name, pages, author, readed, index) {

    this.name = name
    this.pages = pages
    this.author = author
    this.readed = readed

    this.index = index

    this.deleteBook = function() {

        const book = library.find(o => o.index === index)
        const indexInLibrary = library.indexOf(book)

        library.splice(indexInLibrary, 1)
        applyLibraryToDOM()
    }

    this.alternateReadedValue = function() {

        const book = library.find(o => o.index === index)
        const indexInLibrary = library.indexOf(book)

        if (library[indexInLibrary]) {
   
            library[indexInLibrary].readed = !library[indexInLibrary].readed 
            
            applyLibraryToDOM()
        }
    }
}

function addBookToLibrary(event) {

    event.preventDefault()

    const data = {
        
        name: document.getElementById('input-name').value.trim(),
        pages: document.getElementById('input-pages').value.trim(),
        author: document.getElementById('input-author').value.trim()
    } 

    library.push(new Book(data.name, data.pages, data.author, false, library.length))

    applyLibraryToDOM()

    document.getElementById('input-name').value = ''
    document.getElementById('input-pages').value = ''
    document.getElementById('input-author').value = ''
}

function applyLibraryToDOM() {

    localStorage.setItem('lastLibrary', JSON.stringify(library))

    const fragment = document.createDocumentFragment()

    library.forEach(book => {
        
        const container = document.createElement('div')
            container.className = 'book'

        let title = document.createElement('h3')
            title.innerText = book.name
            container.appendChild(title)
        
        let pages = document.createElement('h5')
            pages.innerText = `${book.pages} pages`
            container.appendChild(pages)

        let author = document.createElement('h4')
            author.innerText = book.author
            container.appendChild(author)

        let deleteButton = document.createElement('button')
            deleteButton.innerText = 'Delete book'
            deleteButton.classList.add('delete')
            deleteButton.onclick = function() {book.deleteBook()}
            container.appendChild(deleteButton)
        
        let readedButton = document.createElement('button')

            if (book.readed) {
                readedButton.innerText = 'Readed'
                readedButton.classList.add('readed')

            } else {
                readedButton.innerText = 'Not readed'
                readedButton.classList.add('not-readed')
            }

            readedButton.onclick = function() {book.alternateReadedValue()}
            container.appendChild(readedButton)
        

        fragment.appendChild(container)
    });

    const libraryDOM = document.getElementById('library')

        libraryDOM.innerHTML = ''
        libraryDOM.appendChild(fragment)
}

const form = document.getElementById('add-new-book-form')
form.addEventListener('submit', () => addBookToLibrary(event))
