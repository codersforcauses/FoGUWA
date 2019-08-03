<template>
  <v-app>
    <NavDrawer v-model="drawer" />
    <v-content>
      <v-card
        tile
        height="100%"
        width="100%"
      >
        <Toolbar v-model="drawer" />
        <v-container fill-height fluid class="pa-0 ma-0">
          <nuxt />
        </v-container>
      </v-card>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Toolbar from '~/components/other/Toolbar.vue'
import NavDrawer from '~/components/other/NavDrawer.vue'
import Footer from '~/components/other/Footer.vue'

export default {
  components: {
    Toolbar,
    NavDrawer,
    Footer
  },
  data() {
    return {
      drawer: false
    }
  }
}
</script>

<style>
p::-moz-selection, p::selection {
  color: var(--v-primary-darken2);
}
</style>
