<template>
  <div ref="googleMap" class="google-map">
    <!-- The Google Maps API will make use of this div. -->
    <!-- Slot to expose google api and map instance. -->
    <template v-if="google && map">
      <slot
        :google="google"
        :map="map"
      />
    </template>
    <!-- Loading icon/message as JS API is fetched. -->
    <v-layout
      v-show="!google || !map"
      align-center
      justify-center
      column
      fluid
      fill-height
    >
      <v-progress-circular
        :size="70"
        :width="7"
        color="green"
        indeterminate
        class="mb-4"
      />
      <span>Loading map...</span>
    </v-layout>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'

export default {
  props: {
    // These are the attributes exposed to the parent component
    mapConfig: {
      type: Object,
      default: function () {
        return {
          center: { lat: 0.0, lng: 0.0 },
          zoom: 0
        }
      }
    },
    apiKey: {
      type: String,
      required: true
    },
    mapInst: {
      type: Object,
      default: null
    },
    googleInst: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      google: null,
      map: null
    }
  },
  async mounted() {
    // Fetch the maps API
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    })
    // Expose the API for future use and initialise the map
    this.google = googleMapApi
    this.$emit('update:googleInst', this.google)
    this.initMap()
  },
  methods: {
    // The callback made after the Google Maps JS API loads
    initMap() {
      // Fetch the HTML element for the map, with the given ref value
      const mapContainer = this.$refs.googleMap
      // Create the map instance
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig)
      this.$emit('update:mapInst', this.map)
    }
  }
}
</script>

<style scoped>
/* Always set the map height explicitly to define the size of the div
 * element that contains the map. */
.google-map {
  height: 100%;
  width: 100%;
}
</style>
