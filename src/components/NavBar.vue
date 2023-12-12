<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">{{ pageTitle }}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/lookup">View Reports</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/reporting">Add Reports</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Sign In</router-link>
          </li>
            <LogOut></LogOut>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import LogOut from './LogOut.vue';
  export default {
    name: 'NavBar',
    props: {
      pageTitle: {
        type: String,
        required: true
      }
    },
    components: {
      LogOut
    }
  }
  </script>
  
  <style scoped> 
  .bg-light {
      background-color: #0A1128;
      color: #FEFCFB;
      font-weight: bold;
      padding: 20px;
    }
  a{
      color: #FEFCFB;
      font-weight: bold;
  }
  </style>