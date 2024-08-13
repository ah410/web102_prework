/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i=0; i<games.length; i++) {

        // create a new div element, which will become the game card
        let new_element = document.createElement('div');

        // add the class game-card to the list
        new_element.classList.add('game-card');
        new_element.setAttribute('data-title', `${games[i]["name"]}`);

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        new_element.innerHTML += `<img src="${games[i]["img"]}" alt="image of the game" class="game-img">`;
        new_element.innerHTML += `<h3><b>${games[i]["name"]}</b></h3>`;
        new_element.innerHTML += `Description: ${games[i]["description"]} `;
        new_element.innerHTML += `<br><br>Backers: ${games[i]["backers"]}`;


        // append the game to the games-container
        let games_container = document.getElementById("games-container");
        games_container.appendChild(new_element);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const individual_contributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = individual_contributions.toLocaleString('en-US');

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const total_raised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = "$" + total_raised.toLocaleString('en-US');

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const games_that_havent_met_goal = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });
    console.log(games_that_havent_met_goal.length);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(games_that_havent_met_goal);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const games_that_met_goal = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });
    console.log(games_that_met_goal.length);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(games_that_met_goal);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', () => {
    filterUnfundedOnly();
});
fundedBtn.addEventListener('click', () => {
    filterFundedOnly();
});
allBtn.addEventListener('click', () => {
    showAllGames();
});

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfunded_games = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
});

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${total_raised.toLocaleString('en-US')} has been raised for 11 games. Currently, ${unfunded_games.length < GAMES_JSON.length ? unfunded_games.length : 0} game remains unfunded. We need\
 your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const description = document.getElementById('description-container');

const paragraph = document.createElement('p');
paragraph.innerHTML = displayStr;
description.appendChild(paragraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
console.log(sortedGames);

// use destructuring and the spread operator to grab the first and second games
let [first_game, second_game, ...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const top_game = document.createElement('div');
top_game.innerHTML += `<img src="${first_game.img}" alt="image of the game" class="game-img">`;
top_game.innerHTML += `<h3><b>${first_game.name}</b></h3>`;
top_game.innerHTML += `Description: ${first_game.description} `;
top_game.innerHTML += `<br><br>Backers: ${first_game.pledged}`;
firstGameContainer.appendChild(top_game);

// do the same for the runner up item
const runner_up = document.createElement('div');
runner_up.innerHTML += `<img src="${second_game.img}" alt="image of the game" class="game-img">`;
runner_up.innerHTML += `<h3><b>${second_game.name}</b></h3>`;
runner_up.innerHTML += `Description: ${second_game.description} `;
runner_up.innerHTML += `<br><br>Backers: ${second_game.pledged}`;
secondGameContainer.appendChild(runner_up);

// go to the games content with scrollIntoView()
const game_nav_button = document.getElementById('our-games-navigation');
game_nav_button.addEventListener('click', () => {
    goToGames();
});

// logic for going to the games section. grab target div and use scrollIntoView()
function goToGames() {
    const target_div = document.getElementById('our-games');
    target_div.scrollIntoView({ behavior: 'smooth' });
}

// search games using 'input' and 'click' event listeners for searchInput and searchButton respectively
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// if query exists, perform the search and go to the Games content to see results. else, delete all games in container and readd the games.
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    if (query) {
        performSearch();
    } else {
        deleteChildElements(gamesContainer);
        addGamesToPage(GAMES_JSON);
    }
});

// if click the search button, perform your search, and go to games
searchButton.addEventListener('click', () => {
    performSearch();
    goToGames();
});

function performSearch() {
    // grab the value of the searchInput search tag with .value
    const query = searchInput.value.toLowerCase();

    // grab list of all gameCards
    const gameCardsList = gamesContainer.getElementsByClassName('game-card');

    // loop over the gamesContainer and check if the query includes the game
    for (var i = 0; i < gameCardsList.length; i++) {
        const gameTitle = gameCardsList[i].getAttribute('data-title').toLowerCase();

        if (!gameTitle.includes(query)) {
            gameCardsList[i].style.display = 'none';
        } else {
            gameCardsList[i].style.display = 'block';
        }
    }
}