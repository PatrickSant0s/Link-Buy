<template>
	<div><MenuBar /></div>
	<div class="container mt-16 mb-16">
		<!-- Card com a imagem do produto -->
		<v-card class="">
			<div v-if="product">
				<img class="imagem" :src="product.imagem" :alt="product.nome" />
			</div>
		</v-card>

		<!-- Card de informações do produto selecionado -->
		<v-card width="50%" heigth="auto">
			<div class="title d-flex justify-center">
				<v-row class="mt-10">
					<v-col v-if="product" cols="12">
						<div
							class="mx-auto mb-3"
							max-width="400"
							height="auto"
							color="#0d0d0d"
						>
							<div class="d-flex flex-column">
								<span class="name mx-auto">{{ product.nome }}</span>
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
								<span class="product-info"
									>Disponibilidade: Disponível em 10 dias úteis</span
								>
							</div>

							<!-- Exibição dos tamanhos disponíveis -->
							<div class="tamanhos-disponiveis">
								<h3>Tamanhos Disponíveis:</h3>
								<v-select
									style="width: 50%; margin: auto"
									label="Select"
									:items="['PP', 'P', 'M', 'G', 'GG', 'XG']"
									variant="solo-inverted"
								></v-select>
							</div>
							<span class="price mt-5">{{ product.preco }}</span>
							<div class="portion">
								{{ product.portions }}
							</div>

							<div class="mx-5 mt-5 mb-5">
								<v-text-field
									v-model="cep"
									label="Digite seu CEP"
									outlined
									class="cep ml-10"
								></v-text-field>
								<v-btn @click="calcularFrete" class="mt-3 button-delivery">
									<span class="button-delivery">Calcular Frete</span>
								</v-btn>
							</div>
							<!-- Mostrar resultado do frete -->
							<div v-if="freteCalculado !== null" class="shipping-value">
								<p>
									Frete calculado para o CEP {{ cep }}: {{ freteCalculado }}
								</p>
							</div>

							<div class="pa-5">
								<button class="custom-button" @click="verProduto(product)">
									Comprar
								</button>
							</div>
							<div class="delivery">
								<Icon
									icon="carbon:delivery"
									width="1.2em"
									height="1.2em"
									style="color: white"
								></Icon>
								<span> Frete e prazo de entrega </span>
							</div>
						</div>
					</v-col>
				</v-row>
			</div>
		</v-card>
	</div>
	<Footer />
</template>

<script>
import { products } from "@/utils/PerfilProduct";
import { produtos } from "@/utils/CardContext";
import StarRating from "vue-star-rating";
import MenuBar from "./MenuBar.vue";
import { Icon } from "@iconify/vue";
import Footer from "@/components/Footer.vue";

export default {
	name: "PerfilProduct",
	components: { StarRating, MenuBar, Icon, Footer },
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
				favorites: [],
			},
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
		buscarProduto() {
			const id = this.$route.params.id;
			this.product = this.produtos.find(
				(produto) => produto.id === parseInt(id),
			);
		},
		verProduto(produto) {
			this.product = produto; // Atualiza o produto selecionado
		},
	},
};
</script>

<style>
.container {
	display: flex;
	justify-content: center;
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

.button-delivery {
	background-color: #141414;
	color: #ffd200;
	left: 60%;
}
.delivery {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	color: var(--color_font_dark);
}
.cep {
	width: 50%;
	height: 0px;
}
.shipping-value {
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

.icon-log {
	color: #ffd200;
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

.v-main {
	background-color: #141414;
}
</style>
