var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern=[];


function nextSequence() {

  userClickedPattern=[];

  level++;
  $("#level-title").text("Level "+level)

  var randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber)

  var randomChosenColor = buttonColors[randomNumber];
  console.log(randomChosenColor)

  gamePattern.push(randomChosenColor);

  console.log(gamePattern)

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100) 
    .fadeIn(100);

    playSound(randomChosenColor)


}

// step 4 when user click colour

  $(".btn").on("click", function(){

var userChosenColour=$(this).attr("id");

userClickedPattern.push(userChosenColour)
console.log(userClickedPattern)

playSound(userChosenColour)
animatePress(userChosenColour)
checkAnswer(userClickedPattern.length-1)
  })

// step 5 add sound when click and trigger nextSequence

  function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  
  }

  // step 6 add animation when click

  function animatePress(currentColour){
    $("."+currentColour).addClass("pressed")
 this.setTimeout(() => {
  $("."+currentColour).removeClass("pressed")
 }, 100);
  }

  // step 7 trigger nextSequence when keypressed

  var started=false;

  var level=0;

  $(document).keydown(function(){
    if(!started){
      $("#level-title").text("Level "+level)
      nextSequence()
      started=true
    }
  })

// step 8 checking the answer

  function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success")

        if(userClickedPattern.length===gamePattern.length){

          setTimeout(function(){
            nextSequence()
          },1000)
        }
    }else{

    new Audio("sounds/wrong.mp3").play()

      $("body").addClass("game-over")

      setTimeout(function(){
        $("body").removeClass("game-over")
      },400)
      
      $("h1").text("Game Over, Press any Key to Restart")

      startOver()
      console.log("wrong")
    }

  }

  function startOver(){
    level=0;
    gamePattern=[]
    started=false



  }