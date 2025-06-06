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
					v-model="user.username"
					:rules="usernameRules"
				></v-text-field>
				<v-text-field
					name="password"
					v-model="password"
					:type="showPassword ? 'text' : 'password'"
					color="primary"
					label="Senha"
					placeholder="Digite sua senha"
					variant="filled"
					:append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
					:rules="passwordRules"
					@click:append="toggleShowPassword"
				></v-text-field>
			</v-form>

			<v-divider></v-divider>

			<v-card-actions>
				<v-btn color="success" @click="updateUserInfo">
					<span style="color: #ffd200">Confirmar </span>
				</v-btn>
				<v-btn color="success" @click="dialog = false">
					<span style="color: #ffd200">Cancelar</span>
				</v-btn>
			</v-card-actions>
		</v-card>

		<!-- Sucesso -->
		<div class="text-center pa-4">
			<v-dialog v-model="sucessDialog" width="auto">
				<v-card max-width="400" class="success-card">
					<v-card-title class="text-white justify-center"
						>Concluído</v-card-title
					>
					<v-card-text class="text-white">
						Cadastro atualizado com sucesso
					</v-card-text>
					<template v-slot:actions>
						<v-btn
							class="ms-auto"
							color="white"
							text="Ok"
							@click="sucessDialog = false"
						></v-btn>
					</template>
				</v-card>
			</v-dialog>
		</div>
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
			sucessDialog: false,
			password: "",
			avatarUrl: "",
			showPassword: false,
			usernameRules: [
				(v) =>
					(v && v.length >= 3) || "O username deve conter 3 ou mais caracteres",
			],
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
		const savedUser = JSON.parse(localStorage.getItem("user"));
		this.avatarUrl = savedUser?.avatarUrl ?? user?.user_metadata?.avatar_url;
	},
	computed: {
		...mapState(userStore, ["user"]),
	},
	methods: {
		goToHome() {
			this.$router.push("/");
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

			const { data: avatar_url } = supabase.storage
				.from("user-profile-image")
				.getPublicUrl(filePath, {});
			await this.updateImage(avatar_url.publicUrl);
		},
		async updateImage(imageURL) {
			const { error } = await supabase.auth.updateUser({
				data: {
					avatar_url: imageURL,
				},
			});
			if (error) {
				console.error("Erro ao atualizar o avatar:", error);
				return;
			}

			this.avatarUrl = imageURL;

			const savedUser = JSON.parse(localStorage.getItem("user"));
			if (savedUser) {
				savedUser.avatarUrl = imageURL;
				localStorage.setItem("user", JSON.stringify(savedUser));
			}
		},
		async updateUserInfo() {
			if (!this.password || !this.user.username) {
				alert("Preencha todos os campos.");
				return;
			}

			try {
				const { error } = await supabase.auth.updateUser({
					password: this.password,
					data: {
						username: this.user.username,
					},
				});

				if (error) {
					console.error("Erro ao atualizar o usuário:", error);
					alert("Erro ao atualizar as informações do usuário");
					return;
				}

				// Atualiza o localStorage com os dados do usuário
				localStorage.setItem("user", JSON.stringify(this.user));

				// Fechar o modal de atualização
				this.dialog = false;

				// Exibir o modal de sucesso
				this.sucessDialog = true;
			} catch (error) {
				console.error("Erro inesperado:", error);
			}
		},
		toggleShowPassword() {
			this.showPassword = !this.showPassword;
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
	width: 110px;
}

::v-deep .v-text-field .v-label {
	color: #ffd200 !important;
}

.success-card {
	text-align: center;
}
</style>
