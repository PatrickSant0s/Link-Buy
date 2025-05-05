import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import PerfilProduct from "@/components/PerfilProduct.vue";
import { isUserLoggedIn } from "@/utils/authentication";
import ProductRegisterView from "@/views/ProductRegisterView.vue";
import ProfileView from "@/views/ProfileView.vue";
import CategoriesRegisterView from "@/views/CategoriesRegisterView.vue";

const routes = [
	{
		path: "/categories/:categoryId",
		name: "categoryView",
		component: () => import("@/views/CategoryView.vue"),
		meta: { requiresAuth: true },
	},
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
		path: "/registerProduct",
		name: "registerProduct",
		component: ProductRegisterView,
	},
	{
		path: "/registerCategories",
		name: "registerCategories",
		component: CategoriesRegisterView,
	},
	{
		path: "/profile",
		name: "profile",
		component: ProfileView,
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
