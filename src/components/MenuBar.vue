<template>
	<div class="container">
		<div class="menu-bar">
			<img
				src="https://mir-s3-cdn-cf.behance.net/projects/404/db2257135246647.Y3JvcCwxMjc5LDEwMDAsMCwxMzk.png"
				alt="Emblema de FutVôlei"
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
					<div class="icon-log">
						<iconify-icon
							icon="mi:log-in"
							width="2.5em"
							height="2.5em"
						></iconify-icon>
					</div>
					<nav class="account-nav">
						<div class="account-header">
							<span class="account">Minha conta</span>
						</div>
						<div class="account-links link">
							<a href="" class="link" @click.prevent="goLogin">Entrar</a>
							/
							<a href="" class="link" @click.prevent="goRegister">Cadastrar</a>
						</div>
					</nav>
				</div>

				<div v-else class="icon-profile">
					<iconify-icon
						icon="mdi:account-circle"
						width="2.5em"
						height="2.5em"
					></iconify-icon>
					<!-- Aqui você pode adicionar um menu dropdown, se desejar -->
					<nav class="account-nav">
						<div class="account-header">
							<span class="account">Bem-vindo</span>
						</div>
						<div class="account-links link">
							<a href="" class="link" @click.prevent="logout">Sair</a>
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
import { useUserStore } from "@/store/userStore";

export default {
	name: "MenuPrincipal",
	data() {
		return {
			searchQuery: "",
			isLoggedIn: false,
			user: null,
		};
	},
	components: {
		IconifyIcon: Icon,
	},
	async mounted() {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (user) {
			this.isLoggedIn = true;
			this.user = user;
		}
	},
	methods: {
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
		async logout() {
			await supabase.auth.signOut();
			this.isLoggedIn = false;
			this.user = null;
			localStorage.removeItem("token");
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
	color: #d1d1d1;
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
	color: #bdbdbd;
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
