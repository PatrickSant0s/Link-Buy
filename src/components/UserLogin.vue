<template>
  <div class="Menu-Principal">
    <v-card class="mx-auto mt-10 mb-10 custom-scope" max-width="400" title="Novo Cliente">
      <v-container id="register-form">
        <v-text-field
          id="email"
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          color="primary"
          label="Email"
          variant="underlined"
          :error-messages="emailErrorMessage"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :readonly="loading"
          :rules="[required]"
          clearable
          color="primary"
          label="Senha"
          placeholder="Digite sua senha"
          variant="underlined"
          :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="toggleShowPassword"
          :error-messages="passwordErrorMessage"
        ></v-text-field>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          class="custom-button"
          @click="onSubmit"
          :disabled="!formValido"
          :loading="loading"
          block
          color="success"
        >
          Entrar
        </v-btn>
      </v-card-actions>
    </v-card>
    <Footer />
  </div>
</template>

<script>
import Footer from "./Footer.vue";
export default {
  name: "UserLogin",
  components: {
    Footer
  },
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      loading: false,
      emailErrorMessage: "",
      passwordErrorMessage: "",
    };
  },
  computed: {
    formValido() {
      return this.email && this.password;
    }
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    onSubmit() {
      this.emailErrorMessage = '';
      this.passwordErrorMessage = '';

      if (!this.validarCampos(this.email, this.password)) {
        alert('Por favor, preencha ambos os campos corretamente.');
        return;
      }

      if (!this.validateEmail(this.email)) {
        this.emailErrorMessage = "Por favor, insira um email válido.";
        return;
      }

      const usuarios = JSON.parse(window.localStorage.getItem("users")) || [];
      const usuarioValido = usuarios.find(user => user.email === this.email && user.password === this.password);

      if (usuarioValido) {
        this.loading = true;
        localStorage.setItem('token', 'your_token_here');
      } else {
        alert('Usuário não encontrado. Por favor, verifique seus dados e registre-se.');
        this.$router.push('').catch();
      }
    },
    validarCampos(email, password) {
      this.emailErrorMessage = email ? "" : "O campo de email é obrigatório";
      this.passwordErrorMessage = password ? "" : "O campo de senha é obrigatório";
      return email && password;
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
      return re.test(String(email).toLowerCase());
    }
  }
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
   color:  #ebebeb;
    text-align: center;
    font-size: 1.5rem;
	font-weight: 600;
}

.v-text-field .v-field--no-label input, .v-text-field .v-field--active input {
    opacity: 1;
    color: #ffd200;
}

.custom-scope * {
  color: #ebebeb;
}
.custom-button{
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