import axios from "axios";
import * as Config_private from "./config_private.js";

const quoteBlock = document.getElementById("quoteBlock")

// Set config defaults when creating the instance
const instance = axios.create();

// Alter defaults after instance has been created
instance.defaults.headers.common['x-api-key'] = Config_private.API_KEY_Q;



(
function getQutation() {
    const url = "https://api.api-ninjas.com/v1/quotes?category=dreams"
        instance.get(url)
        .then((response)=>{
            quoteBlock.querySelector("#quote").appendChild(document.createElement("h3")).textContent = response.data[0].quote;
            quoteBlock.querySelector("#author").appendChild(document.createElement("h6")).textContent = response.data[0].author;
        })
        .catch((error)=>{console.log(error);});
}
)();