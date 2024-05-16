'use strict';

(function() {
  window.addEventListener("load", init);

  const FILE_NAMES = ["person1.png", "person2.png", "person3.png", "person4.png", "person5.png", "person6.png",
                      "pet1.png", "pet2.png", "pet3.png"]

  let clickedTime;
  let createdTime;
  let reactionTime;

  let currTrial = 1;
  let numTrials = 3;
  let total = 0.0;

  let obstacleDisplayed = true;


  function init() {
    let button = document.getElementById('start');
    button.addEventListener('click', start);
  }


  async function start() {
    var video = document.getElementById("video");
    video.play();

    if (currTrial <= numTrials) {
      // hm what if we used timeout to call makeObstacle function instead of using it to make obstacles inside the function??
      let obstaclePosition = await makeObstacle();

      // we want to wait till user presses the "correct key"
      document.addEventListener("keydown", function(event) {
        keyIsPressed(event, obstaclePosition);
      });

    } else {
      let avgReactionTime = total / numTrials;
      id("print-avg").innerHTML = "Your Average Reaction Time: " +
                                   avgReactionTime.toFixed(2) + " seconds";
      id("box").innerHTML = "";

      obstacleDisplayed = false;
      document.removeEventListener("keydown", keyIsPressed);

      stop();
    }
  }


  function stop() {
    var video = document.getElementById("video");
    // video.stop();
  }


  function keyIsPressed(event, obstaclePosition) {
    console.log(currTrial);
    if (currTrial > numTrials) {
      obstacleDisplayed = false;
    }

    if (obstacleDisplayed) {
      console.log("hi" + currTrial);
      console.log(obstaclePosition);
      if ((event.keyCode === 37) && (obstaclePosition === "left")) { // 37 = left arrow
        calcReactionTime();
      } else if ((event.keyCode === 32) && (obstaclePosition === "center")) { // 32 = space
        calcReactionTime();
      } else if ((event.keyCode === 39) && (obstaclePosition === "right")) { // 39 = right arrow
        calcReactionTime();
      }
    }
  }


  function calcReactionTime() {
    currTrial += 1;
    clickedTime = Date.now();
    reactionTime = (clickedTime - createdTime) / 1000;
    total += reactionTime;
    id("box").innerHTML = "";
  }


  async function makeObstacle() {
    id("curr-trial").innerHTML = "Trial " + (currTrial);

    // right now we stop 1 early and create 1 extra obstacle
    // currTrial should only update if correct key is pressed! should we move this somethwhere else???
    // currTrial += 1;

    let time = Math.random() * 5000;
    let obstaclePosition = await new Promise((resolve, reject) => {
      setTimeout(function() {
        id("box").innerHTML = "";

        let obstacle = document.createElement("img");
        let index = Math.floor(Math.random() * FILE_NAMES.length);
        obstacle.src = "img/" + FILE_NAMES[index];
        obstacle.alt = "obstacle";
        obstacle.style.width = "80%";

        let box = id("box");
        box.appendChild(obstacle);
        let position = positionObstacle();
        createdTime = Date.now();

        resolve(position);
      }, time);
    });
    console.log(obstaclePosition);
    return obstaclePosition;
  }


  function positionObstacle() {
    let maxLeft = 800;
    let maxTop = 600;
    let randomPosition = Math.floor(Math.random() * 3);
    let left, top, positionIndicator;

    if (randomPosition === 0) {
      left = 0;
      positionIndicator = "left";
    } else if (randomPosition === 1) {
      left = (maxLeft - 0) / 2;
      positionIndicator = "center";
    } else {
      left = maxLeft;
      positionIndicator = "right";
    }

    top = maxTop / 2;
    id("box").style.left = left + "px";
    id("box").style.top = top + "px";
    id("box").style.display = "block";

    return positionIndicator;
  }


  function id(name) {
    return document.getElementById(name);
  }

})();