<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-dialog
        v-model="plantDialog"
        :fullscreen="$vuetify.breakpoint.smAndDown"
        overlay-opacity="0"
        persistent
        class="popup-dialog"
        width="30%"
      >
        <v-card>
          <v-carousel hide-delimiters cycle show-arrows-on-hover>
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
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    plantName: {
      type: String,
      required: true
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
    plantDialog: false
  })
}
</script>
<style scoped>
.popup-dialog {
  position: absolute;
  left: 0;
  width: calc();
}
</style>
