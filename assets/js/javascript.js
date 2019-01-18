//Initialize Firebase
var config = {
  apiKey: "AIzaSyBTTiwozZd2xKnwPoJI4VbPhK2ggdyyYNk",
  authDomain: "marian-sprojects.firebaseapp.com",
  databaseURL: "https://marian-sprojects.firebaseio.com",
  projectId: "marian-sprojects",
  storageBucket: "marian-sprojects.appspot.com",
  messagingSenderId: "408200714032"
};
firebase.initializeApp(config);

var database = firebase.database();

// var index to update frequency and arrival as time changes
var index = 0;

// 2. Button for adding train
$("#add-schedule-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainName").val().trim();
  var initialTime =$("#initialTime").val().trim();
  var dest = $("#destination").val().trim();
  var freq = moment($("#frequency").val().trim(), "mm").format("mm");
  

  // Creates local "temporary" object for holding data
  var newSchedule = {
    name: trainName,
    destination: dest,
    timeInit: initialTime,
    frequency: freq
  };
  
  // Uploads scheduler data to the database
  database.ref().push(newSchedule);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#destination").val("");
  $("#initialTime").val("");
  $("#frequency").val("");

  // index maintains a count of rows in databases and allow us to update arrival time and minutes away
  index++;
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log('this is the snapshot');
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var dest = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().timeInit;
  var frequency = childSnapshot.val().frequency;

  
  
  // var arrivalTimePretty = moment.unix(arrivalTime).format("MM/DD/YYYY");

    // To calculate the months worked
  //var trainArrival = moment().diff(moment(frequency, "X"), "minutes");
  //console.log(trainArrival);
  //console.log(empMonths);

  // Calculate the total billed rate
  //varfrequency;
 // Example Time Math
// Assumptions
  var tFrequency = frequency;

// // Time is 3:30 AM
// var firstTime = "03:30";

//First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
// console.log(firstTimeConverted);

// // Current Time
var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// // Difference between the times
 var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);

// // Time apart (remainder)
var tRemainder = diffTime % tFrequency;
// console.log(tRemainder);

// // Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// // Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
var arrivalTime = moment(nextTrain).format("hh:mm");

// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(dest),
    $(`<td id=trainFreq${index}>`).text(moment(frequency, "mm").format("m")),
    $("<td>").text(arrivalTime),
    $("<td>").text(tMinutesTillTrain)
    
  );

  // Append the new row to the table
  $("#TrainSchedulerTable > tbody").append(newRow);
});

// Example Time Math
// Assumptions
// var tFrequency = 3;

// // Time is 3:30 AM
// var firstTime = "03:30";

//First Time (pushed back 1 year to make sure it comes before current time)
//var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
// console.log(firstTimeConverted);

// // Current Time
// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// // Difference between the times
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);

// // Time apart (remainder)
// var tRemainder = diffTime % tFrequency;
// console.log(tRemainder);

// // Minute Until Train
// var tMinutesTillTrain = tFrequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// // Next Train
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
// -----------------------------------------------------------------------------
// 
// Now we will create code in moment.js to confirm that any attempt we use meets this test case


