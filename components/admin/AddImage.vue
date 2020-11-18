<template>
  <div class="text-center">
    <v-dialog
      persistent
      :value="dialog"
      width="500"
    >
      <v-card class="px-3">
        <v-card-title class="mb-3">
          Add Image
        </v-card-title>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="alt"
            :rules="titleRules"
            label="Title"
            placeholder="Image Title"
            prepend-icon="mdi-image"
            outlined
          >
          </v-text-field>
          <v-file-input
            v-model="file"
            :rules="fileRules"
            color="primary accent-4"
            counter
            label="Image Add"
            placeholder="Select your image"
            accept="image/jpeg image/png"
            prepend-icon="mdi-camera"
            outlined
            :show-size="1000"
          >
          </v-file-input>
        </v-form>
        <v-card-actions>
          <v-btn
            color="error"
            outlined
            @click="handleClose"
          >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="!valid" @click="uploadImage">
            <div v-if="!loading">
              Add
            </div>
            <v-progress-circular v-else size="20" indeterminate />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    alt: '',
    file: null,
    valid: false,
    loading: false,
    fileRules: [
      value => !value || value.size < 16000000 || 'Image size must be less than 16MB',
    ],
    titleRules: [
      value => !!value || 'Images need an alternate title',
    ],
  }),
  methods: {
    async uploadImage() {
      try {
        this.loading = true
        const { url: uploadUrl, key } = await this.$axios.$post('/api/image', { contentType: this.file.type, fileName: this.file.name })
        await fetch(uploadUrl, { // Using fetch as it doesn't send auth token
          method: 'PUT',
          headers: {
            'Content-Type': this.file.type
          },
          body: this.file
        })
        this.$emit('upload-complete', { src: `${process.env.S3_BASE_URL}${key}`, alt: this.alt })
        this.handleClose()
      } catch(err) {
        this.loading = false
        console.log(err)  // TODO Set error vuex
        console.log('Error uploading image')  // TODO Set error vuex
      }
    },
    handleClose() {
      this.loading = false
      this.$emit('close-dialog')
      this.$refs.form.reset()
    }
  }
}
</script>
