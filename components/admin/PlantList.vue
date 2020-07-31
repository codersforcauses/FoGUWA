<template>
  <v-sheet class="mt-5">
    <v-list two-line>
      <v-list-item :to="'/admin/plants/addplant'" nuxt>
        <v-list-item-avatar>
          <v-icon large text icon>
            mdi-plus-circle
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            ADD PLANT
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-for="(plant, i) in plants" :key="i" class="d-flex" :to="'/admin/plants/'+plant._id" nuxt>
        <v-list-item-avatar>
          <v-icon large text icon :color="getPlantIcon(plant.icon).fillColor">
            {{ getPlantIcon(plant.icon).mdiName }}
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ plant.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ plant.scientificName }}
            <v-chip v-if="plant.instances.length > 1" x-small>
              {{ plant.instances.length }}
            </v-chip>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>  
    </v-list>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    plants: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getPlantIcon: 'plants/getPlantIcon'
    }),
  }
}
</script>
