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
      geolocatorId: null,
      userLocation: null
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
  mounted() {
    // Setup the geolocator to access the devices location
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    }
    this.geolocatorId = navigator.geolocation.watchPosition(this.geolocationSuccess, this.geolocationError, options)
  },
  destroyed() {
    // Remove the geolocation watcher
    if (this.geolocatorId) {
      navigator.geolocation.clearWatch(this.geolocatorId)
    }
  },
  methods: {
    geolocationSuccess(location) {
      this.userLocation = {
        id: -1,
        label: 'user',
        position: { lat: location.latitude, lng: location.longitude }
      }
    },
    geolocationError(error) {
      const errorEvent = {
        type: null,
        message: null
      }
      // Sanitise the error message
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorEvent.type = 'info'
          errorEvent.message = 'Allow location access to view your current location.'
          break
        case error.POSITION_UNAVAILABLE:
          errorEvent.type = 'warn'
          errorEvent.message = 'Location information is unavailable.'
          break
        case error.TIMEOUT:
          errorEvent.type = 'error'
          errorEvent.message = 'Location information is unavailable.'
          break
        case error.UNKNOWN_ERROR:
        default:
          errorEvent.type = 'error'
          errorEvent.message = 'Location information is unavailable.'
          break
      }
      // Propagate the error
      if (errorEvent.type === 'info') {
        console.log('INFO(' + error.code + '): ' + error.message) // eslint-disable-line no-console
      } else if (errorEvent.type === 'warn') {
        console.warn('WARN(' + error.code + '): ' + error.message) // eslint-disable-line no-console
      } else {
        console.error('ERROR(' + error.code + '):' + errorEvent.message) // eslint-disable-line no-console
      }
    }
  }
}
</script>
