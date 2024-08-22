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
			height=""
			title="Novo Cliente"
		>
			<v-form ref="form" validate-on="input">
				<v-text-field
					name="username"
					label="Username"
					variant="underlined"
					:rules="usernameRules"
				></v-text-field>

				<v-text-field
					name="email"
					color="primary"
					label="Email"
					variant="underlined"
					:rules="emailRules"
				></v-text-field>

				<v-text-field
					name="password"
					v-model="password"
					:type="showPassword ? 'text' : 'password'"
					color="primary"
					label="Senha"
					placeholder="Enter your password"
					variant="underlined"
					:append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
					:rules="passwordRules"
					@click:append="toggleShowPassword"
				></v-text-field>

				<v-text-field
					name="confirmPassword"
					:type="showConfirmPassword ? 'text' : 'password'"
					color="primary"
					label="Confirmar Senha"
					placeholder="Enter your password"
					variant="underlined"
					:append-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
					:rules="confirmPasswordRules"
					@click:append="toggleShowConfirmPassword"
				></v-text-field>
			</v-form>

			<!-- <v-checkbox label="Concordo com o Termo de Uso e a Política de Privacidade"></v-checkbox> -->

			<v-divider></v-divider>

			<v-card-actions>
				<button class="custom-button" @click="registerUser">Registrar</button>
			</v-card-actions>
		</v-card>

		<!-- <Footer /> -->
	</div>
</template>

<script>
import Footer from "./Footer.vue";
import MenuBar from "./MenuBar.vue";
import { supabase } from "@/config/supabase";

export default {
	name: "UserRegister",
	components: {
		MenuBar,
		Footer,
	},
	data() {
		return {
			password: "",
			showPassword: false,
			showConfirmPassword: false,
			successMessage: "",
			isSuccess: false, // Adiciona uma variável de estado para controlar a exibição do alerta de sucesso
			usernameRules: [
				(v) => Boolean(v) || "O nome de usuário é obrigatório",
				(v) =>
					v.length >= 3 || "O nome de usuário deve ter pelo menos 3 caracteres",
			],
			emailRules: [
				(v) => Boolean(v) || "E-mail é obrigatório",
				(v) => this.validateEmail(v) || "E-mail deve ser válido",
			],
			passwordRules: [
				(v) => Boolean(v) || "A senha é obrigatória",
				(v) => v.length >= 6 || "A senha deve ter pelo menos 3 caracteres",
				(v) =>
					this.validatePassword(v) ||
					"A senha deve conter um caractere especial",
			],
			confirmPasswordRules: [
				(v) => Boolean(v) || "Confirmação de senha é obrigatória",
				(v) => this.validateConfirmPassword(v) || "As senhas não correspondem",
			],
		};
	},
	methods: {
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

			if (!valid) {
				return;
			}

			const form = new FormData(this.$refs.form.$el);

			const username = form.get("username");
			const email = form.get("email");
			const password = form.get("password");

			const newUser = {
				username,
				email,
				password,
				status: "Cadastrado",
			};

			this.signUpNewUser(email, password);
		},
		async signUpNewUser(email, password) {
			const { data, error } = await supabase.auth.signUp({
				email: email,
				password: password,
				options: {
					emailRedirectTo: "http://localhost:8080/",
				},
			});
			if (error) {
				alert("Usuário não encontrado, verifique a senha ou cadastre-se");
				this.loading = false;
			} else {
				localStorage.setItem("token", data.session.access_token);

				this.$router.push("/");
			}
		},
	},
};
</script>
<style>
.registro {
	/* Define a cor verde para o alerta de sucesso */
	background-color: #d4edda;
	border-color: #c3e6cb;
	color: #155724;
	padding: 0.75rem 1.25rem;
	margin-bottom: 1rem;
	border: 1px solid transparent;
	border-radius: 0.25rem;
}
.success-alert {
	/* Estilos para o alerta de sucesso */
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
