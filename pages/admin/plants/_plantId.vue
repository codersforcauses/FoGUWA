<template>
  <plant-card :plant="getPlant(this.$route.params.plantId)" />
</template>

<script>
import { mapGetters } from 'vuex'
import PlantCard from '~/components/PlantCard.vue'

export default {
  components: {
    'plant-card': PlantCard
  },
  computed: {
    ...mapGetters({
      getPlant: 'plants/getPlantFromId'
    })
  }
}
</script>