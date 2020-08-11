<template>
  <v-layout>
    <v-card height="100%" width="100%" tile>
      <uwa-plant-map ref="plantMap" />
    </v-card>
  </v-layout>
</template>

<script>
import UWAPlantMap from '~/components/UWAPlantMap.vue'

export default {
  auth: false,
  components: {
    'uwa-plant-map': UWAPlantMap
  }
}
</script>
