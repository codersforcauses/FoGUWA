<template>
  <div>
    <plant-edit :plant="plant"></plant-edit>
  </div>
</template>

<script>
import PlantEdit from '~/components/admin/PlantEdit'
  export default {
    components: {
      'plant-edit': PlantEdit
    },
    props: {
      plant: {
        type: Object,
        required: false,
        default:() => ({
          name: "",
          scientificName: "",
          images: [],
          icon: "other",
          description: "",
          instances: [
            {
              location: {
                type: "Point",
                coordinates: [-32, 115]
              }
            }
          ]
        })
      }
    }
  }
</script>