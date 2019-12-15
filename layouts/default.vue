<template>
  <v-app>
    <nav-drawer v-model="drawer" />
    <v-content class="pa-0">
      <v-card tile height="100%" width="100%">
        <toolbar v-model="drawer" @log="handleLog" :isIndex="isIndex" />
        <v-alert :value="$nuxt.isOffline" type="error" dismissible class="ma-0">
          <!-- eslint-disable-next-line -->
          You are currently offline. Please check your internet connection.
        </v-alert>
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
          <v-btn @click="snackbar = false" flat>Close</v-btn>
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
    snackbarTimeout: 10000,
    snackbarColour: 'primary',
    snackbarText: ''
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
.search-menu {
  left: 10px !important;
}
</style>
