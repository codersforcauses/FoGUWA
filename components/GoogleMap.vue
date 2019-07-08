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

export default {
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
      apiKey: process.env.googleMapsApi
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
      this.map = new this.google.maps.Map(mapContainer, {
        center: { lat: -31.9754738, lng: 115.8166837 },
        zoom: 15
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
