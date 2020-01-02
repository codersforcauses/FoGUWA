<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-dialog
        v-if="$vuetify.breakpoint.smAndDown"
        v-model="plantDialog"
        fullscreen
        persistent
        class="popup-dialog"
      >
        <plant-content />
      </v-dialog>
      <v-card v-else v-model="plantDialog">
        <v-navigation-drawer>
          <plant-content />
        </v-navigation-drawer>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import PlantContent from '~/components/other/PlantContent.vue'

export default {
  name: 'PlantCard',
  components: {
    'plant-content': PlantContent
  },
  props: {
    plantName: {
      type: String,
      default: 'Plant Guy'
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
