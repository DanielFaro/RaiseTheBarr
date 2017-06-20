var mainText = document.getElementById("mainText");
var submitBtn = document.getElementById("submitBtn");
function submitClick() {
	var firebaseRef = firebase.database().ref();
	var msgText = mainText.value;
	firebaseRef.push().set(msgText);
}
var g_FOLDER_CONTENTS = mlString(function () { /*! 
1.png
2.png
3.png 
*/});