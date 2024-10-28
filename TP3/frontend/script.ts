import { Book, Status, Format } from './Book';

function addBook(event: Event) {
    event.preventDefault();

    const title = (document.getElementById('title') as HTMLInputElement).value;
    const author = (document.getElementById('author') as HTMLInputElement).value;
    const pages = parseInt((document.getElementById('pages') as HTMLInputElement).value);
    const status = (document.getElementById('status') as HTMLSelectElement).value as Status;
    const price = parseFloat((document.getElementById('price') as HTMLInputElement).value);
    const pagesRead = parseInt((document.getElementById('pagesRead') as HTMLInputElement).value);
    const format = (document.getElementById('format') as HTMLSelectElement).value as Format;
    const suggestedBy = (document.getElementById('suggestedBy') as HTMLInputElement).value;

    const newBook = new Book(title, author, pages, status, price, pagesRead, format, suggestedBy);
    displayBook(newBook);
}

function displayBook(book: Book): void {
    const bookList = document.getElementById("bookList");
    const bookItem = document.createElement("div");
    bookItem.classList.add("border", "p-4", "mb-2", "rounded", "shadow-md");
    bookItem.innerHTML = `
        <h3 class="font-bold">${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Pages Read: ${book.pagesRead} (${((book.pagesRead / book.pages) * 100).toFixed(2)}%)</p>
        <p>Status: ${book.status}</p>
        <p>Finished: ${book.finished ? "Yes" : "No"}</p>
    `;
    bookList?.appendChild(bookItem);
}

document.getElementById("bookForm")?.addEventListener("submit", addBook);