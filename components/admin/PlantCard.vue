<template>
  <v-window v-if="plant" v-model="displayForm">
    <v-window-item :value="2">
      <v-carousel
        v-show="plant.images.length > 0"
        hide-delimiters
        cycle
        interval="3500"
        show-arrows-on-hover
        :show-arrows="plant.images.length > 1"
        height="400px"
      >
        <v-carousel-item v-for="image in plant.images" :key="image.id">
          <v-img height="450px" :alt="image.alt" :src="image.src" />
        </v-carousel-item>
      </v-carousel>
      <div
        class="d-flex"
      >
        <v-icon text icon :color="icon.fillColor" size="42" class="ml-3 pl-6">
          {{ icon.mdiName }}
        </v-icon>
        <v-col class="pl-6">
          <v-card-title class="pl-0 py-0">
            {{ plant.name }}
          </v-card-title>
          <v-chip v-show="!!plant.scientificName" color="primary" small outlined>
            <i>{{ plant.scientificName }}</i>
          </v-chip>
        </v-col>
        <v-card-actions class="mr-2">
          <v-btn color="primary" text dark @click="displayForm = 3">
            EDIT
          </v-btn>
          <v-btn v-if="plant.instances.length === 0" color="error" text dark @click="handlePlantDelete">
            DELETE
          </v-btn>
        </v-card-actions>
      </div>
      <v-card-text class="pt-0 pb-6 px-6">
        {{ plant.description }}
      </v-card-text>
      <v-divider />
      <v-list>
        <v-subheader class="ml-3">
          Locations
        </v-subheader>
        <plant-instance
          v-for="(instance, i) in plant.instances"
          :key="i"
          :instance-index="i"
          :index-selected="instanceHovered"
          :plant-instance="instance"
          :plant="plant"
          class="list-item"
          @mouseover.native="instanceHovered = i"
          @mouseout.native="instanceHovered = -1"
          @instanceEdit="handleInstanceEdit"
          @instanceCenter="handleCentered"
        />
        <v-list-item dense class="ml-3" @click="handleInstanceAdd">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon text icon>
                mdi-plus-circle-outline
              </v-icon>
              ADD INSTANCE
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn 
        color="primary"
        text
        class="ml-3"
        @click="$router.push({ path: '/admin/plants' })"
      >
        BACK
      </v-btn>
    </v-window-item>
    <v-window-item :value="3">
      <plant-edit @back="handleBackClick" />
    </v-window-item>
    <v-window-item :value="1">
      <instance-edit v-if="instance" @back="handleBackClick" />
      <v-skeleton-loader v-else type="article" class="mx-auto" />
    </v-window-item>
  </v-window>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import PlantEdit from './PlantEdit'
import InstanceEdit from './InstanceEdit'
import PlantInstance from './PlantInstance'

export default {
  components: {
    'plant-edit': PlantEdit,
    'instance-edit': InstanceEdit,
    'plant-instance': PlantInstance
  },
  data: () => ({
    displayForm: 2,
    instanceHovered: -1
  }),
  computed: {
    ...mapGetters({
      plant: 'plants/getSelectedPlant',
      instance: 'plants/getSelectedInstance',
      getPlantIcon: 'plants/getPlantIcon',
      getImage: 'images/getImage'
    }),
    icon() {
      return this.getPlantIcon(this.plant.icon)
    }
  },
  watch: {
    getSelectedPlant(val) {
      if(val === null) this.$router.replace({ path: '/admin/plants' })
    }
  },
  methods: {
    ...mapActions({
      createInstance: 'plants/createInstance',
      deletePlant: 'plants/deletePlant'
    }),
    ...mapMutations({
      setSelectedInstance: 'plants/setSelectedInstance',
      setCenteredInstance: 'plants/setCenteredInstance',
      setSelectedPlant: 'plants/setSelectedPlant'
    }),
    handlePlantDelete(){
      if(this.deletePlant(this.plant._id)) this.$router.replace({ path: '/admin/plants' })
    },
    handleBackClick(){
      this.displayForm = 2
    },
    handleInstanceEdit(editInstance){
      this.setSelectedInstance(editInstance._id)
      this.setCenteredInstance(editInstance._id)
      this.displayForm = 1
    },
    handleCentered(centeredInstance){
      this.setCenteredInstance(centeredInstance._id)
    },
    handleInstanceAdd(){
      this.createInstance(this.plant._id)
      this.displayForm = 1
    }
  }
}
</script>

<style>
.list-item {
  min-height: 60px;
}
</style>
