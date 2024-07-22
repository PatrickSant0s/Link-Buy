import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PerfilProduct from '@/components/PerfilProduct.vue';

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/produto",
		name: "produto",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
	},
	  {
    path: '/Produto/:id',
    name: 'PerfilProduct',
    component: PerfilProduct,
  },
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
