<template>
  <v-app dark>
    <Toolbar v-model="drawer" />
    <NavDrawer v-bind.sync="{ drawer }" />
    <v-content>
      <v-container fill-height fluid class="pa-0 ma-0">
        <nuxt />
      </v-container>
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
