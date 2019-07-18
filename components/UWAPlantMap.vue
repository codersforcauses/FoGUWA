<template>
  <google-map-loader
    :map-config="mapConfig"
    :api-key="apiKey"
    :map-inst.sync="map"
    :google-inst.sync="google"
  />
</template>

<script>
import GoogleMapLoader from './GoogleMapLoader'
import { uwaMapSettings } from '@/assets/js/mapSettings'
import { plants } from '@/assets/plantdb.json'

// Use https://www.gps-coordinates.net/ to easily fetch coordinates
const UWA_BOUNDS = {
  north: -31.972979992153224,
  south: -31.98713100347039,
  west: 115.81349721126503,
  east: 115.82249284467866
}
const UWA_COORDS = { lat: -31.9804624, lng: 115.818 }

export default {
  components: {
    GoogleMapLoader
  },
  data() {
    return {
      map: null,
      google: null,
      markerInstances: [],
      geolocatorId: null,
      userLocation: null
    }
  },
  computed: {
    apiKey() {
      return process.env.googleMapsApi.toString()
    },
    mapConfig() {
      return {
        center: UWA_COORDS,
        restriction: {
          latLngBounds: UWA_BOUNDS,
          strictBounds: false
        },
        minZoom: 7,
        maxZoom: 21,
        zoom: 15,
        ...uwaMapSettings
      }
    },
    markers() {
      // Generate array of markers
      const markers = [...plants] // Copy the array
      return markers
    }
  },
  watch: {
    // TODO these two watchers will be called quickly enough, such that both map and google are both defined
    map(val) {
      this.loadMarkers()
    },
    google(val) {
      this.loadMarkers()
    },
    markers(val) {
      this.loadMarkers()
    },
    userLocation(val) {
      // draw on map
      console.log(this.userLocation) // eslint-disable-line
    }
  },
  destroyed() {
    // Disable the geolocator, if necessary
    this.geolocatorDisable()
  },
  methods: {
    loadMarkers() {
      if (this.map && this.google) {
        // Clear old markers
        for (const marker of this.markerInstances) {
          marker.setMap(null)
        }
        this.markerInstances = []
        // Create new markers and store them
        this.markers.forEach((marker, index) => {
          const leafIcon = {
            path: 'M17 8C8 10 5.901 16.166 3.816 21.343l1.891.65.954-2.292c.482.168.976.299 1.339.299C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z',
            fillColor: '#008000',
            fillOpacity: 1.0,
            strokeColor: '#004d00',
            scale: 1
          }
          const statueIcon = {
            path: 'M17 8C8 10 5.901 16.166 3.816 21.343l1.891.65.954-2.292c.482.168.976.299 1.339.299C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z',
            fillColor: '#cd7f32',
            fillOpacity: 1.0,
            strokeColor: '#905923',
            scale: 1
          }
          // const leafIcon = {
          //   url: 'data:image/svg+xml;utf8,' + encodeURIComponent(this.$refs.leafIconSVG.outerHTML),
          //   size: null, // new this.google.maps.Size(24, 24),
          //   origin: null, // new this.google.maps.Point(0, 0),
          //   anchor: null, // new this.google.maps.Point(12, 12),
          //   scaledSize: new this.google.maps.Size(this.width, this.height)
          // }
          // Plot all instances
          for (const instance of marker.instances) {
            const markerInst = new this.google.maps.Marker({
              label: marker.name,
              position: instance.location,
              icon: (marker.type === 'tree' ? leafIcon : statueIcon),
              map: this.map
            })
            this.markerInstances.push(markerInst)
          }
        })
      }
    },
    // Geolocator
    geolocatorTest() {
      if (!navigator.geolocation) {
        this.$emit('geolocator-unavailable')
        this.$emit('log', { type: 'error', message: 'Geolocation is not available on this browser or device.' })
        return false
      }
      return true
    },
    geolocatorEnable() {
      // Check if geolocation is available
      if (!this.geolocatorTest()) {
        return
      }
      // Check if it's already setup
      if (this.geolocatorId != null) {
        return
      }
      // Setup the geolocator to access the devices location
      const options = {
        enableHighAccuracy: false,
        // timeout: 5000,
        maximumAge: 0
      }
      this.geolocatorId = navigator.geolocation.watchPosition(this.geolocationSuccess, this.geolocationError, options)
    },
    geolocatorDisable() {
      // Remove the geolocation watcher
      if (this.geolocatorId != null) {
        navigator.geolocation.clearWatch(this.geolocatorId)
        this.geolocatorId = null
      }
    },
    geolocationSuccess(location) {
      this.userLocation = {
        id: -1,
        label: 'user',
        position: { lat: location.coords.latitude, lng: location.coords.longitude }
      }
    },
    geolocationError(error) {
      // Setup error message
      const logEvent = {
        type: null,
        message: null
      }
      // Sanitise the error message
      switch (error.code) {
        case error.PERMISSION_DENIED:
          logEvent.type = 'info'
          logEvent.message = 'Allow location access to view your current location. This may require you to refresh your browser.'
          this.geolocatorDisable()
          break
        case error.POSITION_UNAVAILABLE:
          logEvent.type = 'error'
          logEvent.message = 'Location information is unavailable.'
          this.geolocatorDisable()
          break
        case error.TIMEOUT:
          logEvent.type = 'error'
          logEvent.message = 'Location information is unavailable.'
          this.geolocatorDisable()
          break
        case error.UNKNOWN_ERROR:
        default:
          logEvent.type = 'error'
          logEvent.message = 'Location information is unavailable.'
          this.geolocatorDisable()
          break
      }
      // Propagate the event
      this.$emit('log', logEvent)
    }
  }
}
</script>
