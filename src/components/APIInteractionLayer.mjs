import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from "google-spreadsheet";

import creds from '../assets/creds.json';

const sheetId = process.env.VUE_APP_SHEET_ID;
// const responseSheetID = process.env.VUE_APP_RESPONSES_SHEET_ID;
const filteredSheetID = process.env.VUE_APP_FILTERED_RESPONSES;
const lookupSheetID = process.env.VUE_APP_LOOKUP_SHEET_ID;
const ListHelperSheetId = process.env.VUE_APP_DATA_HELPER_LISTS_ID;
const dateSheetId = process.env.VUE_APP_DATE_HELPER_ID;
const botSubmitField = process.env.VUE_APP_BOT_SUBMIT_FIELD;
const botSubmitSheetID = process.env.VUE_APP_BOT_SUBMIT_SHEET_ID;
const presidencyListRange = process.env.VUE_APP_PRES_LIST_RANGE;
const namesListRange = process.env.VUE_APP_NAME_LIST_RANGE;
const reportingInterviewerRange = process.env.VUE_APP_INTERVIEWER_RANGE;
const reportingReporterRange = process.env.VUE_APP_REPORTER_RANGE;
const reportingFirstResponseRange = process.env.VUE_APP_FIRST_RESPONSE_RANGE;
const reportingSecondResponseRange = process.env.VUE_APP_SECOND_RESPONSE_RANGE;
const reportingThirdResponseRange = process.env.VUE_APP_THIRD_RESPONSE_RANGE;
const reportingFourthResponseRange = process.env.VUE_APP_FOURTH_RESPONSE_RANGE;
const reportingFifthResponseRange = process.env.VUE_APP_FIFTH_RESPONSE_RANGE;
const reportingSixthResponseRange = process.env.VUE_APP_SIXTH_RESPONSE_RANGE;
const reportingResponses = [reportingFirstResponseRange, reportingSecondResponseRange, reportingThirdResponseRange, reportingFourthResponseRange, reportingFifthResponseRange, reportingSixthResponseRange];

const auth = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file'],
  });
  console.log(auth);

    export async function init(){
        this.auth = await authenticate()
        this.doc = await this.getSheet()
    }
    export async function getDoc(){
        console.log(auth)
        const doc = new GoogleSpreadsheet(sheetId, auth);
        await doc.loadInfo(); // loads document properties and worksheets
        return doc
    }
    export async function displayDocInfo(doc) {
        console.log(doc.title);
    }

    export async function getSheetById(doc, id){
        const sheet = doc.sheetsById[id];
        return sheet
    }

    export async function getSheetByIndex(doc, index){
        const sheet = doc.sheetsByIndex[index];
        return sheet
    }

    export async function getResponsesByEmail(responses, email){
        const temp = [];
        console.log(email);
        console.log(responses);
        for (let i = 0; i < responses.length; i++){
            if (responses[i]._rawData[1] === email){
                console.log(responses[i]._rawData[1]);
                temp.push(responses[i]._rawData)
            }
        }
        return temp
    }

    export async function getNamesFromResponses(responses){
        
    }

    export async function updateMonthYearFilter(doc, month, year){
        const sheet = doc.sheetsById[lookupSheetID];
        const monthCellA1 = "D7";
        const yearCellA1 = "F7";
        console.log(`${monthCellA1}:${yearCellA1}`);
        await sheet.loadCells(`${monthCellA1}:${yearCellA1}`);
        //verify we have the right cell:
        console.log(sheet.getCellByA1(monthCellA1).value);
        //set the value to month
        sheet.getCellByA1(monthCellA1).value = month;
        //set the value to year
        sheet.getCellByA1(yearCellA1).value = year;
        //update the sheet
        await sheet.saveUpdatedCells();
        console.log(sheet.getCellByA1(monthCellA1).value);


    }

    export async function getMonthList(doc){
        console.log("getting month list");
        const months = [];
        const sheet = doc.sheetsById[dateSheetId];
        const a1Notation = 'A2:A14';
        await sheet.loadCells(a1Notation);
        //loop through every row, and get the cell at that row for the a column:
        for (let i = 1; i <= sheet.rowCount; i++) {
            console.log(sheet.getCell(i, 0).value);
            if(sheet.getCell(i, 0).value == null){
                break
            }
            months.push(sheet.getCell(i, 0).value)
        }
        return months
    }

    export async function getYearList(doc){
        console.log("getting year list");
        const years = [];
        const sheet = doc.sheetsById[dateSheetId];
        const a1Notation = 'B2:B35';
        await sheet.loadCells(a1Notation);
        //loop through every row, and get the cell at that row for the a column:
        for (let i = 1; i <= sheet.rowCount; i++) {
            console.log(sheet.getCell(i, 1).value);
            if(sheet.getCell(i, 1).value == null){
                break
            }
            if (sheet.getCell(i, 1).value != 1899){
                years.push(sheet.getCell(i, 1).value)
            }
        }
        return years
    }

    export async function getFilteredNames(doc){
        console.log("getting filtered names");
        const names = [];
        const sheet = doc.sheetsById[ListHelperSheetId];
        const a1Notation = 'J1:J1000';
        await sheet.loadCells(a1Notation);
        //loop through every row, and get the cell at that row for the j column:
        for (let i = 1; i < sheet.rowCount; i++){
            console.log(sheet.getCell(i, 9).value);
            if(sheet.getCell(i, 9).value == null){
                break
            }
            //Ensure that value doesn't already exist in the list
            if(names.includes(sheet.getCell(i, 9).value)){
                continue
            }
            else
            {
                names.push(sheet.getCell(i, 9).value)
            }
        }
        
        return names
    }

    export async function processFilteredNames(sheet)
    {
        console.log(sheet.getCellByA1('J2').value);
        const range = sheet.getRange(a1Notation);
        console.log(range.getCells());
        const responses = doc.sheetsByIndex[0].getRows();
        console.log(responses);
    }

    export async function getResponsesByEmailFromDate(responses, email){
        const temp = [];
        console.log(email);
        console.log(responses);
        for (let i = 0; i < responses.length; i++){
            if (responses[i][1] === email){
                console.log(responses[i][1]);
                temp.push(responses[i])
            }
        }
        return temp
    }

    export async function getPresidencyList(doc){
        const presList = [];
        const numRows = 25;
        // first we get the data helper sheet:
        const sheet = await doc.sheetsById[ListHelperSheetId];
        // load the cells in the range presidency
        await sheet.loadCells(presidencyListRange);
        //for every cell in the column, if the value is not blank add it to the list
        for (let i = 1; i < numRows; i++) {
            const cell = sheet.getCell(i, 4);
            const value = cell.value;
            if (value !== null && value !== "") {
                presList.push(value);
            }
        }
        return presList

    }
    export async function getIntervieweeList(doc){
        const names = [];
        const numRows = 1000;
        // first we get the data helper sheet:
        const sheet = await doc.sheetsById[ListHelperSheetId];
        // load the cells in the range presidency
        await sheet.loadCells(namesListRange);
        //for every cell in the column, if the value is not blank add it to the list
        for (let i = 0; i < numRows; i++) {
            const cell = sheet.getCell(i, 2);
            const value = cell.value;
            if (value !== null && value !== "") {
                names.push(value);
            }
        }
        return names

    }

    export async function getEmailFromName(doc, name){
        const sheet = doc.sheetsById[lookupSheetID];
        const NameCellA1 = "E9";
        const EmailCellA1 = "E13";
        console.log(`${NameCellA1}:${EmailCellA1}`);
        await sheet.loadCells(`${NameCellA1}:${EmailCellA1}`);
        //verify we have the right cell:
        console.log(sheet.getCellByA1(NameCellA1).value);
        sheet.getCellByA1(NameCellA1).value = name;

        //update the sheet
        await sheet.saveUpdatedCells();
        const email = sheet.getCellByA1(EmailCellA1).value;
        console.log(sheet.getCellByA1(NameCellA1).value);
        return email;
    }

    export async function getFormQuestions(doc){
        const sheet = doc.sheetsById[filteredSheetID];
        const questionsStartA1 = "C1";
        const questionsEndA1 = "I1";
        const numColumns = 9;

        const questions = [];
        await sheet.loadCells(`${questionsStartA1}:${questionsEndA1}`);
        //loop through every row, and get the cell at that row for the j column:
        for (let i = 2; i < numColumns; i++){
            console.log(sheet.getCell(0, i).value);
            if(sheet.getCell(0, i).value == null){
                break
            }
            questions.push(sheet.getCell(0, i).value)
        }
        // get the first row of the sheet using  load cells:
        console.log("Fetching questions from " + `${questionsStartA1}:${questionsEndA1}`); 
        // const firstRow = sheet.getRows()[0];
        console.log(questions);
        return questions;
    }

    /* get all responses whose timestamp matches a given month and year
       we assume that the timestamp is in the format "MM-DD-YYYY HH:MM:SS", and is accesed as
       responses[i]._rawData[0]
    */
   export async function getResponsesByMonthAndYear(responses, month, year){
       const temp = [];
       for (let i = 0; i < responses.length; i++){
           //convert the first index of raw data to a timestamp
           const date = new Date(responses[i]._rawData[0]);
           console.log(date);
           console.log(date.getMonth());
           if (date.getMonth() === month && date.getFullYear() === year){
               temp.push(responses[i]._rawData)
               console.log(date);
               console.log(responses[i]._rawData);
           }
       }
       return temp
   }

    export async function getResponses(doc){
        const responseSheetID = filteredSheetID
        const sheet = getSheetById(doc, responseSheetID);
        const responses = doc.sheetsByIndex[0].getRows();
        console.log(responses);
        return responses
    }

    export async function submitResponses(doc){
        // Submits responses already entered into the sheet, this only submits, does not enter the responses
        //set botSubmitField to SUBMIT for the botSubmitSheet
        const botSheet = doc.sheetsById[botSubmitSheetID];//getSheetById(doc, botSubmitSheetID);
        console.log(botSubmitField);
        await botSheet.loadCells(`${botSubmitField}:${botSubmitField}`);
        botSheet.getCellByA1(botSubmitField).value = "SUBMIT";
        await botSheet.saveUpdatedCells();

    }

    export async function fillResponses(doc, responses, reporterName, interviewerName){
        const botSheet = doc.sheetsById[botSubmitSheetID];
        // load cells for column E6:E10 then columns C10:C80
        // load cells for column E6:E10
        await botSheet.loadCells('E6:E10');

        // load cells for columns C10:C80
        await botSheet.loadCells('C10:C80');

        //for each response, fill in the corresponding cell in the reportingResponses array of a1 notation cells
        for (let i = 0; i < responses.length; i++){
            console.log(reportingResponses[i]);
            const cell = botSheet.getCellByA1(reportingResponses[i]);
            cell.value = responses[i];
        }

        //set the interviewer and reporter names
        botSheet.getCellByA1(reportingInterviewerRange).value = interviewerName;
        botSheet.getCellByA1(reportingReporterRange).value = reporterName;
        await botSheet.saveUpdatedCells();
    }