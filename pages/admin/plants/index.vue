<template>
  <plant-list :plants="plants" />
</template>

<script>
  import PlantList from '~/components/admin/PlantList'

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