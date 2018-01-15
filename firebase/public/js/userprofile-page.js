/* back-end boredom */
var database;
var auth;
var storage;

function fireConnect(){
  database = firebase.database();
  auth = firebase.auth().currentUser;
  storage = firebase.storage();
}

function toggleSignIn() {
  alert("signing out");
  firebase.auth().signOut();
}

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  var file = evt.target.files[0];
  var metadata = {
    'contentType': file.type
  };
  console.log("Your email is: " + auth.email);
  storage.ref().child(auth.uid +'/' +file.name).put(file, metadata).then(function(snapshot) {
    console.log('Uploaded', snapshot.totalBytes, 'bytes.');
    console.log(snapshot.metadata);
    var url = snapshot.downloadURL;
    console.log('File available at', url);
    document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';
  }).catch(function(error) {
    console.error('Upload failed:', error);
  });
}

/*function addToDatabase(name, image){
  console.log("here is the user uid: " + auth.uid);
  database.ref('users/' + auth.uid + "/pets/" + name).set({
    petImage: image
  });
}*/

function refreshPets(){
  var e = document.getElementById('pets-list');
  e.innerHTML = "";
  var numPet = 0;
  database.ref('users/' + auth.uid + "/pets").once("value", function(data) {
    data.forEach(function(pet){
      if(pet.key == "num"){
        numPet = pet.val();
        //console.log("Number of Pets: " + numPet);
      }
      else{
        var img = document.createElement("img");
        var name = document.createElement("button");
        var petName = pet.child("petName").val();
        console.log("Pet: " + petName);

        storage.refFromURL("gs://dragon-monkeys.appspot.com/" + auth.uid + "/" + pet.child("petImg").val()).getDownloadURL().then(function(url) {
          // `url` is the download URL for 'images/stars.jpg'
          // Or inserted into an <img> element:
          img.src = url;
        }).catch(function(error) {
          console.log("image failed");
          img.src = "https://firebasestorage.googleapis.com/v0/b/dragon-monkeys.appspot.com/o/dog.png?alt=media&token=9aeedbd1-8d6b-4c2e-bc2a-d697161e9cff";
        });
        img.class = "pet-pic";

        var divi = document.createElement("div");
        var nameDiv = document.createElement("div");
        divi.class = "pet";
        nameDiv.class = "pet-name";

        name.innerText = pet.child("petName").val();

        divi.appendChild(img);
        nameDiv.appendChild(name);
        divi.appendChild(nameDiv);
        e.appendChild(divi);
      }
    })
    console.log("finished refresh");
  });
  //document.getElementById("PetGrid").innerText = e.innerHTML;
}

function HateyouFireBase(numPet){
  numPet++;
  console.log("new numPet: " + numPet)
  database.ref('users/' + auth.uid + '/pets').update({ num: numPet });
  var refStr =   database.ref('users/' + auth.uid + '/pets/pet ' + numPet);
  refStr.set({
    petImg: "dog.png",
    petName: "default"
  });

  /*console.log("here is the user uid: " + auth.uid);
  database.ref('users/' + auth.uid + "/pets/" + name).set({
    petImage: image
  });*/
  //console.log("refresh being called ");
  refreshPets();
}

function addPet(){
  //console.log("add Pet");
  database.ref('users/' + auth.uid + "/pets").once("value").then(function(snapshot) {
    var numPet = snapshot.child("num").val();
    //console.log("numPet retrieved addPet(): " + numPet);
    HateyouFireBase(numPet);
  });
}

/*function petGrid(v){
  var e = document.getElementById('add-pet-button-div'); // whatever you want to append the rows to:
  for(var i = 0; i < v; i++){
    var img = document.createElement("img");
    img.src = "https://a.wattpad.com/useravatar/random_author13.256.874272.jpg";
    var name = document.createElement("button");
    name.innerText = "new pet";
    name.setAttribute("id", "name.innerText");
    e.appendChild(img);
    e.appendChild(name);
    addToDatabase(name.innerText, img.src);
  }
  //document.getElementById("PetGrid").innerText = e.innerHTML;
}*/

function initApp() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      fireConnect();
      //console.log("refresh in initApp");
      refreshPets();

      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      document.getElementById('add-pet-button').addEventListener('click', addPet, false);

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
