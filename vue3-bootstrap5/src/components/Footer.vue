<template>
    <footer>
      <p>{{ message }}</p>
      <p>Contact: {{ contactInfo }}</p>
      <p>&copy; {{ currentYear }} Austin Benitez & Rebeca Garcia. All rights reserved.</p>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FixedFooter',
    data() {
      return {
        message: 'This project is not affiliated or endorsed by the Church of Jesus Christ of Latter-day Saints.',
        contactInfo: 'austin.i.davis94+MinisteringTools@gmail.com',
        currentYear: new Date().getFullYear()
      }
    }
  }
  </script>
  
  <style scoped>
  footer {
    background-color: #f5f5f5;
    padding: 20px;
  }
  </style>