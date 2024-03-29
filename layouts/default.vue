<template>
  <v-app>
    <nav-drawer v-model="drawer" />
    <v-main class="pa-0">
      <v-card tile height="100%" width="100%">
        <toolbar v-model="drawer" :is-index="isIndex" @log="handleLog" />
        <v-container fluid :fill-height="isIndex" class="pa-0 mx-0">
          <nuxt />
        </v-container>
        <v-snackbar
          :value="errorSnack"
          :timeout="snackbarTimeout"
          color="error"
          bottom
          multi-line
          @input="closeErrorSnack"
        >
          {{ errorMessage }}
          <template v-slot:action="{ attrs }">
            <v-btn
              fab
              small
              color="white"
              text
              v-bind="attrs"
              @click="closeErrorSnack"
            >
              <v-icon color="white">
                mdi-close
              </v-icon>
            </v-btn>
          </template>
        </v-snackbar>
        <v-snackbar
          v-model="snackbar"
          :timeout="snackbarTimeout"
          :color="snackbarColour"
          bottom
          multi-line
        >
          {{ snackbarText }}
          <template v-slot:action="{ attrs }">
            <v-btn
              fab
              small
              color="white"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              <v-icon color="white">
                mdi-close
              </v-icon>
            </v-btn>
          </template>
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
    </v-main>
    <foot :is-index="isIndex" />
  </v-app>
</template>

<script>
import { loggingLevels } from '@/assets/js/logging.js'
import { mapGetters } from 'vuex'
import Toolbar from '~/components/other/Toolbar.vue'
import NavDrawer from '~/components/other/NavDrawer.vue'
import Footer from '~/components/other/Footer.vue'

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
    },
    ...mapGetters({
      errorSnack: 'errorSnack',
      errorMessage: 'errorMessage'
    })
  },
  methods: {
    handleLog(event) {
      if (event.type === loggingLevels.DEBUG) {
        return
      }
      this.snackbarColour = event.type
      this.snackbarText = event.message
      this.snackbar = true
    },
    closeErrorSnack(event) {
      this.$store.commit('removeError')
    }
  }
}
</script>

<style>
::-moz-selection,
::selection {
  background: #3F51B533;
  text-shadow: none;
}
.search-menu {
  left: 10px !important;
}
</style>
