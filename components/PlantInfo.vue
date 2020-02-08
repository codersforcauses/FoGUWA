<template>
  <v-navigation-drawer
    v-model="plantInfoVisible"
    app
    bottom
    hide-overlay
    width="450px"
  >
    <v-btn
      fab
      absolute
      right
      small
      depressed
      color="#00000077"
      :ripple="false"
      class="mt-2"
      @click="$emit('input', !value)"
    >
      <v-icon color="white">
        mdi-close
      </v-icon>
    </v-btn>
    <v-card flat>
      <v-carousel
        hide-delimiters
        cycle
        interval="3500"
        show-arrows-on-hover
        :show-arrows="plantInfo.images.length > 1"
        height="60%"
      >
        <v-carousel-item v-for="(image, i) in plantInfo.images" :key="i">
          <v-img :src="image"></v-img>
        </v-carousel-item>
      </v-carousel>
      <v-card-title primary-title>
        {{ plantInfo.plantName }}
      </v-card-title>
      <v-card-subtitle>
        <em>{{ plantInfo.sciName }}</em>
      </v-card-subtitle>
      <v-card-text>
        {{ plantInfo.description }}
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'PlantInfo',
  props: {
    value: Boolean,
    plantInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    plantInfoVisible: {
      get() {
        return this.value
      },
      set(value) {
        if (!value) {
          this.$emit('input', false)
        }
      }
    }
  }
}
</script>
