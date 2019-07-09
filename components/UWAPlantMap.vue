<template>
  <google-map-loader
    :map-config="mapConfig"
    :api-key="apiKey"
  />
</template>

<script>
import GoogleMapLoader from './GoogleMapLoader'
import { uwaMapSettings } from '@/assets/js/mapSettings'

export default {
  components: {
    GoogleMapLoader
  },
  computed: {
    apiKey() {
      return process.env.googleMapsApi.toString()
    },
    mapConfig() {
      return {
        center: { lat: -31.9754738, lng: 115.8166837 },
        zoom: 15,
        ...uwaMapSettings
      }
    }
  }
}
</script>
