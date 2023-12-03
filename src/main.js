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
import vue3GoogleLogin from 'vue3-google-login';

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
    { Path: '/login', component: LoginPage },  
    { Path: '/reporting', alias:["/components/pages/MinisteringReporting"], component: MinisteringReporting },
    { Path: '/lookup', alias:["/components/pages/MinisteringLookup"], component: MinisteringLookup }],
});

const app = createApp(App)
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID
})
app.mount('#app');

//createApp(App).mount('#app')

import "bootstrap/dist/js/bootstrap.bundle.min.js"