<template>
  <v-window v-model="displayForm">
    <v-window-item :value="2">
      <v-btn
        fab
        absolute
        left
        small
        depressed
        color="#00000077"
        :ripple="false"
        class="mt-2"
        @click="$router.go(-1)"
      >
        <v-icon color="white">
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="150px"
      ></v-img>
      <div class="d-flex">
        <v-icon text icon :color="icons[plant.icon].fillColor" size="42" class="ml-3 pl-6">
          {{ icons[plant.icon].mdiName }}
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
          <v-btn color="primary" text dark @click="displayForm++">
            EDIT
          </v-btn>
          <v-dialog v-model="confirmDelete" persistent max-width="290">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" text class="mr-3" v-on="on">
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
                <v-btn color="primary" text @click="confirmDelete = false">
                  NO
                </v-btn>
                <v-btn color="primary" dark @click="confirmDelete = true">
                  YES
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </div>
      <v-card-text class="pt-0 pb-6 px-6">
        {{ plant.description }}
      </v-card-text>
      <v-divider />
      <v-list>
        <v-list-item
          v-for="(instance,i) in plant.instance"
          :key="i"
          class="list-item"
          @mouseover="showByIndex = i"
          @mouseout="showByIndex = null"
        >
          <v-list-item-content>
            <v-list-item-title>{{ instance.heading }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action v-show="showByIndex === i" class="action">
            <v-btn icon color="primary" @click="displayForm--;selectThisInst=i">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="primary">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn icon color="primary">
              <v-icon>my_location</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-window-item>
    <v-window-item :value="3">
      <div class="mt-8">
        <v-text-field
          clearable
          clear-icon="cancel"
          label="Name"
          outlined
          dense
          rows="1"
          :value="plant.name"
          class="mx-4"
        ></v-text-field>
        <v-text-field
          clearable
          clear-icon="cancel"
          label="Scientific Name"
          no-resize
          outlined
          dense
          rows="1"
          :value="plant.scientificName"
          class="mx-4"
        ></v-text-field>
        <v-card-actions class="mx-4 mb-6">
          <p class="font-weight-light ma-0">
            Choose icon &emsp;
          </p>
          <v-btn-toggle :v-model="selectedBtn">
            <v-btn
              v-for="(icon, i) in icons"
              :key="i"
              :color="icon.fillColor"
              icon
              outlined
              class="round mx-1"
              :style="{ borderColor: `${selectedBtn === getIconIndex(i) ? icon.fillColor: 'grey'} !important` }"
            >
              <v-icon :color="selectedBtn === getIconIndex(i) ? icon.fillColor: 'grey'">
                {{ icon.mdiName }}
              </v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-card-actions>
        <v-textarea
          clearable
          clear-icon="cancel"
          label="Name"
          outlined
          :value="plant.description"
          class="mx-4"
          rows="10"
          no-resize
        ></v-textarea>
        <v-card-actions class="px-4 pb-4">
          <v-btn color="primary" text @click="displayForm--">
            BACK
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark>
            SAVE
          </v-btn>
        </v-card-actions>
      </div>
    </v-window-item>
    <v-window-item :value="1">
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
    </v-window-item>
  </v-window>
</template>

<script>
import iconData from '@/assets/js/plantIcons'
const { iconStyle, ...icons } = iconData
export default {
  props:{
    plant:{
      type: Object,
      // required:true,
      default: () => ({
        name: 'Cactus',
        scientificName: 'Cactaceae',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        icon: 'leaf',
        instance: [
          {
            location: {
              type: '',
              coordinates: [100,100]
            },
            heading: 'The cactus near the pond',
            description: 'it is right next to the pond',
          },
          {
            location: {
              type: '',
              coordinates: [100,100]
            },
            heading: 'The very old cactus',
            description: 'he was born in 1950s',
          }
        ],
      } )
    }
  },
  data: () => ({
    confirmDelete: false,
    displayForm: 2,
    showByIndex: null,
    selectedBtn: 0,
    selectThisInst:0
  }),
  computed: {
    icons() {
      return icons
    },
    // iconSelected() {
    //   return this.getIconIndex(this.plant.icon)
    // },
  },
  mounted() {
    this.selectedBtn = this.getIconIndex(this.plant.icon)
  },
  updated() {
    this.selectedBtn = this.getIconIndex(this.plant.icon)
  },
  methods: {
    getIconIndex(iconName){// this requires for the button group to work
      const iconIndexList = [
        "other",
        "leaf",
        "tree",
        "tulip",
        "lotus"
      ]
      return iconIndexList.indexOf(iconName);
    }
  }
  
}
</script>

<style>
.list-item {
  min-height: 60px;
}
.action {
  width: 100px;
  display: flex;
  flex-direction: row;
}
.round {
  border-radius: 50% !important;
  border-width: 2px !important;
}
</style>
