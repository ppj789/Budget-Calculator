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
    pet = pet.replace("#", "");

    console.log("Pet that will be opened: "+ pet);
}

function initApp() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      fireConnect();
      GetfromURL();

      database.ref('users/' + auth.uid ).once("value").then(function(snapshot) {
        storage.refFromURL("gs://dragon-monkeys.appspot.com/" + auth.uid + "/" + snapshot.child("picture").val()).getDownloadURL().then(function(url) {
          document.getElementById("profile-pic").src = url;
        }).catch(function(error) {
          console.log("profile failed");
          document.getElementById("profile-pic").src = "https://firebasestorage.googleapis.com/v0/b/dragon-monkeys.appspot.com/o/dog.png?alt=media&token=9aeedbd1-8d6b-4c2e-bc2a-d697161e9cff";
        });
      });

      database.ref('users/' + auth.uid + "/pets/pet " + pet ).once("value").then(function(snapshot) {
        storage.refFromURL("gs://dragon-monkeys.appspot.com/" + auth.uid + "/" + snapshot.child("petImg").val()).getDownloadURL().then(function(url) {
          document.getElementById("pet-pic").src = url;
        }).catch(function(error) {
          console.log("image failed");
          document.getElementById("profile-pic").src = "https://firebasestorage.googleapis.com/v0/b/dragon-monkeys.appspot.com/o/dog.png?alt=media&token=9aeedbd1-8d6b-4c2e-bc2a-d697161e9cff";
        });

        var namediv = document.getElementById("pet-name");
        namediv.innerHTML = snapshot.child("petName").val();
      });

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
