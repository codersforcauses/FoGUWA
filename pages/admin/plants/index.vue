<template>
  <div>
    <NuxtChild v-if="$route.params.plantId" :plants="plants" />
    <plant-list :plants="plants" />
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
    },
    data() {
      return {
        loading: false,
        search: null,
        select: null,
        hover: false,
        editView: false,
      }
    }
  }
</script>