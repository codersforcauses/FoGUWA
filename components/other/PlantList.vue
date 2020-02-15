<template>
  <v-card>
    <v-card v-for="(plant, i) in plants" :key="i" class="d-flex">
      <v-img
        :src="plant.images"
        height="150px"
      ></v-img>
      <v-row>
        <v-icon large text icon color="pink lighten-3" class="ml-3 pl-6">
          mdi-mushroom
        </v-icon>
        <v-col>
          <v-card-title class="pt-2 pl-6">
            {{ plant.name }}
            <!-- <span v-if="!editView"> Plant Name </span> -->
            <!-- <v-text-field v-else v-model="plant.name" dense label="Plant Name" outlined /> -->
            <v-chip color="indigo darken-3" small outlined class="ml-4">
              <i>{{ plant.scientificName }}</i>
            </v-chip>
          <!-- <v-text-field v-model="plant.sciname" dense label="Scientific Name" outlined /> -->
          </v-card-title>
          <v-card-subtitle class="pl-6">
            {{ plant }}
          </v-card-subtitle>
        </v-col>
        <!-- <v-spacer></v-spacer> -->
        <v-card-actions class="mr-2">
          <v-btn color="indigo" text dark @click="editView = !editView">
            EDIT
          </v-btn>
          <v-btn color="indigo" text class="mr-3">
            DELETE
          </v-btn>
        </v-card-actions>
      </v-row>
      <v-row>
        <v-card-text class="ml-3 pt-0 pb-6 px-6">
          {{ plant.description }}
        </v-card-text>
      </v-row>
    </v-card>  
  </v-card>
</template>

<script>
export default {
  props: {
    plants: {
      type: Array,
      required: true
    }
  },
}
</script>
