
/* back-end boredom */
function toggleSignIn() {
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
      }
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
      /**
       * initApp handles setting up UI event listeners and registering Firebase auth listeners:
       *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
       *    out, and that is where we update the UI.
       */
      function initApp() {
        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
          // [START_EXCLUDE silent]
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

            window.location = '/userprofile-page.html';
            // [START_EXCLUDE]
            //document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            //document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            // [END_EXCLUDE]
          } else {
            // User is signed out.
            // [START_EXCLUDE]
            //document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            document.getElementById('quickstart-sign-in').textContent = 'Sign in';
            //document.getElementById('quickstart-account-details').textContent = 'null';
            // [END_EXCLUDE]
          }
          // [START_EXCLUDE silent]
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authstatelistener]
        document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
        //document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
      }

      window.onload = function() {
        initApp();
      };



/* front-end dynamisity */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
