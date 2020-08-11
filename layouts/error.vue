<template>
  <div>
    <error-graphic :error-code="error.statusCode" />
    <p id="text">
      {{ error.message }}
    </p>
  </div>
</template>

<script>
import ErrorGraphic from '~/components/error/ErrorGraphic.vue'
 
export default {
  components: {
    'error-graphic': ErrorGraphic
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
}
</script>

<style scoped>
#text {
  text-align: center;
  width: 800px;
  font-family: 'Roboto';
  font-weight: 600;
  font-size: 30px;
  color: #666;
  position: absolute;
  left: calc(50vw - 400px);
  top: calc(50vh + 150px);
}
</style>