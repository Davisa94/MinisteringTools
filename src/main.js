import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import MinisteringReporting from './components/pages/MinisteringReporting';
import MinisteringLookup from './components/pages/MinisteringLookup';
// import LoadAPITest from './components/LoadAPITest';
import SheetsTest from './components/pages/SheetsTest';
import vue3GoogleLogin from 'vue3-google-login';

// import gAuthPlugin from 'vue3-google-oauth2';
// import GAuth from 'vue-google-oauth2'


axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.interceptors.request.use(function (config) {
  config.headers['X-Binarybox-Api-Key'] = process.env.VUE_APP_API_KEY;
  return config;
});
  
  
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/login', component: LoginPage },  
    { path: '/reporting', alias:["/components/pages/MinisteringReporting"], component: MinisteringReporting },
    { path: '/lookup', alias:["/components/pages/MinisteringLookup"], component: MinisteringLookup },
    { path: '/APITest', alias:["/components/pages/SheetsTest"], component: SheetsTest },
    { path: '/sheetsTest', alias:["/components/pages/SheetsTest"], component: SheetsTest },],
});

const app = createApp(App)
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID
})
// app.use(gAuthPlugin, {
//   clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID
// })
// app.use(GAuth, {clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID})
app.mount('#app');

//createApp(App).mount('#app')

import "bootstrap/dist/js/bootstrap.bundle.min.js"