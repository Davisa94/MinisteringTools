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
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/MinisteringLookup">View Reports</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/MinisteringReporting">Add Reports</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/LoginPage">Sign In</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
    props: {
      pageTitle: {
        type: String,
        required: true
      }
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