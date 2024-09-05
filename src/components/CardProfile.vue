<template>
	<v-card class="mx-auto card-profile mt-10" max-width="800" height="380px">
		<v-img
			height="150px"
			whidth="200px"
			src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
			cover
		></v-img>
		<div class="d-flex flex-column">
			<v-avatar color="black" size="70" class="mb-3 icon-profile">
				<img src="" alt="" />
			</v-avatar>
			<span class="username">{{ user.username }}</span>
			<span class="email">{{ user.email }}</span>
		</div>
		<v-card-actions class="button">
			<v-btn variant="tonal" @click="dialog = true">Editar</v-btn>
			<v-btn variant="tonal" @click="goToHome">Voltar</v-btn>
		</v-card-actions>
	</v-card>

	<!-- Atualizar Cadastro como Popup -->
	<v-dialog v-model="dialog" max-width="400px" persistent>
		<v-card>
			<v-card-title class="text-center">
				<span class="title-edit">Atualizar Cadastro</span>
			</v-card-title>

			<v-container>
				<v-text-field
					v-model="first"
					label="First name"
					variant="underlined"
				></v-text-field>

				<v-text-field
					v-model="email"
					label="Email"
					variant="underlined"
				></v-text-field>

				<v-text-field
					v-model="password"
					label="Password"
					placeholder="Enter your password"
					variant="underlined"
				></v-text-field>
			</v-container>

			<v-divider></v-divider>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="success" @click="dialog = false">
					<span style="color: #ffd200">Cancelar </span>
				</v-btn>
				<v-btn color="success" @click="dialog = false">
					<span style="color: #ffd200"
						>Confirmar
						<v-icon icon="mdi-chevron-right" end></v-icon>
					</span>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { userStore } from "@/store/userStore";
import { mapState } from "pinia";

export default {
	data() {
		return {
			dialog: false,
			first: "",
			email: "",
			password: "",
		};
	},
	computed: {
		...mapState(userStore, ["user"]),
	},
	methods: {
		goToHome() {
			this.$router.push("/");
		},
	},
};
</script>

<style scoped>
.card-profile {
	background-color: white;
}
.icon-profile {
	position: absolute;
	top: 24%;
	left: 6%;
}

.username {
	font-size: 12px;
	position: absolute;
	top: 40%;
	left: 60px;
	font-weight: 900;
	margin-top: 12px;
}
.email {
	font-size: 12px;
	position: absolute;
	top: 45%;
	left: 5px;
	font-weight: 600;
	margin-top: 12px;
}

.button {
	position: absolute;
	top: 80%;
}

.title-edit {
	color: #ffd200;
}
</style>
