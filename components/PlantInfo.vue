<template>
  <v-navigation-drawer
    v-model="plantInfoVisible"
    app
    bottom
    hide-overlay
    width="450px"
  >
    <v-btn
      fab
      absolute
      right
      x-small
      depressed
      color="#00000077"
      :ripple="false"
      class="mt-2"
      @click="plantInfoVisible = false"
    >
      <v-icon color="white">
        mdi-close
      </v-icon>
    </v-btn>
    <v-card flat>
      <v-carousel hide-delimiters cycle interval="3500" show-arrows-on-hover>
        <v-carousel-item v-for="(image, i) in plantInfo.images" :key="i">
          <v-img :src="image" height="100%"></v-img>
        </v-carousel-item>
      </v-carousel>
      <v-card-title primary-title>
        {{ plantInfo.plantName }}
      </v-card-title>
      <v-card-subtitle>
        <em>{{ plantInfo.sciName }}</em>
      </v-card-subtitle>
      <v-card-text>
        {{ plantInfo.description }}
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'PlantInfo',
  props: {
    plantInfo: {
      type: Object,
      default() {
        return {
          plantName: 'Plants and Trees',
          sciName: 'Planticus Namium',
          images: [
            'http://www.ahachemistry.com/uploads/1/1/8/3/118378549/dsc-5454_orig.jpg',
            'http://www.ahachemistry.com/uploads/1/1/8/3/118378549/dsc-7528_orig.jpg',
            'http://www.ahachemistry.com/uploads/1/1/8/3/118378549/20090626-uwa-grounds2-007_orig.jpg'
          ],
          description:
            'Plants are mainly multicellular, predominantly photosynthetic eukaryotes of the kingdom Plantae. Historically, plants were treated as one of two kingdoms including all living things that were not animals, and all algae and fungi were treated as plants.'
        }
      }
    },
    plantInfoVisible: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    plantInfoVisible: false
  })
}
</script>
