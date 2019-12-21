<template>
  <v-toolbar
    :absolute="isIndex"
    :fixed="!isIndex"
    :style="{ margin: margin }"
    height="56"
  >
    <v-app-bar-nav-icon @click="$emit('input', !value)" />

    <v-text-field
      v-show="isIndex"
      :style="{ width: width }"
      single-line
      solo-inverted
      hide-details
      flat
      dark
      color="grey"
      class="theme--dark"
    >
      <template v-slot:label>
        <span class="grey--text">Search FoGUWA</span>
      </template>
      <template v-slot:append>
        <v-icon class="grey--text">search</v-icon>
      </template>
    </v-text-field>
    <v-btn
      v-show="!geoBtnHidden && isIndex"
      :loading="geoBtnLoading"
      :color="geoBtnColor"
      @click="geoBtnClicked"
      icon
      text
    >
      <v-icon>my_location</v-icon>
    </v-btn>

    <v-toolbar-title v-show="!isIndex" class="title">FoGUWA</v-toolbar-title>
  </v-toolbar>
</template>

<script>
import { loggingLevels } from '@/assets/js/logging.js'

export default {
  props: {
    value: Boolean,
    isIndex: Boolean
  },
  data: () => ({
    geoBtnHidden: false,
    geoBtnLoading: false,
    geoBtnColor: 'default',
    geoBtnState: 'ready',
    geolocatorId: null,
    userPosition: null
  }),
  computed: {
    margin() {
      return this.isIndex ? '10px' : '0'
    },
    width() {
      return this.$vuetify.breakpoint.smAndDown ? 'calc(100vw - 136px)' : '100%'
    }
  },
  watch: {
    userPosition() {
      this.$store.commit('setPosition', this.userPosition)
    },
    '$route.path'() {
      this.geolocatorDisable()
    }
  },
  methods: {
    setGeoBtnState(state) {
      switch (state) {
        case 'loading':
          this.geoBtnLoading = true
          this.geoBtnColor = 'primary'
          break
        case 'active':
          this.geoBtnLoading = false
          this.geoBtnColor = 'primary'
          break
        case 'hidden':
          this.geoBtnHidden = false
          break
        case 'ready':
        default:
          this.geoBtnLoading = false
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
          // eslint-disable-line
          resolve(this.geolocatorEnable())
        })
      } else {
        this.geolocatorDisable()
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
      return this.geolocatorId !== null
    },
    geolocatorDisable() {
      // Remove the geolocation watcher
      navigator.geolocation.clearWatch(this.geolocatorId)
      this.geolocatorId = null
      this.userPosition = {
        lat: 0,
        lng: 0
      }
      this.setGeoBtnState('ready')
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
            'Please allow location access to view your current location. This may require you to refresh your browser.'
          this.geolocatorDisable()
          break
        case error.POSITION_UNAVAILABLE:
          logEvent.type = loggingLevels.ERROR
          logEvent.message = 'We are unable to find your location'
          this.geolocatorDisable()
          break
        case error.TIMEOUT:
          logEvent.type = loggingLevels.ERROR
          logEvent.message =
            'Finding your location took too long. Please try again.'
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
