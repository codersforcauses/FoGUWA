<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-card
      height="100%"
      width="100%"
    >
      <UWAPlantMap />
    </v-card>
  </v-layout>
</template>

<script>
import UWAPlantMap from '@/components/UWAPlantMap.vue'

export default {
  components: {
    UWAPlantMap
  }
}
</script>
