var answers = $("input:not(:disabled)"); //retrieve all able inputs

//array of ids
var myarr = [
  "myId03",
  "myId12",
  "myId13",
  "myId14",
  "myId15",
  "myId23",
  "myId25",
  "myId31",
  "myId32",
  "myId33",
  "myId35",
  "myId41"
];

//array of answers
//var arr = ["c", "l", "o", "v", "e", "p", "a", "s", "a", "y", "t", "w"];

var arr = ["c", "c", "o", "m", "b", "o", "u", "o", "w", "l", "t", "r"];

//timing
var seconds = 0;
var timer = setInterval(function(){
  seconds++;
  $("#timer").text(seconds);
}, 1000)
var complete = 0; //to check if the answers is complete

//check inputs
answers.keyup(function(e) {
  var temp = e.target.id;
  var myIndex = myarr.indexOf(temp); //check for index of ids
  var answer = arr[myIndex]; //check for answer
  var myInput = this.value.toLowerCase(); //check for user input
  complete++; //after every input increase the amount of rights _0
  if (myInput == answer) {
    this.style.backgroundColor = "green";
    $(this).attr("disabled", "true");
  } else {
    this.style.backgroundColor = "red";
    complete--; //if wrong, it cancels _0
  }
  if (complete == 12) {
    clearInterval(timer);
    $("#timer").text("Puzzle completed in " + seconds);
    
    alert("Hurray!!!\nChallenge complete");
    //there are 12 answers, if all are right!!!
  }
});
$("button").click(function(){
  seconds += 60;
})