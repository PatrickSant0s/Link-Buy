<template>
	<div class="product-list d-flex justify-center">
		<v-row class="mt-10">
			<v-col v-for="product in products" :key="product.id" cols="12" md="4">
				<v-card
					class="mx-auto mb-3 position-relative"
					max-width="400"
					max-height="600"
					color="#0d0d0d"
				>
					<v-img max-height="400" :src="product.img_url" alt="Product Image" />

					<!-- Botões de edição e exclusão -->
					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<div
								class="delete-button"
								style="position: absolute; top: 10px; right: 10px; z-index: 10"
								v-bind="attrs"
								v-on="on"
							>
								<icon
									icon="mdi:delete"
									width="1.5em"
									height="1.5em"
									class="delete-icon"
									@click="deleteProduct(product.id)"
								></icon>
							</div>
						</template>
						<span>Excluir Produto</span>
					</v-tooltip>

					<div class="d-flex flex-column">
						<span class="name mx-auto pt-4">{{ product.name }}</span>
						<span class="sub-title">{{ product.description }}</span>
					</div>

					<div class="pa-5">
						<button class="custom-button" @click="goToProduct(product.link)">
							Comprar Produto
						</button>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { supabase } from "@/config/supabase";
import { Icon } from "@iconify/vue";

export default {
	name: "ProductList",
	components: { Icon },
	data() {
		return {
			products: [],
		};
	},
	async mounted() {
		await this.fetchProducts();
	},
	methods: {
		async fetchProducts() {
			const { data: userData, error: userError } =
				await supabase.auth.getUser();

			if (userError || !userData || !userData.user) {
				console.error("Erro ao obter usuário:", userError);
				return;
			}

			const userId = userData.user.id;

			const { data, error } = await supabase
				.from("product")
				.select("*")
				.eq("user_id", userId); // filtra produtos do usuário logado

			if (error) {
				console.error("Erro ao buscar produtos:", error.message);
			} else {
				this.products = data;
			}
		},
		async deleteProduct(productId) {
			const confirmDelete = confirm(
				"Tem certeza que deseja excluir este produto?",
			);
			if (!confirmDelete) return;

			try {
				const { error } = await supabase
					.from("product")
					.delete()
					.eq("id", productId);
				if (error) {
					console.error("Erro ao excluir produto:", error.message);
					alert("Não foi possível excluir o produto.");
					return;
				}
				this.products = this.products.filter(
					(product) => product.id !== productId,
				);
				alert("Produto excluído com sucesso!");
			} catch (err) {
				console.error("Erro inesperado:", err);
				alert("Ocorreu um erro inesperado.");
			}
		},
		goToProduct(link) {
			if (link) {
				window.open(link, "_blank", "noopener,noreferrer");
			}
		},
		editProduct(product) {
			// Implementar lógica de edição conforme necessário
			console.log("Editar produto:", product);
		},
	},
};
</script>

<style scoped>
.product-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 16px;
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
	margin: auto;
}

.custom-button {
	margin: auto;
	width: 90%;
	height: 44px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	border-radius: 3px;
	cursor: pointer;
	color: #000000;
	background-color: #ffd200;
	transition: ease-out 0.2s;
}

.delete-icon {
	color: rgba(133, 29, 3, 0.925);
	cursor: pointer;
	transition: color 0.3s ease;
}

.delete-icon:hover {
	color: red;
}
</style>
