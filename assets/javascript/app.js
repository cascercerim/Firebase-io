
// Listed Under homework
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyACsaU0KjZRMuwMU-NvXuhc9yJhVL7UgRA",
    authDomain: "homework-164da.firebaseapp.com",
    databaseURL: "https://homework-164da.firebaseio.com",
    projectId: "homework-164da",
    storageBucket: "homework-164da.appspot.com",
    messagingSenderId: "995820678650",
    appId: "1:995820678650:web:0f64eb50112c5cd0fec843"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Reference to the database service 
  var database = firebase.database();
  
  $("#submit").on("click", function (event) {
    event.preventDefault();
  
  
    // variables 
    var train = $("#input-train").val().trim();
    var place = $("#input-place").val().trim();
    var time = moment($("#input-time").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("#input-frequency").val().trim();
  
  
    console.log(train);
    console.log(place);
    console.log(time);
    console.log(frequency);
  
  
    var newTrain = {
      train, 
      place,
      time,
      frequency, 
  
    }
    alert("Train successfully added");
  
    database.ref().push(newTrain);
    $("#input-train").val("");
    $("#input-place").val("");
    $("#input-time").val("");
    $("#input-frequency").val("");
  
  });
  
  
  
  database.ref().on("child_added", function (childSnapshot, prevChildKey) {
  
    var trainName = childSnapshot.val().train; 
      trainDestination = childSnapshot.val().place;
      trainTime = childSnapshot.val().time;
      trainFrequency =  childSnapshot.val().frequency;
  
  
    // Log everything thats coming out of snapshot
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFrequency);
    console.log(trainTime);
    
  
    var tFrequency = trainFrequency;
    var first = trainTime;
    var convertedTime = moment(first,"hh:mm").subtract(1, "years");
    var currentTime = moment();
  
    var otherTime = moment().diff(moment(convertedTime), "minutes");
  
    var tRemainder = otherTime % tFrequency;
  
    var minTillTrain = tFrequency - tRemainder;
    console.log(minTillTrain);
  
    var otherTrain = moment().add(minTillTrain, "minutes").format("hh:mm");
  
    console.log(otherTrain)
  
  
    $("#train-table").append("<tr>"
      + "<td>" + trainName + "</td>"
      + "<td>" + trainDestination + "</td>"
      + "<td>" + trainFrequency + "</td>"
      + "<td>" + otherTrain + "</td>"
      + "<td>" + minTillTrain + "</td>"
      + "</tr>");
  
  
     
  });
  
  $("#reload").on("click", function (event) {
    event.preventDefault();
    location.reload();
  
  });
  
  function updateTime(){
    var now = moment();
    var displayTime = now.format("hh:mm:ss");
    $("#clock").text(displayTime);
  }
  setInterval(updateTime, 1000);