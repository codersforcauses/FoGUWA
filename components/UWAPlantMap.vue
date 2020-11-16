<template>
  <google-map-loader
    :map-config="mapConfig"
    :map-inst.sync="map"
    :google-inst.sync="google"
  />
</template>

<script>
/* eslint-disable import/order */
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import GoogleMapLoader from './GoogleMapLoader'
import { uwaMapSettings } from '@/assets/js/mapSettings'
import iconData from '@/assets/js/plantIcons'
const { iconStyle } = iconData

// Use https://www.gps-coordinates.net/ to easily fetch coordinates
const UWA_BOUNDS = {
  north: -31.972979992153224,
  south: -31.98713100347039,
  west: 115.81349721126503,
  east: 115.82249284467866
}
const UWA_COORDS = { lat: -31.976764, lng: 115.818220 }

export default {
  components: {
    'google-map-loader': GoogleMapLoader,
  },
  data: () => ({
    map: null,
    google: null,
    markerInstances: [],
    userMarker: null,
    mapCenter: UWA_COORDS
  }),
  computed: {
    ...mapState(['position']),
    ...mapGetters({
      plants: 'plants/getPlants',
      getPlantIcon: 'plants/getPlantIcon',
      centeredInstance: 'plants/getCenteredInstance',
      draggableInstance: 'plants/getDraggableInstance',
      updateMap: 'plants/updateMap',
    }),
    mapConfig() {
      return {
        center: this.mapCenter,
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
  },
  watch: {
    map() {
      this.loadMarkers()
    },
    google() {
      this.loadMarkers()
    },
    updateMap() {
      this.loadMarkers()
      this.mapUpdateNeeded(false)
    },
    centeredInstance(instance){
      if(instance){
        const [ lat, lng ] = instance.location.coordinates
        this.map.panTo({ lat, lng })
        this.setCenteredInstance(null)
      }
    },
    draggableInstance(instance){
      if(instance){
        const markerIndex = this.markerInstances.findIndex(( markerInstance ) => {
          return markerInstance.instance === instance._id
        })
        this.markerInstances[markerIndex].marker.setZIndex(1)
        this.markerInstances[markerIndex].marker.setDraggable(true)
      } else {
        this.markerInstances.forEach(markerInstance => {
          markerInstance.marker.setZIndex(0)
          markerInstance.marker.setDraggable(false)
        })
      }
    },
    position() {
      if (!this.userMarker) {
        if (this.position) {
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
    ...mapMutations({
      setSelectedPlant: 'plants/setSelectedPlant',
      setSelectedInstance: 'plants/setSelectedInstance',
      setDraggableInstance: 'plants/setDraggableInstance',
      setCenteredInstance: 'plants/setCenteredInstance',
      setSelectedInstancePosition: 'plants/setSelectedInstancePosition',
      mapUpdateNeeded: 'plants/mapUpdateNeeded'
    }),
    ...mapActions({
      loadPlants: 'plants/loadPlants',
      loadImages: 'images/loadImages'
    }),
    async loadMarkers() {
      if (this.map && this.google) {
        if(this.plants.length === 0) {
          await this.loadPlants()
          this.loadPlants()
        }
        this.clearMarkers()        
        // Create new markers and store them
        this.plants.forEach((plant, index) => {
          // Plot all instances
          plant.instances.forEach(instance => {
            const markerInst = this.createMarkerInstance(plant, instance)
            this.addListenerToMarker(markerInst, plant, instance)
            this.markerInstances.push({ instance: instance._id, marker: markerInst })
          })
        })
      }
    },
    clearMarkers() {
      this.markerInstances.forEach(({ marker }) => {
        marker.setMap(null)
      })
      this.markerInstances = []
    },
    createMarkerInstance(plant, instance) {
      const icon = this.getPlantIcon(plant.icon)
      Object.keys(iconStyle).forEach(style => {
        icon[style] = iconStyle[style]
      })
      return new this.google.maps.Marker({
        label:{
            text: plant.name,
            fontFamily: 'Roboto',
            fontWeight: 'Bold',
            color: '#444444'
          },
        position: {
          lat: instance.location.coordinates[0],
          lng: instance.location.coordinates[1]
        },
        icon: {
          labelOrigin: new this.google.maps.Point(10, -5),
          anchor: new this.google.maps.Point(10, 15),
          ...icon
        },
        map: this.map,
      })
    },
    addListenerToMarker(markerInstance, plant, instance) {
      markerInstance.addListener('click', () => {
        this.setSelectedPlant(plant._id)
        this.setSelectedInstance(instance._id)
        this.$emit('plant-clicked', { plant, instance })
      })
      this.google.maps.event.addListener(markerInstance, 'dragend', () => {
        this.handleDrag(markerInstance, instance)
      })
    },
    handleDrag(marker, instance){
      this.setSelectedInstancePosition([marker.position.lat(), marker.position.lng()])
    }
  }
}
</script>
