<template>
  <v-window v-if="plant" v-model="displayForm">
    <v-window-item :value="2">
      <v-carousel
        v-if="plant.images.length > 0"
        hide-delimiters
        cycle
        interval="3500"
        show-arrows-on-hover
        :show-arrows="plant.images.length > 1"
        height="400px"
      >
        <v-carousel-item v-for="(image, i) in plant.images" :key="i">
          <v-img :src="image"></v-img>
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
          v-for="(instance,i) in plant.instances"
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
      </v-list>
      <v-btn 
        color="primary"
        text
        class="ml-3"
        @click="$router.replace({ path: '/admin/plants' })"
      >
        BACK
      </v-btn>
    </v-window-item>
    <v-window-item :value="3">
      <plant-edit :plant="plant" @back="handleBackClick" />
    </v-window-item>
    <v-window-item :value="1">
      <instance-edit :instance="getSelectedInstance" @back="handleBackClick" />
    </v-window-item>
  </v-window>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import PlantEdit from './PlantEdit'
import InstanceEdit from './InstanceEdit'
import PlantInstance from './PlantInstance'

export default {
  components: {
    'plant-edit': PlantEdit,
    'instance-edit': InstanceEdit,
    'plant-instance': PlantInstance
  },
  props:{
    plant:{
      type: Object,
      required: true
    },
    icon: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    displayForm: 2,
    instanceHovered: -1,
  }),
  computed: {
    ...mapGetters({
      getSelectedInstance: "plants/getSelectedInstance",
      getSelectedPlant: "plants/getSelectedPlant"
    })
  },
  watch: {
    getSelectedPlant(val) {
      console.log(val)
      if(val === null) this.$router.replace({ path: '/admin/plants' })
    }
  },
  methods: {
    ...mapMutations({
      centerInstance: 'plants/setCenteredInstance',
      setSelectedPlant: 'plants/setSelectedPlant'
    }),
    handleBackClick(){
      this.displayForm = 2
    },
    handleInstanceEdit(instance){
      this.centerInstance(instance)
      this.displayForm = 1
    },
    handleCentered(instance){
      this.centerInstance(instance)
    }
  }
}
</script>

<style>
.list-item {
  min-height: 60px;
}
</style>