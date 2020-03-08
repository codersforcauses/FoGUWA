<template>
  <v-layout>
    <v-flex xs12 md6 lg5>
      <v-sheet height="calc(100vh - 92px)" style="overflow-y: auto;">
        <nuxt-child :plants="plants" />
      </v-sheet>
    </v-flex>
    <v-flex height="100vh">
      <uwa-plant-map :plants="plants" />
    </v-flex>
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
    async mounted() {
      await this.loadPlants()
      },
    methods: {
      async loadPlants() {
        const data = await this.$axios.$get('/api/flora')
        this.plants = data
      }
    },
  }
</script>