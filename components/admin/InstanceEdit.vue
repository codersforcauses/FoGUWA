<template>
  <div class="mt-8">
    <v-text-field
      v-model="heading"
      clearable
      label="Heading"
      outlined
      dense
      rows="1"
      class="mx-4"
    ></v-text-field>
    <v-textarea
      v-model="description"
      clearable
      label="Description"
      outlined
      class="mx-4"
      rows="10"
      no-resize
    ></v-textarea>
    <v-btn outlined color="primary" class="ml-3" @click="handleMarkerMove">
      <v-icon class="mr-2">
        mdi-crosshairs-gps
      </v-icon>
      {{ draggable ? "lock position" : "move on map" }}
    </v-btn>
    <v-chip label outlined small>
      {{ "Lat: " + selectedInstance.location.coordinates[0] + " Lng: " + selectedInstance.location.coordinates[1] }}
    </v-chip>
    <v-card-actions class="px-4 pb-4">
      <v-btn color="primary" text @click="handleBack">
        BACK
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark @click="handleInstanceSave">
        SAVE
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    heading: '',
    description: '',
    oldCoords: [],
    draggable: false
  }),
  computed: {
    ...mapGetters({
      selectedInstance: 'plants/getSelectedInstance'
    })
  },
  mounted() {
    this.heading = this.selectedInstance.heading
    this.description = this.selectedInstance.description
    this.oldCoords[0] = this.selectedInstance.location.coordinates[0]
    this.oldCoords[1] = this.selectedInstance.location.coordinates[1]
  },
  methods: {
    ...mapActions({
      updateInstance: 'plants/updateInstance'
    }),
    ...mapMutations({
      setDraggableInstance: 'plants/setDraggableInstance',
      setCenterInstance: 'plants/setCenteredInstance',
      setSelectedInstance: 'plants/setSelectedInstance',
      setSelectedInstancePosition: 'plants/setSelectedInstancePosition',
      mapUpdateNeeded: 'plants/mapUpdateNeeded'
    }),
    handleMarkerMove(){
      if(!this.draggable){
        this.setCenterInstance(this.selectedInstance._id)
        this.setDraggableInstance(this.selectedInstance._id)
        this.draggable = true
      } else {
        this.setDraggableInstance(null)
        this.draggable = false
      }
    },
    handleBack() {
      if(this.draggable) this.handleMarkerMove()
      this.setSelectedInstancePosition(this.oldCoords)
      this.mapUpdateNeeded(true)
      this.draggable = false
      this.setSelectedInstance(null)
      this.setCenterInstance(null)
      this.$emit('back')
    },
    async handleInstanceSave(){
      
      await this.updateInstance({
        ...this.selectedInstance,
        heading: this.heading,
        description: this.description,
      })
      this.setSelectedInstance(null)
      this.setCenterInstance(null)
      this.$emit('back')
    }
  }
}
</script>