<template>
  <google-map-loader
    :map-config="mapConfig"
    :api-key="apiKey"
  >
    <template v-slot:default="mapProps">
      <GoogleMapMarker
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :google="mapProps.google"
        :map="mapProps.map"
      />
    </template>
  </google-map-loader>
</template>

<script>
import GoogleMapLoader from './GoogleMapLoader'
import GoogleMapMarker from './GoogleMapMarker'
import { uwaMapSettings } from '@/assets/js/mapSettings'

export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker
  },
  data() {
    return {
      markers: [
        { id: 'a', position: { lat: -31.976548, lng: 115.815182 } }, // Stirling Hwy
        { id: 'b', position: { lat: -31.975092, lng: 115.820557 } } // Mounts Bay Rd
      ]
    }
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
