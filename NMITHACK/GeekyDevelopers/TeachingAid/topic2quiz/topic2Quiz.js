(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    const res=[];
    res.push(`<div class="sctable"><h2>Results:</h2><table style="width:100%"> <tr><th>Question</th> <th>Your Answer</th><th>Correct Answer</th></tr>`);
    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      res.push(`<tr><td>Q${questionNumber+1}</td><td>${userAnswer}</td><td>${currentQuestion.correctAnswer}</td></tr>`);
      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });
    res.push(`</table></div>`);
    slides[myQuestions.length-1].classList.remove('active-slide');
    submitButton.style.display = 'none';
    nextTButton.style.display = 'inline-block';
    resle.style.display='inline-block';
    nextTButton.innerHTML=`<button>Next Tutorial</button>`;
    // show number of correct answers out of total 
    scoreContainer.innerHTML = res.join('');
    resultsContainer.innerHTML = `Your Score is: ${numCorrect} out of ${myQuestions.length}`;
    //resle.classList.add('active-slide');
  
  }
  

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    
    resle.style.display='none';
    nextTButton.style.display = 'none';
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const scoreContainer = document.getElementById('score');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "Two Plants in Sanskrit?",
      answers: {
        a: "पादपौ",
        b: "पौधौ",
        c: "पादपः"
      },
      correctAnswer: "a"
    },
    {
      question: "हस्ताः क्या है- एकवचनम् / द्विवचनम् / बहुवचनम् ?",
      answers: {
        a: "एकवचनम्",
        b: "द्विवचनम्",
        c: "बहुवचनम्"
      },
      correctAnswer: "c"
    },
    {
      question: "अवकरिके क्या है- एकवचनम् / द्विवचनम् / बहुवचनम् ?",
      answers: {
        a: "एकवचनम्",
        b: "द्विवचनम्",
        c: "बहुवचनम्"
      },
      correctAnswer: "b"
    },
	  {
      question: "कृषकः क्या है?",
      answers: {
        a: "One Farmer",
        b: "Two Plant",
        c: "Many Farmer"
      },
      correctAnswer: "a"
    }
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const nextTButton = document.getElementById("NextTutorial");
  const slides = document.querySelectorAll(".slide");
  const resle = document.getElementById("score");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener('click',showNextSlide);
})();
