<template>
  <v-card class="mx-4">
    <v-window v-model="displayForm">
      <v-window-item :value="1">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="150px"
        ></v-img>
        <v-row>
          <v-icon large text icon color="pink lighten-3" class="ml-3 pl-6">
            mdi-mushroom
          </v-icon>
          <v-col>
            <v-card-title class="pt-2 pl-6">
              {{ plant.name }}
              <v-chip color="indigo darken-3" small outlined class="ml-4">
                <i>{{ plant.scientificName }}</i>
              </v-chip>
            </v-card-title>
            <!-- <v-card-subtitle class="pl-6">
              {{ plant.instance[0].heading }}
            </v-card-subtitle> -->
          </v-col>
          <v-card-actions class="mr-2">
            <v-btn color="indigo" text dark @click="displayForm++">
              EDIT
            </v-btn>
            <v-dialog v-model="confirmDelete" persistent max-width="290">
              <template v-slot:activator="{ on }">
                <v-btn color="indigo" text class="mr-3" v-on="on">
                  DELETE
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">
                  Delete this plant
                </v-card-title>
                <v-card-text>probably display the name of the plant they are about to delete here</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="indigo" text @click="confirmDelete = false">
                    NO
                  </v-btn>
                  <v-btn color="indigo" dark @click="confirmDelete = true">
                    YES
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-row>
        <v-row>
          <v-card-text class="ml-3 pt-0 pb-6 px-6">
            {{ plant.description }}
          </v-card-text>
        </v-row>
        <v-row>
          <v-divider class="mx-3"></v-divider>
        </v-row>

        <v-card
          v-for="(instance,i) in plant.instance" 
          :key="i" 
          tile
          flat
          class="px-3" 
          @mouseover="mouseOver(i)"
          @mouseout="mouseOut(i)"
        >
          <v-card-actions>
            {{ instance.heading }}
            <v-spacer></v-spacer>
            <div v-show="instance.showIcon">
              <v-btn text icon color="indigo">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn text icon color="indigo">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn text icon color="indigo">
                <v-icon>my_location</v-icon>
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-window-item>
      <v-window-item :value="2">
        <v-row class="mx-2 mb-0">
          <v-col class="pb-0">
            <v-text-field
              clearable
              clear-icon="cancel"
              label="Name"
              outlined
              dense
              rows="1"
              :value="plant.name"
            ></v-text-field>
          </v-col>
          <v-col class="pb-0">
            <v-text-field
              clearable
              clear-icon="cancel"
              label="Scientific Name"
              no-resize
              outlined
              dense
              rows="1"
              :value="plant.scientificName"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-card-actions class="mx-7 mb-6">
            <p class="font-weight-light">
              Choose icon &emsp;
            </p>
            <v-btn color="pink" fab small outlined>
              <v-icon>mdi-flower</v-icon>
            </v-btn>
            <v-btn color="pink lighten-3" fab small outlined>
              <v-icon>mdi-mushroom</v-icon>
            </v-btn>
            <v-btn color="orange" fab outlined small>
              <v-icon>mdi-carrot</v-icon>
            </v-btn>
            <v-btn color="light-green" fab small outlined>
              <v-icon>mdi-leaf</v-icon>
            </v-btn>
            <v-btn color="green" fab small outlined>
              <v-icon>mdi-tree</v-icon>
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
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
export default {
  props:{
    plant:{
      type: Object,
      required:true
    }
  },

  data: ()=>({
    confirmDelete: false,
    displayForm: 1,
  }),
  methods:{
    mouseOver(index) {
      this.plant.instance[index].showIcon = true
      },
    mouseOut(index) {
      this.plant.instance[index].showIcon = false
      }
    }
}
</script>