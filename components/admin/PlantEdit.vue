<template>
  <v-form ref="form" v-model="formValid" lazy-validation class="mt-8">
    <v-text-field
      v-model="plant.name"
      :rules="textRules"
      required
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
      :rules="textRules"
      required
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
          @click="plant.icon = i"
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
      <v-btn color="primary" :dark="formValid" :disabled="!formValid" @click="saveOrUpdatePlant">
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
    plant: {},
    formValid: false,
    textRules: [
        v => !!v || 'Field is required',
      ],
  }),
  computed: {
    ...mapGetters({
      getAllPlantIcons: 'plants/getAllPlantIcons'
    }),
    selectedBtn() {
      return this.getIconIndex(this.plant.icon)
    }
  },
  created() {
    this.plant = {...this.plantValue}
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
      if(this.$refs.form.validate()) {
        if(this.$route.params.plantId) {
          await this.updatePlant(this.plant);
          this.emitBack()
        } else {
          const newPlantID = await this.addPlant(this.plant);
          if (newPlantID) this.$router.push({ path: '/admin/plants/' + newPlantID })
        }
      }  
    },
    ...mapActions({
      addPlant: 'plants/createPlant',
      updatePlant: 'plants/updatePlant'
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
