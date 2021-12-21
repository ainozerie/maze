

// connect html elements to variables
let playground = document.querySelector('.playground');
let info = document.querySelector('#info');
let generate = document.querySelector('#generate');
let solve = document.querySelector('#solve');
let resultDisplay = document.querySelector('.result');

// start point is i=0 j=0, end point is i=maze.length-1 j=maze[maze.length-1].length

// create basic maze
let maze = [[1, 0, 1, 0, 0, 1], [1, 1, 1, 1, 1, 1], [1, 0, 1, 0, 1, 0], [1, 1, 1, 1, 1, 0], [1, 0, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1]];
console.log(maze, 'hi');
// making solution the same size maze but with all zeros
// const solution = [];
// for (let i = 0; i < maze.length; i++) {
//   solution[i] = maze[i];
//   for (let j = 0; j < maze[i].length; j++) {
//     solution[i][j] = maze[i][j];
//   }
// }
// solution[0][0] = 1;
// solution[maze.length - 1][maze[maze.length - 1].length - 1] = 1;
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

// check createBox Function
for (let i = 0; i < maze.length; i++) {
  for (let j = 0; j < maze[i].length; j++) {
    if (maze[i][j] == 0) {
      playground.appendChild(createBox('filled'));
    } else if (maze[i][j] == 1) {
      playground.appendChild(createBox('spare'));
    };
  };
};

const findSolution = (maze, myI, myJ, whereFrom) => {
  // check for the end
  if (myI == endI && myJ == endJ) {
    return 8;
  }

  // we change 1 to 0 if there is only one way where we have come from, start and end point does not suit this condition
  if ((myI == 0 && myJ == 0)) {
    console.log('we in the begining');
  } else if (myI == endI && myJ == endJ) {
    console.log('we are in the end');
  } else {
    if (myI == 0) {
      if (myJ == 0) {
        if ((maze[myI + 1][myJ] + maze[myI][myJ + 1]) == 1) {
          maze[myI][myJ] = 0;
        }
      } else if (myJ == endJ) {
        if ((maze[myI + 1][myJ] + maze[myI][myJ - 1]) == 1) {
          maze[myI][myJ] = 0;
        }
      } else {
        if ((maze[myI + 1][myJ] + maze[myI][myJ - 1] + maze[myI][myJ + 1]) == 1) {
          maze[myI][myJ] = 0;
        }
      }
    } else if (myJ == 0) {
      if (myI == endI) {
        if ((maze[myI - 1][myJ] + maze[myI][myJ + 1]) == 1) {
          return 0;
        }
      } else {
        if ((maze[myI + 1][myJ] + maze[myI - 1][myJ] + maze[myI][myJ + 1]) == 1) {
          return 0;
        }
      }
    } else if (myI == endI) {
      if (myJ == endJ) {
        if ((maze[myI - 1][myJ] + maze[myI][myJ - 1]) == 1) {
          return 0;
        }
      } else {
        if ((maze[myI - 1][myJ] + maze[myI][myJ - 1] + maze[myI][myJ + 1]) == 1) {
          return 0;
        }
      }
    } else if (myJ == endJ) {
      if ((maze[myI - 1][myJ] + maze[myI + 1][myJ] + maze[myI][myJ - 1]) == 1) {
        return 0;
      }
    } else {
      if ((maze[myI - 1][myJ] + maze[myI + 1][myJ] + maze[myI][myJ - 1] + maze[myI][myJ + 1]) == 1) {
        return 0;
      }
    }
  }

  // go right
  if (myJ + 1 <= endJ) {
    if (maze[myI][myJ + 1] == 1 && whereFrom !== 'right') {
      if (findSolution(maze, myI, myJ + 1, 'left') == 8) {
        maze[myI][myJ + 1] = 8;
        return 8;
      } else {
        maze[myI][myJ + 1] = 0;
      }
    }
  }
  if (myI + 1 <= endI) {
    if (maze[myI + 1][myJ] == 1 && whereFrom !== 'down') {
      if (findSolution(maze, myI + 1, myJ, 'up') == 8) {
        maze[myI + 1][myJ] = 8;
        return 8;
      } else {
        maze[myI + 1][myJ] = 0;
      }
    }
  }
  if (myJ - 1 >= 0) {
    if (maze[myI][myJ - 1] == 1 && whereFrom !== 'left') {
      if (findSolution(maze, myI, myJ - 1, 'right') == 8) {
        maze[myI][myJ - 1] = 8;
        return 8;
      } else {
        maze[myI][myJ - 1] = 0;
      }
    };
  }
  if (myI - 1 >= 0) {
    if (maze[myI - 1][myJ] == 1 && whereFrom !== 'up') {
      if (findSolution(maze, myI - 1, myJ, 'down') == 8) {
        maze[myI - 1][myJ] = 8;
        return 8;
      } else {
        maze[myI - 1][myJ] = 0;
      }
    };
  }
  return 0;
};
maze[0][0] = findSolution(maze, 0, 0, 'left');
console.log(maze);

// for (let i = 0; i < solution.length; i++) {
//   for (let j = 0; j < solution[i].length; j++) {
//     if (solution[i][j] == 8) {
//       resultDisplay.appendChild(createBox('box'));
//     } else {
//       resultDisplay.appendChild(createBox('spare'));
//     };
//   };
// };

for (let i = 0; i < maze.length; i++) {
  for (let j = 0; j < maze[i].length; j++) {
    if (maze[i][j] == 8) {
      playground.appendChild(createBox('box'));
    } else {
      playground.appendChild(createBox('filled'));
    };
  };
};