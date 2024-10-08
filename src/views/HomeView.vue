<template>
	<div style="background-color: #141414; width: 100%">
		<MenuBar />

		<div class="d-flex justify-center">
			<div class="content">
				<h1 class="title">Lançamentos</h1>
				<CardProduto />
			</div>
		</div>
		<h1 class="title">Eventos</h1>
		<CarrouselEventos />
		<div>
			<Footer />
		</div>
	</div>
</template>

<script>
import MenuBar from "@/components/MenuBar.vue";
import CardProduto from "@/components/CardProduto.vue";
import FilterProduct from "@/components/FilterProduct.vue";
import CarrouselEventos from "@/components/CarrouselEventos.vue";
import Footer from "@/components/Footer.vue";
import CardRegisterProduct from "@/components/CardRegisterProduct.vue";

export default {
	name: "HomeView",
	components: {
		MenuBar,
		CardProduto,
		FilterProduct,
		CarrouselEventos,
		CardRegisterProduct,
		Footer,
	},
};
</script>

<style scoped>
.title {
	color: #ffd200;
	text-align: center;
}
.content {
	flex: 1; /* O conteúdo principal flexiona para preencher o espaço restante */
	max-width: 1100px; /* Largura máxima padrão do conteúdo principal */
	margin: 0 auto; /* Centraliza horizontalmente o conteúdo principal */
	padding: 20px;
	box-sizing: border-box; /* Garante que o padding não aumente a largura */

	/* Media query para larguras maiores que 1440px */
	@media screen and (min-width: 1440px) {
		max-width: 1500px; /* Aumenta o tamanho máximo acima de 1440px */
	}
}
</style>
