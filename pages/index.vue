<template>
  <v-layout>
    <plant-info
      v-if="this.$route.name ==='index' && plant"
      v-model="infoDrawer"
      :plant="plant"
    />
    <v-card height="100%" width="100%" tile>
      <uwa-plant-map :plants="plants" @plant-clicked="handlePlantClick" />
    </v-card>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PlantInfo from './../components/PlantInfo'
import UWAPlantMap from '~/components/UWAPlantMap.vue'

export default {
  components: {
    'uwa-plant-map': UWAPlantMap,
    'plant-info': PlantInfo
  },
  data: () => ({
    infoDrawer: false,
    plantInfo: null
  }),
  computed: {
      ...mapGetters({
        plants: 'plants/plants',
        plant: 'plants/selectedPlant'
      }),
    },
  mounted(){
    this.loadPlants()
  },
  methods: {
    ...mapActions({
      loadPlants: 'plants/loadPlants'
    }),
    handlePlantClick(plant) {
      this.infoDrawer = true
    }
  }
}
</script>
