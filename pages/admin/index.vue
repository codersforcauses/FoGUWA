<template>
  <div class="text-center ma-12">
    <v-progress-circular
      :size="70"
      :width="7"
      indeterminate
      color="primary"
      class="mb-4"
    />
  </div>
</template>
<script>
export default {
  mounted(){
    this.$router.replace({ path: '/admin/plants' })
  }
}
</script>
