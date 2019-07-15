<template>
  <google-map-loader
    :map-config="mapConfig"
    :api-key="apiKey"
    :map-inst.sync="map"
    :google-inst.sync="google"
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

// Use https://www.gps-coordinates.net/ to easily fetch coordinates
const UWA_BOUNDS = {
  north: -31.972979992153224,
  south: -31.98713100347039,
  west: 115.81349721126503,
  east: 115.82249284467866
}
const UWA_COORDS = { lat: -31.9804624, lng: 115.818 }

export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker
  },
  data() {
    return {
      map: null,
      google: null
    }
  },
  computed: {
    apiKey() {
      return process.env.googleMapsApi.toString()
    },
    mapConfig() {
      return {
        center: UWA_COORDS,
        restriction: {
          latLngBounds: UWA_BOUNDS,
          strictBounds: false
        },
        minZoom: 7,
        maxZoom: 21,
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
  },
  watch: {
    map(val) {
      this.loadMarkers()
    },
    google(val) {
      this.loadMarkers()
    }
  },
  methods: {
    loadMarkers() {
      if (this.map && this.google) {
        // Will run twice
        console.log('Loading markers...') // eslint-disable-line
      }
    }
  }
}
</script>
