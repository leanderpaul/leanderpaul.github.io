/**
 * Importing npm packages
 */
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

/**
 * Importing user defined packages
 */
import App from './App.vue';

import './assets/main.css';

/**
 * Defining types
 */

/**
 * Declaring the constants
 */
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 1, left: 0, behavior: 'smooth' };
  },
  routes: [
    { path: '/', name: 'Home', component: () => import('./pages/home/home.page.vue') },
    { path: '/project-archive', name: 'ProjectArchive', component: () => import('./pages/project-archive/project-archive.page.vue') },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('./pages/page-not-found/page-not-found.page.vue') },
  ],
});

createApp(App).use(router).mount('#app');
