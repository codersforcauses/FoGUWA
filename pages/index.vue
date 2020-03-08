<template>
  <v-layout>
    <plant-info
      v-if="this.$route.name==='index'"
      v-model="infoDrawer"
      :plant-info="plantInfo"
    />
    <v-card height="100%" width="100%" tile>
      <uwa-plant-map :plants="plants" @plant-clicked="handlePlantClick" />
    </v-card>
  </v-layout>
</template>

<script>
import PlantInfo from './../components/PlantInfo'
import UWAPlantMap from '~/components/UWAPlantMap.vue'

export default {
  components: {
    'uwa-plant-map': UWAPlantMap,
    'plant-info': PlantInfo
  },
  data: () => ({
    plants: [],
    infoDrawer: false,
    plantInfo: {
      plantName: '',
      sciName: '',
      images: [],
      description: ''
    }
  }),
  mounted(){
    this.loadPlants()
  },
  methods: {
    async loadPlants() {
      const data = await this.$axios.$get('/api/flora')
      this.plants = data
    },
    handlePlantClick(plant) {
      this.infoDrawer = true
      this.plantInfo = plant
      const defaultImage = [
        'https://www.delorainedental.com.au/wp-content/uploads/2016/10/orionthemes-placeholder-image.png'
      ]
      this.plantInfo.images = plant.images.length > 0 ? plant.images : defaultImage 
    }
  }
}
</script>
