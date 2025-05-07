<template>
	<div>
		<div>
			<MenuBar />
		</div>

		<div class="registro success-alert" v-if="isSuccess">
			{{ successMessage }}
		</div>

		<v-card
			class="mx-auto mt-10 mb-10 custom-scope"
			max-width="400"
			title="Cadastro"
		>
			<v-form ref="form" validate-on="input">
				<v-text-field
					v-model="username"
					name="username"
					label="Username"
					variant="filled"
					:rules="usernameRules"
				></v-text-field>

				<v-text-field
					v-model="email"
					name="email"
					color="primary"
					label="Email"
					variant="filled"
					:rules="emailRules"
				></v-text-field>

				<v-text-field
					v-model="password"
					name="password"
					:type="showPassword ? 'text' : 'password'"
					color="primary"
					label="Senha"
					placeholder="Enter your password"
					variant="filled"
					:append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
					:rules="passwordRules"
					@click:append="toggleShowPassword"
				></v-text-field>

				<v-text-field
					v-model="confirmPassword"
					name="confirmPassword"
					:type="showConfirmPassword ? 'text' : 'password'"
					color="primary"
					label="Confirmar Senha"
					placeholder="Enter your password"
					variant="filled"
					:append-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
					:rules="confirmPasswordRules"
					@click:append="toggleShowConfirmPassword"
				></v-text-field>
			</v-form>

			<v-divider></v-divider>

			<v-card-actions>
				<button class="custom-button" @click="registerUser">Registrar</button>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
import Footer from "./Footer.vue";
import MenuBar from "./MenuBar.vue";
import { supabase } from "@/config/supabase";
import { userStore } from "@/store/userStore";
import { mapActions, mapState } from "pinia";

export default {
	name: "UserRegister",
	components: {
		MenuBar,
		Footer,
	},
	data() {
		return {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			showPassword: false,
			showConfirmPassword: false,
			successMessage: "",
			isSuccess: false,
			usernameRules: [
				(v) => !!v || "O nome de usuário é obrigatório",
				(v) =>
					v.length >= 3 || "O nome de usuário deve ter pelo menos 3 caracteres",
			],
			emailRules: [
				(v) => !!v || "E-mail é obrigatório",
				(v) => this.validateEmail(v) || "E-mail deve ser válido",
			],
			passwordRules: [
				(v) => !!v || "A senha é obrigatória",
				(v) => v.length >= 6 || "A senha deve ter pelo menos 6 caracteres",
				(v) =>
					this.validatePassword(v) ||
					"A senha deve conter um caractere especial",
			],
			confirmPasswordRules: [
				(v) => !!v || "Confirmação de senha é obrigatória",
				(v) => this.validateConfirmPassword(v) || "As senhas não correspondem",
			],
		};
	},
	computed: {
		...mapState(userStore, ["user"]),
	},
	methods: {
		...mapActions(userStore, ["login"]),
		toggleShowPassword() {
			this.showPassword = !this.showPassword;
		},
		toggleShowConfirmPassword() {
			this.showConfirmPassword = !this.showConfirmPassword;
		},
		validateEmail(email) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(email);
		},
		validatePassword(password) {
			const passwordRegex = /[!@#$%^&*(),.?":{}|<>]/;
			return passwordRegex.test(password);
		},
		validateConfirmPassword(confirmPassword) {
			return this.password === confirmPassword;
		},
		async registerUser() {
			const { valid } = await this.$refs.form.validate();
			if (!valid) return;

			this.signUpNewUser(this.email, this.password, this.username);
		},
		async signUpNewUser(email, password, username) {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: { username },
					emailRedirectTo: "http://localhost:8080/",
				},
			});

			if (error) {
				alert("Erro: " + error.message);
				return;
			}

			this.login({
				email,
				token: data.session?.access_token,
				id: data.user.id,
				username: data.user.user_metadata.username,
			});

			this.successMessage = "Usuário registrado com sucesso!";
			this.isSuccess = true;

			this.$router.push("/");
		},
	},
};
</script>

<style>
.registro {
	background-color: #d4edda;
	border-color: #c3e6cb;
	color: #155724;
	padding: 0.75rem 1.25rem;
	margin-bottom: 1rem;
	border: 1px solid transparent;
	border-radius: 0.25rem;
}
.success-alert {
	position: absolute;
	top: 7%;
	left: 723px;
	width: 20%;
	background-color: #d4edda;
	border-color: #c3e6cb;
	color: #155724;
	padding: 0.75rem 1.25rem;
	margin-bottom: 1rem;
	border: 1px solid transparent;
	border-radius: 0.25rem;
}
.v-application .rounded {
	border-radius: 4px !important;
	background-color: transparent;
}
.v-card-item .v-card-title {
	padding: 0;
	color: #ebebeb;
	text-align: center;
	font-size: 1.5rem;
	font-weight: 600;
}
.v-text-field .v-field--no-label input,
.v-text-field .v-field--active input {
	opacity: 1;
	color: #ffd200;
}
.custom-scope * {
	color: #ebebeb;
}
.custom-button {
	color: #141414;
}
.custom-scope ::before,
.custom-scope ::after {
	color: #ebebeb;
}
</style>
