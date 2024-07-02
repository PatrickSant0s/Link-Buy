<template>
	<div style="background-color: #141414; width: 100%">
		<MenuBar />
		<CardProduto />
	</div>
</template>

<script>
// @ is an alias to /src
import MenuBar from "@/components/MenuBar.vue";
import CardProduto from "@/components/CardProduto.vue";

export default {
	name: "HomeView",
	components: {
		MenuBar,
		CardProduto,
	},
};
</script>
