<template>
	<div class="filters">
		<!-- Filtro de Categorias -->
		<section class="filter-block filter-block-categories">
			<h4 class="filter-title">Categorias</h4>
			<ul class="filter-list">
				<li
					class="filter-item"
					v-for="(categoria, index) in categorias"
					:key="index"
				>
					<div class="filter-checkbox">
						<input
							type="checkbox"
							class="filter-input custom-checkbox"
							:id="'categoria-' + index"
							:value="categoria"
							v-model="categoriasSelecionadas"
							@change="aplicarFiltros"
						/>
						<label :for="'categoria-' + index" class="filter-label">
							<span class="filter-name ml-5">{{ categoria }}</span>
							<span class="filter-count"
								>({{ contarProdutosPorCategoria(categoria) }})</span
							>
						</label>
					</div>
				</li>
			</ul>
		</section>

		<!-- Filtro de Disponibilidade -->
		<!-- <section class="filter-block filter-block-availability">
      <h4 class="filter-title">Disponibilidade</h4>
      <ul class="filter-list">
        <li class="filter-item" v-for="(disponibilidade, index) in disponibilidades" :key="index">
          <div class="filter-checkbox">
            <input
              type="checkbox"
              class="filter-input"
              :id="'disponibilidade-' + index"
              :value="disponibilidade"
              v-model="disponibilidadesSelecionadas"
              @change="aplicarFiltros"
            />
            <label :for="'disponibilidade-' + index" class="filter-label">
              <span class="filter-name">{{ disponibilidade }}</span>
              <span class="filter-count">({{ contarProdutosPorDisponibilidade(disponibilidade) }})</span>
            </label>
          </div>
        </li>
      </ul>
    </section> -->

		<!-- Filtro de Preços -->
		<!-- <section class="filter-block filter-block-prices">
      <h4 class="filter-title">Preços</h4>
      <ul class="filter-list">
        <li class="filter-item" v-for="(preco, index) in precos" :key="index">
          <div class="filter-checkbox">
            <input
              type="checkbox"
              class="filter-input"
              :id="'preco-' + index"
              :value="preco"
              v-model="precosSelecionados"
              @change="aplicarFiltros"
            />
            <label :for="'preco-' + index" class="filter-label">
              <span class="filter-name">{{ preco.label }}</span>
              <span class="filter-count">({{ contarProdutosPorPreco(preco.valorMin, preco.valorMax) }})</span>
            </label>
          </div>
        </li>
      </ul>
    </section> -->

		<!-- Filtro de Tamanho -->
		<!-- <section class="filter-block filter-block-properties" data-filter-type="tamanho">
      <h4 class="filter-title">Tamanho</h4>
      <ul class="filter-list">
        <li class="filter-item" v-for="(tamanho, index) in tamanhos" :key="index">
          <div class="filter-checkbox">
            <input
              type="checkbox"
              class="filter-input"
              :id="'tamanho-' + index"
              :value="tamanho"
              v-model="tamanhosSelecionados"
              @change="aplicarFiltros"
            />
            <label :for="'tamanho-' + index" class="filter-label">
              <span class="filter-name">{{ tamanho }}</span>
              <span class="filter-count">({{ contarProdutosPorTamanho(tamanho) }})</span>
            </label>
          </div>
        </li>
      </ul>
    </section> -->
	</div>
</template>

<script>
export default {
	name: "Filtros",
	data() {
		return {
			categorias: [
				"ACESSORIOS",
				"Acessórios",
				"Calção",
				"Coleção SS23 Futevôlei",
				"Coleção SS24 Futevolei",
				"Feminino",
				"FUTÊVOLEI",
				"Redes",
				"Regata",
				"Regatas",
				"Térmica Manga Curta",
			],
			disponibilidades: [
				"Disponível em 10 dias úteis",
				"Disponível em 15 dias úteis",
				"Disponível em 3 dias úteis",
			],
			precos: [
				{ label: "Até R$ 199,89", valorMin: 0, valorMax: 199.89 },
				{
					label: "De R$ 199,90 à R$ 309,89",
					valorMin: 199.9,
					valorMax: 309.89,
				},
				{
					label: "De R$ 309,90 à R$ 419,89",
					valorMin: 309.9,
					valorMax: 419.89,
				},
				{
					label: "De R$ 419,90 à R$ 529,89",
					valorMin: 419.9,
					valorMax: 529.89,
				},
				{
					label: "De R$ 529,90 à R$ 639,89",
					valorMin: 529.9,
					valorMax: 639.89,
				},
				{ label: "Acima de R$ 639,90", valorMin: 639.9, valorMax: 999999 },
			],
			tamanhos: ["P", "M", "G", "GG", "4", "8", "12"],
			categoriasSelecionadas: [],
			disponibilidadesSelecionadas: [],
			precosSelecionados: [],
			tamanhosSelecionados: [],
		};
	},
	methods: {
		// Aplicar todos os filtros
		aplicarFiltros() {
			// Lógica para aplicar os filtros de acordo com as seleções
			// Você pode filtrar os produtos aqui conforme as seleções feitas
			console.log("Filtros aplicados:");
			console.log("Categorias:", this.categoriasSelecionadas);
			console.log("Disponibilidades:", this.disponibilidadesSelecionadas);
			console.log("Preços:", this.precosSelecionados);
			console.log("Tamanhos:", this.tamanhosSelecionados);
			// Implemente a lógica de filtragem dos produtos com base nos filtros selecionados
		},
		// Contar produtos por categoria
		contarProdutosPorCategoria(categoria) {
			// Lógica para contar produtos por categoria
			// Substitua com a sua implementação real
			return 10; // Exemplo: retornar a quantidade real de produtos para essa categoria
		},
		// Contar produtos por disponibilidade
		contarProdutosPorDisponibilidade(disponibilidade) {
			// Lógica para contar produtos por disponibilidade
			// Substitua com a sua implementação real
			return 5; // Exemplo: retornar a quantidade real de produtos para essa disponibilidade
		},
		// Contar produtos por faixa de preço
		contarProdutosPorPreco(valorMin, valorMax) {
			// Lógica para contar produtos por faixa de preço
			// Substitua com a sua implementação real
			return 15; // Exemplo: retornar a quantidade real de produtos para essa faixa de preço
		},
		// Contar produtos por tamanho
		contarProdutosPorTamanho(tamanho) {
			// Lógica para contar produtos por tamanho
			// Substitua com a sua implementação real
			return 8; // Exemplo: retornar a quantidade real de produtos para esse tamanho
		},
	},
};
</script>

<style scoped>
.filter-title {
	padding: 20px;
	font-family: var(--font_family);
	font-size: 16px;
	line-height: 1.4;
	color: var(--color_font_medium);
	background-color: var(--color_dark);
	-webkit-font-smoothing: antialiased;
}
.custom-checkbox {
	appearance: unset; /* Remove estilos padrão do sistema */
	width: 20px;
	height: 20px;
	border: 2px solid #ccc;
	border-radius: 4px;
	cursor: pointer;
}

.custom-checkbox:checked {
	background-color: #ffd200; /* Cor de fundo quando o checkbox está marcado */
}

/* Estilos opcionais para personalizar os filtros */
.filters {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	overflow: auto;
	max-height: 350px; /* Defina uma altura máxima para a div .filters */
	width: 350px;
}

.filters::-webkit-scrollbar {
	width: 10px; /* Largura da barra de rolagem */
}

.filters::-webkit-scrollbar-thumb {
	background-color: #ffd200;
	border-radius: 5px; /* Borda arredondada do botão da barra de rolagem */
}

.filter-item {
	margin-bottom: 5px;
	margin-left: 20px;
}

.filter-name {
	margin-right: 5px;
	font-size: 0.875rem;
	font-weight: 500;
	color: #bdbdbd;
	vertical-align: top;
}

.filter-count {
	color: #666;
}
</style>
