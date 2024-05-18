'use strict';

(function() {
  window.addEventListener("load", init);

  const FILE_NAMES = ["person1.png", "person2.png", "person3.png", "person4.png", "person5.png", "person6.png",
                      "pet1.png", "pet2.png", "pet3.png"]

  const OBSTACLE_TIME = 5000; // adjust this value to change how long it takes for an obstacle to appear
  const NUM_TRIALS = 5; // adjust this value to change number of trials

  let clickedTime;
  let createdTime;
  let reactionTime;
  let obstaclePosition;

  let currTrial = 1;
  let total = 0.0;

  let obstacleDisplayed = true; // whether there is an object displayed on the screen


  function init() {
    let button = document.getElementById('start');
    button.addEventListener('click', start);
  }

  async function start() {
    // var video = document.getElementById("video");
    // video.play();

    // disable the start button once simulation starts
    // otherwise browser will interpret spacebar input as clicking the button
    id("start").disabled = true;

    if (currTrial <= NUM_TRIALS) {
      await makeObstacle();
      document.addEventListener("keydown", keyIsPressed);
    }
  }

  function stop() {
    // var video = document.getElementById("video");
    // video.stop();
  }

  async function keyIsPressed(e) {
    if (currTrial > NUM_TRIALS) {
      obstacleDisplayed = false;
    }

    if (obstacleDisplayed) {
      if ((e.key === "ArrowLeft" && obstaclePosition === "right") ||
          (e.key === " " && obstaclePosition === "center") ||
          (e.key === "ArrowRight" && obstaclePosition === "left")) {

        id("box").innerHTML = "";
        calcReactionTime();
        currTrial += 1;
        console.log("start:" + currTrial); // debugging purposes

        if (currTrial <= NUM_TRIALS) {
          id("curr-trial").innerHTML = "Trial " + (currTrial);
          document.removeEventListener("keydown", keyIsPressed);
          await makeObstacle();
          document.addEventListener("keydown", keyIsPressed);

        } else {
          id("curr-trial").innerHTML = "All trials complete";
          let avgReactionTime = total / NUM_TRIALS;
          id("print-avg").innerHTML = "Your Average Reaction Time: " +
                                       avgReactionTime.toFixed(4) + " seconds";
          obstacleDisplayed = false;
          document.removeEventListener("keydown", keyIsPressed);
        }
      }
    }
  }

  function calcReactionTime() {
    clickedTime = Date.now();
    reactionTime = (clickedTime - createdTime) / 1000;
    total += reactionTime;
  }

  async function makeObstacle() {
    await new Promise((resolve, reject) => {
      console.log("obstacle created"); // debugging purposes

      let time = Math.random() * OBSTACLE_TIME;

      setTimeout(function() {
        let obstacle = document.createElement("img");
        let index = Math.floor(Math.random() * FILE_NAMES.length);

        obstacle.src = "img/" + FILE_NAMES[index];
        obstacle.alt = "obstacle";
        obstacle.style.width = "130%";

        id("box").appendChild(obstacle);
        createdTime = Date.now();
        obstaclePosition = getObstaclePosition();

        resolve();
      }, time);
    })
  }

  function getObstaclePosition() {
    let viewportWidth = document.documentElement.clientWidth;
    let viewportHeight = document.documentElement.clientHeight;
    let maxLeft = viewportWidth - 300;
    let maxTop = (viewportHeight / 2) - 300;

    let randomPosition = Math.floor(Math.random() * 3);
    let left, top, positionIndicator;

    if (randomPosition === 0) {
      left = 0;
      positionIndicator = "left";
    } else if (randomPosition === 1) {
      left = Math.max(0, maxLeft / 2);
      top = Math.max(maxTop, (viewportHeight - 200) / 2);
      positionIndicator = "center";
    } else {
      left = maxLeft;
      top = Math.max(maxTop, (viewportHeight - 200) / 2);
      positionIndicator = "right";
    }

    id("box").style.left = left + "px";
    id("box").style.top = top + "px";
    id("box").style.display = "block";

    return positionIndicator;
  }

  function id(name) {
    return document.getElementById(name);
  }

})();