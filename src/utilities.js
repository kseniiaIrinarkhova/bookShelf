/***
 * Function that delete all children from parent element
 */
function clearElement(parentElement) {
    while (parentElement.firstElementChild) {
        parentElement.removeChild(parentElement.firstElementChild)
    }
}

/**
 * 
 * @param {array of objects} books list of books
 * @param {object} parentElement parent DOM element
 */
function createCards(books, parentElement) {
    //findbook template
    const cardTemplate = document.getElementById("bookCard");
    //loop through all books
    Array.prototype.forEach.call(books, (book) => {
        //make deed copy of template
        const cardClone = cardTemplate.content.cloneNode(true);
        //we could have eather cover_i or picture_url
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
        //add card to parent element
        //delete redundancy because of FAKE API
        let cards = parentElement.querySelectorAll(".key")
        let flag = true
        Array.prototype.forEach.call(cards,(card)=>{
            if (card.textContent == book.key)
            flag = false
        });
        if(flag) parentElement.append(cardClone);
    });
}

/***
 * Function that change main DOM structure 
 */
async function changeMainblock(parentElement, templateName){
    //clear parent element
    clearElement(parentElement);
    //find template of the main block
    const template = document.getElementById(templateName);
    //create a deep copy
    const clone = template.content.cloneNode(true);
    //add to parent element
    parentElement.append(clone);
}

/**
 * Get book key from book cardcard
 */
function getKey(element) {
    //go to card element
    const card = element.parentNode.parentNode;
    //find child with key class and return in text
    return card.querySelector(".key").textContent
}

/**
 * function that prepare data for createCards() books paramener format
 * @param {list of objects} listEntries 
 * @returns list of object that require createCards() function
 */
function getBooksInfo(listEntries) {
    let booksArray = [];
    Array.prototype.forEach.call(listEntries, (entry) => {
        booksArray.push({
            "title": entry.title,
            "author_name": [""],
            "picture_url": entry.picture.url,
        })
    })
    return booksArray;
}

export {clearElement, createCards,changeMainblock,getKey,getBooksInfo}