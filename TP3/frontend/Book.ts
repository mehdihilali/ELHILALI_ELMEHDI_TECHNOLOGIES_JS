export enum Status {
    Read = "Read",
    Reread = "Re-read",
    DNF = "DNF",
    CurrentlyReading = "Currently reading",
    ReturnedUnread = "Returned Unread",
    WantToRead = "Want to read",
}

export enum Format {
    Print = "Print",
    PDF = "PDF",
    Ebook = "Ebook",
    AudioBook = "AudioBook",
}

export class Book {
    title: string;
    author: string;
    pages: number;
    status: Status;
    price: number;
    pagesRead: number;
    format: Format;
    suggestedBy: string;
    finished: boolean;

    constructor(
        title: string,
        author: string,
        pages: number,
        status: Status,
        price: number,
        pagesRead: number,
        format: Format,
        suggestedBy: string,
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.price = price;
        this.pagesRead = pagesRead;
        this.format = format;
        this.suggestedBy = suggestedBy;
        this.finished = this.pagesRead >= this.pages;
    }

    currentlyAt(page: number): void {
        this.pagesRead = page;
        if (this.pagesRead >= this.pages) {
            this.finished = true;
        }
    }
}