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
			<div class="search-input">
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
			</div>
			<div style="display: flex">
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
						<a href="" class="link">Entrar</a>
						/
						<a href="" class="link">Cadastrar</a>
					</div>
				</nav>
			</div>
		</div>
	</div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
	name: "MenuPrincipal",
	data() {
		return {
			searchQuery: "",
		};
	},
	components: {
		IconifyIcon: Icon,
	},
	methods: {
		handleSearch() {
			console.log("Pesquisando por:", this.searchQuery);
		},
		goToHome() {
			this.$router.push("/");
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
	right: 17%;
	color: #ffd200;
}

@media (max-width: 1020px) {
	.search-input {
		width: 30%;
	}
	.icon-log {
		right: 19%;
	}
	.search-text-input {
		padding-left: 15px;
	}
	.search-icon {
		left: 80%;
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
	.emblem{
		width: 150px;
	}
}
</style>
