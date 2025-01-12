import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import ProjectCreate from './components/pages/ProjectCreate.vue';
import ProjectEdit from './components/pages/ProjectEdit.vue';
import ProjectShow from './components/pages/ProjectShow.vue';
import ProjectList from './components/pages/ProjectList.vue';
  
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.interceptors.request.use(function (config) {
  config.headers['X-Binarybox-Api-Key'] = process.env.VUE_APP_API_KEY;

  const token = localStorage.getItem('token'); // Get the token from local storage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Add the Bearer token correctly
  }
  
  return config;
});
  
  
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/dashboard', component: ProjectList },
    { path: '/create', component: ProjectCreate },
    { path: '/edit/:id', component: ProjectEdit },
    { path: '/show/:id', component: ProjectShow },
  ],
});
  
createApp(App).use(router).mount('#app');