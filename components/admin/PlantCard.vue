<template>
  <v-window v-model="displayForm">
    <v-window-item :value="2">
      <v-btn
        v-if="plant.images.length > 0"
        fab
        absolute
        left
        small
        depressed
        color="#00000077"
        :ripple="false"
        class="mt-2 ml-6"
        @click="$router.replace({ path: '/admin/plants' })"
      >
        <v-icon color="white">
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <v-carousel
        v-if="plant.images.length > 0"
        hide-delimiters
        cycle
        interval="3500"
        show-arrows-on-hover
        :show-arrows="plant.images.length > 1"
        height="150px"
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
        v-if="plant.images.length === 0"
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
      <instance-edit :instance="getSelected" @back="handleBackClick" />
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
      default: () => ({
        name: '',
        scientificName: '',
        description: '',
        icon: 'lotus',
        instance: [
          {
            heading: '',
            description: '',
            location: {
              type: 'Point',
              coordinates: [-31.976764, 115.818220]
            },
          }
        ],
        images: []
      })
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
      getSelected: "plants/getSelectedInstance"
    })
  },
  methods: {
    ...mapMutations({
      setInstance: 'plants/setSelectedInstance',
      centerInstance: 'plants/setCenteredInstance',
      nullCenter: 'plants/setCenteredNull'
    }),
    handleBackClick(){
      this.displayForm = 2
    },
    handleInstanceEdit(instance){
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