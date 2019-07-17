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
      <Searchbar />
      <UWAPlantMap
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
    UWAPlantMap,
    Searchbar
  },
  data() {
    return {
      snackbar: false,
      snackbarTimeout: 6000,
      snackbarColour: 'primary',
      snackbarText: 'Hello, I\'m a snackbar'
    }
  },
  methods: {
    handleLog(event) {
      console.log(event) // eslint-disable-line
      this.snackbarColour = event.type === 'warn' ? 'error' : event.type
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
    }
  }
}
</script>
