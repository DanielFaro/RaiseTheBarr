const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
var quizscore = 0;
var answerchecked = false;
$("#btn1").click(() => { if (answerchecked == false) { toggleSelect(btn1); } }); //make so if checkanswer was hit, then dont do anything
$("#btn2").click(() => { if (answerchecked == false) { toggleSelect(btn2); } });
$("#btn3").click(() => { if (answerchecked == false) { toggleSelect(btn3); } });
$("#btn4").click(() => { if (answerchecked == false) { toggleSelect(btn4); } });
$("#calculate").click(() => { alert("Your score is " + quizscore + " out of 10"); quizscore = 0; });

function QuizSlide(question, answers, questnum, correctAns) {
  this.question = question;
  this.questionIndex = 0;
  this.answers = answers;
  this.questnum = questnum;
  this.correctAns = correctAns;
}

/*----------btn event functions------------*/
var btnselect = (e) => {
  console.log("button selected");
  e.classList.remove('btn-info');
  e.classList.add('selected');
  e.clicked = true;
}

var btnsuccess = (e) => {
  e.classList.remove("btn-info", 'selected');
  e.classList.add('btn-success');
  console.log(e.classList);
}

var btnfail = (e) => {
  e.classList.remove('btn-info', 'selected');
  e.classList.add('btn-danger');
}

var btnreset = (e) => {
  e.classList.remove('selected', 'btn-success', 'btn-danger', 'btn-info');
  e.classList.add('btn-info');
  e.clicked = false;
}

// toggle button selet
function toggleSelect(e) {

  var toggle = (e) => {

    if (e.classList.contains("selected")) {
      btnreset(e);
      e.clicked = false;
    } else {
      btnselect(e)
      e.clicked = true;
    }
  }

  if (e == btn1) { toggle(e), btnreset(btn2), btnreset(btn3), btnreset(btn4); };
  if (e == btn2) { toggle(e), btnreset(btn1), btnreset(btn3), btnreset(btn4); };
  if (e == btn3) { toggle(e), btnreset(btn1), btnreset(btn2), btnreset(btn4); };
  if (e == btn4) { toggle(e), btnreset(btn1), btnreset(btn2), btnreset(btn3); };

}

function answerreset() {
  answerchecked = false;
}

function checkAnswer() {

  if (slide.correctAns == 'answer1') {
    btnsuccess(btn1);

    if (btn1.clicked == true) {
      quizscore++;
    } else {
      if (btn2.clicked == true) { btnfail(btn2); };
      if (btn3.clicked == true) { btnfail(btn3); };
      if (btn4.clicked == true) { btnfail(btn4); };
    }
  } else if (slide.correctAns == 'answer2') {
    btnsuccess(btn2);

    if (btn2.clicked == true) {
      quizscore++;
    } else {
      if (btn1.clicked == true) { btnfail(btn1); };
      if (btn3.clicked == true) { btnfail(btn3); };
      if (btn4.clicked == true) { btnfail(btn4); };
    }
  } else if (slide.correctAns == 'answer3') {
    btnsuccess(btn3);

    if (btn3.clicked == true) {
      quizscore++;
    } else {
      if (btn1.clicked == true) { btnfail(btn1); };
      if (btn2.clicked == true) { btnfail(btn2); };
      if (btn4.clicked == true) { btnfail(btn4); };
    }
  } else {
    btnsuccess(btn4);

    if (btn4.clicked == true) {
      quizscore++;
    } else {
      if (btn1.clicked == true) { btnfail(btn1); };
      if (btn2.clicked == true) { btnfail(btn2); };
      if (btn3.clicked == true) { btnfail(btn3); };
    }
  }
  answerchecked = true; //prevents btns from doing anything until next slide is made.
} //end of checkanswer fnx


//create an iffy that resets the buttons automatically, take out of quiz.js


/*switch (this.correctAns) {
  btn1.style.color = "green";
score++;
} else { btn1.style.color = "red"; }

if (document.getElementById('choice2') == this.correctAns) {
  btn2.style.class = "btn btn-success";
  score++;
} else { btn2.style.class = "btn btn-danger"; }

if (document.getElementById('choice3') == this.correctAns) {
  btn3.style.class = "btn btn-success";
} else { btn3.style.class = "btn btn-danger"; }

if (document.getElementById('choice4') == this.correctAns) {
  btn3.style.class = "btn btn-success";
} else { btn3.style.class = "btn btn-danger"; }
  
}

/*Question.prototype.getQuestionIndex = function(){
  if ((this.questionIndex) <10){
  return this.questions[this.questionIndex];
}
else {
  return ""
}
}*/
//QuizSlide.prototype.guess =  function() {
  //this.questionIndex = this.questionIndex + 1;
//}
/*Question.prototype.questNumDisplay = function () {
  if ((this.questionIndex + 1) <10 ){
  return "Question " + (this.questionIndex + 1) + " of 10";
  } else { 
    return "Question 10 of 10";
  }
}*/


  //if(this.getQuestionIndex().correctAnswer(answer)){
    //this.score++;
  //}


 /*const setUserAns = (function () {
      var userAns = "";

      if (btn1.clicked == true) {
        userAns = "answer1";
        return userAns;
      }
      else if (btn2.clicked == true) {
        userAns = "answer2";
        return userAns;
      }
      else if (btn3.clicked == true) {
        userAns = "answer3";
        return userAns;
      }
      else if (btn4.clicked == true) {
        userAns = "answer4";
        return userAns;
      } else {
        alert("No answer selected");
        setUserAns();
      }
    })();*/