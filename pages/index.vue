<template>
  <v-layout>
    <v-card height="100%" width="100%" tile>
      <uwa-plant-map :plants="plants" />
    </v-card>
  </v-layout>
</template>

<script>
import UWAPlantMap from '~/components/UWAPlantMap.vue'

export default {
  components: {
    'uwa-plant-map': UWAPlantMap
  },
  data: () => ({
    plants: []
  }),
  mounted(){
    this.loadPlants()
  },
  methods: {
    async loadPlants() {
      const data = await this.$axios.$get('/api/flora')
      this.plants = data
    },
  }
}
</script>
