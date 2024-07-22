<template>
	<div class="box">
		<div class="container d-flex justify-between justify-center">
			<div class="logo-box">
				<a
					class="logo"
					href=""
					title="Athleta Brasil"
					aria-label="Athleta Brasil"
				>
					<img
						width="222"
						height="166"
						src="https://mir-s3-cdn-cf.behance.net/projects/404/db2257135246647.Y3JvcCwxMjc5LDEwMDAsMCwxMzk.png"
						fetchpriority="high"
						alt="Athleta Brasil"
						class="bt-2 icon"
					/>
				</a>
				<div class="social-media flex align-center">
					<a
						href="https://pt-br.facebook.com/athletabroficial"
						title="Facebook"
						aria-label="Facebook"
						target="_blank"
						rel="noopener noreferrer"
					>
						<i class="icon icon-facebook v-align-middle"></i>
					</a>
					<a
						href="https://www.instagram.com/athletabrasil"
						title="Instagram"
						aria-label="Instagram"
						target="_blank"
						rel="noopener noreferrer"
					>
						<i class="icon icon-instagram v-align-middle"></i>
					</a>
					<a
						href="https://www.youtube.com/@AthletaBrasil"
						title="Youtube"
						aria-label="Youtube"
						target="_blank"
						rel="noopener noreferrer"
					>
						<i class="icon icon-youtube v-align-middle"></i>
					</a>
				</div>
			</div>
			<div class="box-infos">
				<div class="title">Atendimento</div>
				<div class="overflow">
					<ul class="list">
						<li>
							<a href="tel:15996222232" title="Telefone: (15) 99622-2232">
								<i class="icon icon-phone v-align-middle"></i>
								(21) 99999-9999
							</a>
						</li>
						<li>
							<a href="tel:1532328400" title="Telefone: (15) 3232-8400">
								<i class="icon icon-phone v-align-middle"></i>
								(21) 9999-9999
							</a>
						</li>
						<li>
							<a
								href="mailto:contato@athletabrasil.com"
								title="Email: contato@athletabrasil.com"
							>
								<i class="icon icon-email v-align-middle"></i>
								contato@gmail.com
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div>
				<div class="title">Formas de pagamento</div>
				<ul class="payment-list justify-center">
					<li class="payment-form">
						<img
							class="lazyload loaded"
							alt="Cartão Visa - Vindi"
							src="https://images.tcdn.com.br/commerce/assets/store/img/icons/formas_pagamento/pag_peqcartavisatraycheckout.png?c791ee81face65a0c33ad0bf0c8428fe"
							data-ll-status="loaded"
						/>
					</li>
					<li class="payment-form">
						<img
							class="lazyload loaded"
							alt="Cartão MasterCard - Vindi"
							src="https://images.tcdn.com.br/commerce/assets/store/img/icons/formas_pagamento/pag_peqmastercardtraycheckout.png?c791ee81face65a0c33ad0bf0c8428fe"
							data-ll-status="loaded"
						/>
					</li>
					<li class="payment-form">
						<img
							class="lazyload loaded"
							alt="Cartão Elo - Vindi"
							src="https://images.tcdn.com.br/commerce/assets/store/img/icons/formas_pagamento/pag_peqelotraycheckout.png?c791ee81face65a0c33ad0bf0c8428fe"
							data-ll-status="loaded"
						/>
					</li>
					<li class="payment-form">
						<img
							class="lazyload loaded"
							alt="Cartão Hipercard - Vindi"
							src="https://images.tcdn.com.br/commerce/assets/store/img/icons/formas_pagamento/pag_pd_peqcartaohiper.png?c791ee81face65a0c33ad0bf0c8428fe"
							data-ll-status="loaded"
						/>
					</li>
					<li class="payment-form">
						<img
							class="lazyload loaded"
							alt="Cartão Hiper - Vindi"
							src="https://images.tcdn.com.br/commerce/assets/store/img/icons/formas_pagamento/pag_peqcartaohiperit.png?c791ee81face65a0c33ad0bf0c8428fe"
							data-ll-status="loaded"
						/>
					</li>
					<li class="payment-form">
						<img
							class="lazyload loaded"
							alt="Cartão Hiper - Vindi"
							src="https://images.tcdn.com.br/commerce/assets/store/img/icons/formas_pagamento/pag_peqcartaohiperit.png?c791ee81face65a0c33ad0bf0c8428fe"
							data-ll-status="loaded"
						/>
					</li>
	
	
				</ul>
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	width: 100%;
	gap: 90px;
	margin-top: 40px;
}

.title {
	text-transform: uppercase;
	color: var(--color_footer_main_font);
	font-size: 0.87rem;
	font-weight: 700;
	margin-bottom: 8px;
	text-align: center;
}

.list {
	font-size: 0.87rem;
	font-weight: 400;
	display: block;
	line-height: 1.5;
	padding: 5px 0;
	transition: ease-out 0.2s;
	text-align: center;
	color: var(--color_footer_second_font);
}

a {
	background-color: transparent;
	text-decoration: none;
	color: var(--color_footer_second_font);
}

.box {
	border: 1px solid rgb(77, 77, 77);
}
.title {
	font-size: 1.5em;
	margin-bottom: 10px;
}
.payment-list {
	display: flex;
	flex-wrap: wrap;
	list-style: none;
	padding: 0;
	margin: 0;
	gap: 10px;
}
.payment-form {
	flex: 1 1 calc(20% - 0px);
	max-width: calc(20% - 20px);
	display: flex;
}
.payment-form img {
	max-width: 100%;
	height: auto;
}

@media (max-width: 780px) {
   .container  {
	gap: 14px;
   }

   .title{
	font-size: 20px;
   }
   .icon{
	width: 140px;
	height: 100px;
   }
}



@media (max-width: 520px) {
   .container  {
	flex-direction: column;
	margin: auto;
	align-items: center;
   }

   
}
</style>
