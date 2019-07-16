<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-card
      height="100%"
      width="100%"
      tile
    >
      <Searchbar />
      <UWAPlantMap />
    </v-card>
  </v-layout>
</template>

<script>
import UWAPlantMap from '@/components/UWAPlantMap.vue'
import Searchbar from '~/components/other/Searchbar.vue'

export default {
  components: {
    UWAPlantMap,
    Searchbar
  }
}
</script>
