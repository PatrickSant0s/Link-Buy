<template>
	<div class="title d-flex justify-center" >
		<v-row class="mt-10">
			<v-col
				v-for="(produto, index) in produtos"
				:key="produto.id"
				cols="12"
				md="4"
			>
				<v-card
					class="mx-auto mb-3"
					max-width="400"
					height="auto"
					color="#0d0d0d"
					style=""
				>
					<v-img height="auto" :src="produto.imagem"></v-img>

					<div class="d-flex flex-column">
						<span class="name mx-auto pt-4">{{ produto.nome }}</span>
						<span class="sub-title">{{ produto.preco }}</span>
					</div>

					<div class="parcela">
						{{ produto.parcelas }}
					</div>

					<div class="pa-5">
						<button class="custom-button" @click="verProduto(produto)">
							Ver produto
						</button>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { produtos } from "@/utils/CardContext";

export default {
	data() {
		return {
			produtos: produtos,
		};
	},
	methods: {
		verProduto(produto) {
			console.log("Ver produto:", produto);
			// Implemente a lógica para ver o produto
			// Exemplo simples: redirecionar para página de detalhes do produto
			// this.$router.push(`/produto/${produto.id}`);
		},
	},
};
</script>

<style scoped>
.v-col-4 {
	margin: auto;
}

.title {
	display: flex;
	text-align: center;
}

.parcela {
	font-size: 0.87rem;
	font-weight: 500;
	display: block;
	margin: auto;
	width: 80%;
	margin-top: 15px;
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
.name {
	color: #ebebeb;
	flex-grow: 1;
	max-height: 45px;
	font-size: 1rem;
	font-weight: 600;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.sub-title {
	display: block;
	font-size: 1.5rem;
	font-weight: 700;
	color: #ffd200;
	margin-left: 40px;
}
</style>
