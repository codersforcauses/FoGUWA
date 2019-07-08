<template>
  <div ref="googleMap" class="google-map">
    <!-- The Google Maps API will make use of this div. -->
    <div v-show="map === null" class="loading-container">
      <div class="loading-item">
        <v-progress-circular
          :size="70"
          :width="7"
          color="green"
          indeterminate
          style="margin-left:auto;margin-right:auto"
        />
        <span>Loading map...</span>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'
import { labels, locations } from '@/assets/js/plants'

export default {
  props: {
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
    }
  },
  data: function () {
    // Data managed by the component and accessible to the parent
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
    this.initMap()
  },
  methods: {
    initMap() {
      // Fetch the HTML element for the map, with the given ref value
      const mapContainer = this.$refs.googleMap
      // Create the map instance
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig)
      // Add plant markers.
      const markers = locations.map((location, i) => { // eslint-disable-line no-unused-vars
        return new this.google.maps.Marker({
          position: location,
          label: labels[i].name,
          map: this.map
        })
      })
    }
  }
}
</script>

<style>
/* Always set the map height explicitly to define the size of the div
 * element that contains the map. */
.google-map {
  height: 100%;
  width: 100%;
}

.loading-container {
  display: flex;
  align-content: center;
  justify-content: center;
  height: 100%;
}

.loading-item {
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
  align-content: center;
}
</style>
