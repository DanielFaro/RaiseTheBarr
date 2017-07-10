var q = db.ref('/Quizzes');   //q is a global variable

var Quiz = (function(){     //Quiz is a global variable. Start of iffy
 let question;
 let i = 0;
                                  
 const populate = () => {         //define Quiz.populate()
  
  i++;

  if (i <= 10) {

    q.on('value', (snapshot) => {
      //retrieve question and 4 answers from database
      var questnum = "Question" + i;
      var questions = snapshot.child("Quiz1/" + questnum + "/question").val();
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

document.getElementById('submit').addEventListener('click', () => {
  if (Quiz.getQuestionIndex() != 0) {
    Quiz.populate();
  };
})




