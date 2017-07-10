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
  
  function showimage(){

var storage = firebase.storage();
var storageRef = storage.ref();
var tangRef = storageRef.child('images/test5.jpg');

firebase.auth().signInAnonymously().then(function() {

  tangRef.getDownloadURL().then(function(url)                             {
    document.querySelector('img').src = url;
    
  }).catch(function(error) {
    console.error(error);
  });
});

  }


