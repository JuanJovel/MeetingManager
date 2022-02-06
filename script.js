
document.addEventListener("DOMContentLoaded", init);



function init() {

  var submitButton = document.getElementById("submit-button");


  submitButton.addEventListener("click", submitInfo);

  var displayButton = document.getElementById("queue-update");

  displayButton.addEventListener("click", displayQueue);

  var queueControl = document.getElementById("queue-pin-submit");

  queueControl.addEventListener("click", checkControlPin);

  var queueClearButton = document.getElementById("queue-clear");

  queueClearButton.disabled = true;
  queueClearButton.addEventListener("click", clearQueue);


  var dequeueButton = document.getElementById("queue-remove");
  dequeueButton.disabled = true;

  dequeueButton.addEventListener("click", dequeue);

}



function submitInfo() {

  var userFullName = document.getElementById("user-fullname").value;
  var email = document.getElementById("user-email").value;
  var userComment = document.getElementById("user-comment").value;

  var newParticipant = new Participant(userFullName, email, userComment);

  myParticipants.push(newParticipant);

}



var myParticipants = [];


class Participant {
  constructor(fullName, email, comment) {
    this.fullName = fullName;
    this.email = email;
    this.comment = comment;
    this.time = new Date().getTime();
  }
}

function displayQueue() {
  document.getElementById("queue").innerHTML = "<thead><tr><th>Queue Position</th><th>Name</th><th>Email</th><th>Comment</th><th>Time Waited</th></tr></thead >";
  for (var i = 0; i < myParticipants.length; i++) {
    var newDiv = document.createElement("tr");
    newDiv.innerHTML = "<td>" + (i + 1) + "</td><td>" + myParticipants[i].fullName + "</td><td>" + myParticipants[i].email + "</td><td>" + myParticipants[i].comment + "</td><td>" + Number(((new Date().getTime() - myParticipants[i].time) / (1000 * 60))).toFixed(2) + " minutes </td>";
    document.getElementById("queue").appendChild(newDiv);
  }
}

function checkControlPin() {
  var myPin = document.getElementById("queue-pin").value;
  var clearButton = document.getElementById("queue-clear");
  var dequeueButton = document.getElementById("queue-remove");

  if (myPin == "1234") {
    clearButton.disabled = false;
    dequeueButton.disabled = false;
  }

}


function clearQueue() {
  myParticipants = [];
  displayQueue();
}


function dequeue() {
  myParticipants.shift();
  displayQueue();
}





