<template>
  <v-layout name="panel-and-map">
    <v-flex xs12 md6 lg5 name="panel">
      <v-layout wrap name="searchbar-card">
        <v-flex name="searchbar">
          <v-autocomplete
            :items="plants"
            dense
            filled
            label="Search for plant..."
            class="mt-4 mx-4"
          >
          </v-autocomplete>
        </v-flex>     
        <v-flex name="card">
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
                      {{ samplePlant.name }}
                      <!-- <span v-if="!editView"> Plant Name </span> -->
                      <!-- <v-text-field v-else v-model="plant.name" dense label="Plant Name" outlined /> -->
                      <v-chip color="indigo darken-3" small outlined class="ml-4">
                        <i>{{ samplePlant.scientificName }}</i>
                      </v-chip>
                      <!-- <v-text-field v-model="plant.sciname" dense label="Scientific Name" outlined /> -->
                    </v-card-title>
                    <v-card-subtitle class="pl-6">
                      Lat: {{ samplePlant.latitude }} &emsp; Lon:{{ samplePlant.longtitude }}
                    </v-card-subtitle>
                  </v-col>
                  <!-- <v-spacer></v-spacer> -->
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
                    {{ samplePlant.description }}
                  </v-card-text>
                </v-row>
              </v-window-item>
              <v-window-item :value="2">
                <!-- <v-row>
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="150px"
                    width="600px"
                    class="mx-6"
                  ></v-img>
                </v-row> -->
                <v-row class="mx-2 mb-0">
                  <v-col class="pb-0">
                    <v-text-field
                      clearable
                      clear-icon="cancel"
                      label="Name"
                      outlined
                      dense
                      rows="1"
                      :value="samplePlant.name"
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
                      :value="samplePlant.scientificName"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-card-actions class="mx-7 mb-6">
                    <p class="font-weight-light">
                      Choose icon &emsp;
                    </p>
                    <v-btn v-model="selected" color="pink" fab small outlined>
                      <v-icon>mdi-flower</v-icon>
                    </v-btn>
                    <v-btn v-model="selected" color="pink lighten-3" fab small outlined>
                      <v-icon>mdi-mushroom</v-icon>
                    </v-btn>
                    <v-btn v-model="selected" color="orange" fab outlined small>
                      <v-icon>mdi-carrot</v-icon>
                    </v-btn>
                    <v-btn v-model="selected" color="light-green" fab small outlined>
                      <v-icon>mdi-leaf</v-icon>
                    </v-btn>
                    <v-btn v-model="selected" color="green" fab small outlined>
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
                    :value="samplePlant.description"
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
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex name="map" style="border: 3px solid black; height:600px">
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      search: null,
      select: null,
      plants: ['plant1', 'plant2', 'plant3'], // need DB
      hover: false,
      editView: false,
      plant: {},
      confirmDelete: false,
      displayForm: 1,
      samplePlant:{
        name:'Cactus',
        scientificName: 'Cactaceae',
        latitude: 123.456789,
        longtitude: 123.456789,
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        icon: 'mdi-mushroom',
      },
      // selected: this.samplePlant.icon,
      options:[
        {
          iconName: 'mdi-flower',
          iconColour: 'pink',
          isSelected: false
        },
        {
          iconName: 'mdi-mushroom',
          iconColour: 'pink lighten-3',
          isSelected: false
        },
        {
          iconName: 'mdi-carrot',
          iconColour: 'orange',
          isSelected: false
        },
        {
          iconName: 'mdi-leaf',
          iconColour: 'light-green',
          isSelected: false
        },
        {
          iconName: 'mdi-tree',
          iconColour: 'green',
          isSelected: false
        }
      ]

    }
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val)
    },
    editView(val) {
      // eslint-disable-next-line no-console
      console.log(val)
    },
    colourIcon(val){
      // console.log(this.samplePlant.icon)
      this.options.forEach(()=>{if(this.options.iconName===this.selected){
        this.options.isSelected=true
      }})
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.plants.filter(e => {
          return (e || '').toLowerCase().include((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    }
  }
}
</script>
