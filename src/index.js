import axios from "axios";
import * as Config_private from "./config_private.js";
import * as config from "./config.js";

/********************************************************* */
/**DOM elements */
const quoteBlock = document.getElementById("quoteBlock")
const searchBtn = document.getElementById("search-btn")
const bookCards = document.getElementById("searchResult");

// Set config defaults when creating the instance_quote
const instance_quote = axios.create();
const instance_lib = axios.create();

// Alter defaults after instance_quote has been created
instance_quote.defaults.headers.common['x-api-key'] = Config_private.API_KEY_Q;



(
function getQutation() {
        instance_quote.get(config.quote_url)
        .then((response)=>{
            quoteBlock.querySelector("#quote").appendChild(document.createElement("h3")).textContent = response.data[0].quote;
            quoteBlock.querySelector("#author").appendChild(document.createElement("h6")).textContent = response.data[0].author;
        })
        .catch((error)=>{console.log(error);});
}
)();

searchBtn.addEventListener('click', searchBooks);


function searchBooks(event){
    event.preventDefault();
    const q = document.getElementById("search-req").value.trim().replaceAll(" ","+");
    const url = `${config.search_lib_url}?q=${q}&fields=${config.search_filter}`
    instance_lib.get(url)
    .then((response)=>{
        console.log(response.data)
        const cardTemplate = document.getElementById("bookCard");
        const cardClone = cardTemplate.content.cloneNode(true);
        cardClone.querySelector(".card-title").textContent = response.data.docs[0].title
        cardClone.querySelector(".card-subtitle").textContent = response.data.docs[0].author_name[0].toString();
bookCards.append(cardClone);
    })
}