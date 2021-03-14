// global
var allPlayers = JSON.parse(localStorage.getItem("allPlayers")) || [];
var contentEl = document.querySelector("#content");
var titleEl = document.querySelector("#title"); 
var playersEl = document.querySelector("#players");
var actionsEl = document.querySelector("#actions");

// sort and trim winners
allPlayers.sort( (a,b) => b.result - a.result)
allPlayers.splice(5);

// extract from array
function getPlayers(item) {
  var playerResult = [item.player,item.result].join(" - score: ");
  return playerResult;
}

// html elements - what am I'm going to insert?
var titleEl = document.createElement("h2");
var playersEl = document.createElement("p");
var actionsEl = document.createElement("button");

// classes and defaults - how are they going to be "boot-camp dressed"?
titleEl.className = "h2 text-primary";
playersEl.className = "h3";
actionsEl.className = "btn btn-danger btn-lg mt-5";

// Load all the elements to the HTML - Arrange properly from top to bottom
contentEl.appendChild(titleEl);
contentEl.appendChild(playersEl);
contentEl.appendChild(actionsEl);

// Write content
titleEl.textContent = "Top 5 Players"
playersEl.textContent = allPlayers.map(getPlayers);
actionsEl.textContent = "Clear Leaderboard"

// clear localStorage
actionsEl.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
})