<template>
    <div class="container">
      <h1>Sheets API</h1>
    </div>
  </template>
  
  <script setup>
  import { JWT } from 'google-auth-library';
  // import { JWT } from 'vue3-google-login';
  import { GoogleSpreadsheet } from "google-spreadsheet";
  // import LoadAPITest from '../LoadAPITest.vue';
  // next we create the service euthentication object
  import creds from '../assets/creds.json';
  const serviceAuth = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file'],
  });
  console.log(serviceAuth);
//   get the sheet with the id in the environment variable
  const sheetId = process.env.VUE_APP_SHEET_ID;
  const doc = await getSheet(sheetId, serviceAuth);

  displayDocInfo(doc);


  async function displayDocInfo(doc) {
    console.log(doc.title);
  }

  async function getSheet(sheetId, auth){
    const doc = new GoogleSpreadsheet(sheetId, auth);
    await doc.loadInfo(); // loads document properties and worksheets
    return doc
  }


  </script>