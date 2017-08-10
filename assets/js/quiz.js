var q = db.ref('/Quizzes');   //q is a global variable
const submit = document.getElementById('submit');
const nxt = document.getElementById('nxt');
const calculate = document.getElementById('calculate');
const startQuizBtn = document.getElementById('quizstart');

//QuizSlide first populates when StartQuiz is pressed, then the button is removed.

startQuizBtn.addEventListener('click', (e) => {
  Quiz.populate();
  reveal(submit); //show submit button the first time
  startQuizBtn.style.display = 'none';
});

var Quiz = (function () {     //Quiz is a global variable. Start of iffy
  let question;
  let i = 0;

  const populate = () => {               //define Quiz.populate()}
    i++;

    if (i <= 10) {

      q.on('value', (snapshot) => {
        //retrieve question, 4 answers, and correct answer from database
        var questnum = "Question" + i;
        var question = snapshot.child("Quiz1/" + questnum + "/question").val();
        var correctAns = snapshot.child("Quiz1/" + questnum + "/Correct").val();
        var answers = [];

        for (x = 1; x <= 4; x++) {
          answers.push(snapshot.child("Quiz1/" + questnum + "/answers/answer" + x).val());
        }

        //create new QuizSlide instance
        slide = new QuizSlide(question, answers, questnum, correctAns);
        answerreset(), btnreset(btn1), btnreset(btn2), btnreset(btn3), btnreset(btn4); //resets answerchecked to false and unselects all btns

        //showQuestion on DOM
        document.getElementById("question").innerHTML = slide.question;

        //ShowAnswers on DOM
        for (x = 0; x < 4; x++) {
          document.getElementById("answer" + (x + 1)).innerHTML = answers[x];
        }

        document.getElementById("progress").innerHTML = "Question " + i + " of 10"; //show question number
      });

      // once next question button hit after 10th question submitted
    } else {
      document.getElementById("question").innerHTML = "The quiz is over";
      calculate.style.display = 'block';                                    //show 'calculate' btn
      i = 0;                                                               //reset i = 0
    };
  }            //end of populate()

  return {         //expose populate function and i globally
    populate,
    getQuestionIndex: () => { return i; }
  };
})()// end of Quiz iffy

/*----------------Change Element Functions----------------*/

//toggle display for 'Submit' Button
function reveal(thing) {
  if (thing.style.display === "none") {
    thing.style.display = "block";
  } else {
    thing.style.display = "none";
  }
}

/*-------------------------Event Listeners-----------------------*/
submit.addEventListener('click', () => {
  if (Quiz.getQuestionIndex() < 10) {
    if (btn1.clicked == true || btn2.clicked == true || btn3.clicked == true || btn4.clicked == true) {
      checkAnswer();
      reveal(submit);//hide submit
      reveal(nxt);//show nxt
    } else {
      alert("No answer selected");
    }
  } else {
    checkAnswer();
    reveal(submit);//hides submit after 10th answer is submitted
    Quiz.populate();//populates template with i=10 to show quiz is over.
  }
}, false);

//When 'next question' is pressed, hide nxt button, show submit button, and repopulate quizSlide template
nxt.addEventListener('click', () => {
  if (Quiz.getQuestionIndex() < 10) {
    reveal(submit);//show Submit again
    reveal(nxt);//hide nxt again
    Quiz.populate();
  }
});








/*document.getElementById('calculate').addEventListener('click', () => {
  // Determine how many questions the user got right
  var score = 0;
  for (var i = 0; i < 10; i++) {
    // if (self.questions[i].user_choice_index === self.questions[i].correct_choice_index) {
    if (this.getQuestionIndex().correctAnswer(answer)) {
 
      score++;
    }
    // Display the score with the appropriate message
    var percentage = score / 10;
    console.log(percentage);
  });*/


//UserCount = [] //push val of user for each question to sum at end of quiz.
//once answer is clicked, the correct answer will highlight green, and the answer selected will highlight red if incorrect
//Once last question is answered and shown correct or not, a score button will popup, then show final score, if passed, the survey
//pops up and then the button to next module. If failed, button to retake quiz pops up. If retake, then reset users to 0 and empty the 
//userCount array.

//onclick choice set 
//selected answer, selAnswer choicei = answer1







//function to take in user answer and see if correct

//if correct button clicked, then uswer answer === correct answer and user score increments up.


//}

//console.log(i);

//})();




/*q = db.ref('/Quizzes');
q.on('value', (snapshot) => {
  const questions = [];
  const answers = [];

  
  questions.push(snapshot.child("Quiz1/Question1/question").val());
  

  for (x=0;x<4;x++) {
    answers.push(snapshot.child("Quiz1/Question1/answers/answer" + (x+1)).val());
  }

quiz = new Quiz(questions, answers);
populate();
console.log(questions);
console.log(answers);
});*/


/*quiz = new Quiz(questions);
populate();*/

/*db.ref('/Quizzes').on('value', (snapshot) => {
  const questions = [];

  for (prop in snapshot.val()['Quiz1']) {
    questions.push(snapshot.val()['Quiz1'][prop].question);
  }

  quiz = new Quiz(questions);
  populate();

})*/
/*db.ref('/Quizzes').once('value').then((res) => {
  const questions = [];

  for (prop in res.val()['Quiz1']){
    console.log(res.val()['Quiz1'][prop]);
    questions.push(res.val()['Quiz1'][prop].question);
  
  }

  console.log(questions);
  
  quiz = new Quiz(questions);
  populate();
});*/



/* if (btn2.clicked == true && slide.correctAns == "answer2") {
   btn2.classList.remove('selected');
   btn2.classList.add("btn-success");
   quizscore++;
   console.log("button 2 clicked");
 } else {
   btn2.classList.remove('selected');
   btn2.classList.add("btn-danger");

 }

 if (btn3.clicked == true && slide.correctAns == "answer3") {
   btn3.classList.remove('selected');
   btn3.classList.add("btn-success");
   quizscore++;
   console.log("button 3 clicked");
 } else {
   btn3.classList.remove('selected');
   btn3.classList.add("btn-danger");
 }

 if (btn4.clicked == true && slide.correctAns == "answer4") {
   btn4.classList.remove('selected');
   btn4.classList.add("btn-success");
   quizscore++;
   console.log("button 4 clicked");
 } else {
   btn4.classList.remove('selected');
   btn4.classList.add("btn-danger");
 }

 if (slide.correctAns == 'answer1') {
   btn1.classList.remove("unselected");
   btn1.classList.add("btn-success");
 }
 else if (slide.correctAns == 'answer2') {
   btn2.classList.add("btn-success");
 }
 else if (slide.correctAns == 'answer3') {
   btn3.classList.add("btn.success");
 } else {
   btn4.classList.add("btn-success");
 }
//} else {
//alert("No answer selected");
// }
//this.checkAnswer();
}*/