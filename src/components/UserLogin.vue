<template>
	<div class="Menu-Principal">
		<v-card
			class="mx-auto mt-10 mb-10 custom-scope"
			max-width="400"
			title="Novo Cliente"
		>
			<v-form ref="form" validate-on="input">
				<v-text-field
					name="email"
					v-model="email"
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
					placeholder="Digite sua senha"
					variant="underlined"
					:append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
					:rules="passwordRules"
					@click:append="toggleShowPassword"
				></v-text-field>

				<v-divider></v-divider>

				<v-card-actions>
					<v-btn
						class="custom-button"
						@click="onSubmit"
						:loading="loading"
						block
						color="success"
					>
						Entrar
					</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
		<!-- <Footer /> -->
	</div>
</template>

<script>
import Footer from "./Footer.vue";
import { supabase } from "@/config/supabase";
import { userStore } from "@/store/userStore";
import { mapActions, mapState } from "pinia";
export default {
	name: "UserLogin",
	components: {
		Footer,
	},
	data() {
		return {
			email: "",
			password: "",
			showPassword: false,
			loading: false,
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
		async onSubmit() {
			const { valid } = await this.$refs.form.validate();

			if (!valid) {
				alert("Por favor, preencha ambos os campos corretamente.");
				return;
			}

			this.loading = true;

			const { data, error } = await supabase.auth.signInWithPassword({
				email: this.email,
				password: this.password,
			});

			if (error) {
				alert("Usuário não encontrado, verique a senha ou cadastra-se");
				this.loading = false;
				return;
			}
			
			this.login({
				email: this.email,
				token: data.session.access_token,
				id: data.user.id,
				username: data.user.user_metadata.username
			});

			this.$router.push("/");
		},
		validateEmail(email) {
			const re =
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
			return re.test(String(email).toLowerCase());
		},
		validatePassword(password) {
			const specialCharRegex = /[!@#\$%\^\&*\)\(+=._-]/;
			return specialCharRegex.test(password);
		},
	},
};
</script>

<style scoped>
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
	color: #f5f5f5;
}

.custom-scope ::before,
.custom-scope ::after {
	color: #ebebeb;
}

.custom-scope[data-v-3a5d5944] * {
	text-align: center;
}
</style>
