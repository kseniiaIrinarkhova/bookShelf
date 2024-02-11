import axios from "axios";
import * as Config_private from "./config_private.js";

/********************************************************* */
/**DOM elements */
const quoteBlock = document.getElementById("quoteBlock")
const searchBtn = document.getElementById("search-btn")

// Set config defaults when creating the instance_quote
const instance_quote = axios.create();
const instance_lib = axios.create();

// Alter defaults after instance_quote has been created
instance_quote.defaults.headers.common['x-api-key'] = Config_private.API_KEY_Q;



(
function getQutation() {
    const url = "https://api.api-ninjas.com/v1/quotes?category=dreams"
        instance_quote.get(url)
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
    console.log(q)
    const url = `https://openlibrary.org/search.json?q=${q}`
    instance_lib.get(url)
    .then((response)=>{
        console.log(response.data)
    })
}