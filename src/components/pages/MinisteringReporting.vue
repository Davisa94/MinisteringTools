<template>
    <div class="container d-flex justify-content-center">
      <form @submit="submitForm">
        <div class="form-group">
          <label for="interviewer">Name of interviewer</label>
          <select id="interviewer" v-model="interviewer" class="form-control">
            <option :key="option" v-for="option in interviewerOptions" :value="option">{{ option }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="reporter">Name of Reporter</label>
          <select id="reporter" v-model="reporter" class="form-control">
            <option :key="option" v-for="option in reporterOptions" :value="option">{{ option }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="reporter">Additional Reporter</label>
          <select id="reporter" v-model="Additionalreporter" class="form-control">
            <option :key="option" v-for="option in reporterOptions" :value="option">{{ option }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="reporter">Additional Reporter</label>
          <select id="reporter" v-model="Additionalreporter2" class="form-control">
            <option :key="option" v-for="option in reporterOptions" :value="option">{{ option }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Timestamp</label>
          <input type="text" readonly :value="timestamp" class="form-control" />
        </div>
        <div v-for="(question, index) in questions" :key="index" class="form-group">
          <label>{{ question.label }}</label>
          <textarea v-model="question.answer" class="form-control"></textarea>
        </div>
        <button type="submit" class="btn btn-primary mt-3 w-100 p-2">Save Responses</button>
      </form>
    </div>
  </template>
  
  <script>
    import * as AIL from '../APIInteractionLayer.mjs';
  export default {
  data() {
    return {
      doc: {},
      interviewer: '',
      reporter: '',
      Additionalreporter: '',
      Additionalreporter2: '',
      additionalReporters: [],
      timestamp: new Date().toLocaleString().slice(0, 17),
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
    addAdditionalReporter() {
      if (this.reporter) {
        this.additionalReporters.push('');
      }
    },
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
      formattedResponses.push(this.interviewer);
      return formattedResponses;
    },
    async populateQuestions() {
        console.log("Populating questions");
        console.log(this.doc);
        const quests = await AIL.getFormQuestions(this.doc);
        // for each quest. in quests set the label of this.questions at the index of quest 
        if (quests.length > this.questions.length) {
          for (let i = this.questions.length; i < quests.length - 1; i++) {
          this.questions.push({ label: '', placeholder: '' });
        }
        }
        for (let i = 0; i < quests.length - 1; i++) {
          this.questions[i].label = quests[i];
        }
      },
      async submitAllResponses() {
        //format the responses
        const formattedResponses = await this.formatResponses();
        console.log(formattedResponses);
        //for each additional reporter call submitResponse with that additional reporter
        for (let i = 0; i < this.additionalReporters.length; i++) {
          
        }
      },
    async submitResponse(responses, reporterName, interviewerName) {
      //Submit a single response
      const response = await AIL.fillResponses(this.doc, responses, reporterName, interviewerName);
      console.log(response);
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