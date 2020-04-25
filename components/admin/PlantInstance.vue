<template>
  <v-list-item dense class="ml-3" @click="emitInstanceCenter">
    <v-list-item-content>
      <v-list-item-title>{{ plantInstance.heading || plant.name }}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-action v-show="instanceHovered" class="action">
      <v-btn icon color="primary" @click="emitInstanceEdit">
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-dialog v-model="deleteInstanceModel" persistent max-width="400">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" icon v-on="on">
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title v-if="oneInstanceRemaining" class="headline">
            Delete this entire plant?
          </v-card-title>
          <v-card-title v-else class="headline">
            Delete this plant instance?
          </v-card-title>
          <v-card-text v-if="oneInstanceRemaining">
            You are about to competely delete {{ plant.name }}. Would you like to proceed?
          </v-card-text>
          <v-card-text v-else>
            You are about to delete a location of {{ plant.name }}. Would you like to proceed?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="deleteInstanceModel = false">
              NO
            </v-btn>
            <v-btn color="primary" dark @click="handleDelete">
              YES
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn icon color="primary" @click="emitInstanceCenter">
        <v-icon>
          mdi-crosshairs-gps
        </v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    plant: {
      type: Object,
      required: true
    },
    plantInstance: {
      type: Object,
      required: true
    },
    instanceIndex: {
      type: Number,
      required: true
    },
    indexSelected: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    deleteInstanceModel: false,
  }),
  computed: {
    instanceHovered() {
      return this.instanceIndex === this.indexSelected
    },
    oneInstanceRemaining() {
      return this.plant.instances.length <= 1
    }
  },
  methods: {
    ...mapActions({
      deleteInstance: 'plants/deleteInstance',
      deletePlant: 'plants/deletePlant'
    }),
    handleDelete(){
      if(this.oneInstanceRemaining) this.deletePlant(this.plant._id)
      else this.deleteInstance(this.plantInstance._id)
      this.deleteInstanceModel = false
    },
    emitInstanceEdit(){
      this.$emit("instanceEdit", this.plantInstance)
    },
    emitInstanceCenter(){
      this.$emit("instanceCenter", this.plantInstance)
    }
  }
}
</script>

<style>
  .action {
    width: 100px;
    display: flex;
    flex-direction: row;
    padding: 0px;
  }
</style>