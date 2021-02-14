<template>
  <div>
    <plant-edit @back="$router.push({ path: '/admin/plants' })"></plant-edit>
  </div>
</template>

<script>
import PlantEdit from '~/components/admin/PlantEdit'
  export default {
    middleware: 'admin',
    components: {
      'plant-edit': PlantEdit
    }
  }
</script>