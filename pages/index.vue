<template>
  <v-layout column justify-center align-center>
    <button v-show="canInstall" ref="install" absolute @click="installApp">
      Add to home screen
    </button>
    <v-card tile height="100%" width="100%">
      <Searchbar />
      <uwa-plant-map ref="plantMap" />
    </v-card>
  </v-layout>
</template>

<script>
import UWAPlantMap from '~/components/UWAPlantMap.vue'
import Searchbar from '~/components/other/Searchbar.vue'
let deferredPrompt

export default {
  components: {
    'uwa-plant-map': UWAPlantMap,
    Searchbar
  },
  data() {
    return {
      canInstall: false
    }
  },
  created() {
    console.log('test') // eslint-disable-line
    if (process.browser) {
      window.addEventListener('beforeinstallprompt', this.installPrompt) // eslint-disable-line
    }
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener('beforeinstallprompt', this.installPrompt) // eslint-disable-line
    }
  },
  methods: {
    installPrompt(e) {
      console.log('install prompt') // eslint-disable-line
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later.
      deferredPrompt = e
      // Show install button
      this.canInstall = true
    },
    installApp() {
      // Hide the button
      this.canInstall = false
      // Show the deffered install prompt
      deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt') // eslint-disable-line
        } else {
          console.log('User dismissed the A2HS prompt') // eslint-disable-line
        }
        deferredPrompt = null
      })
    }
  }
}
</script>
