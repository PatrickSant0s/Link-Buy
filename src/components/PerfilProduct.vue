<template>
  <div class="container d-flex">
    <!-- Card com a imagem do produto -->
    <v-card class="mx-auto card-image">
      <div v-if="product">
        <img class="imagem" :src="product.imagem" :alt="product.nome" />
        <div class="conteudo">
          
        </div>
      </div>
    </v-card>

    <!-- Card de informações do produto selecionado -->
    <v-card width="550px" heigth="auto">
      <div class="title d-flex justify-center">
        <v-row class="mt-10">
          <v-col v-if="product" cols="12">
            <div class="mx-auto mb-3" max-width="400" height="auto" color="#0d0d0d">
              <div class="d-flex flex-column">
                <span class="name mx-auto pt-4">{{ product.nome }}</span>
                <div class="rating-container">
                  <star-rating
                    v-bind:increment="0.5"
                    v-bind:max-rating="5"
                    inactive-color="#14141"
                    active-color="#ffd200"
                    v-bind:star-size="20"
                  >
                  </star-rating>
                </div>
                <span class="opinion">Seja o primeiro a opinar</span>
                <span class="product-info">Disponibilidade: Disponível em 10 dias úteis</span>
              </div>

              <!-- Exibição dos tamanhos disponíveis -->
              <div class="tamanhos-disponiveis">
                <h3>Tamanhos Disponíveis:</h3>
                <ul class="d-flex justify-center">
                  <li v-for="tamanho in tamanhosPadrao" :key="tamanho" class="shirt">
                    {{ tamanho }}
                  </li>
                </ul>
              </div>
              <span class="price mt-10">{{ product.preco }}</span>
              <div class="portion">
                {{ product.portions }}
              </div>

              <div class="mx-5 mt-5 mb-5">
              <v-text-field v-model="cep" label="Digite seu CEP" outlined class="cep ml-10"></v-text-field>
			  <v-btn @click="calcularFrete"  class="mt-3 button-delivery">
                Calcular Frete
              </v-btn  >
			  </div>
              <!-- Mostrar resultado do frete -->
              <div v-if="freteCalculado !== null" class="shipping-value">
                <p>Frete calculado para o CEP {{ cep }}: {{ freteCalculado }}</p>
              </div>

              <div class="pa-5">
                <button class="custom-button" @click="verProduto(product)">
                  Comprar
                </button>
              </div>
			  <div>
      <span class="info justify">
 <iconify-icon icon="material-symbols:10k-outline-sharp" width="1.2em" height="1.2em"></iconify-icon>
        Frete e prazo de entrega
      </span>
    </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
import { products } from "@/utils/PerfilProduct";
import { produtos } from "@/utils/CardContext";
import StarRating from "vue-star-rating";

export default {
  name: "PerfilProduct",
  components: { StarRating },
  data() {
    return {
      produtos: produtos,
      product: products[0] || {
        imagem: "",
        nome: "",
        logo: "",
        rating: 0,
        avaliacoes: [],
        descricao: "",
        validator: (value) => value >= 0 && value <= 5,
      },
      tamanhosPadrao: ["PP", "P", "M", "G", "GG", "1"], // Lista fixa de tamanhos disponíveis
      cep: "", // Estado para armazenar o CEP digitado
      freteCalculado: null, // Estado para armazenar o valor calculado do frete
    };
  },
  methods: {
    verProduto(produto) {
      this.product = produto; // Atualiza o produto selecionado
    },
    calcularFrete() {
      // Aqui você pode implementar a lógica real para calcular o frete com base no CEP inserido
      // Neste exemplo, apenas simulo um valor fixo para demonstração
      if (this.cep.length === 0) {
        alert("Por favor, digite um CEP válido.");
        return;
      }
      const valorFrete = Math.floor(Math.random() * 50) + 10; // Gera um valor aleatório entre 10 e 59
      this.freteCalculado = `R$ ${valorFrete.toFixed(2)}`;
    },
    onRated(rating) {
      // Método chamado quando o usuário avalia o produto
      this.product.rating = rating; // Atualiza a avaliação do produto
      console.log(`Produto avaliado com ${rating} estrelas!`);
      // Aqui você pode implementar a lógica para enviar a avaliação para o servidor, por exemplo
    },
  },
};
</script>

<style scoped>
.card-image {
 max-height: 450px
}
.container {
  gap: 100px;
  margin: 100px;
}
.name {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color_font_dark);
  text-align: center;
}
.product-info {
  margin-top: 1.25rem;
  font-size: 0.75rem;
  text-align: center;
  color: var(--color_font_medium);
}
h3 {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.625rem;
  color: var(--color_font_dark);
  text-align: center;
}
.price {
  text-align: center;
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffd200;
}
.portion {
  font-size: 0.87rem;
  font-weight: 500;
  display: block;
  margin: auto;
  width: 80%;
  margin-top: 15px;
  color: var(--color_font_light);
}
.shirt {
  padding: 10px;
  color: var(--color_font_light);
  font-weight: 600;
  border: 1px solid;
  width: 50px;
  cursor: pointer;
}
.rating-container {
  margin: auto;
  padding: 20px;
}
.opinion {
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 0.3125rem;
  color: var(--color_primary_light);
  transition: ease-out 0.2s;
}


		.button-delivery{
			 background-color: #141414;
			 color:#ffd200;
			 left: 60%
		}
		.cep{
			width: 50%;
			height: 0px;
		
			
		}
		.shipping-value{
			text-align: center;
			color: #ffd200;
		}
.custom-button {
  margin: auto;
  width: 90%;
  height: 120px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 3px;
  cursor: pointer;
  color: #000000;
  background-color: #ffd200;
  transition: ease-out 0.2s;
}
.v-card--variant-elevated,
.v-card--variant-flat {
  background-color: #141414;
  border: 1px solid rgb(77, 77, 77);
}
.tamanhos-disponiveis {
  margin-top: 20px;
}
.tamanhos-disponiveis ul {
  list-style-type: none;
  padding: 0;
}
.tamanhos-disponiveis ul li {
  margin-bottom: 5px;
}
</style>
