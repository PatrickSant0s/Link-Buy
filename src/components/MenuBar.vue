<template>
	<div class="container">
		<div class="menu-bar">
			<img
				src="https://static.vecteezy.com/ti/vetor-gratis/p1/5466542-m-logo-letra-icone-monograma-m-letra-design-com-linha-branca-monograma-e-visual-minimalista-moderno-criativo-vetor.jpg"
				width="220px"
				@click="goToHome"
				style="cursor: pointer"
				class="emblem"
			/>
			<!-- <div class="search-input">
				<input
					type="text"
					v-model="searchQuery"
					placeholder="O QUE DESEJA PROCURAR"
					@input="handleSearch"
					class="search-text-input"
				/>
				<span class="search-icon">
					<iconify-icon icon="fa-solid:search" />
				</span>
			</div> -->
			<div style="display: flex">
				<div v-if="!isLoggedIn">
					<nav class="account-nav">
						<div class="account-header">
							<span class="account">Acesse sua conta</span>
						</div>
						<div class="account-links link">
							<a href="" class="link" @click.prevent="goLogin">Entrar</a>
							/
							<a href="" class="link" @click.prevent="goRegister">Cadastrar</a>
						</div>
					</nav>
				</div>

				<div v-else class="icon-profile">
					<v-avatar color="black" size="70" class="mb-3 icon-profile">
						<img
							:src="avatarUrl"
							alt="User Profile"
							width="100%"
							height="100%"
							@click.prevent="goProfile"
							:style="{ cursor: 'pointer' }"
						/>
					</v-avatar>
					<nav class="account-nav">
						<div class="account-header">
							<span class="account">Bem-vindo, {{ user.username }}</span>
						</div>
						<div class="account-links link">
							<a href="" class="link" @click.prevent="handleLogout">Sair</a>
						</div>
					</nav>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { supabase } from "@/config/supabase";
import { userStore } from "@/store/userStore";
import { mapActions, mapState } from "pinia";

export default {
	name: "MenuPrincipal",
	components: {
		IconifyIcon: Icon,
	},
	data() {
		return {
			searchQuery: "",
			avatarUrl: "",
		};
	},
	async created() {
		const { data: user } = await supabase.auth.getUser();

		const savedUser = JSON.parse(localStorage.getItem("user"));

		this.avatarUrl = savedUser?.avatarUrl ?? user?.user_metadata?.avatar_url;
	},
	computed: {
		...mapState(userStore, ["user"]),
		isLoggedIn() {
			return Boolean(this.user.token);
		},
	},
	methods: {
		...mapActions(userStore, ["logout"]),
		handleSearch() {
			console.log("Pesquisando por:", this.searchQuery);
		},
		goToHome() {
			this.$router.push("/");
		},
		goRegister() {
			this.$router.push("/register");
		},
		goLogin() {
			this.$router.push("/login");
		},
		goProfile() {
			this.$router.push("/profile");
		},
		async handleLogout() {
			await supabase.auth.signOut();
			this.logout();
			this.$router.push("/login");
		},
	},
};
</script>

<style scoped>
.container {
	width: 100%;
}
.menu-bar {
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 20px;
	border-bottom: 1px solid #424242;
	width: 100vw;
	box-sizing: border-box;
}
.account {
	color: #ffd200;
	font-size: 0.875em;
	font-weight: 500;
}
.search-input {
	position: relative;
	display: flex;
	align-items: center;
}
.account-nav {
	display: flex;
	flex-direction: column;
	align-items: start;
	color: #ffd200;
}

.account-links {
	display: flex;
	gap: 5px;
	margin-top: 8px;
}
.link {
	font-size: 0.81rem;
	transition: ease-out 0.2s;
	line-height: 15px;
	color: #ffd200;
}

.search-text-input {
	flex: 1;
	width: 450px;
	height: 60px;
	border-radius: 10px;
	font-size: 14px;
	background-color: #424242;
	font-family: "Source Sans", sans-serif;
	padding-left: 25px;
}

.search-icon {
	position: absolute;
	left: 90%;
	top: 55%;
	transform: translateY(-50%);
	color: #ffd200;
	font-size: 25px;
	cursor: pointer;
}

.icon-log {
	position: absolute;
	top: 90px;
	right: 28%;
	color: #ffd200;
}

@media (max-width: 1020px) {
	.search-input {
		width: 30%;
	}

	.search-text-input {
		padding-left: 15px;
	}
	.search-icon {
		left: 80%;
	}
	.icon-log {
		right: 29%;
	}
}

@media (max-width: 920px) {
	.search-input {
		display: none;
	}
	.icon-log {
		right: 31%;
	}
}

@media (max-width: 520px) {
	.search-input {
		display: none;
	}
	.icon-log {
		right: 35%;
	}
}

@media (max-width: 375px) {
	.search-input {
		display: none;
	}
	.icon-log {
		right: 41%;
		top: 65px;
	}
	.emblem {
		width: 150px;
	}
}
</style>
