# Distinctiveness and Complexity
Book shelf is an application that shows you 3 books from open Library according to your search request amd list of test user from openLibrary. As currently List add seeds POST method doesn't work from localhost adding to list is simulated by using [RESTFUL-API](https://restful-api.dev/) and post book key as a 'name' property of restful-api provided object.

# Technical documentation of the project
## Code specification
File structure:
#### index.html
Main HTML layout
#### index.js
Main script file. Contains event handlers and API requests.
#### config.js
File with open config variables. Contains main urls for APIs.
#### config_private.js.example
Shows the structure of config_private.js file. 
#### utilities.js
File with helper functions

## Installation
1. Clone Git repository
2. Change *config_private.js.example* file name to **config_private.js**
3. Add to API_KEY_Q variable API Key from [API ninjas](https://api-ninjas.com/). If you do not have an accont you could create it for free.
## User guide
On the main page user is able to search books in OpenLibrary using searsh form.
User could add book to list by clicking on **+** button on book card. 
User could see current list of favorite books of `apiusershelli` user in openLibrary by clicking "My List" navigation menu.
User may see different quote by refreshing the page.

# Author
Project prepared as a part of education in **Software Engineering Bootcamp** at *Per Scholas* by [Kseniia Irinarkhova](https://www.linkedin.com/in/kseniia-irinarkhova/).

# Additional Resources
[Open Library API](https://openlibrary.org/developers/api)
