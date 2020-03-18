<template>
  <div>
    <v-row class="mx-5 mt-5 mb-0 pb-0">
      <code>{{ JSON.stringify(plant) }}</code>
      <!-- <v-text-field
          clearable
          clear-icon="cancel"
          label="Optional heading"
          outlined
          dense
          rows="1"
          :v-model="selectThisInst"
          :value="plant.instance[selectThisInst].heading"
        ></v-text-field> -->
      <v-btn outlined color="secondary darken-2" class="ml-3">
        <v-icon>my_location</v-icon>&nbsp;move on map
      </v-btn>
    </v-row>
    <v-row>
      <!-- <v-textarea
          clearable
          clear-icon="cancel"
          label="Description"
          outlined
          :value="plant.instance[selectThisInst].description"
          class="mx-8"
          rows="10"
          no-resize
        ></v-textarea> -->
      <v-card-actions class="px-4 pb-4 pt-0">
        <v-btn color="primary" text @click="displayForm++">
          BACK
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark>
          SAVE
        </v-btn>
      </v-card-actions>
    </v-row>
    <v-row>
      <v-textarea
        clearable
        clear-icon="cancel"
        label="Description"
        outlined
        :value="plant.description"
        class="mx-8"
        rows="10"
      ></v-textarea>
    </v-row>
    <v-card-actions class="px-4 pb-4">
      <v-btn color="indigo" text @click="displayForm--">
        BACK
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="indigo" dark>
        SAVE
      </v-btn>
    </v-card-actions>
  </div>
</template>
