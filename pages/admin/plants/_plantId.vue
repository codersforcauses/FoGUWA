<template>
  <plant-card :plant="selectedPlant($route.params.plantId)" />
</template>

<script>
import PlantCard from '~/components/other/PlantCard.vue'

export default {
  components: {
    'plant-card': PlantCard
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