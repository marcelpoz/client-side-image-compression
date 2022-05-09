<template>
  <div id="app">
    <div class="container">
      <h1>Compress img to smaller boi using canvas</h1>
      <p>
        This is a simple image compression tool that uses canvas to resize
        images to a max width of:
      </p>

      <FieldInput
        type="number"
        name="maxWidth"
        class="max-width-input"
        placeholder-value="Enter number here..."
        value-type="px"
        :initial-value="maxWidth"
        @input="handleMaxWidthInputChange"
      />
      <FieldImageUpload
        name="image-field"
        @change="handleFieldImageUploadChange"
      >
        <template #label>
          <span>Upload an image</span>
        </template>
      </FieldImageUpload>

      <button
        class="upload"
        :disabled="!file || !maxWidth"
        @click="handleResizeClick"
      >
        Resize and compress
      </button>

      <div class="output">
        <OriginalImgOutput :file="file" />
        <ResizedImage :key="resizeKey" :file="resizeFile" :max-width="resizeMaxWidth" />
      </div>
    </div>
  </div>
</template>

<script>
import FieldInput from "./components/FieldInput.vue";
import FieldImageUpload from "./components/FieldImageUpload.vue";
import ResizedImage from "./components/ResizedImage.vue";
import OriginalImgOutput from "./components/OriginalImage.vue";

export default {
  components: {
    FieldInput,
    FieldImageUpload,
    ResizedImage,
    OriginalImgOutput,
  },

  data() {
    return {
      file: undefined,
      maxWidth: "500",
      resizeFile: undefined,
      resizeMaxWidth: 500,
      resizeKey: 0,
    };
  },

  methods: {
    handleFieldImageUploadChange(file) {
      this.file = file;
    },

    handleMaxWidthInputChange(value) {
      this.maxWidth = value;
    },

    handleResizeClick() {
      this.resizeKey += 1;
      this.resizeFile = this.file;
      this.resizeMaxWidth = Number(this.maxWidth);
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.container {
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 0 auto;
  align-items: center;
  justify-content: flex-start;
}

.output {
  display: flex;
  gap: 2rem;
}

h1 {
  margin-bottom: 2rem;
}

.max-width-input {
  margin: 2rem 0;
}

.upload {
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #24a0ed;
  color: white;
  border-radius: 0.25rem;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: #1183ca;
  }
}
</style>
