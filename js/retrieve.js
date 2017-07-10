<!-- FIREBASE INIT -->
	<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase.js"></script>
	<script>
// Initialize Firebase
var config = {
	apiKey: "AIzaSyAE1ufHIzDsOlvSOHnD-8hEI6bkWY3yCP0",
	authDomain: "raise-the-barr.firebaseapp.com",
	databaseURL: "https://raise-the-barr.firebaseio.com",
	projectId: "raise-the-barr",
	storageBucket: "raise-the-barr.appspot.com",
	messagingSenderId: "776695259178"
};
firebase.initializeApp(config);
</script>
<link href="https://api.motion.ai/sdk/webchat.css" rel="stylesheet" type="text/css">
<script src="https://api.motion.ai/sdk/webchat.js"></script>
<script>
 motionAI_Init('62815?color=62a8ea&sendBtn=SEND&inputBox=Type%20something...&token=ce02cb5cb2e08db479d7f3b908397ef5',true,400,470,'https://api.motion.ai/sdk/botbtn.png');
 /* You may also invoke motionAI_Open() to manually open the modal. */
</script>


const db= firebase.database().ref('Content');
const ContentRef = db.child('1');
const query1 = ContentRef.orderByChild('').equalTo('');

query.on('value', snap)

function snap(data)
{
	console.log(data.val());
}
