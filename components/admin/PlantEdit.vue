<template>
  <v-form ref="form" v-model="formValid" lazy-validation class="mt-8">
    <v-text-field
      v-model="plantName"
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
      v-model="sciName"
      clearable
      label="Scientific Name"
      no-resize
      outlined
      dense
      rows="1"
      class="mx-4"
    ></v-text-field>
    <v-textarea
      v-model="plantDesc"
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
      <v-list width="100%">
        <v-subheader>Images</v-subheader>
        <v-list-item
          v-for="image in plantImages"
          :key="image.src"
        >
          <v-list-item-avatar
            width="80"
            height="80"
            color="#eee"
            rounded
          >
            <v-img
              :alt="image.alt"
              :src="image.src"
            >
            </v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ image.alt }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="removeImage(image)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          @click="addImageOpen = true"
        >
          <v-list-item-avatar
            width="80"
            height="80"
            rounded
          >
            <v-sheet
              color="#eee"
              width="100%"
              height="100%"
            >
              <v-icon>
                mdi-plus
              </v-icon>
            </v-sheet>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Add Image</v-list-item-title>
          </v-list-item-content>
          <image-dialog :dialog="addImageOpen" @upload-complete="addImage" @close-dialog="addImageOpen = false"></image-dialog>
        </v-list-item>
      </v-list>
    </v-card-actions>
    <v-card-actions class="mx-4 mb-6">
      <v-subheader>Icon</v-subheader>
      <v-btn
        v-for="(icon, iconName) in getAllPlantIcons"
        :key="icon.name"
        :color="icon.fillColor"
        icon
        outlined
        fab
        class="round mx-1"
        :style="{ borderColor: `${plantIcon === iconName ? icon.fillColor : 'grey'} !important` }"
        @click="plantIcon = iconName"
      >
        <v-icon :color="plantIcon === iconName ? icon.fillColor: 'grey'">
          {{ icon.mdiName }}
        </v-icon>
      </v-btn>
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import ImageDialog from './AddImage'

export default {
  components: {
    'image-dialog': ImageDialog
  },
  data: () => ({
    plantName: '',
    sciName: '',
    plantDesc: '',
    plantImages: [],
    plantIcon: '',
    addImageOpen: false,
    formValid: false,
    textRules: [
        v => !!v || 'Field is required',
      ],
  }),
  computed: {
    ...mapGetters({
      getAllPlantIcons: 'plants/getAllPlantIcons'
    }),
  },
  mounted() {
    if (this.$route.params.plantId) this.setInitialValues()
  },
  methods: {
    ...mapMutations({
      'setSelectedPlant': 'plants/setSelectedPlant'
    }),
    getIconIndex(iconName){
      const iconIndexList = Object.keys(this.getAllPlantIcons)
      return iconIndexList.indexOf(iconName);
    },
    addImage({ src, alt }) {
      this.plantImages.push({ src, alt })
    },
    removeImage({ src }) {
      const imageIndex = this.plantImages.findIndex(image => image.src === src)
      this.plantImages.splice(imageIndex, 1)
    },
    emitBack(){
      this.$emit('back')
    },
    setInitialValues() {
      const selectedPlant = this.$store.getters["plants/getSelectedPlant"]
      this.plantId = selectedPlant._id
      this.plantName = selectedPlant.name
      this.sciName = selectedPlant.scientificName
      this.plantDesc = selectedPlant.description
      this.plantImages = [...selectedPlant.images]
      this.plantIcon = selectedPlant.icon
    },
    async saveOrUpdatePlant(){ 
      if(this.$refs.form.validate()) {
        const newPlant = {
          name: this.plantName,
          scientificName: this.sciName,
          description: this.plantDesc,
          images: this.plantImages,
          icon: this.plantIcon
        }
        if(this.$route.params.plantId) {
          newPlant._id = this.plantId
          await this.updatePlant(newPlant);
          this.emitBack()
        } else {
          const createdPlant = await this.createPlant(newPlant);
          if (createdPlant) this.$router.push({ path: '/admin/plants/' + createdPlant._id })
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
