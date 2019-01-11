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

// 2. Button for adding Employees
$("#add-schedule-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainName").val().trim();
  var dest = $("#destination").val().trim();
  var freq = moment($("#frequency").val().trim(), "hh:mm").format("X");

  // Creates local "temporary" object for holding employee data
  var newSchedule = {
    name: trainName,
    destination: dest,
    frequency: freq,
  };
  
  console.log(newSchedule);

  // Uploads scheduler data to the database
  database.ref().push(newSchedule);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#destination").val("");
  $("#frequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var dest = childSnapshot.val().role;
  var arrivalTime = childSnapshot.val().start;
  var frequency = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(dest);
  console.log(arrivalTime);
  console.log(frequency);

  // Prettify the employee start
  var arrivalTimePretty = moment.unix(arrivalTime).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  //var trainArrival = moment().diff(moment(arrivalTime, "X"), "months");
  //console.log(empMonths);

  // Calculate the total billed rate
  //varfrequency;
 //console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(dest),
    $("<td>").text(frequency),
    $("<td>").text("next arrival"),
    $("<td>").text("minutes away"),
  );

  // Append the new row to the table
  $("#TrainSchedulerTable > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case


