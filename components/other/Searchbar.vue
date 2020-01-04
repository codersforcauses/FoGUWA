<template>
  <v-toolbar floating absolute style="margin: 10px;">
    // <v-text-field hide-details prepend-icon="search" single-line />
    <v-autocomplete
      v-model="searchModel"
      :filter="searchFilter"
      :items="searchItems"
      :loading="searchLoading"
      :search-input.sync="searchQuery"
      clearable
      hide-no-data
      hide-selected
      item-text="displayName"
      placeholder="Search..."
      prepend-icon="search"
      return-object
      single-line
    />
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
    },
    dataset: {
      type: Array,
      default: () => {
        return []
      }
    },
    searchResults: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data: () => ({
    geoBtnHidden: false,
    geoBtnLoading: false,
    geoBtnOutline: false,
    geoBtnColor: 'default',
    geoBtnState: 'ready',
    geolocatorId: null,
    userPosition: null,
    plants: [],
    searchDescLimit: 60,
    searchLoading: false,
    searchModel: null,
    searchQuery: null
  }),
  computed: {
    searchItems() {
      if (!this.plants) {
        return []
      }
      return this.plants.map(entry => {
        const description =
          entry.name +
          (entry.scientificName != null && entry.scientificName.length > 0
            ? ' (' + entry.scientificName + ')'
            : '')
        const name =
          description.length > this.searchDescLimit
            ? description.slice(0, this.searchDescLimit - 3) + '...'
            : description
        return Object.assign({}, entry, { displayName: name })
      })
    }
  },
  watch: {
    userPosition(val) {
      this.$store.commit('setPosition')
      this.$emit('update:userPositionInst', this.userPosition)
    },
    searchModel(val) {
      const results = []
      if (val != null) {
        results.push(val)
      }
      this.$emit('update:search-results', results)
    },
    searchQuery(val) {
      // Items have already been loaded
      if (this.searchItems.length > 0) return
      // Items have already been requested
      if (this.searchLoading) return
      this.searchLoading = true
      // Load the input items
      this.plants = this.dataset
      this.searchLoading = false
      // TODO: query database for matches, e.g.
      // queryDatabasePromise('val').then((res) => {
      //   return res.json()
      // }).then((res) => {
      //   const { count, plants } = res
      //   this.count = count
      //   this.plants = plants
      // }).catch((err) => {
      //   // TODO: emit log error message
      // })
      // .finally(() => {
      //   this.searchLoading = false
      // })
    }
  },
  methods: {
    searchFilter(plant, queryText, itemText) {
      const caseOne = plant.name.toLowerCase()
      const caseTwo = plant.scientificName.toLowerCase()
      const searchText = queryText.toLowerCase()

      return caseOne.includes(searchText) || caseTwo.includes(searchText)
    },
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
