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
          v-for="imageId in plantImages"
          :key="getImage(imageId).alt"
        >
          <v-list-item-avatar
            width="80"
            height="80"
            color="#eee"
            rounded
          >
            <v-img
              :alt="getImage(imageId).alt"
              :src="getImage(imageId).data"
            >
            </v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ getImage(imageId).alt }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="removeImage(imageId)">
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
          <image-dialog :dialog="addImageOpen" @encode-complete="addImage" @close-dialog="addImageOpen = false"></image-dialog>
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
import { mapGetters, mapActions } from 'vuex'
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
      plant: 'plants/getSelectedPlant',
      getAllPlantIcons: 'plants/getAllPlantIcons',
      getImage: 'images/getImage'
    }),
  },
  created() {
    this.plantName = this.plant.name
    this.sciName = this.plant.scientificName
    this.plantDesc = this.plant.description
    this.plantImages = this.plant.images
    this.plantIcon = this.plant.icon
  },
  methods: {
    getIconIndex(iconName){
      const iconIndexList = Object.keys(this.getAllPlantIcons)
      return iconIndexList.indexOf(iconName);
    },
    addImage(image) {
      this.createImage({ imageData: image, plantId: this.plant._id })
    },
    removeImage(imageId) {
      this.deleteImage({ imageId, plantId: this.plant._id })
    },
    emitBack(){
      this.$emit('back')
    },
    async saveOrUpdatePlant(){    
      if(this.$refs.form.validate()) {
        if(this.$route.params.plantId) {
          await this.updatePlant({
            name: this.plantName,
            scientificName: this.sciName,
            description: this.plantDesc,
            images: this.plantImages,
            icon: this.plantIcon
          });
          this.emitBack()
        } else {
          const newPlantID = await this.createPlant(this.plant);
          if (newPlantID) this.$router.push({ path: '/admin/plants/' + newPlantID })
        }
      }  
    },
    ...mapActions({
      createPlant: 'plants/createPlant',
      updatePlant: 'plants/updatePlant',
      createImage: 'images/createImage',
      updateImage: 'images/updateImage',
      deleteImage: 'images/deleteImage'
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
