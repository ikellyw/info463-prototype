'use strict';

(function() {
  window.addEventListener("load", init);

  // const FILE_NAMES = ["person1.png", "person2.jpg", "person3.png", "person4.jpg",
  // "person5.png", "person6.png", "pet1.png", "pet2.png", "pet3.png"]

  const FILE_NAMES = ["person1.png", "person3.png", "person5.png", "person6.png",
                      "pet1.png", "pet2.png", "pet3.png"]

  let clickedTime;
  let createdTime;
  let reactionTime;

  let currTrial = 0;
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

    if (currTrial < numTrials) {
      if (currTrial == 0) {
        makeObstacle();
      }
      document.addEventListener("keydown", enterPressed);
    } else {
      let avgReactionTime = total / numTrials;
      id("print-avg").innerHTML = "Your Average Reaction Time: " +
                                   avgReactionTime.toFixed(2) + " seconds";
      id("box").innerHTML = "";
      stop();
      obstacleDisplayed = false;
      document.removeEventListener("keydown", enterPressed);
    }
  }


  function enterPressed(event) {
    if (currTrial >= numTrials) {
      obstacleDisplayed = false;
    }
    if (event.key === 'Enter' && (obstacleDisplayed)) {
      clickedTime = Date.now();
      reactionTime = (clickedTime - createdTime) / 1000;
      currTrial += 1;
      total += reactionTime;
      makeObstacle();

      id("box").innerHTML = "";
      id("curr-trial").innerHTML = "Trial " + currTrial;
    }
  }

  function stop() {
    var video = document.getElementById("video");
    // video.stop();
  }


  function makeObstacle() {
    var time = Math.random() * 5000;

    setTimeout(function() {
      document.getElementById("box").innerHTML = "";

      let obstacle = document.createElement("img");
      var index = Math.floor(Math.random() * FILE_NAMES.length);
      obstacle.src = "img/" + FILE_NAMES[index];
      obstacle.alt = "obstacle";
      obstacle.style.width = "80%";

      var box = document.getElementById("box");

      var viewportWidth = document.body.offsetWidth;
      var viewportHeight = document.body.offsetHeight;

      var boxWidth = box.offsetWidth;
      var boxHeight = box.offsetHeight;

      var maxLeft = viewportWidth - boxWidth;
      var maxTop = viewportHeight - boxHeight;

      var left = Math.random() * maxLeft;
      var top = Math.random() * maxTop;

      if (left < 0) {
        left = 0;
      }

      if (top < 0) {
        top = 0;
      }

      if (top < viewportHeight / 2 && left < viewportWidth / 2) {
        top += viewportHeight / 2;
        left += viewportWidth / 2;
      }

      box.style.top = top + "px";
      box.style.left = left + "px";

      box.style.display = "block";
      box.appendChild(obstacle);
      createdTime = Date.now();

    }, time);
  }

  function id(name) {
    return document.getElementById(name);
  }

})();