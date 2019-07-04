<template>
  <div id="Map">
    <!-- The Google Maps API will make use of this div. -->
  </div>
</template>

<script>
// TODO: I don't know why scriptjs needs to be defined here
let scriptjs

export default {
  data: function () {
    return {
      map: false
    }
  },
  mounted() {
    // TODO: A reference error will occur if scriptjs is define above and not here
    scriptjs = require('scriptjs')
    // Load the Google Maps API
    scriptjs('https://maps.googleapis.com/maps/api/js?key=' + process.env.googleMapsApi, () => {
      this.initMap()
    })
  },
  methods: {
    // The callback after the Google Maps JS API loads
    initMap: () => {
      this.map = new window.google.maps.Map(document.getElementById('Map'), {
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
#Map {
  /* height: 100%; */
  height: 500px;
  width: 500px;
}
</style>
