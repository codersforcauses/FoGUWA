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
        v-if="plant.images"
        hide-delimiters
        cycle
        interval="3500"
        show-arrows-on-hover
        :show-arrows="plant.images.length > 1"
        height="60%"
      >
        <v-carousel-item v-for="(image, i) in plant.images" :key="i">
          <v-img :src="image"></v-img>
        </v-carousel-item>
      </v-carousel>
      <div v-if="plant">
        <v-card-title primary-title>
          {{ plant.name }}
        </v-card-title>
        <v-card-subtitle>
          <em>{{ plant.scientificName }}</em>
        </v-card-subtitle>
        <v-card-text>
          {{ plant.description }}
        </v-card-text>
      </div>
      <div v-if="instance.heading || instance.description">
        <v-divider />
        <v-subheader>
          {{ instance.heading }}
        </v-subheader>
        <v-card-text>
          {{ instance.description }}
        </v-card-text>
      </div>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'PlantInfo',
  props: {
    value: Boolean,
    plant: {
      type: Object,
      default: null
    },
    instance: {
      type: Object,
      default: null
    },
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
