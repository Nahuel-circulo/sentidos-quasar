import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/mozo',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/mozo', component: () => import('pages/MozoPage.vue') }],
  },
  {
    path: '/maitre',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/maitre', component: () => import('pages/MaitrePage.vue') }],
  },
  {
    path: '/caja',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/caja', component: () => import('pages/CajaPage.vue') }],
  },
  {
    path: '/propietario',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/propietario', component: () => import('pages/PropietarioPage.vue') }],
  },
  {
    path: '/chef',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/chef', component: () => import('pages/ChefPage.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '/', component: () => import('pages/LoginPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
