
/*---------------------------------LEDGER-----------------------------------*/
var balance = 0;

function submitTransaction() {
  // Get form values
  var transactionType = document.getElementById('transactionType').value;
  var description = document.getElementById('description').value;
  var amount = parseFloat(document.getElementById('amount').value);

  // Validate amount
  if (isNaN(amount)) {
    alert('Please enter a valid amount.');
    return;
  }

  // Update balance
  if (transactionType === 'income') {
    balance += amount;
  } else {
    balance -= amount;
  }

  // Create ledger entry
  var entry = document.createElement('li');
  entry.className = 'ledger-entry';
  entry.textContent = `${transactionType.toUpperCase()} - ${description} - RM ${amount.toFixed(2)}`;

  // Add delete button
  var deleteButton = document.createElement('span');
  deleteButton.className = 'delete-button';
  deleteButton.textContent = '🚮';
  deleteButton.onclick = function () {
    deleteTransaction(entry, amount, transactionType);
  };

  entry.appendChild(deleteButton);

  // Append entry to ledger
  document.getElementById('ledgerEntries').appendChild(entry);

  // Update balance display
  document.getElementById('balanceAmount').textContent = `RM ${balance.toFixed(2)}`;

  // Clear form
  document.getElementById('ledgerForm').reset();
}

function deleteTransaction(entry, amount, transactionType) {
  // Update balance
  if (transactionType === 'income') {
    balance -= amount;
  } else {
    balance += amount;
  }

  // Remove entry from ledger
  entry.remove();

  // Update balance display
  document.getElementById('balanceAmount').textContent = `RM ${balance.toFixed(2)}`;
}

/*------------------------------TASK & GOALS---------------------------------*/
function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");

  if (taskInput.value.trim() !== "") {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(taskInput.value));
    taskList.appendChild(li);

    // Add a delete button to each task
    var deleteButton = document.createElement("delete-button");
    deleteButton.appendChild(document.createTextNode(" 🚮"));
    deleteButton.onclick = function () {
      taskList.removeChild(li);
    };
    li.appendChild(deleteButton);

    // Clear the input field
    taskInput.value = "";
  }
}

/*-----------------------------WORKSPACE MANAGER-----------------------------*/
function validateTimeInput(input) {
  // Ensure that the entered value is a valid number and within the allowed range
  var value = parseInt(input.value, 10);
  if (isNaN(value) || value < 0 || value > 60) {
    input.value = ''; // Clear the input if it's not a valid number or out of range
  }
}

function addWorkspaceEntry() {
  var projectInput = document.getElementById('projectInput');
  var projectType = document.getElementById('projectType');
  var timeInHourInput = document.getElementById('timeInHourInput');
  var timeInMinuteInput = document.getElementById('timeInMinuteInput');
  var timeInMeridiemInput = document.getElementById('timeInMeridiemInput');
  var timeOutHourInput = document.getElementById('timeOutHourInput');
  var timeOutMinuteInput = document.getElementById('timeOutMinuteInput');
  var timeOutMeridiemInput = document.getElementById('timeOutMeridiemInput');
  var statusInput = document.getElementById('statusInput');
  var appointmentWithInput = document.getElementById('appointmentWithInput');
  var workspaceList = document.getElementById('workspaceList');

  var timeIn = timeInHourInput.value + ':' + timeInMinuteInput.value + ' ' + timeInMeridiemInput.value;
  var timeOut = timeOutHourInput.value + ':' + timeOutMinuteInput.value + ' ' + timeOutMeridiemInput.value;

  // Convert the time strings to Date objects for easier manipulation
  var currentDate = new Date(); // Current date
  var timeInDate = new Date(currentDate.toDateString() + ' ' + timeIn);
  var timeOutDate = new Date(currentDate.toDateString() + ' ' + timeOut);

  // Calculate the time difference in milliseconds
  var timeDiff = timeOutDate - timeInDate;

  // Convert the time difference to hours
  var hours = timeDiff / (1000 * 60 * 60);

  // Validate the entered time values
  if (
    validateTimeValues(timeInHourInput.value, timeInMinuteInput.value) &&
    validateTimeValues(timeOutHourInput.value, timeOutMinuteInput.value) &&
    projectInput.value.trim() !== ''
  ) {
    // Check if the time difference exceeds 24 hours
    if (hours < 0 || hours > 24) {
      alert('Please ensure that Time Out is later than Time In and both are within the same day.');
      return;
    }

    var selectedProjectType = projectType.options[projectType.selectedIndex].text;

    // Calculate the time difference in milliseconds after adjusting the date
    timeDiff = timeOutDate - timeInDate;

    // Convert the time difference to hours
    hours = timeDiff / (1000 * 60 * 60);

    var li = document.createElement('li');
    li.innerHTML = `<strong>Project:</strong> ${projectInput.value}<br>
                            <strong>Project Type:</strong> ${selectedProjectType}<br>
                            <strong>Time In:</strong> ${timeIn}<br>
                            <strong>Time Out:</strong> ${timeOut}<br>
                            <strong>Hours Worked:</strong> ${hours.toFixed(2)} hours<br>
                            <strong>Status:</strong> ${statusInput.value}<br>
                            <strong>Appointment With:</strong> ${appointmentWithInput.value}
                            <button onclick="deleteWorkspaceEntry(this)">Delete</button>`;
    workspaceList.appendChild(li);

    // Clear input fields
    projectInput.value = '';
    projectType.selectedIndex = 0; // Reset the project type dropdown to the default option
    timeInHourInput.value = '';
    timeInMinuteInput.value = '';
    timeOutHourInput.value = '';
    timeOutMinuteInput.value = '';
    statusInput.value = '';
    appointmentWithInput.value = '';
  } else {
    alert('Please enter a valid time in the format HH:MM AM/PM for both Time In and Time Out. Also, please insert all relevant information.');
  }
}

function deleteWorkspaceEntry(button) {
  var li = button.parentElement;
  li.remove();
}

function validateTimeValues(hour, minute) {
  // Validate that the entered time values are in the correct range
  var hourValue = parseInt(hour, 10);
  var minuteValue = parseInt(minute, 10);

  if (
    isNaN(hourValue) || isNaN(minuteValue) ||
    hourValue < 0 || hourValue > 12 ||
    minuteValue < 0 || minuteValue > 60
  ) {
    return false;
  }

  return true;
}

/*---------------------- JOURNAL MANAGER -------------------------------*/
function addJournalEntry() {
  var journalInput = document.getElementById('journalInput');
  var journalHourInput = document.getElementById('journalHourInput');
  var journalMinuteInput = document.getElementById('journalMinuteInput');
  var journalMeridiemInput = document.getElementById('journalMeridiemInput');
  var journalList = document.getElementById('journalList');

  // Validate the entered time values
  if (validateTimeValues(journalHourInput.value, journalMinuteInput.value) && journalInput.value.trim() !== '') {
    var time = journalHourInput.value + ':' + journalMinuteInput.value + ' ' + journalMeridiemInput.value;

    var li = document.createElement('li');
    li.innerHTML = `<strong>Time:</strong> ${time}<br>
                      <strong>Entry:</strong> ${journalInput.value}
                      <button onclick="deleteJournalEntry(this)">Delete</button>`;
    journalList.appendChild(li);

    // Clear input fields
    journalInput.value = '';
    journalHourInput.value = '';
    journalMinuteInput.value = '';
  } else {
    alert('Please enter a valid time in the format HH:MM AM/PM and provide a journal entry.');
  }
}

function deleteJournalEntry(button) {
  var li = button.parentElement;
  li.remove();
}

/*---------------------- PRINT DOCUMENT -------------------------------*/
function printDocument() {
    var printContent =
        "<div class='printable-content'>" +
        "<h1>DAILY LOG</h1>" +
        "<fieldset>" +
        "<legend><h5>LEDGER</h5></legend>" +
        document.getElementById('ledgerEntries').outerHTML +
        "<div id='balance'>" +
        "<h3>Balance</h3>" +
        "<p id='balanceAmount'>" + document.getElementById('balanceAmount').textContent + "</p>" +
        "</div>" +
        "</fieldset>" +
        "<fieldset>" +
        "<legend><h5>TASK MANAGER</h5></legend>" +
        document.getElementById('taskList').outerHTML +
        "</fieldset>" +
        "<fieldset>" +
        "<legend><h5>WORKSPACE MANAGER</h5></legend>" +
        document.getElementById('workspaceList').outerHTML +
        "</fieldset>" +
        "<fieldset>" +
        "<legend><h5>JOURNAL</h5></legend>" +
        document.getElementById('journalList').outerHTML +
        "</fieldset>" +
        "</div>";

    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.write('<html><head><title>Daily Log</title>' +
        '<link rel="stylesheet" type="text/css" href="css/print.css"></head>' +
        '<body>' + printContent + '</body></html>');

    iframeDoc.close();

    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    document.body.removeChild(iframe);
}
