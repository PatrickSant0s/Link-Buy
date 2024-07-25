import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PerfilProduct from "@/components/PerfilProduct.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/produto",
		name: "produto",
		component: () =>
			import( "../views/AboutView.vue"),
	},
	{
		path: "/register",
		name: "register",
		component: () => import("@/views/RegisterView.vue"),
	},
	{
		path: "/Produto/:id",
		name: "PerfilProduct",
		component: PerfilProduct,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
