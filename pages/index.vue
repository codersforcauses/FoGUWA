<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-card
      height="100%"
      width="100%"
    >
      <Searchbar />
      <google-map />
    </v-card>
  </v-layout>
</template>

<script>
import GoogleMap from '~/components/GoogleMap.vue'
import Searchbar from '~/components/other/searchbar.vue'

export default {
  components: {
    GoogleMap,
    Searchbar
  }
}
</script>
