<template>
  <div>
    <NuxtChild v-if="plantInfo" />
    <plant-list v-else :plants="plants" />
  </div>
</template>

<script>
  import PlantList from '~/components/admin/PlantList'

  export default {
    middleware: 'admin',
    components: {
      'plant-list': PlantList
    },
    props: {
      plants: {
        type: Array,
        required: true
      }
    },
    data: () => ({
      plantInfo: false,
    })
  }
</script>