
//http://localhost:8080/main#/main
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children:[
      { path: '/index', component: () => import('pages/Index.vue') },
      { path: '/main', component: () => import('pages/Main.vue') }
    ]
  },
  {
    path: '/app',
    component: () => import('layouts/PanelsLayout.vue'),
    children: [
      { path: '/app/main', component: () => import('pages/Main.vue') }
    ]
  }

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
