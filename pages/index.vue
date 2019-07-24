<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-card
      tile
      height="100%"
      width="100%"
    >
      <Searchbar
        :dataset="plants"
        :search-results.sync="filteredPlants"
      />
      <UWAPlantMap
        :plants="plants"
        :filtered-plants="filteredPlants"
      />
    </v-card>
  </v-layout>
</template>

<script>
import UWAPlantMap from '~/components/UWAPlantMap.vue'
import Searchbar from '~/components/other/Searchbar.vue'
import { plants as PLANT_DB } from '@/assets/plantdb.json'

export default {
  components: {
    UWAPlantMap,
    Searchbar
  },
  data() {
    return {
      plants: PLANT_DB,
      filteredPlants: []
    }
  }
}
</script>
