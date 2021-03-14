// global
var allPlayers = JSON.parse(localStorage.getItem("allPlayers")) || [];
var contentEl = document.querySelector("#content");
var listEl = document.querySelector("top5");
var actionsEl = document.querySelector("#actions");
var list ="";

// sort and trim top players
allPlayers.sort( (a,b) => b.result - a.result)
allPlayers.splice(5);

// extract top players from array
function getPlayers(item) {
  var playerResult = [item.player,item.result].join(" : ");
  return playerResult;
}

// html elements - what am I'm going to insert?
var listEl = document.createElement("div");
var actionsEl = document.createElement("button");

// Build list of players
var finalists = allPlayers.map(getPlayers);
finalists.forEach(arrangeList);
document.getElementById("top5").innerHTML = list;

function arrangeList(value, index, array) {
  list = list + value + "<br>"
}
listEl.textContent = list;

// build button to delete localstorage
contentEl.appendChild(actionsEl);
actionsEl.className = "btn btn-danger btn-lg mt-5";
actionsEl.textContent = "Clear Leaderboard";

actionsEl.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
})