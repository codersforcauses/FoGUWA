<template>
  <v-layout>
    <plant-info v-model="infoDrawer" />
    <v-card height="100%" width="100%" tile>
      <uwa-plant-map @plant-clicked="handlePlantClick" />
    </v-card>
  </v-layout>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import iconData from '@/assets/js/plantIcons.js'
// eslint-disable-next-line import/order
import PlantInfo from './../components/PlantInfo'
import UWAPlantMap from '~/components/UWAPlantMap.vue'
const { iconPaths } = iconData

export default {
  auth: false,
  components: {
    'uwa-plant-map': UWAPlantMap,
    'plant-info': PlantInfo
  },
  data: () => ({
    infoDrawer: false
  }),
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
    handlePlantClick() {
      this.infoDrawer = true
    }
  }
}
</script>
