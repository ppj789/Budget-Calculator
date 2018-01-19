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
  window.location.href = "https://dragon-monkeys.firebaseapp.com/";
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

function refreshPets(){
  var e = document.getElementById('pets-list');
  e.innerHTML = "";
  var numPet = 0;
  database.ref('users/' + auth.uid + "/pets").once("value", function(data) {
    data.forEach(function(pet){
      if(pet.key == "num"){
        numPet = pet.val();
      }
      else{
        var img = document.createElement("img");
        var name = document.createElement("div");
        var petName = pet.child("petName").val();
        console.log("Pet: " + petName);

        storage.refFromURL("gs://dragon-monkeys.appspot.com/" + auth.uid + "/" + pet.child("petImg").val()).getDownloadURL().then(function(url) {
          img.src = url;
        }).catch(function(error) {
          console.log("image failed");
          img.src = "https://firebasestorage.googleapis.com/v0/b/dragon-monkeys.appspot.com/o/dog.png?alt=media&token=9aeedbd1-8d6b-4c2e-bc2a-d697161e9cff";
        });
        img.className = "pet-pic";
        img.addEventListener("click", function() { Petprofile(pet.key); }, true);

        var divi = document.createElement("div");
        var nameDiv = document.createElement("div");
        divi.className = "pet";
        nameDiv.className = "pet-name";

        name.innerText = pet.child("petName").val();
        name.addEventListener("click", function() { Petprofile(pet.key); }, true);

        divi.appendChild(img);
        nameDiv.appendChild(name);
        divi.appendChild(nameDiv);
        e.appendChild(divi);
      }
    })
    var butt = document.createElement("button");
    butt.id = "add-pet-button";
    butt.innerText = "Add Pet";
    butt.addEventListener('click', openDialogue, false);

    var divi = document.createElement("div");
    divi.className = "pet";

    divi.appendChild(butt);

    e.appendChild(divi);

    console.log("finished refresh");
  });
}



function addPet(){
  //console.log("add Pet");
  database.ref('users/' + auth.uid + "/pets").once("value").then(function(snapshot) {
    var numPet = snapshot.child("num").val();
    //console.log("numPet retrieved addPet(): " + numPet);
    numPet++;
    console.log("new numPet: " + numPet)
    database.ref('users/' + auth.uid + '/pets').update({ num: numPet });
    var refStr =   database.ref('users/' + auth.uid + '/pets/pet ' + numPet);

    var petname = document.getElementById("pet-name-input").value;
    if(petname.length == 0){
      petname = "Default";
    }
    //var petImage = document.getElementById("pet-name-input").value;

    var file = document.getElementById("petfile").files[0];
    var metadata = {
      'contentType': file.type
    };
    console.log("Your email is: " + auth.email);
    storage.ref().child(auth.uid +'/' +file.name).put(file, metadata).then(function(snapshot) {
      console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      console.log(snapshot.metadata);
      var url = snapshot.downloadURL;
      console.log('File available at', url);
    }).catch(function(error) {
      console.error('Upload failed:', error);
    });

    refStr.update({
      petName: petname,
      petImg: file.name
    });


    refreshPets();
  });
}

//use this method to get to the pets profile (i.e. pet 0)
function Petprofile(pet){
  pet = pet.replace("pet ", "");
  window.location = "https://dragon-monkeys.firebaseapp.com/petprofile-page.html?Pet=" + pet;
}

function addStat(){
  database.ref('users/' + auth.uid + "/pets").once("value").then(function(snapshot) {
    var numPet = snapshot.child("num").val() + 1;
    var update = {};
    var statVal = document.getElementById('statVal').value;
    var statKey = document.getElementById("statKey").value;
    console.log (statKey + ": " + statVal);
    update[statKey] = statVal;
    database.ref('users/' + auth.uid + '/pets/pet ' + numPet).update(update);
  });
}

function initApp() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      fireConnect();
      refreshPets();



      database.ref('users/' + auth.uid ).once("value").then(function(snapshot) {
        storage.refFromURL("gs://dragon-monkeys.appspot.com/" + auth.uid + "/" + snapshot.child("picture").val()).getDownloadURL().then(function(url) {
          document.getElementById("profile-pic").src = url;
          document.getElementById("big-profile-pic").src = url;
        }).catch(function(error) {
          console.log("image failed");
          document.getElementById("profile-pic").src = "https://firebasestorage.googleapis.com/v0/b/dragon-monkeys.appspot.com/o/dog.png?alt=media&token=9aeedbd1-8d6b-4c2e-bc2a-d697161e9cff";
          document.getElementById("big-profile-pic").src = "https://firebasestorage.googleapis.com/v0/b/dragon-monkeys.appspot.com/o/dog.png?alt=media&token=9aeedbd1-8d6b-4c2e-bc2a-d697161e9cff";
        });
        storage.refFromURL("gs://dragon-monkeys.appspot.com/" + auth.uid + "/" + snapshot.child("banner").val()).getDownloadURL().then(function(url) {
          document.getElementById("cover-pic").src = url;
        }).catch(function(error) {
          console.log("image failed");
          document.getElementById("cover-pic").src = "https://firebasestorage.googleapis.com/v0/b/dragon-monkeys.appspot.com/o/dog.png?alt=media&token=9aeedbd1-8d6b-4c2e-bc2a-d697161e9cff";
        });

        document.getElementById("user-name").innerHTML = snapshot.child("name").val();
      });

      document.getElementById("add-pet-fact-button").addEventListener('click', addStat, false);


    }
    else{

    }
  });
  document.getElementById('sign-out').addEventListener('click', toggleSignIn, false);
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

function openDialogue() {
    document.getElementById("dialogue-div").style.zIndex = "3";
    document.getElementsByTagName("BODY")[0].style.overflow = "hidden";
}

function closeDialogue(num) {
  document.getElementById("dialogue-div").style.zIndex = "0";
  document.getElementsByTagName("BODY")[0].style.overflow = "auto";
  if(num == 1)
  {
    addPet();
  }
}
