// Constants for manual entry
const INTERVIEWER_RANGE = 'E6';
const REPORTER_RANGE = 'E8';
const EMAIL_RANGE = 'E10';
const FIRST_RESPONSE_RANGE = 'C15';
const SECOND_RESPONSE_RANGE = 'C21';
const THIRD_RESPONSE_RANGE = 'C30';
const FOURTH_RESPONSE_RANGE = 'C40';
const FIFTH_RESPONSE_RANGE = 'C50';
const SUBMIT_RESPONSE_RANGE = 'H62';

// form response sheet name
const FORM_RESPONSES_SHEET = 'Form Responses 1';
// backup form response sheet name
const BACKUP_FORM_RESPONSES_SHEET = 'Form Responses Backup';

const BOT_FORM_SHEET = 'Manual Reporting Entry (Bot)';



// A function which backs up the responses
function backupResponses(){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var formResponsesSheet = spreadsheet.getSheetByName(FORM_RESPONSES_SHEET);
  var backupFormResponsesSheet = spreadsheet.getSheetByName(BACKUP_FORM_RESPONSES_SHEET);

  // Clear the backup sheet
  backupFormResponsesSheet.clearContents();

  // Find the last row and column of the formResponsesSheet
  var lastRow = formResponsesSheet.getLastRow();
  var lastColumn = formResponsesSheet.getLastColumn();

  // Get the range to copy
  var rangeToCopy = formResponsesSheet.getRange(1, 1, lastRow, lastColumn);

  // Copy the range to the backup sheet
  rangeToCopy.copyTo(backupFormResponsesSheet.getRange(1, 1));

  showMessageOk("Form Responses Backup Complete");
}

function generateRangeStringArray(mode) {
    var rangesStrings = [];
    if (mode == 'entry')
    {
        rangesStrings.push(EMAIL_RANGE);
        rangesStrings.push(FIRST_RESPONSE_RANGE);
        rangesStrings.push(SECOND_RESPONSE_RANGE);
        rangesStrings.push(THIRD_RESPONSE_RANGE);
        rangesStrings.push(FOURTH_RESPONSE_RANGE);
        rangesStrings.push(FIFTH_RESPONSE_RANGE);
        rangesStrings.push(INTERVIEWER_RANGE);
    }
    else if (mode == 'clear')
    {
        rangesStrings.push(FIRST_RESPONSE_RANGE);
        rangesStrings.push(SECOND_RESPONSE_RANGE);
        rangesStrings.push(THIRD_RESPONSE_RANGE);
        rangesStrings.push(FOURTH_RESPONSE_RANGE);
        rangesStrings.push(FIFTH_RESPONSE_RANGE);
        rangesStrings.push(INTERVIEWER_RANGE);
        rangesStrings.push(REPORTER_RANGE);
        rangesStrings.push(SUBMIT_RESPONSE_RANGE);
    }
    return rangesStrings
}

function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Interview Management')
      .addItem('Save Responses', 'saveResponse')
      .addItem('Backup Form Responses', 'backupResponses')
      .addToUi();
    ui.createAddonMenu("Mobile Test")
      .addItem('Save Responses', 'saveResponse')
      .addItem('Backup Form Responses', 'backupResponses')
      .addToUi();
  }
  
  // A basic function that shows a prompt and based on which option the user picks returns true or false
  function showYesNoPrompt(msg){
    var ui = SpreadsheetApp.getUi();
    var response = ui.prompt(msg, ui.ButtonSet.YES_NO);
    return response.getSelectedButton() === ui.Button.YES;
  }

  // get the name of the current sheet
  function getSheetName(){
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getActiveSheet();
    return sheet.getName();
  }

  function fetchEQInterviewAnswers(rangeArray, sheet){
    //   we need to get the values from the 'Manual Reporting Entry' sheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(sheet);
    var responses = [];
    var response;
    // we loop through the range array and get the values and push them to the responses array
    for (var i = 0; i < rangeArray.length; i++) {
      response = sheet.getRange(rangeArray[i]).getValue();
      responses.push(response);
    }

    //the responses array would look like this:
    // [email, firstResponse, secondResponse, thirdResponse, fourthResponse, fifthResponse, sixthResponse, seventhResponse, interviewerName]
    return responses;
  }

  function saveResponse(headless=False){
    var sheet = getSheetName();
    // we need to verify that we are running on an approved sheet:
    // If the sheet name contains the words Manual Reporting Entry we continue
    if (sheet.indexOf('Manual Reporting Entry') == -1){
      return;
    }
    // backup the responses
    backupResponses();
    // First we send a prompt to the user to confirm that they want to save the responses
    if(headless)
    {
      
    }
    else{
      if(showYesNoPrompt("Are you sure you want to save the responses?"))
      {
        //fetch range strings with mode entry
        var ranges = generateRangeStringArray('entry');
        // Then we save the responses
        showMessageOk("Saving Interview Responses");
        var cells = fetchEQInterviewAnswers(ranges, sheet);
        // Fetch the current timestamp in the format mm/dd/yyyy hh:mm:ss
        var formattedTimestamp = getCurrentDateTime();
        // Next we put the timestamp at the front of the array
        cells.unshift(formattedTimestamp);

        insertNewRow(FORM_RESPONSES_SHEET, cells);

        // Then we clear out the values we just saved
        ranges = generateRangeStringArray('clear');
        clearRanges(ranges, sheet);
      }
    }
  }

/**
* Inserts a new row into the specified sheet with the given array of cells.
*
* @param {string} sheetToSave - The name of the sheet to save the new row into.
* @param {Array} arrayOfCells - The array of cells to insert into the new row.
*/
  function insertNewRow(sheetToSave, arrayOfCells) {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(sheetToSave);
    
    var lastRow = sheet.getLastRow();
    var newRow = lastRow + 1;
    
    for (var i = 0; i < arrayOfCells.length; i++) {
      sheet.getRange(newRow, i + 1).setValue(arrayOfCells[i]);
    }
    
  }
  
  // A function that clears out the values for the ranges, provided as an array of strings
  function clearRanges(ranges, sheet) {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(sheet);
    for (var i = 0; i < ranges.length; i++) {
      sheet.getRange(ranges[i]).clearContent();
    }
  }
  function showMessageOk(msg) {
    Browser.msgBox(msg, Browser.Buttons.OK);
  }

  // A function that shows a message only for a short duration then goes away, takes a message and a duration
  function showMessage(msg, duration) {
    var ui = SpreadsheetApp.getUi();
    ui.alert(msg, duration);
  }
  
// A Function to get the current datetime stamp in the format mm/dd/yyyy hh:mm:ss
// it reads from the local time zone
function getCurrentDateTime(format="MM/dd/yyyy HH:mm:ss") {
// get the local timezone
  var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var currentTime = new Date();
  var currentDateTime = Utilities.formatDate(currentTime, timeZone, format);
  return currentDateTime;
}


  
  function checkIfCurrentDate(dateToCheck)
  {
    // Get the current date
    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    
    // Split the date string into day, month, and year
    var dateParts = dateToCheck.split("-");
    var specifiedDay = parseInt(dateParts[2]);
    var specifiedMonth = parseInt(dateParts[1]) - 1; // Month is zero-based in JavaScript
    var specifiedYear = parseInt(dateParts[0]);
    
    var isToday = false;
    if (currentDay === specifiedDay && currentMonth === specifiedMonth && currentYear === specifiedYear) {
      isToday = true;
    }
    
    return isToday;
  }
  function saveResponsesBot()
  {
    // clear the submit field
    return saveResponse()

  }
  function checkIfCurrentTime(timeToCheck)
  {
      // Get the current time
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    
    // Split the specified time into hours and minutes
    var timeParts = timeToCheck.split(":");
    var specifiedHours = parseInt(timeParts[0]);
    var specifiedMinutes = parseInt(timeParts[1]);
    
    // Compare the current time with the specified time
    if (currentHours > specifiedHours) {
      return true;
    } else if (currentHours === specifiedHours && currentMinutes >= specifiedMinutes) {
      return true;
    } else {
      return false;
    }
  }
function onEdit(e) {
  var editedCellA1 = e.range.getA1Notation();
  var editedCellValue = e.value;
  var editedSheetName = e.range.getSheet().getName();

  if (editedCellA1 === "H62" && editedCellValue === "SUBMIT" && editedSheetName === "Manual Reporting Entry (Bot)") {
    saveResponse();
    Logger.log("Cell H62 has been edited with the value 'SUBMIT' in the sheet 'Manual Reporting Entry (Bot)'.");
  }
}