<template>
  <v-list two-line>
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
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn color="indigo" text dark @click="editView = !editView">
          EDIT
        </v-btn>
      </v-list-item-action>
    </v-list-item>  
  </v-list>
</template>

<script>
import iconData from '@/assets/js/plantIcons.js'

export default {
  props: {
    plants: {
      type: Array,
      required: true
    }
  },
  methods: {
    getPlantIcon(icon) {
      const { iconStyle, ...icons } = iconData
      return icons[icon] ? icons[icon] : icons.info
    },
  },
}
</script>
