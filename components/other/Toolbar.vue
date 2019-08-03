<template>
  <v-toolbar
    :floating="isIndex"
    :absolute="isIndex"
    :fixed="!isIndex"
    :app="!isIndex"
    :style="{ margin: margin }"
  >
    <v-toolbar-side-icon @click="$emit('input', !value)" />

    <v-text-field
      v-show="isIndex"
      single-line
      solo-inverted
      hide-details
      clearable
      flat
      dark
      color="grey"
      class="theme--dark"
      :style="{ width: width }"
    >
      <template v-slot:label>
        <span class="grey--text">
          Search FoGUWA
        </span>
      </template>
      <template v-slot:append>
        <v-icon class="grey--text">
          search
        </v-icon>
      </template>
    </v-text-field>
    <v-btn v-show="isIndex" icon>
      <v-icon> my_location </v-icon>
    </v-btn>

    <v-toolbar-title v-show="!isIndex">
      FoGUWA
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  computed: {
    isIndex() {
      return this.$nuxt.$route.name === 'index'
    },
    margin() {
      return this.isIndex ? '10px' : '0'
    },
    width() {
      return this.$vuetify.breakpoint.smAndDown
        ? 'calc(100vw - 136px)'
        : '100%'
    }
  }
}
</script>
