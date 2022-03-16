<template>
  <v-navigation-drawer
    v-if="selectedPlant && selectedInstance"
    v-model="plantInfoVisible"
    app
    bottom
    hide-overlay
    mobile-breakpoint="sm"
    width="450px"
    disable-resize-watcher
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
      <div v-if="selectedPlant">
        <v-card-title primary-title>
          {{ selectedPlant.name }}
        </v-card-title>
        <v-card-subtitle>
          <em>{{ selectedPlant.scientificName }}</em>
        </v-card-subtitle>
        <v-card-text>
          {{ selectedPlant.description }}
        </v-card-text>
      </div>
      <div v-if="selectedInstance.heading !== '' || selectedInstance.description !== ''">
        <v-divider />
        <v-subheader v-if="selectedInstance.heading !== ''" class="font-weight-bold">
          {{ selectedInstance.heading }}
        </v-subheader>
        <v-card-text v-if="selectedInstance.description !== ''">
          {{ selectedInstance.description }}
        </v-card-text>
      </div>
      <v-carousel
        v-if="selectedPlant.images.length > 0"
        hide-delimiters
        cycle
        interval="3500"
        show-arrows-on-hover
        :show-arrows="selectedPlant.images.length > 1"
        height="60vh"
      >
        <v-carousel-item v-for="image in selectedPlant.images" :key="image.src">
          <v-img height="100%" :alt="image.alt" :src="image.src"></v-img>
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PlantInfo',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      selectedPlant: 'plants/getSelectedPlant',
      selectedInstance: 'plants/getSelectedInstance'
    }),
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
