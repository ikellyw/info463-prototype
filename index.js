'use strict';

(function() {
  window.addEventListener("load", init);

  const FILE_NAMES = ["person1.png", "person3.png", "person5.png", "person6.png",
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


  function start() {
    var video = document.getElementById("video");
    video.play();

    console.log(currTrial)
    if (currTrial <= numTrials) {
      document.addEventListener("keydown", keyIsPressed);
      makeObstacle();
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


  function keyIsPressed(event) {
    if (currTrial > numTrials) {
      obstacleDisplayed = false;
    }

    if (event.key === 'Enter' && (obstacleDisplayed)) {
      clickedTime = Date.now();
      reactionTime = (clickedTime - createdTime) / 1000;
      total += reactionTime;
      id("box").innerHTML = "";
    }
  }

  function stop() {
    var video = document.getElementById("video");
    // video.stop();
  }


  function makeObstacle() {
    id("curr-trial").innerHTML = "Trial " + (currTrial);
    currTrial += 1;

    var time = Math.random() * 5000;

    setTimeout(function() {
      id("box").innerHTML = "";

      let obstacle = document.createElement("img");
      let index = Math.floor(Math.random() * FILE_NAMES.length);
      obstacle.src = "img/" + FILE_NAMES[index];
      obstacle.alt = "obstacle";
      obstacle.style.width = "80%";

      let box = id("box");
      box.appendChild(obstacle);
      positionObstacle()
      createdTime = Date.now();

    }, time);
  }


  function positionObstacle() {
    let maxLeft = 800;
    let maxTop = 600;
    let randomPosition = Math.floor(Math.random() * 3);
    let left, top;

    if (randomPosition === 0) {
      left = 0;
      top = maxTop / 2;
    } else if (randomPosition === 1) {
      left = (maxLeft - 0) / 2;
      top = maxTop / 2;
    } else {
      left = maxLeft;
      top = maxTop / 2;
    }

    id("box").style.left = left + "px";
    id("box").style.top = top + "px";
    id("box").style.display = "block";
  }

  function id(name) {
    return document.getElementById(name);
  }

})();