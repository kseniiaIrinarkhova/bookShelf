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

/***
 * Show qoute on the main page
 */
(
    function getQutation() {
        //call quotev API
        instance_quote.get(config.quote_url)
            .then((response) => {
                //add text from the result to main page
                quoteBlock.querySelector("#quote").appendChild(document.createElement("h3")).textContent = response.data[0].quote;
                quoteBlock.querySelector("#author").appendChild(document.createElement("h6")).textContent = response.data[0].author;
            })
            .catch((error) => { console.log(error); });
    }
)();

//add event listener on the main page on 1st load
searchBtn.addEventListener('click', searchBooks);

/**
 * Search books from openLibrary
 * @param {object} event 
 */
function searchBooks(event) {
    localStorage.clear()
    event.preventDefault();
    //get parent object
    const bookCards = document.getElementById("searchResult");
    //clear main area for every search
    Utilities.clearElement(bookCards);
    //create search request
    const q = document.getElementById("search-req").value.trim().replaceAll(" ", "+");
    //if user add something try to get result
    if (String(q).length) {
        //concatenate search url
        const url = `${config.lib_url}/search.json?q=${q}&fields=${config.search_filter}&limit=3`
        instance_lib.get(url)
            .then((response) => {
                //create book cards
                Utilities.createCards(response.data.docs, bookCards);
                //add event listener that add book to list
                bookCards.addEventListener("click", cardClick);
            })
    }
}

//event for changing main content by clicking nav bar
navLinks.addEventListener("click", (event) => {
    event.preventDefault();
    //get parent element
    const contentBlock = document.getElementById("contentBlock");
    switch (event.target.id) {
        case "myList":
            //call main block formyList
            Utilities.changeMainblock(contentBlock, "myList-tmp")
                .then((res) => {
                    //create my list
                    getMyList();
                })
            break;
        case "home":
            //call main block for home page
            Utilities.changeMainblock(contentBlock, "main-tmp")
                .then((res) => {
                    //add event listener for search button                    
                    document.getElementById("search-btn").addEventListener('click', searchBooks);
                })

            break;
        default:
            break;
    }
});


/**
 * create list based on first list from user
 */
function getMyList() {
    //get all user lists
    instance_lib.get(`${config.lib_url}/people/${config.libAPIUser}/lists.json`)
        .then((res) => {
            //take 1st one and get it books
            instance_lib.get(`${config.lib_url}${res.data.entries[0].url}/seeds.json`)
                .then((resp) => {
                    //create book cards
                    Utilities.createCards(Utilities.getBooksInfo(resp.data.entries), document.getElementById("listBody"));
                })
        })
    //////////////////////////////////////////////////
    ////ADD books to list from FAKE storage
    if (localStorage.getItem("myList") !== null) {
        const myList = JSON.parse(localStorage.getItem("myList"))
        for (const id of myList) {
            //find book key:
            instance_lib.get(`${config.fake_lib_url}?id=${id.id}`)
                .then((res) => {
                    instance_lib.get(`${config.lib_url}${res.data[0].name}.json`)
                        .then((res) => {

                            let bookArray = []
                            bookArray.push(
                                {
                                    "title": res.data.title,
                                    "author_name": [""],
                                    "cover_i": res.data.covers[0],
                                    "key": res.data.key
                                }
                            )
                            Utilities.createCards(bookArray, document.getElementById("listBody"));
                        })
                        .catch((err) => { throw err })
                })
                .catch((err) => { console.log(err) })
        }
    }

}


/**
 * Function that add book to list
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Doesn't work POST request
 * @param {object} event 
 */
async function cardClick(event) {

    if (event.target.classList.contains("listAdd")) {
        event.preventDefault()
        /* //find book key that we want to add to library
         const requestBody = {
             add: [
                 { key: Utilities.getKey(event.target) }
             ]
         }
         //find the the first list from user
         instance_lib.get(`${config.lib_url}/people/${config.libAPIUser}/lists.json`)
             .then((res) => {
                 //create url for adding book
                 const url = `${config.lib_url}${res.data.entries[0].url}/seeds.json`
                 console.log(url)
                 //try to post our book to list
                 fetch(url,
                     {
                         method: "POST",
                         headers: {
                             'Content-Type': 'application/json',
                             'Accept': 'application/json',
                             'Access-Control-Allow-Origin': '*',
                             'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
                         },
                         body: JSON.stringify(requestBody),
                     })
                     .then((res) => {
                         console.log(res.json())
                     })
                     .catch((err) => { throw err });
             })
             .catch((err) => {
                 alert("Cannot add book to list due to CORS error")
                 throw err;
             })
             .catch((err) => { console.log(err) });*/

        ////////////////////////////////////////////////////////////////////////////
        //FAKE POST simmulation
        const requestBody = {
            name: Utilities.getKey(event.target)
        }
        instance_lib.post(config.fake_lib_url, requestBody)
            .then((res) => {

                console.log(res.data)
                localStorage.setItem(res.data.id, res.data.name);
                let idArray = [];
                if (localStorage.getItem("myList") !== null) {
                    idArray = JSON.parse(localStorage.getItem("myList"))
                }
                idArray.push({ id: res.data.id })
                localStorage.setItem("myList", JSON.stringify(idArray))

                console.log(localStorage.getItem(res.data.id))
                console.log(JSON.parse(localStorage.getItem("myList")))
            })
            .catch((err) => { console.log(err) })
    }
}

