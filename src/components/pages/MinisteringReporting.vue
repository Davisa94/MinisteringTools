<template>
    <div class="container d-flex justify-content-center">
      <form @submit="submitForm">
        <div class="form-group">
          <label for="interviewer">Name of interviewer</label>
          <select id="interviewer" v-model="interviewer" class="form-control" required>
            <option :key="option" v-for="option in interviewerOptions" :value="option">{{ option }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="reporters">Select all Reporters</label>
          <v-select id="reporters" :items="reporterOptions" v-model="reporters" multiple></v-select>
        </div>
        <div class="form-group">
          <label>Timestamp</label>
          <input type="text" readonly :value="timestamp" class="form-control" />
        </div>
        <div v-for="(question, index) in questions" :key="index" class="form-group">
          <label>{{ question.label }}</label>
          <textarea v-model="question.answer" class="form-control"></textarea>
        </div>
        <button type="button" class="btn btn-primary mt-3 w-100 p-2" :disabled="submitting" v-on:click="submitAllResponses">{{ submitBtnText }}</button>
      </form>
      <v-overlay
      :model-value="submitting"
      :close-on-content-click="false"
      :close-on-backdrop-click="false"
      :close-on-back="false"
      :persistent="true"
      class="align-center justify-center">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

    </div>
  </template>
  
  <script>
    import * as AIL from '../APIInteractionLayer.mjs';
  export default {
  data() {
    return {
      doc: {},
      interviewer: '',
      fullPage: true,
      reporters: [],
      timestamp: new Date().toLocaleString().slice(0, 17),
      submitting: false,
      submitBtnText: 'Submit Responses',
      questions: [
        { label: 'Question 1', answer: '' },
        { label: 'Question 2', answer: '' },
        { label: 'Question 3', answer: '' },
        { label: 'Question 4', answer: '' },
        { label: 'Question 5', answer: '' }
      ],
      interviewerOptions: [],
      reporterOptions: []
    };
  },
  methods: {
    submitForm() {
      // Perform form submission logic here
    },
    async getInterviewerList() {
      const response = await AIL.getPresidencyList(this.doc);
      console.log(response);
      this.interviewerOptions = response;
    },
    async getReporterList() {
      const response = await AIL.getIntervieweeList(this.doc);
      console.log(response);
      this.reporterOptions = response;
    },
    async formatResponses() {
      const formattedResponses = [];
      // Format the responses into the array in the proper order
      // for each question in questions array we put the answer into the formatted responses array
      for (let i = 0; i < this.questions.length; i++) {
        formattedResponses.push(this.questions[i].answer);
      }
      // add the interviewer to the array
      return formattedResponses;
    },
    async populateQuestions() {
        console.log("Populating questions");
        console.log(this.doc);
        const quests = await AIL.getFormQuestions(this.doc);
        // for each quest. in quests set the label of this.questions at the index of quest 
        if (quests.length > this.questions.length) {
          for (let i = this.questions.length; i < quests.length - 1; i++) {
          this.questions.push({ label: '', answer: '' });
        }
        }
        for (let i = 0; i < quests.length - 1; i++) {
          this.questions[i].label = quests[i];
        }
      },
      async submitAllResponses() {
        //format the responses
        console.log("submitting all responses");
        const formattedResponses = await this.formatResponses();
        console.log(formattedResponses);
        this.displaySubmitting();
        //for each additional reporter call submitResponse with that additional reporter
        for (let i = 0; i < this.reporters.length; i++) {
          console.log("calling submitResponse with " + this.reporters[i]);
          await this.submitResponse(formattedResponses, this.reporters[i], this.interviewer);
          await AIL.submitResponses(this.doc);
          await this.wait(30);
        }
        this.displayDone();
        this.$router.go(0);
      },
    async submitResponse(responses, reporterName, interviewerName) {
      //Submit a single response
      const response = await AIL.fillResponses(this.doc, responses, reporterName, interviewerName);
      console.log(response);
    },
      async wait(seconds) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, seconds * 1000);
      });
    },
    displaySubmitting(){
      // disable the submit button
      this.submitting = true;
      this.submitBtnText = 'Submitting Responses...';
      // show a spinner

      // Say this can take up to two minutes, don't close the browser

    },
    displayDone(){
      // enable the submit button
      this.submitting = false;
      this.submitBtnText = 'Submit Responses';
    }
  },
  async mounted() {
    // Fetch interviewer options from API and populate interviewerOptions array
    // Fetch reporter options from API and populate reporterOptions array
    // Set timestamp value to current time and date
    this.doc = await AIL.getDoc();
    this.populateQuestions();
    this.getInterviewerList();
    this.getReporterList();
  }
};
  </script>
  <style>
  </style>