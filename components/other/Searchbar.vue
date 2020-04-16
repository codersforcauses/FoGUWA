<template>
  <!-- useless component now, all done in toolbar -->
  <v-toolbar floating absolute style="margin: 10px;">
    <v-text-field hide-details prepend-icon="search" single-line />

    <v-btn
      v-show="!geoBtnHidden"
      :outline="geoBtnOutline"
      :loading="geoBtnLoading"
      :color="geoBtnColor"
      icon
      @click="geoBtnClicked"
    >
      <v-icon>my_location</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { loggingLevels } from '@/assets/js/logging.js'

export default {
  props: {
    userPositionInst: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    geoBtnHidden: false,
    geoBtnLoading: false,
    geoBtnOutline: false,
    geoBtnColor: 'default',
    geoBtnState: 'ready',
    geolocatorId: null,
    userPosition: null
  }),
  watch: {
    userPosition(val) {
      this.$store.commit('setPosition')
      this.$emit('update:userPositionInst', this.userPosition)
    }
  },
  methods: {
    setGeoBtnState(state) {
      switch (state) {
        case 'loading':
          this.geoBtnLoading = true
          this.geoBtnOutline = false
          this.geoBtnColor = 'primary'
          break
        case 'active':
          this.geoBtnLoading = false
          this.geoBtnOutline = true
          this.geoBtnColor = 'primary'
          break
        case 'hidden':
          this.geoBtnHidden = false
          break
        case 'ready':
        default:
          this.geoBtnLoading = false
          this.geoBtnOutline = false
          this.geoBtnColor = 'default'
          break
      }
      this.geoBtnState = state
    },
    geoBtnClicked() {
      if (!this.isGeolocatorEnabled() && this.geoBtnState === 'ready') {
        this.setGeoBtnState('loading')
        // eslint-disable-next-line
        new Promise(resolve => {
          resolve(this.geolocatorEnable())
        })
      } else {
        // eslint-disable-next-line
        new Promise(() => {
          // eslint-disable-line
          this.geolocatorDisable()
        })
      }
    },
    // Geolocator
    geolocatorAvailabilityTest() {
      if (!navigator.geolocation) {
        this.setGeoBtnState('hidden')
        this.$emit('log', {
          type: loggingLevels.ERROR,
          message: 'Geolocation is not available on this browser or device.'
        })
        return false
      }
      return true
    },
    geolocatorEnable() {
      // Check if geolocation is available
      if (!this.geolocatorAvailabilityTest()) {
        return null
      }
      // Check if it's already setup
      if (this.isGeolocatorEnabled()) {
        return this.geolocatorId
      }
      // Setup the geolocator to access the devices location
      const options = {
        enableHighAccuracy: true,
        // timeout: 5000,
        maximumAge: 0
      }
      this.geolocatorId = navigator.geolocation.watchPosition(
        this.geolocationSuccess,
        this.geolocationError,
        options
      )
      return this.geolocatorId
    },
    isGeolocatorEnabled() {
      return this.geolocatorId != null
    },
    geolocatorDisable() {
      // Remove the geolocation watcher
      if (this.isGeolocatorEnabled()) {
        navigator.geolocation.clearWatch(this.geolocatorId)
        this.geolocatorId = null
        this.userPosition = null
        this.setGeoBtnState('ready')
      }
    },
    geolocationSuccess(location) {
      this.setGeoBtnState('active')
      this.userPosition = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }
    },
    geolocationError(error) {
      // Setup error message
      const logEvent = {
        type: null,
        message: null
      }
      // Sanitise the error message
      switch (error.code) {
        case error.PERMISSION_DENIED:
          logEvent.type = loggingLevels.INFO
          logEvent.message =
            'Allow location access to view your current location. This may require you to refresh your browser.'
          this.geolocatorDisable()
          break
        case error.POSITION_UNAVAILABLE:
          logEvent.type = loggingLevels.ERROR
          logEvent.message = 'Location information is unavailable.'
          this.geolocatorDisable()
          break
        case error.TIMEOUT:
          logEvent.type = loggingLevels.ERROR
          logEvent.message = 'Location information is unavailable.'
          this.geolocatorDisable()
          break
        case error.UNKNOWN_ERROR:
        default:
          logEvent.type = loggingLevels.ERROR
          logEvent.message = 'Location information is unavailable.'
          this.geolocatorDisable()
          break
      }
      // Propagate the event
      this.$emit('log', logEvent)
    }
  }
}
</script>

<style></style>
