import {
  disableCanvas,
  hideControls,
  enableCanvas,
  showControls,
  resetCanvas
} from "./paint";
import { disableChat, enableChat } from "./chat";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");
const time = document.getElementById("jsTimer");

let timeset = null;

const addPlayers = players => {
  board.innerHTML = "";
  players.forEach(player => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

const setNotifs = text => {
  notifs.innerText = "";
  notifs.innerText = text;
};

const timerStart = x => {
  timeset = setInterval(() => {
    if (x == 0) {
      clearInterval(timeset);
    }
    x--;
    if (isNaN(x)) {
      return String(x);
    }
    time.innerHTML = `${x}s`;
  }, 1000);
};

const timerStop = () => {
  clearInterval(timeset);
  timeset = null;
  time.innerText = "";
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = () => {
  setNotifs("");
  disableCanvas();
  hideControls();
  enableChat();
  timerStart(31);
};

export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  disableChat();
  notifs.innerText = `You are the leader, paint: ${word}`;
};

export const handleGameEnded = () => {
  setNotifs("Game Ended.");
  disableCanvas();
  hideControls();
  resetCanvas();
  timerStop();
};

export const handleGameStarting = () => setNotifs("Game will start soon");
