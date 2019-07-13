<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    focusable="false"
    width="1em"
    height="1em"
    style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <path
      d="M17 8C8 10 5.901 16.166 3.816 21.343l1.891.65.954-2.292c.482.168.976.299 1.339.299C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"
      fill="green"
      fillColor="#008000"
      fillOpacity="1.0"
      strokeColor="#004d00"
    />
  </svg>
</template>

<script>
export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    marker: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      markerInst: null
    }
  },
  mounted() {
    const leaf = {
      path: 'M17 8C8 10 5.901 16.166 3.816 21.343l1.891.65.954-2.292c.482.168.976.299 1.339.299C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z',
      fillColor: '#008000',
      fillOpacity: 1.0,
      strokeColor: '#004d00',
      scale: 1
    }
    this.markerInst = new this.google.maps.Marker({
      label: this.marker.label,
      position: this.marker.position,
      icon: leaf,
      map: this.map
    })
  }
}
</script>
