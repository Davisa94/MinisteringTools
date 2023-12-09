import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from "google-spreadsheet";

import creds from '../assets/creds.json';

const sheetId = process.env.VUE_APP_SHEET_ID;
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

