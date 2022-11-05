import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
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
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '/login', component: () => import('pages/LoginPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
