<template>
    <header class="fixed-header">
      <h1>{{ title }}</h1>
      <NavBar />
    </header>
  </template>
  
  <script>
  import NavBar from './NavBar.vue';
  
  export default {
    name: 'FixedHeader',
    components: {
      NavBar
    },
    props: {
      title: {
        type: String,
        required: true
      }
    }
  }
  </script>
