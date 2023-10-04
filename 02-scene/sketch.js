// Gabe PausJenssen
// Computer Science 30
// October 2, 2023
// Interactive Scene Assignment

// Extra for Experts: Although it behaves buggy if you press multiple arrow keys at a time, I programmed how to detect if the police officer is touching a wall in the maze. I thought that JavaScript would have a function like Scratch's "if touching color (?)" block, but it doesn't, so I researched all of p5.js's colour references and ultimately figured out how to make it work. The get() function returns the red, green, blue and alpha values of the current pixel of the police officer, so using the indices [0], [1] and [2] and checking if their values are greather than 0 prove that the police officer is touching a wall.

let screen = "Start";

function preload() {
  police = loadImage("Police.png");
  bomb = loadImage("Bomb.png");
  maze = loadImage("Beat the Bomb.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  values();
  resetGame();
}

function windowResized() {
  // If the user resizes the window, the game will reset
  resizeCanvas(windowWidth, windowHeight);
  values();
  resetGame();
}

function draw() {
  background(0);
  gameMode();
  
  if (screen === "Difficulty") {
    background(0);
    beatBombMode();
  }
  
  if (screen === "Beat the Bomb: Instructions") {
    background(0);
    beatBombInstructions();
  }
  
  if (screen === "Beat the Bomb: Easy") {
    background(0);
    beatBombEasy();
  }
  
  if (screen === "Beat the Bomb: Medium") {
    background(0);
    beatBombMedium();
  }
  
  if (screen === "Beat the Bomb: Hard") {
    background(0);
    beatBombHard();
  }
  
  if (screen === "Maze Gaze: Instructions") {
    background(0);
    mazeGazeInstructions();
  }
  
  if (screen === "Maze Gaze") {
    background(0);
    mazeGaze();
  }
  
  if (screen === "Beat the Bomb: Easy (Win)") {
    background(0);
    beatBombEasyWin();
  }
  
  if (screen === "Beat the Bomb: Easy (Loss)") {
    background(0);
    beatBombEasyLoss();
  }
  
  if (screen === "Maze Gaze (Win)") {
    background(0);
    mazeGazeWin();
  }
  
  if (screen === "Maze Gaze (Loss)") {
    background(0);
    mazeGazeLoss();
  }
}

function values() {
  // A lot of confusing math got put into these values; I stored them all here to declutter the other functions. These create the (hopefully perfect) responsive game and are called in both the setup() and windowResized() functions.
  
  gameModeInstructionSize = 0.07*width;
  gameModeInstructionYcor = 0.1*height;
  
  buttonXcor = width/12;
  buttonWidth = (5*width)/6;
  buttonHeight = 0.125*height;
  buttonTextSize = 0.1*width;
  lowerButtonText = height/100;
  
  gameModeTextXcor = width/2;
  
  beatBombButtonYcor = (7*height)/20;
  mazeGazeButtonYcor = (13*height)/20;
  
  beatBombTextYcor = ((2*beatBombButtonYcor + buttonHeight)/2) + lowerButtonText;
  mazeGazeTextYcor = ((2*mazeGazeButtonYcor + buttonHeight)/2) + lowerButtonText;
  
  easyButtonYcor = height/5;
  mediumButtonYcor = height/2;
  hardButtonYcor = height/1.25;
  
  easyTextYcor = ((2*easyButtonYcor + buttonHeight)/2) + lowerButtonText;
  mediumTextYcor = ((2*mediumButtonYcor + buttonHeight)/2) + lowerButtonText;
  hardTextYcor = ((2*hardButtonYcor + buttonHeight)/2) + lowerButtonText;
  
  beatBombInstructionSize = 0.05*width;
  
  textBoxWidth = width;
  textBoxHeight = height;
  
  footerSize = 0.025*width;
  
  redTextYcor = -0.08*height;
  greenTextYcor = height/3;
  blueTextYcor = 0.45*height;
  
  topLeft = 0;
  
  imageHeight = 0.08*height;
  
  bombWidth = width/15;
  policeWidth = 0.06*width;
  
  policeXstart = (31*width)/150;
  policeYstart = 0.92*height;
  
  timeSize = 0.075*width;
  timeXcor = width/9;
  timeYcor = 0.05*height;
  
  countdownXcor = width/2;
  countdownYcor = height/2;
  
  movePoliceLeftRight = width/150;
  movePoliceUpDown = height/150;
  
  leftBoundary = 0;
  rightBoundary = 0.9375*width;
  bottomBoundary = 0.925*height;
  
  policeWin = 0.035*height;
  
  gameResultXcor = 0;
  gameResultYcor = 0;
}

function gameMode() {  
  noStroke();
  
  fill("blue");
  textSize(gameModeInstructionSize);
  textAlign(CENTER, CENTER);
  text("CHOOSE YOUR GAME MODE:", gameModeTextXcor, gameModeInstructionYcor);
  
  // Creates two buttons
  fill(20);
  rect(buttonXcor, beatBombButtonYcor, buttonWidth, buttonHeight);
  rect(buttonXcor, mazeGazeButtonYcor, buttonWidth, buttonHeight);
  
  fill("red");
  textSize(buttonTextSize);
  text("BEAT THE BOMB", gameModeTextXcor, beatBombTextYcor);
  text("THE MAZE GAZE", gameModeTextXcor, mazeGazeTextYcor);
  
  // If you hover over the Beat the Bomb button, the button and the text change colour to let you know that it is clickable. (Pattern follows.)
  if (mouseX >= buttonXcor && mouseX <= width - buttonXcor && mouseY >= beatBombButtonYcor && mouseY <= beatBombButtonYcor + buttonHeight) {
    fill("red");
    rect(buttonXcor, beatBombButtonYcor, buttonWidth, buttonHeight);
    fill("black");
    text("BEAT THE BOMB", gameModeTextXcor, beatBombTextYcor);
    
    // If you are currently on the Start screen and you click on the button, it will take you to a different screen to choose your game difficulty. (Pattern follows.)
    if (mouseIsPressed && screen === "Start") {
      screen = "Difficulty";
    }
  }
  
  if (mouseX >= buttonXcor && mouseX <= width - buttonXcor && mouseY >= mazeGazeButtonYcor && mouseY <= mazeGazeButtonYcor + buttonHeight) {
    fill("red");
    rect(buttonXcor, mazeGazeButtonYcor, buttonWidth, buttonHeight);
    fill("black");
    text("THE MAZE GAZE", gameModeTextXcor, mazeGazeTextYcor);
    
    if (mouseIsPressed && screen === "Start") {
      screen = "Maze Gaze: Instructions";
    }
  }
}

function beatBombMode() {
  noStroke();
  
  fill("blue");
  textSize(gameModeInstructionSize);
  textAlign(CENTER, CENTER);
  text("CHOOSE YOUR DIFFICULTY:", gameModeTextXcor, gameModeInstructionYcor);
  
  fill(20);
  rect(buttonXcor, easyButtonYcor, buttonWidth, buttonHeight);
  rect(buttonXcor, mediumButtonYcor, buttonWidth, buttonHeight);
  rect(buttonXcor, hardButtonYcor, buttonWidth, buttonHeight)
  
  fill("green");
  textSize(buttonTextSize);
  text("EASY", gameModeTextXcor, easyTextYcor);
  
  fill("yellow");
  text("MEDIUM", gameModeTextXcor, mediumTextYcor);
  
  fill("red");
  text("HARD", gameModeTextXcor, hardTextYcor);
  
  if (mouseX >= buttonXcor && mouseX <= width - buttonXcor && mouseY >= easyButtonYcor && mouseY <= easyButtonYcor + buttonHeight) {
    fill("blue");
    rect(buttonXcor, easyButtonYcor, buttonWidth, buttonHeight);
    fill("green");
    text("EASY", gameModeTextXcor, easyTextYcor);
    
    if (mouseIsPressed && screen === "Difficulty") {
      screen = "Beat the Bomb: Instructions";
    }
  }
  
  if (mouseX >= buttonXcor && mouseX <= width - buttonXcor && mouseY >= mediumButtonYcor && mouseY <= mediumButtonYcor + buttonHeight) {
    fill("blue");
    rect(buttonXcor, mediumButtonYcor, buttonWidth, buttonHeight);
    fill("yellow");
    text("MEDIUM", gameModeTextXcor, mediumTextYcor);
    
    if (mouseIsPressed && screen === "Difficulty") {
      screen = "Beat the Bomb: Medium";
    }
  }
  
  if (mouseX >= buttonXcor && mouseX <= width - buttonXcor && mouseY >= hardButtonYcor && mouseY <= hardButtonYcor + buttonHeight) {
    fill("blue");
    rect(buttonXcor, hardButtonYcor, buttonWidth, buttonHeight);
    fill("red");
    text("HARD", gameModeTextXcor, hardTextYcor);
    
    if (mouseIsPressed && screen === "Difficulty") {
      screen = "Beat the Bomb: Hard";
    }
  }
  
  // If you mistakenly clicked on Beat the Bomb mode and you wish to go back to the Start screen, you can do so by clicking the left arrow.
  if (keyIsPressed && keyCode === LEFT_ARROW) {
    screen = "Start";
  }
}

function movePolice() {
  // get()[0] = red pixels
  // get()[1] = green pixels
  // get()[2] = blue pixels
  
  // The selected x- and y-coordinates line up to the police officer's right hand.
  moveRightTouchRed = get(policeXcor + policeWidth, policeYcor + imageHeight/2)[0];
  moveRightTouchGreen = get(policeXcor + policeWidth, policeYcor + imageHeight/2)[1];
  moveRightTouchBlue = get(policeXcor + policeWidth, policeYcor + imageHeight/2)[2];
  
  // The selected x- and y-coordinates line up to the police officer's left hand.
  moveLeftTouchRed = get(policeXcor, policeYcor + imageHeight/2)[0];
  moveLeftTouchGreen = get(policeXcor, policeYcor + imageHeight/2)[1];
  moveLeftTouchBlue = get(policeXcor, policeYcor + imageHeight/2)[2];
  
  // The selected x- and y-coordinates line up to the police officer's feet.
  moveDownTouchRed = get(policeXcor, policeYcor + imageHeight)[0];
  moveDownTouchGreen = get(policeXcor, policeYcor + imageHeight)[1];
  moveDownTouchBlue = get(policeXcor, policeYcor + imageHeight)[2];
  
  // The selected x- and y-coordinates line up to the police officer's head.
  moveUpTouchRed = get(policeXcor, policeYcor)[0];
  moveUpTouchGreen = get(policeXcor, policeYcor)[1];
  moveUpTouchBlue = get(policeXcor, policeYcor)[2];
  
  if (keyIsDown(LEFT_ARROW)) {
    policeXcor -= movePoliceLeftRight;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    policeXcor += movePoliceLeftRight;
  }
    
  if (keyIsDown(UP_ARROW)) {
    policeYcor -= movePoliceUpDown;
  }

  if (keyIsDown(DOWN_ARROW)) {
    policeYcor += movePoliceUpDown;
  }
  
  // If you're moving right but hit a wall (detected if the red, green and blue pixels are all greater than 0), it moves you left. (Pattern follows.)
  if (keyIsDown(RIGHT_ARROW) && moveRightTouchRed > 0 && moveRightTouchGreen > 0 && moveRightTouchBlue > 0) {
    policeXcor -= movePoliceLeftRight;
  }
    
  if (keyIsDown(LEFT_ARROW) && moveLeftTouchRed > 0 && moveLeftTouchGreen > 0 && moveLeftTouchBlue > 0) {
    policeXcor += movePoliceLeftRight;
  }
    
  if (keyIsDown(DOWN_ARROW) && moveDownTouchRed > 0 && moveDownTouchGreen > 0 && moveDownTouchBlue > 0) {
    policeYcor -= movePoliceUpDown;
  }
    
  if (keyIsDown(UP_ARROW) && moveUpTouchRed > 0 && moveUpTouchGreen > 0 && moveUpTouchBlue > 0) {
    policeYcor += movePoliceUpDown;
  }
  
  // Detects if you hit the left boundary. (Pattern follows.)
  if (policeXcor < leftBoundary) {
    policeXcor = leftBoundary;
  }
    
  if (policeXcor > rightBoundary) {
    policeXcor = rightBoundary;
  }
    
  if (policeYcor > bottomBoundary) {
    policeYcor = bottomBoundary;
  }
}

function beatBombInstructions() {
  textSize(beatBombInstructionSize);
  textAlign(CENTER, CENTER);
  fill("red");
  text("Welcome to the Bank of America! You're the chief of the Bomb Squad, trying to disarm the bomb protecting the bunker. You unfortunately cut the green wire rather than the red one, so the timer has now started with 10 seconds to evacuate. Good luck!", topLeft, redTextYcor, textBoxWidth, textBoxHeight);
  
  fill("green");
  text("Use your arrow keys to move the officer.", topLeft, greenTextYcor, textBoxWidth, textBoxHeight);
  
  textSize(footerSize);
  fill("blue");
  text("(press Enter to continue)", topLeft, blueTextYcor, textBoxWidth, textBoxHeight);
  
  if (keyIsPressed && keyCode === ENTER) {
    screen = "Beat the Bomb: Easy"
  }
}

function beatBombEasy() {
  // The following line properly counts a second, but unfortunately, it lags due to the get() functions, since the computer takes more time to respond to the requests.
  counter = frameCount % 60;
  
  image(maze, topLeft, topLeft, width, height);
  image(bomb, topLeft, topLeft, bombWidth, imageHeight);
  image(police, policeXcor, policeYcor, policeWidth, imageHeight);
  
  textSize(timeSize);
  fill("green");
  text(time, timeXcor, timeYcor);
  
  text(countdown, countdownXcor, countdownYcor);
  
  // The standard frameCount (60) % 60 is 0, but with the frameCount being messed around with from the get() functions, it tends to lag the time a bit. (Pattern follows in the Maze Gaze game.)
  if (counter === 0 && countdown > 0) {
    countdown--;
    // Once the countdown hits 0, the number can no longer be seen in the center of the screen. (Pattern follows in the Maze Gaze game.)
    if (countdown === 0) {
      countdown = "";
    }
  }
  
  else if (countdown === "" && time >= 0) {
    movePolice();
    if (counter === 0) {
      time--;
    }
    // Detects if there's still time remaining and you cross the green line.
    else if (policeYcor < policeWin && time > 0) {
      screen = "Beat the Bomb: Easy (Win)";
    }
    else if (time === 0) {
      screen = "Beat the Bomb: Easy (Loss)";
    }
  }
}

function beatBombMedium() {
  // Thank you for letting me stick to just the Easy mode and the Maze Gaze versions for now. Maybe in my spare time, I can turn the Maze Gaze into the Medium or Hard mode and I can create a successful Sudden Death game!
  fill("yellow");
  text("This game is currently under construction. Please check back in another time!", gameResultXcor, gameResultYcor, textBoxWidth, textBoxHeight);
  
  if (keyIsPressed && keyCode === LEFT_ARROW) {
    screen = "Start";
  }
}

function beatBombHard() {
  fill("yellow");
  text("This game is currently under construction. Please check back in another time!", gameResultXcor, gameResultYcor, textBoxWidth, textBoxHeight);
  
  if (keyIsPressed && keyCode === LEFT_ARROW) {
    screen = "Start";
  }
}

function mazeGazeInstructions() {
  textSize(beatBombInstructionSize);
  textAlign(CENTER, CENTER);
  fill("red");
  text("Welcome to the Maze Gaze version of Beat the Bomb! In this version, you still have 10 seconds to evacuate, but you are mostly unable to see yourself. This may serve as a future Medium or Hard difficulty of the Beat the Bomb mode. Good luck!", topLeft, redTextYcor, textBoxWidth, textBoxHeight);
  
  fill("green");
  text("Use your arrow keys to move the officer.", topLeft, greenTextYcor, textBoxWidth, textBoxHeight);
  
  textSize(footerSize);
  fill("blue");
  text("(press Enter to continue)", topLeft, blueTextYcor, textBoxWidth, textBoxHeight);
  
  if (keyIsPressed && keyCode === ENTER) {
    screen = "Maze Gaze";
  }
}

function mazeGaze() {
  counter = frameCount % 60;
  
  image(maze, topLeft, topLeft, width, height);
  image(bomb, topLeft, topLeft, bombWidth, imageHeight);
  image(police, policeXcor, policeYcor, policeWidth, imageHeight);
  
  textSize(timeSize);
  fill("green");
  text(time ,timeXcor, timeYcor);
  
  text(countdown, countdownXcor, countdownYcor);
  
  if (counter === 0 && countdown > 0) {
    countdown --;
    if (countdown === 0) {
      countdown = "";
    }
  }
  
  else if (countdown === "" && time >= 0) {
    movePolice();
    if (counter === 0) {
      time --;
    }
    else if (policeYcor < policeWin && time > 0) {
      screen = "Maze Gaze (Win)";
    }
    // As long as there's time remaining and you're not at the green line, a black rectangle is constantly changing its size to cover you up so that you can barely see yourself.
    else if (time > 0) {
      fill("black");
      rect(policeXcor - movePoliceLeftRight, policeYcor - movePoliceUpDown, policeXcor + movePoliceLeftRight, policeYcor + movePoliceUpDown);
    }
    else {
      screen = "Maze Gaze (Loss)";
    }
  }
}

function beatBombEasyWin() {
  fill("green");
  text("You win! Press Enter to play again or Escape to return to the main menu.", gameResultXcor, gameResultYcor, textBoxWidth, textBoxHeight);
  
  // Resets the game. In the future, this will take you to the Medium mode.
  if (keyIsPressed && keyCode === ENTER) {
    background(0);
    screen = "Beat the Bomb: Easy";
    resetGame();
  }
  
  // Takes you back to the Start screen, but also resets the game for if you choose to play it again.
  if (keyIsPressed && keyCode === ESCAPE) {
    background(0);
    screen = "Start";
    resetGame();
  }
}

function beatBombEasyLoss() {
  fill("red");
  text("You lose... Press Enter to play again or Escape to return to the main menu.", gameResultXcor, gameResultYcor, textBoxWidth, textBoxHeight);
  
  if (keyIsPressed && keyCode === ENTER) {
    background(0);
    screen = "Beat the Bomb: Easy";
    resetGame();
  }
  
  if (keyIsPressed && keyCode === ESCAPE) {
    background(0);
    screen = "Start";
    resetGame();
  }
}

function mazeGazeWin() {
  fill("green");
  text("You win! Press Enter to play again or Escape to return to the main menu.", gameResultXcor, gameResultYcor, textBoxWidth, textBoxHeight);
  
  if (keyIsPressed && keyCode === ENTER) {
    background(0);
    screen = "Maze Gaze";
    resetGame();
  }
  
  if (keyIsPressed && keyCode === ESCAPE) {
    background(0);
    screen = "Start";
    resetGame();
  }
}

function mazeGazeLoss() {
  fill("red");
  text("You lose... Press Enter to play again or Escape to return to the main menu.", gameResultXcor, gameResultYcor, textBoxWidth, textBoxHeight);
  
  if (keyIsPressed && keyCode === ENTER) {
    background(0);
    screen = "Maze Gaze";
    resetGame();
  }
  
  if (keyIsPressed && keyCode === ESCAPE) {
    background(0);
    screen = "Start";
    resetGame();
  }
}

function resetGame() {
  // Anytime the game is reset, the countdown and time reset to their default values of 3 and 10, and the police spawns in its starting coordinates.
  countdown = 3;
  // This is plenty of time when the frameCount lags.
  time = 10;
  
  policeXcor = policeXstart;
  policeYcor = policeYstart;
}