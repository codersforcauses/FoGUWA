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
        height="40vh"
      >
        <v-carousel-item v-for="(image, i) in plantInfo.images" :key="i">
          <v-img :src="image"></v-img>
        </v-carousel-item>
      </v-carousel>
      <v-card-title headline>
        {{ plantInfo.name }}
      </v-card-title>
      <v-card-subtitle>
        <em>{{ plantInfo.scientificName }}</em>
      </v-card-subtitle>
      <v-card-text>
        {{ plantInfo.description }}
      </v-card-text>
      <v-card-subtitle style="color: rgb(0,0,0,0.87); font-weight: bold;">
        {{ plantInfo.instances ? plantInfo.instances.title : "" }}
      </v-card-subtitle>
      <v-card-text>
        {{ plantInfo.instances ? plantInfo.instances.description : "" }}
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
