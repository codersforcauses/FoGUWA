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
import { labels, locations } from '@/assets/js/plantDb'

export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker
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
    },
    markers() {
      // Generate array of markers
      return locations.map((location, i) => {
        return {
          id: i,
          label: labels[i].name,
          position: location
        }
      })
    }
  }
}
</script>
