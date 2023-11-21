/**
 * Juego de laberintos. Consiste en presentar tres laberintos y que el usuario pueda intenrar resolverlos.
 *
 * Autor: Mario López
 */

const prompt = require("prompt-sync")({ sigint: true });

let menuOption;
let subMenuOption;
let jugada;
let game = true;

let noob = [
  ["#", "#", "#", "#", "#", "#"],
  ["#", "#", " ", " ", " ", "#"],
  ["#", "u", " ", "#", "o", "#"],
  ["#", "#", "#", "#", "#", "#"],
];
let pro = [
  ["#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "u", "#", "o", " ", " ", " ", "#"],
  ["#", " ", "#", "#", "#", "#", " ", "#"],
  ["#", " ", "#", "#", " ", "#", " ", "#"],
  ["#", " ", " ", " ", " ", " ", " ", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#"],
];
let hardcore = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", " ", " ", " ", "#", " ", " ", " ", "#", "#"],
  ["#", " ", "#", " ", "#", " ", "#", " ", "#", "#"],
  ["#", " ", "#", "#", "#", " ", " ", " ", " ", "#"],
  ["#", " ", " ", "#", "#", "o", "#", "#", " ", "#"],
  ["#", " ", " ", " ", "#", "#", "#", "#", " ", "#"],
  ["#", "u", "#", " ", " ", " ", " ", " ", " ", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

while (game === true) {
  do {
    console.clear();
    console.log(
      " |--------------------------------------|\n",
      "|---- Bienvenid@ a LABYRINTH GAME -----|\n",
      "|--------------------------------------|"
    );
    console.log();
    console.log(
      " |--------------------------------------|\n",
      "|----        LABYRINTH GAME        ----|\n",
      "|--------------------------------------|\n",
      "|----  1.          Noob            ----|\n",
      "|----  2.          Pro             ----|\n",
      "|----  3.        Hardcore          ----|\n",
      "|----  4.          Exit            ----|\n",
      "|--------------------------------------|"
    );
    console.log();
    menuOption = Number.parseInt(prompt("Elige tu laberinto aventurero: "));
  } while (menuOption < 1 || menuOption > 4 || isNaN(menuOption) === true);

  if (menuOption === 4) {
    console.clear();
    break;
  }

  let back = true;
  let maze;
  let playerRow, playerCol, exitRow, exitCol;
  let move = 0;
  let way = 0;
  let casillaU = 0;
  let casillaO = 0;
  let totalCasillas = 0;
  let mazeName;

  if (menuOption === 1) {
    maze = noob;
    mazeName = "NOOB LABYRINTH";
  } else if (menuOption === 2) {
    maze = pro;
    mazeName = "PRO LABYRINTH";
  } else if (menuOption === 3) {
    maze = hardcore;
    mazeName = "HARDCORE LABYRINTH";
  }

  while (back === true) {
    console.clear();
    console.log(mazeName);
    console.log();
    console.log(
      " |--------------------------------------|\n",
      "|----  1.     Ver el laberinto     ----|\n",
      "|----  2.    Jugar el laberinto    ----|\n",
      "|----  3.       Volver atrás       ----|\n",
      "|--------------------------------------|"
    );
    console.log();
    subMenuOption = Number.parseInt(prompt("Escoge que quieres hacer: "));

    if (subMenuOption === 1) {
      console.clear();
      console.log(mazeName);
      console.log();
      for (let i = 0; i < maze.length; i++) {
        console.log(maze[i].join(" "));
      }
      console.log();
      prompt("Presiona enter para volver...");
    } else if (subMenuOption === 2) {
      console.clear();
      console.log();
      for (let i = 0; i < maze.length; i++) {
        console.log(maze[i].join(" "));
        for (let j = 0; j < maze[i].length; j++) {
          if (maze[i][j] === "u") {
            playerRow = i;
            playerCol = j;
            casillaU += 1;
          } else if (maze[i][j] === "o") {
            exitRow = i;
            exitCol = j;
            casillaO += 1;
          } else if (maze[i][j] === " ") {
            way += 1;
          }
        }
      }

    while (subMenuOption === 2) {
      console.log();
      console.log(
        " |--------------------------------------|\n",
        "|----  1.          Arriba          ----|\n",
        "|----  2.         Izquierda        ----|\n",
        "|----  3.           Abajo          ----|\n",
        "|----  4.          Derecha         ----|\n",
        "|--------------------------------------|"
      );
      console.log();
      jugada = Number.parseInt(prompt("Escoge tu movimiento: "));
      console.clear();

      switch (jugada) {
        case 1: // Mover arriba
          if (playerRow > 0 && maze[playerRow - 1][playerCol] !== "#") {
            maze[playerRow][playerCol] = " ";
            playerRow--;
            maze[playerRow][playerCol] = "u";
          } else {
            console.log("¡Por ahí hay una pared!");
            console.log();
          }
          move += 1;
          break;
        case 2: // Mover izquierda
          if (playerCol > 0 && maze[playerRow][playerCol - 1] !== "#") {
            maze[playerRow][playerCol] = " ";
            playerCol--;
            maze[playerRow][playerCol] = "u";
          } else {
            console.log("¡Por ahí hay una pared!");
            console.log();
          }
          move += 1;
          break;
        case 3: // Mover abajo
          if (playerRow < maze.length - 1 && maze[playerRow + 1][playerCol] !== "#") {
            maze[playerRow][playerCol] = " ";
            playerRow++;
            maze[playerRow][playerCol] = "u";
          } else {
            console.log("¡Por ahí hay una pared!");
            console.log();
          }
          move += 1;
          break;
        case 4: // Mover derecha
          if (playerCol < maze[0].length - 1 && maze[playerRow][playerCol + 1] !== "#") {
            maze[playerRow][playerCol] = " ";
            playerCol++;
            maze[playerRow][playerCol] = "u";
          } else {
            console.log("¡Por ahí hay una pared!");
            console.log();
          }
          move += 1;
          break;
      }

      totalCasillas = casillaO + casillaU + way + 2;

      // Victoria
      if (playerRow === exitRow && playerCol === exitCol) {
        console.clear();
        console.log("¡Felicidades, has encontrado la salida!");
        console.log();
        console.log("Te has pasado el laberinto con", move, "movimientos de los", totalCasillas, "que puedes hacer.");
        console.log();
        prompt("Presiona enter para volver...");
        subMenuOption = 3; // Salir del juego
        back = false;
      } else {
        for (let i = 0; i < maze.length; i++) {
          console.log(maze[i].join(" "));
        }
      }

      // Derrota
      if (move > totalCasillas) {
        console.clear();
        console.log("¡Has perdido!");
        console.log();
        console.log("Has hecho", move, "movimientos de los", totalCasillas, "que tienes para pasar el nivel.");
        console.log();
        prompt("Presiona enter para salir...");
        subMenuOption = 3; // Salir del juego
        back = false;
      }
    }
  } else if (subMenuOption === 3) {
    back = false;
  }
}
}
