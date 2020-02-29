<template>
  <v-card>
    <plant-card :plant="selectedPlant($route.params.plantId)" />
  </v-card>
</template>

<script>
import plantCard from '~/components/other/PlantCard.vue'

export default {
  components: {
    'plant-card': plantCard
  },
  props: {
    plants: {
      type: Array,
      required: true
    }
  },
  methods: {
    selectedPlant(id) {
      return this.plants.find(({ _id }) => _id === id)
    }
  }
}
</script>