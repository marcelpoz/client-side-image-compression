<template>
  <div id="app">
    <div class="container">
      <h1>Compress img to smaller boi using canvas</h1>
      <p>
        This is a simple image compression tool that uses canvas to resize
        images to a max width of 500px.
      </p>
      <FieldImageUpload
        name="image-field"
        @change="handleFieldImageUploadChange"
      >
        <template #label>
          <span>Upload an image</span>
        </template>
      </FieldImageUpload>

      <div class="output">
        <OriginalImgOutput :file="file" />
        <CanvasOutput :file="file" />
      </div>
    </div>
  </div>
</template>

<script>
import FieldImageUpload from "./components/FieldImageUpload.vue";
import CanvasOutput from "./components/ResizedImage.vue";
import OriginalImgOutput from "./components/OriginalImage.vue";

export default {
  components: {
    FieldImageUpload,
    CanvasOutput,
    OriginalImgOutput,
  },

  data() {
    return {
      file: undefined,
    };
  },

  methods: {
    handleFieldImageUploadChange(file) {
      this.file = file;
    },
  },
};
</script>

<style scoped>
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

p {
  margin-bottom: 2rem;
}
</style>
