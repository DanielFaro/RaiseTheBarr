function QuizSlide(questions, answers, questnum){
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
  this.answers = answers;
  this.questnum = questnum;

}
/*Question.prototype.getQuestionIndex = function(){
  if ((this.questionIndex) <10){
  return this.questions[this.questionIndex];
}
else {
  return ""
}
}*/
QuizSlide.prototype.getAnswers = function(x) {
  return this.answers[x];
}
QuizSlide.prototype.isEnded = function() {
  return this.questnum === "Question10";
}
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


