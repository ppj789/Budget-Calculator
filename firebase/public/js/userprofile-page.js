/* back-end boredom */
function toggleSignIn() {
      alert("signing out");

      firebase.auth().signOut();

      //window.location = "http://dragon-monkeys.firebaseapp.com/";
      /*if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        window.location = "http://dragon-monkeys.firebaseapp.com/";
        // [END signout]
      } else {
        window.location = "http://dragon-monkeys.firebaseapp.com/";*/
        // Sign in with email and pass.
        // [START authwithemail]
    }

    function handleFileSelect(evt) {
      var auth = firebase.auth();
      var storageRef = firebase.storage().ref();
      evt.stopPropagation();
      evt.preventDefault();
      var file = evt.target.files[0];
      var metadata = {
        'contentType': file.type
      };
      // Push to child path.
      // [START oncomplete]
      console.log("Your email is: " + auth.currentUser.email);
      storageRef.child(auth.currentUser.email +'/' +file.name).put(file, metadata).then(function(snapshot) {
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        console.log(snapshot.metadata);
        var url = snapshot.downloadURL;
        console.log('File available at', url);
        // [START_EXCLUDE]
        document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';
        // [END_EXCLUDE]
      }).catch(function(error) {
        // [START onfailure]
        console.error('Upload failed:', error);
        // [END onfailure]
      });
      // [END oncomplete]
    }

    function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        //document.getElementById('quickstart-verify-email').disabled = true;
        // [END_EXCLUDE]

        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          //console.log(user.email);
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;

          document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
          document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
          // [START_EXCLUDE]
        }
        else{
          document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
          document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
          window.location = "https://dragon-monkeys.firebaseapp.com"
        }
          // [END_EXCLUDE]

        // [END_EXCLUDE]
      });
      // [END authstatelistener]
      document.getElementById('sign-out').addEventListener('click', toggleSignIn, false);
      document.getElementById('file').addEventListener('change', handleFileSelect, false);
    }



      window.onload = function() {
        sessionStorage.getItem('uid');
        initApp();
      };


/* front-end */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}






