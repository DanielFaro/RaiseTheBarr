var q = db.ref('/Quizzes');   //q is a global variable

var Quiz = (function(){     //Quiz is a global variable. Start of iffy
 let question;
 let i = 0;
                                  
 const populate = () => {         //define Quiz.populate()
  
  i++;

  if (i <= 10) {

    q.on('value', (snapshot) => {
      //retrieve question, 4 answers, and correct answer from database
      var questnum = "Question" + i;
      var questions = snapshot.child("Quiz1/" + questnum + "/question").val();
      var correctAns = snapshot.child("Quiz1/" + questnum + "/Correct").val();
      var answers = [];

      for (x = 1; x <= 4; x++) {
        answers.push(snapshot.child("Quiz1/" + questnum + "/answers/answer" + x).val());
      }

      //create new QuizSlide instance
      question = new QuizSlide(questions, answers, questnum);

      //showQuestion on DOM
      document.getElementById("question").innerHTML = question.questions;

      //ShowAnswers on DOM
      for (x = 0; x < 4; x++) {
        document.getElementById("choice" + (x + 1)).innerHTML = question.getAnswers(x);
      }

      document.getElementById("progress").innerHTML = "Question " + i + " of 10";
    });

    //set selected answer
   // document.getElementById('btn1').addEventListener('click', ())

  } else {
    // once i reaches 10
    document.getElementById("question").innerHTML = "The quiz is over";
    //reset i to zero
    i = 0;
  };
 }            //end of populate()

 return {         //expose populate function and i globally
    populate,
    getQuestionIndex: () => { return i;}
  };

})()// end of Quiz iffy

var startQuizBtn = document.getElementById('quizstart');
startQuizBtn.addEventListener('click',(e) => {
  Quiz.populate();
  startQuizBtn.parentNode.removeChild(startQuizBtn);
});


document.getElementById('nxt').addEventListener('click', () => {
  if (Quiz.getQuestionIndex() != 0) {
    Quiz.populate();
  };
})


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



