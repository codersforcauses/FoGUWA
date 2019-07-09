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
      <google-map
        :map-config="mapConfig"
        :api-key="apiKey"
      />
    </v-card>
  </v-layout>
</template>

<script>
import GoogleMap from '@/components/GoogleMap.vue'
import { uwaMapSettings } from '@/assets/js/mapSettings'

export default {
  components: {
    GoogleMap
  },
  data: function () {
    return {
      apiKey: process.env.googleMapsApi,
      mapConfig: {
        center: { lat: -31.9754738, lng: 115.8166837 },
        zoom: 15,
        ...uwaMapSettings
      }
    }
  }
}
</script>
