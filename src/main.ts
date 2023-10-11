/**
 * Importing npm packages
 */
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

/**
 * Importing user defined packages
 */
import App from './App.vue';
import Home from './pages/home/home.page.vue';
import PageNotFound from './pages/page-not-found/page-not-found.page.vue';

import './assets/main.css';

/**
 * Defining types
 */

/**
 * Declaring the constants
 */
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: PageNotFound },
  ],
});

createApp(App).use(router).mount('#app');
