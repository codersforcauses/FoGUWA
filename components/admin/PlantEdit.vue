<template>
  <div class="mt-8">
    <v-text-field
      clearable
      label="Name"
      outlined
      dense
      rows="1"
      :value="plant.name"
      class="mx-4"
    ></v-text-field>
    <v-text-field
      clearable
      label="Scientific Name"
      no-resize
      outlined
      dense
      rows="1"
      :value="plant.scientificName"
      class="mx-4"
    ></v-text-field>
    <v-card-actions class="mx-4 mb-6">
      <p class="ma-0">
        Choose icon &emsp;
      </p>
      <v-btn-toggle :v-model="selectedBtn">
        <v-btn
          v-for="(icon, i) in getAllPlantIcons"
          :key="i"
          :color="icon.fillColor"
          icon
          outlined
          fab
          class="round mx-1"
          :style="{ borderColor: `${selectedBtn === getIconIndex(i) ? icon.fillColor : 'grey'} !important` }"
        >
          <v-icon :color="selectedBtn === getIconIndex(i) ? icon.fillColor: 'grey'">
            {{ icon.mdiName }}
          </v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-card-actions>
    <v-textarea
      clearable
      label="Name"
      outlined
      :value="plant.description"
      class="mx-4"
      rows="10"
      no-resize
    ></v-textarea>
    <v-card-actions class="px-4 pb-4">
      <v-btn color="primary" text @click="emitBack">
        BACK
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark>
        SAVE
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props:{
    plant:{
      type: Object,
      required: true
    }
  },
  data: () => ({
    selectedBtn: 0,
  }),
  computed: {
    ...mapGetters({
      getAllPlantIcons: 'plants/getAllPlantIcons'
    })
  },
  mounted() {
    this.selectedBtn = this.getIconIndex(this.plant.icon)
  },
  updated() {
    this.selectedBtn = this.getIconIndex(this.plant.icon)
  },
  methods: {
    getIconIndex(iconName){
      const iconIndexList = [
        "other",
        "leaf",
        "tree",
        "tulip",
        "lotus"
      ]
      return iconIndexList.indexOf(iconName);
    },
    emitBack(){
      this.$emit('back')
    }
  },
}
</script>

<style scoped>
  .round {
    border-radius: 50% !important;
    border-width: 2px !important;
  }
</style>
