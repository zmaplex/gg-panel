const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('pages/SinglePage/LoginPage.vue')
  },

  {
    path: '/d',
    component: () => import('layouts/DebugLayout.vue'),
    children: [{path: '', component: () => import('pages/DemoPage.vue')}]
  },

  {
    path: '/Main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', name: 'MainIndex', component: () => import('pages/IndexPage.vue')},
      {
        path: "website", name: 'website', component: () => import('pages/WebsitePage/WebsiteIndex.vue')
      },
      {
        path: "overview", name: 'overview', component: () => import('pages/OverviewPage/OverviewIndex.vue')
      },
      {
        path: "database", name: 'database', component: () => import('pages/DatabasePage/DatabaseIndex.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
