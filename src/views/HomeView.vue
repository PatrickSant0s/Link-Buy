<template>
  <div style="background-color: #141414; width: 100%">
    <MenuBar />
    <div class="d-flex justify-center">
      <!-- Filtro lateral -->
      <div class="filter-sidebar">
        <FilterProduct />
      </div>

      <!-- Conteúdo principal -->
      <div class="content">
        <CardProduto />
      </div>
    </div>
  </div>
</template>

<script>
import MenuBar from "@/components/MenuBar.vue";
import CardProduto from "@/components/CardProduto.vue";
import FilterProduct from "@/components/FilterProduct.vue";

export default {
  name: "HomeView",
  components: {
    MenuBar,
    CardProduto,
    FilterProduct,
  },
};
</script>

<style scoped>
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
