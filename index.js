

// connect html elements to variables
let playground = document.querySelector('.playground');
let generate = document.querySelector('#generate');
let solve = document.querySelector('#solve');
let resultDisplay = document.querySelector('.result');
let solveButton = document.querySelector('#solve');
let generateButton = document.querySelector('#generate');


// start point is i=0 j=0, end point is i=maze.length-1 j=maze[maze.length-1].length

// create basic maze
let maze = [
  [1, 0, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 1],
  [1, 1, 0, 0, 1, 1],
  [1, 0, 0, 1, 0, 1],
  [1, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1]];

// current point and endpoint
let myI = 0;
let myJ = 0;
let endI = maze.length - 1;
let endJ = maze[maze.length - 1].length - 1;

// create function to draw a box: spare or filled
const createBox = (className) => {
  let newBox = document.createElement('div');
  newBox.classList.add(className);
  return newBox;
};

// draw a maze
const drawMaze = () => {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] == 0) {
        playground.appendChild(createBox('filled'));
      } else if (maze[i][j] == 1) {
        playground.appendChild(createBox('spare'));
      };
    };
  };
};

// recursive function to find a path
const findSolution = (maze, myI, myJ, whereFrom) => {
  // check for the end
  if (myI == endI && myJ == endJ) {
    return 8;
  }
  // after finishing the program, I realised, that this code is not needed anymore, but thaought it was usefull, saved it for history
  // we change 1 to 0 if there is only one way where we have come from, start and end point does not suit this condition
  // if ((myI == 0 && myJ == 0)) {
  //   console.log('we in the begining');
  // } else if (myI == endI && myJ == endJ) {
  //   console.log('we are in the end');
  // } else {
  //   if (myI == 0) {
  //     if (myJ == 0) {
  //       if ((maze[myI + 1][myJ] + maze[myI][myJ + 1]) == 0) {
  //         return 0;
  //       }
  //     } else if (myJ == endJ) {
  //       if ((maze[myI + 1][myJ] + maze[myI][myJ - 1]) == 0) {
  //         return 0;
  //       }
  //     } else {
  //       if ((maze[myI + 1][myJ] + maze[myI][myJ - 1] + maze[myI][myJ + 1]) == 0) {
  //         return 0;
  //       }
  //     }
  //   } else if (myJ == 0) {
  //     if (myI == endI) {
  //       if ((maze[myI - 1][myJ] + maze[myI][myJ + 1]) == 0) {
  //         return 0;
  //       }
  //     } else {
  //       if ((maze[myI + 1][myJ] + maze[myI - 1][myJ] + maze[myI][myJ + 1]) == 0) {
  //         return 0;
  //       }
  //     }
  //   } else if (myI == endI) {
  //     if (myJ == endJ) {
  //       if ((maze[myI - 1][myJ] + maze[myI][myJ - 1]) == 0) {
  //         return 0;
  //       }
  //     } else {
  //       if ((maze[myI - 1][myJ] + maze[myI][myJ - 1] + maze[myI][myJ + 1]) == 0) {
  //         return 0;
  //       }
  //     }
  //   } else if (myJ == endJ) {
  //     if ((maze[myI - 1][myJ] + maze[myI + 1][myJ] + maze[myI][myJ - 1]) == 0) {
  //       return 0;
  //     }
  //   } else {
  //     if ((maze[myI - 1][myJ] + maze[myI + 1][myJ] + maze[myI][myJ - 1] + maze[myI][myJ + 1]) == 0) {
  //       return 0;
  //     }
  //   }
  // }

  // go right
  if (myJ + 1 <= endJ) {
    if (maze[myI][myJ + 1] == 1 && whereFrom !== 'right') {
      if (findSolution(maze, myI, myJ + 1, 'left') == 8) {
        maze[myI][myJ + 1] = 8;
        return 8;
      }
    }
  }
  // go down
  if (myI + 1 <= endI) {
    if (maze[myI + 1][myJ] == 1 && whereFrom !== 'down') {
      if (findSolution(maze, myI + 1, myJ, 'up') == 8) {
        maze[myI + 1][myJ] = 8;
        return 8;
      }
    }
  }
  // go left
  if (myJ - 1 >= 0) {
    if (maze[myI][myJ - 1] == 1 && whereFrom !== 'left') {
      if (findSolution(maze, myI, myJ - 1, 'right') == 8) {
        maze[myI][myJ - 1] = 8;
        return 8;
      }
    };
  }
  // go up
  if (myI - 1 >= 0) {
    if (maze[myI - 1][myJ] == 1 && whereFrom !== 'up') {
      if (findSolution(maze, myI - 1, myJ, 'down') == 8) {
        maze[myI - 1][myJ] = 8;
        return 8;
      }
    };
  }
  return maze[0][0];
};

// function to erase a maze with a new maze that has solution
function printSolution() {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] == 8) {
        playground.appendChild(createBox('box'));
      } else if (maze[i][j] == 0) {
        playground.appendChild(createBox('filled'));
      }
      else {
        playground.appendChild(createBox('spare'));
      }
    };
  };
}

// generator of the maze
const mazeGenerator = () => {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      let luckyNumber = Math.floor(Math.random() * 10);
      if (luckyNumber > 5) {
        maze[i][j] = 0;
      } else {
        maze[i][j] = 1;
      }
    };
  };
  maze[0][0] = 1;
  maze[5][5] = 1;
};

// body of the program
mazeGenerator();
drawMaze(); // initial drawning of the maze

solveButton.addEventListener('click', () => {
  maze[0][0] = findSolution(maze, 0, 0, 'left');
  playground.textContent = '';
  printSolution();
});

generateButton.addEventListener('click', () => {
  mazeGenerator();
  playground.textContent = '';
  drawMaze();
});