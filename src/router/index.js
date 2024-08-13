import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PerfilProduct from "@/components/PerfilProduct.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import AboutView from "@/views/AboutView.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/produto",
		name: "produto",
		component: AboutView,
	},
	{
		path: "/register",
		name: "register",
		component: RegisterView,
	},
	{
		path: "/login",
		name: "login",
		component: LoginView,
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
