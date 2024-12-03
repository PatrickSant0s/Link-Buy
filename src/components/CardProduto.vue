<template>
	<div class="title d-flex justify-center">
		<v-row class="mt-10">
			<!-- Itera sobre os produtos da tabela -->
			<v-col v-for="product in products" :key="product.id" cols="12" md="4">
				<v-card
					class="mx-auto mb-3"
					max-width="400"
					height="auto"
					color="#0d0d0d"
				>
					<v-img height="auto" :src="product.img_url"></v-img>

					<div class="d-flex flex-column">
						<span class="name mx-auto pt-4">{{ product.name }}</span>
						<span class="sub-title">{{ product.description }}</span>
					</div>

					<div class="pa-5">
						<button class="custom-button" @click="goToProduct(product.link)">
							Ver produto
						</button>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { supabase } from "@/config/supabase";

export default {
	data() {
		return {
			products: []
		};
	},
	async created() {
		try {
			// Busca os produtos da tabela "product"
			const { data, error } = await supabase.from("product").select("*");

			if (error) {
				console.error("Erro ao buscar produtos do Supabase:", error);
				return;
			}

			this.products = data || [];
			console.log("Produtos carregados:", this.products);
		} catch (err) {
			console.error("Erro ao buscar produtos:", err);
		}
	},
	methods: {
		goToProduct(link) {
			if (link) {
				window.open(link, "_blank", "noopener,noreferrer");
			} else {
				console.error("Link do produto não disponível.");
			}
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

.portion {
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

.button-register {
	align-content: center;
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
