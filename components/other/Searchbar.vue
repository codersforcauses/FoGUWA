<template>
  <v-toolbar
    floating
    absolute
    style="margin: 10px;"
  >
    <v-text-field
      hide-details
      prepend-icon="search"
      single-line
    />

    <v-btn
      v-show="!geoBtnHidden"
      icon
      :outline="geoBtnOutline"
      :loading="geoBtnLoading"
      :color="geoBtnColor"
      @click="$emit('toggle-geolocation')"
    >
      <v-icon>my_location</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    userPosition: {
      type: Object,
      default: function () {
        return {
          lat: null,
          lng: null
        }
      }
    }
  },
  data() {
    return {
      geoBtnHidden: false,
      geoBtnLoading: false,
      geoBtnOutline: false,
      geoBtnColor: 'default'
    }
  },
  methods: {
    setGeoBtnState(state) {
      switch (state) {
        case 'ready':
          this.geoBtnLoading = false
          this.geoBtnOutline = false
          this.geoBtnColor = 'default'
          break
        case 'loading':
          this.geoBtnLoading = true
          this.geoBtnOutline = false
          this.geoBtnColor = 'primary'
          break
        case 'active':
          this.geoBtnLoading = false
          this.geoBtnOutline = true
          this.geoBtnColor = 'primary'
          break
        default:
          break
      }
    }
  }
}
</script>

<style>

</style>
