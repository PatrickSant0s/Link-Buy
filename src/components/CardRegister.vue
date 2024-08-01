<template>
  <div>
    <div>
      <MenuBar />
    </div>
    <div class="registro success-alert" v-if="isSuccess">
      {{ successMessage }}
    </div>
    <v-card class="mx-auto mt-10 mb-10 custom-scope" max-width="400" height="" title="Novo Cliente">
      <v-container id="register-form">
        <v-text-field
          v-model="userName"
          label="Username"
          variant="underlined"
          :error-messages="userNameErrorMessage"
        ></v-text-field>

        <v-text-field
          v-model="email"
          color="primary"
          label="Email"
          variant="underlined"
          :error-messages="emailErrorMessage"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          color="primary"
          label="Senha"
          placeholder="Enter your password"
          variant="underlined"
          :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="toggleShowPassword"
          :error-messages="passwordErrorMessage"
        ></v-text-field>

        <v-text-field
          v-model="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          color="primary"
          label="Confirmar Senha"
          placeholder="Enter your password"
          variant="underlined"
          :append-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="toggleShowConfirmPassword"
          :error-messages="confirmPasswordErrorMessage"
        ></v-text-field>

      </v-container>

      <v-checkbox label="Concordo com o Termo de Uso e a Política de Privacidade"></v-checkbox>

      <v-divider></v-divider>

      <v-card-actions>
        <button class="custom-button" @click="registerUser">
          Registrar
        </button>
      </v-card-actions>
    </v-card>
    
    <Footer/>
  </div>
</template>

<script>
import Footer from "./Footer.vue";
import MenuBar from "./MenuBar.vue";

export default {
  name: "UserRegister",
  components: {
    MenuBar, Footer
  },
  data() {
    return {
      email: "",
      userName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      userNameErrorMessage: "",
      lastNameErrorMessage: "",
      emailErrorMessage: "",
      confirmPasswordErrorMessage: "",
      passwordErrorMessage: "",
      successMessage: "",
      isSuccess: false, // Adiciona uma variável de estado para controlar a exibição do alerta de sucesso
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
    registerUser() {
      if (this.password !== this.confirmPassword) {
        this.confirmPasswordErrorMessage = 'As senhas não correspondem';
        return;
      } else {
        this.confirmPasswordErrorMessage = '';
      }

      if (this.userName.length < 3) {
        this.userNameErrorMessage = "O Username deve ter pelo menos 3 caracteres.";
        return;
      } else {
        this.userNameErrorMessage = '';
      }

      if (!this.validateEmail(this.email)) {
        this.emailErrorMessage = "Por favor, insira um email válido.";
        return;
      } else {
        this.emailErrorMessage = '';
      }

      if (this.password.length < 3 || !/[!@#$%^&*(),.?":{}|<>]/.test(this.password)) {
        this.passwordErrorMessage = "A senha deve ter pelo menos 3 caracteres e conter um caractere especial.";
        return;
      } else {
        this.passwordErrorMessage = '';
      }

      const newUser = {
        userName: this.userName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        status: "Cadastrado",
      };

      const existingUsers = JSON.parse(window.localStorage.getItem("users")) || [];
      existingUsers.push(newUser);
      window.localStorage.setItem("users", JSON.stringify(existingUsers));
      console.log(existingUsers);

      this.userName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.clearErrorMessages();

    //   // Define a mensagem de sucesso e ativa o alerta de sucesso
    //   this.successMessage = "Registro realizado com sucesso! Você será direcionado para a área de login";
    //   this.isSuccess = true;

    //   setTimeout(() => {
    //     // Redireciona para a página de login após um atraso de 3 segundos
    //     this.$router.push("/login").catch((err) => {
    //       if (err.name !== "NavigationDuplicated") {
    //         throw err;
    //       }
    //     });
    //   }, 3200);
    // },
    clearErrorMessages() {
      this.userNameErrorMessage = "";
      this.lastNameErrorMessage = "";
      this.emailErrorMessage = "";
      this.passwordErrorMessage = "";
      this.confirmPasswordErrorMessage = "";
    },
  },
};
</script>
<style >
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
    color: #141414;
}

.custom-scope ::before,
.custom-scope ::after {
  color: #ebebeb;
}
</style>