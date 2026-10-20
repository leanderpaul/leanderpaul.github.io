import { createApp, nextTick } from 'vue';
import { createRouter, createWebHistory, type RouteLocationNormalized, type RouteLocationRaw } from 'vue-router';

import App from './App.vue';
import { FEATURED_SLUGS, findRouteMeta } from '@app/content';
import { startViewTransition } from '@app/utils';

import './styles/index.css';

const NOT_FOUND_TITLE = 'Page not found — Leander Paul';

const HASH_SCROLL_OFFSET = 80;

const CASE_STUDY_PATH = `/work/:slug(${FEATURED_SLUGS.join('|')})`;

function stripTrailingSlash(to: RouteLocationNormalized): RouteLocationRaw | true {
  if (to.path === '/' || !to.path.endsWith('/')) return true;
  return { path: to.path.replace(/\/+$/, '') || '/', query: to.query, hash: to.hash, replace: true };
}

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) return savedPosition;
    if (to.hash && document.getElementById(to.hash.slice(1))) return { el: to.hash, top: HASH_SCROLL_OFFSET };
    return { top: 0 };
  },
  routes: [
    { path: '/', name: 'Home', component: () => import('./pages/home/home.page.vue') },
    { path: '/project-archive', name: 'ProjectArchive', component: () => import('./pages/project-archive/project-archive.page.vue') },
    { path: CASE_STUDY_PATH, name: 'CaseStudy', props: true, component: () => import('./pages/case-study/case-study.page.vue') },
    { path: '/resume', name: 'Resume', component: () => import('./pages/resume/resume.page.vue') },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('./pages/page-not-found/page-not-found.page.vue') },
  ],
});

let finishRouteTransition: (() => void) | undefined;

function transitionBetweenPages(to: RouteLocationNormalized, from: RouteLocationNormalized): Promise<void> | undefined {
  if (from.matched.length === 0 || to.path === from.path) return undefined;
  return new Promise(resolve => {
    const transition = startViewTransition(
      () =>
        new Promise<void>(done => {
          finishRouteTransition = done;
          resolve();
        }),
    );
    if (!transition) resolve();
  });
}

router.beforeEach(stripTrailingSlash);

router.beforeResolve(transitionBetweenPages);

router.afterEach((to, _from, failure) => {
  if (failure) return;
  document.title = findRouteMeta(to.path)?.title ?? NOT_FOUND_TITLE;
});

router.afterEach(async () => {
  await nextTick();
  finishRouteTransition?.();
  finishRouteTransition = undefined;
});

createApp(App).use(router).mount('#app');
