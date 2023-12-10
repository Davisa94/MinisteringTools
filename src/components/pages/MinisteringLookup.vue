<template>
    <div class="container d-flex justify-content-center">
      <form @submit="submitForm">
        <div class="form-group">
          <label for="month">Month</label>
          <select id="month" v-model="month" class="form-control">
            <option :key="option" v-for="option in monthOptions" :value="option">{{ option }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="year">Year</label>
          <select id="year" v-model="year" class="form-control" v-on:blur="updateFilters">
            <option :key="option" v-for="option in yearOptions" :value="option">{{ option }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="reporter">Name of Reporter</label>
          <select id="reporter" v-model="reporter" class="form-control" v-on:blur="getResponses">
            <option :key="option" v-for="option in reporterOptions" :value="option">{{ option }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="responseSelection">Response Selection</label>
          <select id="responseSelection" v-model="responseSelection" class="form-control">
            <option :key="option" v-for="option in responseSelectionOptions" :value="option">{{ option }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="text" readonly :value="email" class="form-control" />
        </div>
        <div class="form-group">
          <label>Responses for {{ responseSelection }}</label>
        </div>
        <div v-for="(question, index) in questions" :key="index" class="form-group">
          <label>{{ question.label }}</label>
          <textarea readonly v-model="question.placeholder" class="form-control"></textarea>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import * as AIL from '../APIInteractionLayer.mjs';
  export default {
    data() {
      return {
        month: '',
        year: '',
        reporter: '',
        responseSelection: '',
        email: '',
        questions: [
          { label: 'Question 1', placeholder: 'Question #1' },
          { label: 'Question 2', placeholder: 'Question #2' },
          { label: 'Question 3', placeholder: 'Question #3' },
          { label: 'Question 4', placeholder: 'Question #4' },
          { label: 'Question 5', placeholder: 'Question #5' }
        ],
        monthOptions: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        yearOptions: [],
        reporterOptions: [],
        responseSelectionOptions: []
      };
    },
    methods: {
      submitForm() {
        // Perform form submission logic here
      },
      async updateFilters(){
        console.log("Updating filters");
        const doc = await AIL.getDoc();
        AIL.updateMonthYearFilter(doc, this.month, this.year);
        this.getNames();
      },
      async getNames(){
        const doc = await AIL.getDoc();
        this.reporterOptions = await AIL.getFilteredNames(doc);
        console.log(this.reporterOptions);
      },
      async getResponses(){
        const doc = await AIL.getDoc();
        const responses = await AIL.getResponses(doc);
        const responseRows = await AIL.getResponsesByMonthAndYear(responses, this.month - 1, this.year);
        console.log(responseRows);
        const email = await AIL.getEmailFromName(doc, this.reporter);
        this.email = email;
        console.log(email);
        const individualResponses = await AIL.getResponsesByEmailFromDate(responseRows, email);
        //get just the responses
        // this.responseSelectionOptions
        console.log(individualResponses);

        //populate responseSelectionOptions
        //loop through the individualResponses and get just the first index of each response
        // add that to responseSelectionOptions
        for (let i = 0; i < individualResponses.length; i++){
          this.responseSelectionOptions.push(i+1);
        }

      }
    },
    async mounted() {
      const doc = await AIL.getDoc();

      AIL.displayDocInfo(doc);

      // Fetch month options from API and populate monthOptions array
      this.monthOptions = await AIL.getMonthList(doc);
      this.yearOptions = await AIL.getYearList(doc);
      // Fetch year options from API and populate yearOptions array
      // Fetch reporter options from API and populate reporterOptions array
      // Fetch response selection options from API and populate responseSelectionOptions array
      // Fetch email data from API and populate email property
    }
  };
  </script>
  
  <style scoped>
  /* Add desired classes and styling here */
  </style>