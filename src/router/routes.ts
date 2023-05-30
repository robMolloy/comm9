import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/IndexPage.vue') },
      { path: 'chats/', component: () => import('src/pages/ChatsPage.vue') },
      {
        path: 'chats/:username',
        component: () => import('src/pages/ChatsPage.vue'),
      },
      {
        path: 'profiles/:username',
        component: () => import('src/pages/ProfilesPage.vue'),
      },
      {
        path: 'profiles/',
        component: () => import('src/pages/ProfilesPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
