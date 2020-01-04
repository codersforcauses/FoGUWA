<template>
  <v-app>
    <nav-drawer v-model="drawer" />
    <v-content class="pa-0">
      <v-card tile height="100%" width="100%">
        <toolbar v-model="drawer" :is-index="isIndex" @log="handleLog" />
        <v-container :fill-height="isIndex" fluid class="pa-0 mx-0">
          <nuxt />
        </v-container>
        <v-snackbar
          v-model="snackbar"
          :timeout="snackbarTimeout"
          :color="snackbarColour"
          bottom
          multi-line
        >
          {{ snackbarText }}
          <v-btn color="white" text flat @click="snackbar = false">
            Close
          </v-btn>
        </v-snackbar>
        <v-snackbar
          v-model="$nuxt.isOffline"
          :timeout="offlineTimeout"
          :color="snackbarColour"
          bottom
          multi-line
        >
          {{ offlineText }}
        </v-snackbar>
      </v-card>
    </v-content>
    <foot />
  </v-app>
</template>

<script>
import Toolbar from '~/components/other/Toolbar.vue'
import NavDrawer from '~/components/other/NavDrawer.vue'
import Footer from '~/components/other/Footer.vue'
import { loggingLevels } from '@/assets/js/logging.js'

export default {
  components: {
    toolbar: Toolbar,
    foot: Footer,
    'nav-drawer': NavDrawer
  },
  data: () => ({
    drawer: false,
    snackbar: false,
    offlineTimeout: 100000,
    snackbarTimeout: 5000,
    snackbarColour: 'error',
    snackbarText: 'Something went wrong sir',
    offlineText:
      'You are currently offline, please check your internet connection'
  }),
  computed: {
    isIndex() {
      return this.$nuxt.$route.name === 'index'
    }
  },
  methods: {
    handleLog(event) {
      if (event.type === loggingLevels.DEBUG) {
        return
      }
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
    }
  }
}
</script>

<style>
::-moz-selection,
::selection {
  background: #c0df68;
  text-shadow: none;
}
</style>
