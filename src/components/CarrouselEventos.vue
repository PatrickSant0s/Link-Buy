<template>
  <v-carousel :show-arrows="false">
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      cover
    ></v-carousel-item>
  </v-carousel>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://www.abcdacomunicacao.com.br/wp-content/uploads/WF_Finals_-WorldFootvolley-2.png',
          },
          {
            src: 'https://grcmlesydpcd.objectstorage.sa-saopaulo-1.oci.customer-oci.com/p/OQwcvnO-c63O08Gc2Kv4OTbJttj5ik60dguiDIyyQ0wuo5SWn-jHOLW9wNbylNqI/n/grcmlesydpcd/b/dtysppobjmntbkp01/o/media/doity/eventos/evento-186496-banner.jpeg',
          },
          {
            src: 'https://www.guiasmi.com.br/arquivos/noticias/2023/10/2%20Torneio%20de%20Futev%C3%B4lei%20de%20Areia%20Evento%20ser%C3%A1%20Realizado%20em%20S%C3%A3o%20Miguel%20do%20Igua%C3%A7u.jpg',
          },
          {
            src: 'https://www.dizplay.com.br/parque-barueri/img/evento.jpg',
          },
        ],
      }
    },
  }
</script>

<style scoped>

</style>