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
            accept="image/*"
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
            @click="$emit('close-dialog')"
          >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="!valid" @click="encodeImage">
            Add
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
    fileRules: [
      value => !value || value.size < 16000000 || 'Image size must be less than 16MB',
    ],
    titleRules: [
      value => !!value || 'Images need an alternate title',
    ],
  }),
  methods: {
    encodeImage() {
      this.toDataURL(this.file, (data) => {
        this.$emit('encode-complete', { data, alt: this.alt })
        this.file = null
        this.$refs.form.resetValidation()
        this.$refs.form.reset()
        this.$emit('close-dialog')
      },
      'image/png')
    },
    toDataURL(file, callback, outputFormat) {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        callback(reader.result)
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }
}
</script>