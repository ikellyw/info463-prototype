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
      let obstaclePosition = await makeObstacle();

      // document.addEventListener("keydown", keyIsPressed);
      document.addEventListener("keydown", function(event) {
        keyIsPressed(event, obstaclePosition);
      });

      // console.log(obstaclePosition);

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


  // should also accept obstacle's position as a param?
  function keyIsPressed(event, obstaclePosition) {
    let keyCode = event.keyCode; // 37 - left, 32 - space, 39 - right

    if (currTrial > numTrials) {
      obstacleDisplayed = false;
    }

    // then check if the keyCode matches obstacle's position
    // reaction time shouldn't be calculated till they match
    if (event.key === 'Enter' && (obstacleDisplayed)) {
      clickedTime = Date.now();
      reactionTime = (clickedTime - createdTime) / 1000;
      total += reactionTime;
      id("box").innerHTML = "";
    }
  }


  async function makeObstacle() {
    id("curr-trial").innerHTML = "Trial " + (currTrial);
    currTrial += 1;

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
    return obstaclePosition;
  }


  function positionObstacle() {
    let maxLeft = 800;
    let maxTop = 600;
    let randomPosition = Math.floor(Math.random() * 3);
    let left, top, positionIndicator;

    if (randomPosition === 0) {
      left = 0;
      top = maxTop / 2;
      positionIndicator = "left";
    } else if (randomPosition === 1) {
      left = (maxLeft - 0) / 2;
      top = maxTop / 2;
      positionIndicator = "center";
    } else {
      left = maxLeft;
      top = maxTop / 2;
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