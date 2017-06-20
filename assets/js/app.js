
let quiz;
function populate() {
  if (quiz.isEnded()) {
    //showScores();
  }
  else {
    //showQuestion
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex();

    //ShowAnswers
    for (x=0;x<4;x++) {
       document.getElementById("choice"+x).innerHTML = quiz.getAnswers(x);
    }

    var numDisplay = document.getElementById("progress");
    numDisplay.innerHTML = quiz.questNumDisplay();
    
  }
}



q = db.ref('/Quizzes');
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
});


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

document.getElementById('submit').addEventListener('click', () => { 
  quiz.guess();
  populate();
})


