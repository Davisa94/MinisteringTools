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
          <select id="year" v-model="year" class="form-control" v-on:blur="updateFilters" v-on:change="updateFilters">
            <option :key="option" v-for="option in yearOptions" :value="option">{{ option }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="reporter">Name of Reporter</label>
          <select id="reporter" v-model="reporter" class="form-control" v-on:blur="getResponses" v-on:change="getResponses">
            <option :key="option" v-for="option in reporterOptions" :value="option">{{ option }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="responseSelection">Response Selection</label>
          <select id="responseSelection" v-model="responseSelection" class="form-control" v-on:blur="populateResponses" v-on:change="populateResponses">
            <option :key="option" v-for="option in responseSelectionOptions" :value="option">{{ option }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="text" readonly :value="email" class="form-control" />
        </div>
        <div class="form-group">
          <label>Responses for {{ chosenResponseDateStamp }}</label>
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
        doc:{},
        month: '',
        year: '',
        reporter: '',
        responseSelection: '',
        chosenResponseDateStamp: 'Unselected',
        responsesSet:[],
        email: '',
        questions: [
          { label: 'Question 1', placeholder: 'Response #1' },
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
      async populateResponses() {
        console.log("responseSelection:" + this.responseSelection);
        if(this.responseSelection === '' || this.responseSelection === 0){
          return
        }
        //set the responses for label:
        this.chosenResponseDateStamp = this.responsesSet[this.responseSelection - 1][0];
        console.log("Populating responses");
        // just like populateQuestions but we are filling in the placeholder, and we skip the first two indices of responses
        const responses = this.responsesSet[this.responseSelection - 1];
        for (let i = 0; i < this.questions.length; i++) {
          this.questions[i].placeholder = responses[i+2];
        }
      },

      async populateQuestions() {
        console.log("Populating questions");
        console.log(this.doc);
        const quests = await AIL.getFormQuestions(this.doc);
        // for each quest. in quests set the label of this.questions at the index of quest 
        if (quests.length > this.questions.length) {
          for (let i = this.questions.length; i < quests.length; i++) {
          this.questions.push({ label: '', placeholder: '' });
        }
        }
        for (let i = 0; i < quests.length; i++) {
          this.questions[i].label = quests[i];
        }
      },
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
        console.log("Individual Responses",individualResponses);
        this.responsesSet = individualResponses;

        //populate responseSelectionOptions
        //loop through the individualResponses and get just the first index of each response
        // add that to responseSelectionOptions
        // clear response optiopns before populating them:
        this.responseSelectionOptions = [];
        for (let i = 0; i < individualResponses.length; i++){
          this.responseSelectionOptions.push(i+1);
        }

      }
    },
    async mounted() {
      this.doc = await AIL.getDoc();
      console.log("Fetching doc for first time for Lookup")
      // this.doc = doc;
            // DEBUG
      // Test submitting
      // AIL.submitResponses(doc);
      // DEBUG END

      // AIL.displayDocInfo(this.doc);
      this.populateQuestions();



      // Fetch month options from API and populate monthOptions array
      this.monthOptions = await AIL.getMonthList(this.doc);
      this.yearOptions = await AIL.getYearList(this.doc);
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