function clearElement(parentElement) {
    while (parentElement.firstElementChild) {
        parentElement.removeChild(parentElement.firstElementChild)
    }
}

function createCards(books, parentElement) {
    const cardTemplate = document.getElementById("bookCard");
    Array.prototype.forEach.call(books, (book) => {
        const cardClone = cardTemplate.content.cloneNode(true);
        console.log(book)
        if("cover_i" in book){
        cardClone.querySelector('img').setAttribute('src', `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`);
        cardClone.querySelector('img').setAttribute('alt', `${book.title} ${book.author_name[0].toString()}`);
        }
        else{
            const url = `https:${book.picture_url}`.replace('-S','-M')
            cardClone.querySelector('img').setAttribute('src', url);
            cardClone.querySelector('img').setAttribute('alt', `${book.title}`);
        }
        cardClone.querySelector(".card-title").textContent = book.title
        cardClone.querySelector(".card-subtitle").textContent = book.author_name[0].toString();
        cardClone.querySelector(".key").textContent = book.key
        parentElement.append(cardClone);
    });
}

async function changeMainblock(parentElement, templateName){
    clearElement(parentElement);
    const template = document.getElementById(templateName);
    const clone = template.content.cloneNode(true);
    parentElement.append(clone);
}

function getKey(element) {
    console.log(element.parentNode.parentNode)
    const card = element.parentNode.parentNode;
    return card.querySelector(".key").textContent
}
export {clearElement, createCards,changeMainblock,getKey}