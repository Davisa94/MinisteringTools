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
  const email = "aisom960@gmail.com";
  const responseRows = await AIL.getResponses(doc);
  console.log(responseRows);
  console.log("Getting row by email:" + email);
  const individualResponse = await AIL.getResponsesByEmail(responseRows, email);
  console.log("Individual Response: ");
  console.log(individualResponse[0]);
  const month = 9;
  const year = 2023;
  const responses = await AIL.getResponsesByMonthAndYear(responseRows, month, year);
  console.log(responses);

  const JohnEmail = "lyles.john6@gmail.com";
  // const BenEmail = "gfbenitez@hotmail.com";
  const JohnResponses = await AIL.getResponsesByEmailFromDate(responses, JohnEmail);
  console.log(JohnResponses);

  const filteredNamesRaw = await AIL.getFilteredNames(doc);
  console.log(filteredNamesRaw);
  // AIL.processFilteredNames(filteredNamesRaw);
  AIL.updateMonthYearFilter(doc, month + 1, year);
  
  </script>