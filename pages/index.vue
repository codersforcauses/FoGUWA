<template>
  <v-layout>
    <plant-info
      v-if="this.$route.name ==='index' && plant"
      v-model="infoDrawer"
      :plant="plant"
      :instance="instance"
    />
    <v-card height="100%" width="100%" tile>
      <uwa-plant-map :plants="plants" @plant-clicked="handlePlantClick" />
    </v-card>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import iconData from '@/assets/js/plantIcons.js'
// eslint-disable-next-line import/order
import PlantInfo from './../components/PlantInfo'
import UWAPlantMap from '~/components/UWAPlantMap.vue'
const { iconPaths } = iconData

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
      plant: 'plants/getSelectedPlant',
      instance: 'plants/getSelectedInstance'
    }),
  },
  mounted(){
    this.loadPlants()
    this.setPlantIcons(iconPaths)
  },
  methods: {
    ...mapMutations({
      setPlantIcons: 'plants/setPlantIcons'
    }),
    ...mapActions({
      loadPlants: 'plants/loadPlants'
    }),
    handlePlantClick(plant) {
      this.infoDrawer = true
    }
  }
}
</script>
