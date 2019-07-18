<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-card
      tile
      height="100%"
      width="100%"
    >
      <searchbar
        @toggle-geolocation="setupGeolocation"
      />
      <uwa-plant-map
        ref="plantMap"
        @log="handleLog"
      />
      <v-snackbar
        v-model="snackbar"
        bottom
        multi-line
        :timeout="snackbarTimeout"
        :color="snackbarColour"
      >
        {{ snackbarText }}
        <v-btn
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-card>
  </v-layout>
</template>

<script>
import UWAPlantMap from '~/components/UWAPlantMap.vue'
import Searchbar from '~/components/other/Searchbar.vue'

export default {
  components: {
    'uwa-plant-map': UWAPlantMap,
    Searchbar
  },
  data() {
    return {
      snackbar: false,
      snackbarTimeout: 6000,
      snackbarColour: 'primary',
      snackbarText: ''
    }
  },
  methods: {
    handleLog(event) {
      this.snackbarColour = event.type
      this.snackbarText = event.message
      this.snackbar = true
      // Propagate the error
      // if (errorEvent.type === 'info') {
      //   console.log('INFO(' + error.code + '): ' + error.message) // eslint-disable-line no-console
      // } else if (errorEvent.type === 'warn') {
      //   console.warn('WARN(' + error.code + '): ' + error.message) // eslint-disable-line no-console
      // } else {
      //   console.error('ERROR(' + error.code + '):' + errorEvent.message) // eslint-disable-line no-console
      // }
    },
    setupGeolocation() {
      this.$refs.plantMap.geolocatorEnable()
    }
  }
}
</script>
