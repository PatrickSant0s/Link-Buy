<template>
	<v-card class="card-profile" max-width="800" height="380px">
		<div class="content-card">
			<v-avatar color="black" size="70" class="mb-3 icon-profile">
				<img :src="avatarUrl" alt="User Profile" width="100%" height="100%" />
			</v-avatar>

			<span class="username">{{ user.username }}</span>
			<span class="email">{{ user.email }}</span>
			<input type="file" class="input-file" @change="uploadImage" />
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

			<v-form ref="form" validate-on="input">
				<v-text-field
					name="username"
					label="Username"
					variant="filled"
					:rules="usernameRules"
				></v-text-field>
				<v-text-field
					name="password"
					v-model="password"
					:type="showPassword ? 'text' : 'password'"
					color="primary"
					label="Senha"
					placeholder="Enter your password"
					variant="filled"
					:append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
					:rules="passwordRules"
					@click:append="toggleShowPassword"
				></v-text-field>
			</v-form>

			<v-divider></v-divider>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="success" @click="dialog = false">
					<span style="color: #ffd200">Cancelar </span>
				</v-btn>
				<v-btn color="success" @click="updatePassword">
					<span style="color: #ffd200">Confirmar </span>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { userStore } from "@/store/userStore";
import { mapState } from "pinia";
import { uuid } from "vue-uuid";
import { supabase } from "@/config/supabase";

export default {
	data() {
		return {
			dialog: false,
			first: "",
			email: "",
			password: "",
			avatarUrl: "", // Inicializa o avatarUrl
			showPassword: false,
			usernameRules: [
				(v) =>
					(v && v.length >= 3) || "O username deve contar 3 ou mais caracteres",
			],
			emailRules: [(v) => this.validateEmail(v) || "E-mail deve ser válido"],
			passwordRules: [
				(v) => v.length >= 6 || "A senha deve ter pelo menos 6 caracteres",
				(v) =>
					this.validatePassword(v) ||
					"A senha deve conter um caractere especial",
			],
		};
	},
	async created() {
		const { data: user } = await supabase.auth.getUser();

		// Tenta carregar a URL do avatar do localStorage
		const savedUser = JSON.parse(localStorage.getItem("user"));
		if (savedUser && savedUser.avatarUrl) {
			this.avatarUrl = savedUser.avatarUrl; // Carrega do localStorage
		} else if (user && user.user_metadata) {
			this.avatarUrl = user.user_metadata.avatar_url; // Carrega do Supabase
		}
		console.log("Avatar URL:", this.avatarUrl);
	},
	computed: {
		...mapState(userStore, ["user"]),
	},
	methods: {
		goToHome() {
			this.$router.push("/");
		},
		validateEmail(email) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(email);
		},
		validatePassword(password) {
			const passwordRegex = /[!@#$%^&*(),.?":{}|<>]/;

			return passwordRegex.test(password);
		},
		async uploadImage(event) {
			const avatarFile = event.target.files[0];
			const newID = uuid.v4();
			const filePath = `public/${newID}.png`;

			const { data, error } = await supabase.storage
				.from("user-profile-image")
				.upload(filePath, avatarFile);

			if (error) {
				console.error("Erro ao fazer upload da imagem:", error);
				return;
			}

			console.log("Imagem enviada com sucesso:", data);

			const { data: avatar_url } = supabase.storage
				.from("user-profile-image")
				.getPublicUrl(filePath, {});
			await this.updateImage(avatar_url.publicUrl);
			console.log(avatar_url);
		},
		async updateImage(imageURL) {
			// Atualiza a imagem do usuário no Supabase
			const { error } = await supabase.auth.updateUser({
				data: {
					avatar_url: imageURL,
				},
			});
			if (error) {
				console.error("Erro ao atualizar o usuário:", error);
				return;
			}

			console.log("Imagem do perfil atualizada com sucesso");

			// Atualiza o avatar no Pinia store
			this.avatarUrl = imageURL;

			// Atualiza o usuário salvo no localStorage
			const savedUser = JSON.parse(localStorage.getItem("user"));
			if (savedUser) {
				savedUser.avatarUrl = imageURL;
				localStorage.setItem("user", JSON.stringify(savedUser));
			}
		},
	},
};
</script>

<style scoped>
.card-profile {
	background-color: white;
	top: 100px;
	margin: auto;
	width: 100vh;
}

.content-card {
}
.icon-profile {
	position: absolute;
	top: 24%;
	left: 45%;
}

.username {
	font-size: 12px;
	position: absolute;
	top: 40%;
	left: 46%;
	font-weight: 900;
	margin-top: 12px;
}
.email {
	font-size: 12px;
	position: absolute;
	top: 45%;
	left: 37%;
	font-weight: 600;
	margin-top: 12px;
}

.button {
	position: absolute;
	top: 80%;
	left: 40%;
}

.title-edit {
	color: #ffd200;
}
.input-file {
	font-size: 12px;
	position: absolute;
	top: 30%;
	left: 55%;
	font-weight: 400;
	margin-top: 12px;
	width:110px;
}
</style>
