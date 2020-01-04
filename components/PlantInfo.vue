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
      x-small
      depressed
      color="#00000077"
      :ripple="false"
      class="mt-2"
      @click="drawerClose"
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
      >
        <v-carousel-item v-for="(image, i) in plantInfo.images" :key="i">
          <v-img :src="image" height="100%"></v-img>
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
    plantInfo: {
      type: Object,
      required: true
    },
    plantInfoVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    drawerClose(event) {
      this.$emit('closeDrawer', 'true')
    }
  }
}
</script>
