<template>
  <div>
    <plant-card v-if="plant" :plant="plant" :icon="getPlantIcon(plant.icon)" />
    <v-skeleton-loader v-else type="article" class="mx-auto" />
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import PlantCard from '~/components/admin/PlantCard.vue'

  export default {
    components: {
      'plant-card': PlantCard
    },
    computed: {
      ...mapGetters({
        getPlant: 'plants/getPlantFromId',
        getPlantIcon: 'plants/getPlantIcon',
        getSelectedPlant: 'plants/getSelectedPlant'
      }),
      plant() {
        return this.getPlant(this.$route.params.plantId)
      }
    },
    mounted(){
      if(!this.plant) this.$router.replace({ path: '/admin/plants' })
      else this.setSelectedPlant(this.plant)
    },
    methods: {
      ...mapMutations({
        setSelectedPlant: 'plants/setSelectedPlant'
      })
    },
  }
</script>
