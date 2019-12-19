<template>
  <div>
    {{ plantName }}
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    plantName: {
      type: String,
      default: 'Banana Doppio',
      required: true
    },
    sciName: {
      type: String,
      default: 'Banana Diavolo'
    },
    images: {
      type: Array,
      default: () => {}
    },
    description: {
      type: String,
      default: 'Beautiful Banana Doppio'
    }
  }
}
</script>
