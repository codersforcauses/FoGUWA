<template>
  <plant-list />
</template>

<script>
  import PlantList from '~/components/admin/PlantList'

  export default {
    middleware: 'admin',
    components: {
      'plant-list': PlantList
    }
  }
</script>
