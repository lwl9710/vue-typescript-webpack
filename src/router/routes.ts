export default [
  {
    name: "Home",
    path: "/",
    component: () => import(/* webpackChunkName: "Home" */ "@/pages/Home.vue")
  },
  {
    name: "About",
    path: "/about",
    component: () => import(/* webpackChunkName: "About" */ "@/pages/About.vue")
  },
]