<template>
  <plant-card :plant="selectedPlant($route.params.plantId)" />
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
      return this.plants.find(plant => plant._id === id)
    }
  }
}
</script>