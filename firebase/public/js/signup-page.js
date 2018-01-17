
/* back-end boredom */
/*function toggleSignIn() {
  var noErrors = true;
  if (firebase.auth().currentUser) {
      // [START signout]
      firebase.auth().signOut();
      // [END signout]
    } else {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter a longer email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a longer password.');
        return;
      }
      // Sign in with email and pass.
      // [START authwithemail]
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      document.getElementById('quickstart-sign-in').disabled = false;
      noErrors = false;
      // [END_EXCLUDE]
    });
    // [END authwithemail]
  }
  document.getElementById('quickstart-sign-in').disabled = true;
}*/
      /**
       * Handles the sign up button press.
       */
/*function handleSignUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
        // Sign in with email and pass.
        // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
            // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
      console.log(error);
          // [END_EXCLUDE]
  });
    // [END createwithemail]
}*/

function stepone(){
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var name = document.getElementById('name').value;

  if(email.length < 4){
    alert("insert a longer email");
  }
  if(password.length < 4){
    alert("password needs to be longer then 3");
  }
  if(name.length < 1){
    alert("You need a name")
  }

  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(firebaseUser) {
    console.log("successful " + firebase.auth().currentUser.uid);

    //document.getElementById('quickstart-sign-up').textContent = "wait";
    //document.getElementById('quickstart-sign-up').disabled = true;

    //firebase.database().ref('users/' + firebase.auth().uid).update({ username: name});
  }).catch(function(error) {
        // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
            // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
      console.log(error);
          // [END_EXCLUDE]
  });
  //console.log("account created: " + firebase.auth().uid);

  //Ill do the name in the next step;
  //firebase.database().ref('users/' + firebase.auth().uid).update({ username: name});

  //document.getElementById('quickstart-sign-up').textContent = "next";

}


function userdetails(){
  var userName = document.getElementById('name').value;
  //when we make abnner and profile usable.
  //var userImage;
  //var userBorder;



  firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({ name: userName});
  console.log("added name");
}


/*function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
      // [START_EXCLUDE silent]
  firebase.auth().onAuthStateChanged(function(user) {
      //document.getElementById('quickstart-verify-email').disabled = true;
      // [END_EXCLUDE]
        //sessionStorage.setItem('uid', firebase.auth().currentUser);
    if (user) {
        // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;


      //window.location = '/userprofile-page.html';
        // [START_EXCLUDE]
        //document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      //document.getElementById('quickstart-sign-in').textContent = 'Sign out';
        //document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
        // [END_EXCLUDE]
    } else {
        // User is signed out.
        // [START_EXCLUDE]
        //document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      //document.getElementById('quickstart-sign-in').textContent = 'Sign in';
        //document.getElementById('quickstart-account-details').textContent = 'null';
        // [END_EXCLUDE]
    }
    // [START_EXCLUDE silent]
    //document.getElementById('quickstart-sign-in').disabled = false;
      // [END_EXCLUDE]
  });
    // [END authstatelistener]
  //document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
  //document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
}*/


window.onload = function() {
  //initApp();
};



/* front-end dynamisity */
function toggleButton(num)
{
  switch(num)
  {
    case 1:
      if(firebase.auth().currentUser){
        document.getElementById("signup-step-1").style.display = "none";
        document.getElementById("signup-step-2").style.display = "block";
        document.getElementById("signup-step-3").style.display = "none";
      }
      else{
        stepone();
      }
      break;
    case 2:
      userdetails();
      document.getElementById("signup-step-1").style.display = "none";
      document.getElementById("signup-step-2").style.display = "none";
      document.getElementById("signup-step-3").style.display = "block";
      break;

    case 3:
      break;
  }
}
