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
      <v-list>
        <v-subheader>Images</v-subheader>
        <v-list-item
          v-for="(image, i) in plant.images"
          :key="image"
        >
          <v-list-item-avatar>
            <v-img
              src="https://scontent.fper6-1.fna.fbcdn.net/v/t1.0-9/123584211_3660594127295060_801662606055952945_o.jpg?_nc_cat=108&ccb=2&_nc_sid=cdbe9c&_nc_ohc=h8xs05qslRAAX-S75VR&_nc_ht=scontent.fper6-1.fna&oh=9de3da8e62f9b2ccee3911fe0c1566b9&oe=5FCAA610"
              max-height="100"
              max-width="100"
            >
            </v-img>
          </v-list-item-avatar>
          <v-text-field
            :value="plant.images[i]"
            clearable
            :label="`Image ${i + 1}`"
            no-resize
            outlined
            dense
            rows="1"
            class="mx-4"
            @blur="updateImage($event, i)"
          >
            {{ image }}
          </v-text-field>
        </v-list-item>
      </v-list>
    </v-card-actions>
    <v-card-actions class="mx-4 mb-6">
      <v-subheader>Icon</v-subheader>
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
  watch: {
    plant: {
      handler() {
        
      },
      deep: true
    }
  },
  created() {
    this.plant = {...this.plantValue}
    this.plant.images = [...this.plantValue.images]
    this.imageIcons = [...this.plantValue.images]
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
    updateImage(e, i){
      this.plant.images[i] = e.target.value
      console.log(this.plant.images)
    },
    getSrc(src){
      try {
        const realSrc = require(`~/assets/images/plants/${src}`)
        return realSrc
      } catch(err) {
        return require(`~/assets/images/unknown.jpg`)
      }
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
          const newPlantID = await this.createPlant(this.plant);
          if (newPlantID) this.$router.push({ path: '/admin/plants/' + newPlantID })
        }
      }  
    },
    ...mapActions({
      createPlant: 'plants/createPlant',
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
