<template>
  <v-card height="100%">
    <plant-info
      v-model="infoDrawer"
      :plant-info="plantInfo"
    />
    <google-map-loader
      :map-config="mapConfig"
      :map-inst.sync="map"
      :google-inst.sync="google"
    />
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
// eslint-disable-next-line import/order
import PlantInfo from './PlantInfo.vue'
import { plants } from '@/assets/plantdb.json'
import iconData from '@/assets/js/plantIcons.js'
import { uwaMapSettings } from '@/assets/js/mapSettings'
// eslint-disable-next-line import/order
import GoogleMapLoader from './GoogleMapLoader'
const { iconStyle, ...iconPaths } = iconData

// Use https://www.gps-coordinates.net/ to easily fetch coordinates
const UWA_BOUNDS = {
  north: -31.972979992153224,
  south: -31.98713100347039,
  west: 115.81349721126503,
  east: 115.82249284467866
}
const UWA_COORDS = { lat: -31.976764, lng: 115.818220 }

const defaultInfo = {
  plantName: 'Plants and Trees',
  sciName: 'Planticus Namium',
  images: [
    'http://www.ahachemistry.com/uploads/1/1/8/3/118378549/dsc-5454_orig.jpg',
    'http://www.ahachemistry.com/uploads/1/1/8/3/118378549/dsc-7528_orig.jpg',
    'http://www.ahachemistry.com/uploads/1/1/8/3/118378549/20090626-uwa-grounds2-007_orig.jpg'
  ],
  description:
    'Plants are mainly multicellular, predominantly photosynthetic eukaryotes of the kingdom Plantae. Historically, plants were treated as one of two kingdoms including all living things that were not animals, and all algae and fungi were treated as plants.'
}

export default {
  components: {
    'google-map-loader': GoogleMapLoader,
    'plant-info': PlantInfo
  },
  data: () => ({
    map: null,
    google: null,
    markerInstances: [],
    userMarker: null,
    infoDrawer: false,
    plantInfo: defaultInfo
  }),
  computed: {
    ...mapState(['position']),
    mapConfig() {
      return {
        center: UWA_COORDS,
        restriction: {
          latLngBounds: UWA_BOUNDS,
          strictBounds: false
        },
        zoom: 18,
        minZoom: 18,
        maxZoom: 21,
        ...uwaMapSettings
      }
    },
    defaultInfo() {
      return {
        plantName: 'Plant Name',
        sciName: 'Scientific Plant Name',
        images: [
          'http://www.ahachemistry.com/uploads/1/1/8/3/118378549/dsc-5454_orig.jpg',
          'http://www.ahachemistry.com/uploads/1/1/8/3/118378549/dsc-7528_orig.jpg',
          'http://www.ahachemistry.com/uploads/1/1/8/3/118378549/20090626-uwa-grounds2-007_orig.jpg'
        ],
        description:
          'Plants are mainly multicellular, predominantly photosynthetic eukaryotes of the kingdom Plantae. Historically, plants were treated as one of two kingdoms including all living things that were not animals, and all algae and fungi were treated as plants.'
      }
    }
  },
  watch: {
    map(val) {
      this.loadMarkers()
    },
    google(val) {
      this.loadMarkers()
    },
    markers(val) {
      this.loadMarkers()
    },
    position() {
      if (this.userMarker === null) {
        if (this.position !== null) {
          this.userMarker = new this.google.maps.Marker({
            position: this.position,
            icon: {
              url: require('~/assets/images/loc.svg'),
              scaledSize: new this.google.maps.Size(32, 32)
            },
            map: this.map,
            zIndex: 10
          })
        }
      } else if (this.position.lat === 0 && this.position.lng === 0) {
        this.userMarker.setMap(null)
        this.userMarker = null
      } else {
        this.userMarker.setPosition(this.position)
        this.map.panTo(this.position)
      }
    }
  },
  methods: {
    loadMarkers() {
      if (this.map && this.google) {
        this.clearMarkers()        
        // Create new markers and store them
        plants.forEach((plant, index) => {
          // Plot all instances
          plant.instances.forEach(instance => {
            const markerInst = this.createMarkerInstance(plant, instance)
            this.addListenerToMarker(markerInst, plant)
            this.markerInstances.push(markerInst)
          })
        })
      }
    },
    clearMarkers() {
      this.markerInstances.forEach(marker => {
        marker.setMap(null)
      })
      this.markerInstances = []
    },
    createMarkerInstance(plant, instance) {
      const icon = iconPaths.hasOwnProperty(plant.type)
                  ? iconPaths[plant.type]
                  : iconPaths.info
      Object.keys(iconStyle).forEach(style => {
        icon[style] = iconStyle[style]
      })
      return new this.google.maps.Marker({
        label: plant.name,
        position: instance.location,
        icon,
        map: this.map
      })
    },
    addListenerToMarker(markerInstance, plant) {
      markerInstance.addListener('click', () => {
        this.plantInfo = plant
        this.plantInfo.images = plant.images || defaultInfo.images
        this.infoDrawer = true
      })
    }
  }
}
</script>
