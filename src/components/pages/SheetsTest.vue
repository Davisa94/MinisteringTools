<template>
    <div>
      <h1>Testing Sheets API</h1>
      </div>
  </template>
  
  <script setup>
  import * as AIL from '../APIInteractionLayer.mjs';
  
  const doc = await AIL.getDoc();

  AIL.displayDocInfo(doc);

  // get the first sheet and then display its name
  const sheet = await AIL.getSheetByIndex(doc, 0);
  console.log(sheet.title);
  console.log("Sheet ID: " + sheet.sheetId);
  

  
  </script>