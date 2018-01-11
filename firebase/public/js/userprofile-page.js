/* back-end boredom */
function toggleSignIn() {
  alert("signing out");
  firebase.auth().signOut();
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
  console.log("Your email is: " + auth.currentUser.email);
  storageRef.child(auth.currentUser.email +'/' +file.name).put(file, metadata).then(function(snapshot) {
    console.log('Uploaded', snapshot.totalBytes, 'bytes.');
    console.log(snapshot.metadata);
    var url = snapshot.downloadURL;
    console.log('File available at', url);
    document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';
  }).catch(function(error) {
    console.error('Upload failed:', error);
  });
}

function addToDatabase(name, image){
  var database = firebase.database();
  var user = firebase.auth().currentUser;
  database.ref('users/' + user.uid + "/pets").set({
    petName: name,
    petImage: image
  });
}

function petGrid(v){
  var e = document.getElementById('add-pet-button-div'); // whatever you want to append the rows to:
  for(var i = 0; i < v; i++){
    var img = document.createElement("img");
    img.src = "https://a.wattpad.com/useravatar/random_author13.256.874272.jpg";
    var name = document.createElement("button");
    name.innerText = "pet" + i;
    name.setAttribute("id", "name.innerText");
    e.appendChild(img);
    e.appendChild(name);
    addToDatabase(name.innerText, img.src);
  }
  document.getElementById("PetGrid").innerText = e.innerHTML;
}

function initApp() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
    }
    else{
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      window.location = "https://dragon-monkeys.firebaseapp.com"
    }
  });
  document.getElementById('sign-out').addEventListener('click', toggleSignIn, false);
  document.getElementById('file').addEventListener('change', handleFileSelect, false);
}



window.onload = function() {
  sessionStorage.getItem('uid');
  initApp();
};


/* front-end and trash*/
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
