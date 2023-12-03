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
  export default {
  data() {
    return {
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
      interviewerOptions: ["Steve", "John", "Michael"],
      reporterOptions: ["George", "Harry", "Moe"]
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
    }
  },
  mounted() {
    this.interviewerOptions = ["George", "Harry", "Moe"];
    // Fetch interviewer options from API and populate interviewerOptions array
    // Fetch reporter options from API and populate reporterOptions array
    // Set timestamp value to current time and date
  }
};
  </script>