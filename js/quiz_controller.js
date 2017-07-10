function Quiz(questions, answers){
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
  this.answers = answers;

}
Quiz.prototype.getQuestionIndex = function(){
  return this.questions[this.questionIndex];
}
Quiz.prototype.getAnswers = function(x) {
  return this.answers[x];
}
Quiz.prototype.isEnded = function() {
  return this.questions.length === this.questionIndex;
}
Quiz.prototype.guess =  function() {
  this.questionIndex++;
}
Quiz.prototype.questNumDisplay = function () {
  return "Question " + (this.questionIndex + 1) + " of 10";
}


  //if(this.getQuestionIndex().correctAnswer(answer)){
    //this.score++;
  //}


