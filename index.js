(function() {
  window.addEventListener("load", init);
 
  // const FILE_NAMES = ["person1.png", "person2.jpg", "person3.png", "person4.jpg",
  // "person5.png", "person6.png", "pet1.png", "pet2.png", "pet3.png"]

  const FILE_NAMES = ["person1.png", "person3.png", "person5.png", "person6.png",
                      "pet1.png", "pet2.png", "pet3.png"]
 
 
  let clickedTime;
  let createdTime;
  let reactionTime;
 
 
  let currTrial = 1;
  let numTrials = 3;
  let total = 0.0;
 
 
 
 
  function init() {
    let button = document.getElementById('start');
    button.addEventListener('click', start);
  }
 
 
  function start() {
    var video = document.getElementById("video");
    video.play();
    if (currTrial < numTrials) {
      makeObstacle();
    }
 
 
    document.addEventListener("keydown", function(event) {
      if (currTrial < numTrials) {
        if (event.key === 'Enter') {
          clickedTime = Date.now();
          reactionTime = (clickedTime - createdTime) / 1000;
          document.getElementById("box").innerHTML = "";
          if (currTrial != numTrials) {
            document.getElementById("curr-trial").innerHTML = "Trial " + (currTrial + 1);
          }
 
 
          currTrial += 1;
          total += reactionTime;
          makeObstacle();
        }
      } else {
        let avgReactionTime = total / numTrials;
        document.getElementById("print-avg").innerHTML = "Your Average Reaction Time: "
                                                          + avgReactionTime.toFixed(2) + " seconds";
        stop();
      }
    });
 
 
  }
 
 
  function stop() {
    var video = document.getElementById("video");
    video.stop();
  }
 
 
  function makeObstacle() {
    var time = Math.random() * 3000;
 
 
    setTimeout(function() {
      document.getElementById("box").innerHTML = "";
 
 
      let obstacle = document.createElement("img");
      var index = Math.floor(Math.random() * FILE_NAMES.length);
      obstacle.src = "img/" + FILE_NAMES[index];
 
 
      obstacle.alt = "obstacle";
      obstacle.style.width = "100%";
 

      var box = document.getElementById("box");
      box.appendChild(obstacle);

      var top = Math.random() * 300;
      var left = Math.random() * 500;

      box.style.top = top + "px";
      box.style.left = left + "px";
      box.style.display = "block";
      createdTime = Date.now();
    }, time);
  }
 })();
