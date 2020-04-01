<template>
  <div class="mt-8">
    <v-text-field
      clearable
      label="Heading"
      outlined
      dense
      rows="1"
      :value="instance.heading"
      class="mx-4"
    ></v-text-field>
    <v-textarea
      clearable
      label="Description"
      outlined
      :value="instance.description"
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
      <v-btn color="primary" dark>
        SAVE
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    instance: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    draggable: false
  }),
  methods: {
    ...mapMutations({
      setDraggable: 'plants/setDraggable',
      centerInstance: 'plants/setCenteredInstance'
    }),
    handleMarkerMove(){
      if(!this.draggable){
        this.centerInstance(this.instance)
        this.setDraggable(this.instance._id)
        this.draggable = true
      } else {
        this.setDraggable(null)
        this.draggable = false
      }
      
    }
  }
}
</script>