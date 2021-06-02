<template>
  <div>
    <plant-card />
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import PlantCard from '~/components/admin/PlantCard.vue'

  export default {
    middleware: 'admin',
    components: {
      'plant-card': PlantCard
    },
    computed: {
      ...mapGetters({
        getPlant: 'plants/getPlantFromId',
      })
    },
    mounted(){
      const plant = this.getPlant(this.$route.params.plantId)
      if(!plant) this.$router.replace({ path: '/admin/plants' })
      else this.setSelectedPlant(plant._id)
    },
    methods: {
      ...mapMutations({
        setSelectedPlant: 'plants/setSelectedPlant'
      })
    },
  }
</script>
