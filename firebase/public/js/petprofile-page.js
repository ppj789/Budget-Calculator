/* backend that acutally does stuff */

var database;
var auth;
var storage;
var pet;

function fireConnect(){
  database = firebase.database();
  auth = firebase.auth().currentUser;
  storage = firebase.storage();
}

function toggleSignIn() {
  alert("signing out");
  firebase.auth().signOut();
}

function GetfromURL(){
  var queryStart = window.location.href.indexOf("=") + 1;
  var query = window.location.href.slice(queryStart, window.location.href.length);

    if (query === ""){
      window.location = "https://dragon-monkeys.firebaseapp.com/userprofile-page.html";
    }

    pet = query;

    pet = pet.replace("%20", " ");

    console.log("Pet that will be opened: "+ pet);
}

function initApp() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      fireConnect();
      GetfromURL();

      /*var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');*/
    }
    else{
      /*document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');*/
      window.location = "https://dragon-monkeys.firebaseapp.com"
    }
  });
  document.getElementById('sign-out').addEventListener('click', toggleSignIn, false);
  //document.getElementById('file').addEventListener('change', handleFileSelect, false);
}



window.onload = function() {
  sessionStorage.getItem('uid');
  initApp();
};






/* front-end dynamism */

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
