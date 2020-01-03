<template>
  <v-navigation-drawer v-model="plantDialog" app bottom hide-overlay>
    <v-card>
      <v-carousel hide-delimiters cycle interval="3500" show-arrows-on-hover>
        <v-carousel-item v-for="(image, i) in images" :key="i">
          <v-img :src="image" height="100%"></v-img>
        </v-carousel-item>
      </v-carousel>
      <v-card-title primary-title>
        {{ plantName }}
      </v-card-title>
      <v-card-subtitle>
        <em>{{ sciName }}</em>
      </v-card-subtitle>
      <v-card-text>
        {{ description }}
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'PlantCard',
  props: {
    plantName: {
      type: String,
      default: 'Plants and Trees'
    },
    sciName: {
      type: String,
      default: 'Planticus Namium'
    },
    images: {
      type: Array,
      default: () => [
        'http://www.ahachemistry.com/uploads/1/1/8/3/118378549/dsc-5454_orig.jpg',
        'http://www.ahachemistry.com/uploads/1/1/8/3/118378549/dsc-7528_orig.jpg',
        'http://www.ahachemistry.com/uploads/1/1/8/3/118378549/20090626-uwa-grounds2-007_orig.jpg'
      ]
    },
    description: {
      type: String,
      default:
        'Plants are mainly multicellular, predominantly photosynthetic eukaryotes of the kingdom Plantae. Historically, plants were treated as one of two kingdoms including all living things that were not animals, and all algae and fungi were treated as plants.'
    }
  },
  data: () => ({
    plantDialog: true
  })
}
</script>
<style>
.popup-dialog {
  position: absolute;
  left: 0;
  width: calc(30%+10px);
}
</style>
