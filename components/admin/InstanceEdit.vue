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
      {{ "Lat: " + instance.location.coordinates[0] + " Lng: " + instance.location.coordinates[1] }}
    </v-chip>
    <v-card-actions class="px-4 pb-4">
      <v-btn color="primary" text @click="$emit('back')">
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
import { mapMutations, mapActions } from 'vuex'

export default {
  props: {
    instance: {
      type: Object,
      default: () => ({
          location: {
            type: "Point",
            coordinates: [-32, 115]
          },
          heading: "",
          description: ""
      })
    }
  },
  data: () => ({
    heading: '',
    description: '',
    draggable: false
  }),
  watch: {
    instance() {
      this.heading = this.instance.heading
      this.description = this.instance.description
    },
  },
  mounted() {
    this.heading = this.instance.heading
    this.description = this.instance.description
  },
  methods: {
    ...mapActions({
      updateInstance: 'plants/updateInstance',
      syncSelectedPlant: 'plants/syncSelectedPlant'
    }),
    ...mapMutations({
      setDraggable: 'plants/setDraggable',
      centerInstance: 'plants/setCenteredInstance'
    }),
    handleMarkerMove(){
      if(!this.draggable){
        this.centerInstance(this.instance._id)
        this.setDraggable(this.instance._id)
        this.draggable = true
      } else {
        this.setDraggable(null)
        this.draggable = false
        this.syncSelectedPlant()
      }
      
    },
    handleInstanceSave(){
      if(this.draggable) this.handleMarkerMove()
      const editData = {
        heading : this.heading,
        description : this.description,
      }
      this.updateInstance(editData)
      this.$emit('back')
    }
  }
}
</script>