import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import PerfilProduct from "@/components/PerfilProduct.vue";
import { isUserLoggedIn } from "@/utils/authentication"; 

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
		meta: { requiresAuth: true }, 
	},
	{
		path: "/login",
		name: "login",
		component: LoginView,
	},
	{
		path: "/register",
		name: "register",
		component: RegisterView,
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

router.beforeEach(async (to, from, next) => {
	const requiresAuth = to.meta.requiresAuth;
	const isAuthenticated = localStorage.getItem("token");

	if (requiresAuth) {
		if (!isAuthenticated) {
			next({ name: "login" }); 
		} else {
			try {
				const loggedIn = await isUserLoggedIn(); 
				if (loggedIn) {
					next(); 
				} else {
					next({ name: "login" }); 
				}
			} catch (error) {
				console.error("Erro ao verificar autenticação:", error);
				next({ name: "login" }); 
			}
		}
	} else {
		next(); 
	}
});

export default router;
