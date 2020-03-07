<template>
  <div style="height: 100%">
    <NuxtChild v-if="$route.params.plantId" :plants="plants" />
    <plant-list v-else :plants="plants" />
  </div>
</template>

<script>
  import PlantList from '~/components/other/PlantList.vue'
  export default {
    components: {
      'plant-list': PlantList
    },
    props: {
      plants: {
        type: Array,
        required: true
      }
    }
  }
</script>