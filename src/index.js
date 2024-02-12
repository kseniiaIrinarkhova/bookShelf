import axios from "axios";
import * as Config_private from "./config_private.js";
import * as config from "./config.js";
import * as Utilities from "./utilities.js";

/********************************************************* */
/**DOM elements */
const quoteBlock = document.getElementById("quoteBlock")
const searchBtn = document.getElementById("search-btn")
const navLinks = document.querySelector("nav");

// Set config defaults when creating the instance_quote
const instance_quote = axios.create();
const instance_lib = axios.create();

// Alter defaults after instance_quote has been created
instance_quote.defaults.headers.common['x-api-key'] = Config_private.API_KEY_Q;

instance_lib.defaults.headers.post['Content-Type'] = 'application/json';


(
    function getQutation() {
        instance_quote.get(config.quote_url)
            .then((response) => {
                quoteBlock.querySelector("#quote").appendChild(document.createElement("h3")).textContent = response.data[0].quote;
                quoteBlock.querySelector("#author").appendChild(document.createElement("h6")).textContent = response.data[0].author;
            })
            .catch((error) => { console.log(error); });
    }
)();

searchBtn.addEventListener('click', searchBooks);

function searchBooks(event) {
    event.preventDefault();
    const bookCards = document.getElementById("searchResult");
    Utilities.clearElement(bookCards);
    const q = document.getElementById("search-req").value.trim().replaceAll(" ", "+");
    if (String(q).length) {
        const url = `${config.lib_url}/search.json?q=${q}&fields=${config.search_filter}&limit=3`
        instance_lib.get(url)
            .then((response) => {
                Utilities.createCards(response.data.docs, bookCards);
            })
    }
}

navLinks.addEventListener("click", (event) => {
    event.preventDefault();
    const contentBlock = document.getElementById("contentBlock");
    switch (event.target.id) {
        case "myList":
            Utilities.changeMainblock(contentBlock, "myList-tmp")
                .then((res) => {
                    getMyList();
                })
            break;
        case "home":
            Utilities.changeMainblock(contentBlock, "main-tmp")
                .then((res) => {
                    console.log(res)
                    document.getElementById("search-btn").addEventListener('click', searchBooks);
                })
            
            break;
        default:
            break;
    }
});


function getMyList() {
    instance_lib.get(`${config.lib_url}/people/${config.libAPIUser}/lists.json`)
        .then((res) => {

            console.log(res.data.entries[0])
            instance_lib.get(`${config.lib_url}${res.data.entries[0].url}/seeds.json`)
                .then((resp) => {
                    console.log(resp.data)

                    Utilities.createCards(getBooksInfo(resp.data.entries), document.getElementById("listBody"));
                })
        })
}

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

bookCards.addEventListener("click", cardClick);

async function cardClick(event) {
    if (event.target.classList.contains("listAdd")) {
        event.preventDefault()

        const requestBody = {
            add: [
                { key: Utilities.getKey(event.target) }
            ]
        }
        instance_lib.get(`${config.lib_url}/people/${config.libAPIUser}/lists.json`)
            .then((res) => {
                const url = `${config.lib_url}${res.data.entries[0].url}/seeds.json`
                console.log("before fetch")
                console.log(url)
                fetch(url,
                    {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(requestBody),
                    })
                    .then((res) => {
                        console.log(res.json())
                    })
                    .catch((err) => { console.log(err); throw err });
            })
            .catch((err) => {
                alert("Cannot add book to list due to CORS error")
                throw err;
            })
            .catch((err) => { console.log(err) });

        console.log(`${config.lib_url}/people/${config.libAPIUser}/seeds`)
    }
}

