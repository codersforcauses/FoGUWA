<template>
  <v-toolbar
    :absolute="isIndex"
    :fixed="!isIndex"
    :style="{ margin, borderRadius: radius, padding }"
    height="56"
  >
    <v-app-bar-nav-icon v-show="!isIndex" @click="$emit('input', !value)" />

    <v-autocomplete
      v-show="isIndex"
      :items="items"
      :filter="customFilter"
      :search-input.sync="search"
      :style="{ maxWidth: width }"
      :menu-props="{
        nudgeBottom: '5px',
        openOnClick: false,
        contentClass: 'search-menu'
      }"
      item-text="name"
      item-value="name"
      dense
      auto-select-first
      single-line
      solo-inverted
      hide-details
      hide-selected
      flat
      dark
      color="grey"
      class="theme--dark"
    >
      <template v-slot:label>
        <span class="grey--text">Search FOGUWA</span>
      </template>
      <template v-slot:prepend-inner>
        <v-btn color="black" icon text @click="$emit('input', !value)">
          <v-icon>menu</v-icon>
        </v-btn>
        <v-divider class="ma-1 mr-3" light vertical />
      </template>
      <template v-slot:append>
        <v-btn :disabled="showSearch" color="primary" icon text>
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn
          v-show="!geoBtnHidden && isIndex"
          :loading="geoBtnLoading"
          :color="geoBtnColor"
          icon
          text
          @click="geoBtnClicked"
        >
          <v-icon>my_location</v-icon>
        </v-btn>
      </template>
      <template v-slot:item="item">
        <!-- will need to pass in icon and colour to :items to display correct icons for the search -->
        <div class="pl-2 pr-3">
          <v-icon style="`color:" ${item.item.icon}`>
            {{ item.item.icon }}
          </v-icon>
        </div>
        <div class="pl-5">
          {{ item.item.name }}
        </div>
      </template>
      <template v-slot:no-data>
        <div class="no-data">
          <v-icon color="error lighten-4" class="px-2">
            error_outline
          </v-icon>
          <div class="px-2">
            No plants matching <code>{{ search }}</code> were found
          </div>
        </div>
      </template>
    </v-autocomplete>

    <v-toolbar-title v-show="!isIndex" class="title">
      FoGUWA
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
import { loggingLevels } from '@/util/logging.js'
import plantData from '@/util/plantData.js'
// import plantIcons from '@/util/plantIcons.js'

export default {
  props: {
    value: Boolean,
    isIndex: Boolean
  },
  data: () => ({
    geoBtnLoading: false,
    geoBtnColor: 'black',
    geoBtnState: 'ready',
    geoBtnHidden: false,
    geolocatorId: null,
    userPosition: null,
    search: '',
    items: []
  }),
  computed: {
    margin() {
      return this.isIndex ? '10px' : '0'
    },
    padding() {
      return this.isIndex ? '0' : '0 16px'
    },
    radius() {
      return this.isIndex ? '4px' : '0'
    },
    width() {
      return this.$vuetify.breakpoint.smAndDown ? 'calc(100vw - 136px)' : '100%'
    },
    showSearch() {
      return this.search === ''
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
  mounted() {
    this.items = plantData
  },
  methods: {
    customFilter (item, queryText, itemText) {
      console.log(item)
      console.log(queryText)
      console.log(itemText)
        const textOne = item.name.toLowerCase()
        const textTwo = item.scientificName.toLowerCase()
        const searchText = queryText.toLowerCase()

        return textOne.includes(searchText) ||
          textTwo.includes(searchText)
    },
    getIcon(icon) {

    },
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
        case 'ready':
        default:
          this.geoBtnLoading = false
          this.geoBtnColor = 'black'
          break
      }
      this.geoBtnState = state
    },
    geoBtnClicked() {
      if (!this.isGeolocatorEnabled() && this.geoBtnState === 'ready') {
        this.setGeoBtnState('loading')
        this.geolocatorEnable()
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
        timeout: 5000,
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

<style scoped>
.v-toolbar >>> .v-toolbar__content {
  padding: 0 !important;
}
.no-data {
  display: flex;
  padding: 0 16px;
}
</style>
