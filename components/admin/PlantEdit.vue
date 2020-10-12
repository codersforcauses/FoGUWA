<template>
  <v-form class="mt-8">
    <v-text-field
      v-model="plant.name"
      clearable
      label="Name"
      outlined
      dense
      rows="1"
      class="mx-4"
    ></v-text-field>
    <v-text-field
      v-model="plant.scientificName"
      clearable
      label="Scientific Name"
      no-resize
      outlined
      dense
      rows="1"
      class="mx-4"
    ></v-text-field>
    <v-textarea
      v-model="plant.description"
      clearable
      label="Description"
      outlined
      class="mx-4"
      rows="10"
      no-resize
    ></v-textarea>
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
    <v-card-actions class="px-4 pb-4">
      <v-btn color="primary" text @click="emitBack">
        BACK
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark @click="saveOrUpdatePlant">
        SAVE
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props:{
    plantValue: {
      type: Object,
      default:() => ({
          name: "",
          scientificName: "",
          images: [],
          icon: "other",
          description: "",
          instances: []
        })
    }
  },
  data: () => ({
    selectedBtn: 0,
    plant: {}
  }),
  computed: {
    ...mapGetters({
      getAllPlantIcons: 'plants/getAllPlantIcons'
    })
  },
  mounted() {
    this.selectedBtn = this.getIconIndex(this.plant.icon)
    this.plant = {...this.plantValue}
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
    },
    async saveOrUpdatePlant(){      
      if(this.$route.params.plantId) {

        console.log('update')
      } else {
        const newPlantID = await this.addPlant(this.plant);
        this.$router.push({ path: '/admin/plants/' + newPlantID })
      }
    },
    ...mapActions({
      addPlant: 'plants/createPlant'
    })
  },
}
</script>

<style scoped>
  .round {
    height: 50px !important;
    width: 50px !important;
    border-radius: 50% !important;
    border-width: 2px !important;
    width: 3rem !important;
    height: 3rem !important;
  }
</style>
