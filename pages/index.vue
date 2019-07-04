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
      <google-map />
    </v-card>
  </v-layout>
</template>

<script>
import GoogleMap from '~/components/GoogleMap.vue'

export default {
  components: {
    GoogleMap
  }
}
</script>
