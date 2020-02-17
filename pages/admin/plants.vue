<template>
  <v-card>
    <NuxtChild :plants="plants" />
    <plant-list :plants="plants" />
  </v-card>
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