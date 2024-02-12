function clearElement(parentElement) {
    while (parentElement.firstElementChild) {
        parentElement.removeChild(parentElement.firstElementChild)
    }
}

function createCards(books, parentElement) {
    const cardTemplate = document.getElementById("bookCard");
    Array.prototype.forEach.call(books, (book) => {
        const cardClone = cardTemplate.content.cloneNode(true);
        cardClone.querySelector('img').setAttribute('src', `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`);
        cardClone.querySelector('img').setAttribute('alt', `${book.title} ${book.author_name[0].toString()}`);
        cardClone.querySelector(".card-title").textContent = book.title
        cardClone.querySelector(".card-subtitle").textContent = book.author_name[0].toString();
        parentElement.append(cardClone);
    });
}

async function changeMainblock(parentElement, templateName){
    clearElement(parentElement);
    const template = document.getElementById(templateName);
    const clone = template.content.cloneNode(true);
    parentElement.append(clone);
}
export {clearElement, createCards,changeMainblock}