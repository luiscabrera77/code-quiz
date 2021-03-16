// global
var allPlayers = JSON.parse(localStorage.getItem("allPlayers")) || [];
var contentEl = document.querySelector("#content"); // NOW I want the list HERE!!!
var actionsEl = document.querySelector("#actions");

// sort and trim top players
allPlayers.sort( (a,b) => b.result - a.result)
allPlayers.splice(5);

//try again like a PRO
var displayWinners = function(array) {
  // check if there are any winners
  if (array.length === 0) {
    contentEl.textContent = 'No winners yet.';
    return;
  }
  // loop over winners
  for (var i = 0; i < array.length; i++) {
    // format winner name
    var winnerName = array[i].player + ': ' + array[i].result;

    // create a container for each winner
    var winnerEl = document.createElement('div');
    winnerEl.classList = 'h4';

    // create a span element to hold winner name
    var lineEl = document.createElement('span');
    lineEl.textContent = winnerName;

    // append span to container
    winnerEl.appendChild(lineEl);

    // append container to the dom
    contentEl.appendChild(winnerEl);
  }
};

displayWinners(allPlayers);

// other html elements - what am I'm going to insert?
var buttonEl = document.createElement("button");
buttonEl.className = "btn btn-danger btn-lg mt-5";
buttonEl.textContent = "Clear Leaderboard";
actionsEl.appendChild(buttonEl);

buttonEl.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
})
