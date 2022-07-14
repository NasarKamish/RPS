// // // // // // VARIABLES // // // // // //

let choices = ["Rock", "Paper", "Scissors"];

let lives = 3;

let levels = [
  "Easy",
  "Normal",
  "Dwane_Johnson",
  "Free_Money",
  "RWS",
  "Imposible",
];

let difficulty = "";

let playerChoice = "";

let wins = 0;

// // // // // // CONTAINERS // // // // // //

let gameContainer = document.querySelector(".game");

// // // // // // POPULATION // // // // // //

function popLives() {
  let livesContainer = document.querySelector(".lives");
  if (lives > 0) {
    livesContainer.innerHTML = `You have ${lives} Lives!`;
  } else {
    livesContainer.innerHTML = `You have No Lives Left!`;
    document.querySelectorAll(".choice-btn").forEach((btn) => {
      btn.disabled = true;
      btn.classList.add("disabled");
    });
  }
}

function popGameMenu() {
  return `
    <div class="game-menu">
      <button class="menu-btn" onclick="restartGame()">Restart</button>
      <button class="menu-btn" onclick="returnGame()">Return</button>
    </div>
  `;
}

function popDefault() {
  let gameHtml = `
    <h4 class="game-heading">PICK THE LEVEL YOU WANT TO PLAY</h4>
    <ul class="levels">
  `;
  levels.forEach((level) => {
    gameHtml += `
      <li class="level" data-title="${level}" onclick="setLevel('${level}')">
        <span>${level}</span>${level}
      </li>
    `;
  });
  gameHtml += `</ul>`;
  gameContainer.innerHTML = gameHtml;
}

popDefault();

function popGame() {
  let gameHtml = `
    <h3 class="lives">You have 3 Lives!</h3>
    <div class="play-area">
      <div class="user-choice">
        <h4 class="choice-head">PICK YOUR CHOICE</h4>
        <div class="choice-btns">
          <button onclick="playerClick('${choices[0]}')" class="choice-btn">${choices[0]}</button>
          <button onclick="playerClick('${choices[1]}')" class="choice-btn">${choices[1]}</button>
          <button onclick="playerClick('${choices[2]}')" class="choice-btn">${choices[2]}</button>
        </div>
      </div>
      <div class="play-images">
        <div class="user-playing"></div>
        <div class="bot-playing"></div>
      </div>
    </div>
    <div class="status">
      <h4 class="status-head"></h4>
    </div>
  `;
  gameHtml += popGameMenu();
  gameContainer.innerHTML = gameHtml;
}

function popChoices(p, a) {
  let randomNum = () => {
    return Math.floor(Math.random() * 9 + 1);
  };

  document.querySelector(".user-playing").innerHTML = `
    <h4 class="image-head">Your Choosen ${p}</h4>
    <img src="./Images/${p}/${p}_${randomNum()}.jpg" alt="${p}" width="150" height="150"/>
  `;

  document.querySelector(".bot-playing").innerHTML = `
    <h4 class="image-head">AI Choosen ${a}</h4>
    <img src="./Images/${a}/${a}_${randomNum()}.jpg" alt="${a}" width="150" height="150"/>
  `;
}

// // // // // // FUNCTIONALITY OF THE GAME // // // // // //

let restartGame = () => {
  lives = 3;
  playerChoice = "";
  wins = 0;
  popGame();
};

let returnGame = () => {
  lives = 3;
  difficulty = "";
  playerChoice = "";
  wins = 0;
  document.querySelectorAll(".choice-btn").forEach((btn) => {
    btn.disabled = false;
  });
  popDefault();
};

let randomChoice = () => {
  return Math.floor(Math.random() * 3);
};

let aiChoice = () => {
  if (difficulty === levels[0]) {
    if (playerChoice == choices[1]) {
      return choices[0];
    } else if (playerChoice == choices[2]) {
      return choices[1];
    } else if (playerChoice == choices[0]) {
      return choices[2];
    }
  } else if (difficulty == levels[1]) {
    return choices[randomChoice()];
  } else if (difficulty == levels[2]) {
    return choices[0];
  } else if (difficulty == levels[3]) {
    return choices[1];
  } else if (difficulty == levels[4]) {
    return choices[2];
  } else if (difficulty == levels[5]) {
    if (playerChoice == choices[2]) {
      return choices[0];
    } else if (playerChoice == choices[0]) {
      return choices[1];
    } else if (playerChoice == choices[1]) {
      return choices[2];
    }
  } else {
    return null;
  }
};

let compare = (p, a) => {
  let outcome = "";
  if (p === choices[0]) {
    if (a === choices[0]) {
      outcome = "Draw";
    } else if (a === choices[1]) {
      outcome = "Lose";
    } else if (a === choices[2]) {
      outcome = "Win";
    }
  } else if (p === choices[1]) {
    if (a === choices[0]) {
      outcome = "Win";
    } else if (a === choices[1]) {
      outcome = "Draw";
    } else if (a === choices[2]) {
      outcome = "Lose";
    }
  } else if (p === choices[2]) {
    if (a === choices[0]) {
      outcome = "Lose";
    } else if (a === choices[1]) {
      outcome = "Win";
    } else if (a === choices[2]) {
      outcome = "Draw";
    }
  }
  return outcome;
};

let playerClick = (choice) => {
  playerChoice = choice;
  let aiPlay = aiChoice();
  popChoices(choice, aiPlay);
  let outcome = compare(choice, aiPlay);
  let statement = ``;
  if (outcome === "Win") {
    statement = `You have Won with '${playerChoice}' against '${aiPlay}', and you have Gained a Life!`;
    lives += 1;
  } else if (outcome === "Draw") {
    statement = `We have a draw with '${playerChoice}'!`;
  } else if (outcome === "Lose") {
    statement = `Sorry You have Lost with '${playerChoice}' against '${aiPlay}', and you have Lost a Life.`;
    lives -= 1;
  }

  popLives();
  document.querySelector(".status-head").innerHTML = statement;
};

function setLevel(level) {
  difficulty = level;
  popGame();
}
