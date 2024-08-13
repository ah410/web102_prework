# WEB102 Prework - *GamesGalore*

Submitted by: **Ali Hamad**

**GamesGalore** is a website for the company Sea Monster Crowdfunding that displays information about the games they have funded.

Time spent: **6** hours spent in total

## Required Features

The following **required** functionality is completed:

* [ ] The introduction section explains the background of the company and how many games remain unfunded.
* [ ] The Stats section includes information about the total contributions and dollars raised as well as the top two most funded games.
* [ ] The Our Games section initially displays all games funded by Sea Monster Crowdfunding
* [ ] The Our Games section has three buttons that allow the user to display only unfunded games, only funded games, or all games.

The following **optional** features are implemented:

* [ ] Implemented a go to games button that scrolls to the games content in the nav bar
* [ ] Added a search feature to search for games that has 2 parts
    * [ ] Dynamic search: listening to every input typed and dynamically updates the games content
    * [ ] Button to click if you want to search this way instead. This part takes you to the games content and utilizes the go to games button
* [ ] Added in pledges and images to the top game and runner up

## Video Walkthrough

Here's a walkthrough of implemented features:

<img src='assets\Web102Gif_PreWork.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ScreenToGif
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

No particular challenges other than negligence on my part like forgetting the keyword return for
my reduce() function, mispelling certain classes when doing document.getElementById(), etc. One challenge that took a little time to figure out was when I was implementing my search functionality. When I was dynamically listening for any input, if ther wasn't a query, I simply called the function that I implemented in the earlier challenges, addGamesToPage() by passing GAMES_JSON. However, I noticed that when I searched a game, then deleted the text, then search that same game again, ther were multiple game-cards of that game. I came to the conclusion that since I was simply hiding my game-cards if they didn't match the query, when my query is empty, I will add to my existing cards, thus creating duplicates. If the query is empty, I need to delete all game-cards then grab all the game-cards. I was basically just resetting the board.

## License

    Copyright [2024] [Ali Hamad]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
