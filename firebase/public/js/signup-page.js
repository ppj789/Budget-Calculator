
/* back-end boredom */


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


}


function userdetails(){
  var userName = document.getElementById('name').value;



  firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({ name: userName});

  console.log("added name");
}

function banner(evt){
  uploadpic(evt);
  firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({ banner:  evt.target.files[0].name});
}
function profile(evt){
  uploadpic(evt);
  firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({ picture:  evt.target.files[0].name});
}


function uploadpic(evt){
  evt.stopPropagation();
  evt.preventDefault();

  var file = evt.target.files[0];
  var metadata = {
    'contentType': file.type
  };
  console.log("Your uid is: " + firebase.auth().currentUser.uid);
  firebase.storage().ref().child(firebase.auth().currentUser.uid +'/' +file.name).put(file, metadata).then(function(snapshot) {
    console.log('Uploaded', snapshot.totalBytes, 'bytes.');
    console.log(snapshot.metadata);
    var url = snapshot.downloadURL;
    console.log('File available at', url);
  }).catch(function(error) {
    console.error('Upload failed:', error);
  });
}


function initApp() {
  document.getElementById('coverfile').addEventListener('change', banner, false);
  document.getElementById('picfile').addEventListener('change', profile, false);

}


window.onload = function() {
  initApp();
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
