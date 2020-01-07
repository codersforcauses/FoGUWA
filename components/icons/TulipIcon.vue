<template>
  <svg
    ref="TulipIconSVG"
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
      :fill="fillColour"
      :stroke="strokeColour"
      d="M3,13A9,9 0 0,0 12,22A9,9 0 0,0 3,13M12,22A9,9 0 0,0 21,13A9,
      9 0 0,0 12,22M18,3V8A6,6 0 0,1 12,14A6,6 0 0,1 6,8V3C6.74,3 7.47,
      3.12 8.16,3.39C8.71,3.62 9.2,3.96 9.61,4.39L12,2L14.39,4.39C14.8,
      3.96 15.29,3.62 15.84,3.39C16.53,3.12 17.26,3 18,3Z"
      fillOpacity="1.0"
    />
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'leaf'
    },
    width: {
      type: Number,
      default: 24
    },
    height: {
      type: Number,
      default: 24
    },
    fillColour: {
      type: String,
      default: '#f7b538'
    },
    strokeColour: {
      type: String,
      default: '#f7d55b'
    }
  }
}
</script>
