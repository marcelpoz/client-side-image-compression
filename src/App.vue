<template>
  <div id="app" :class="{ 'size-reduction-active': sizeReduction }">
    <div class="container">
      <h1>Compress img to smaller boi using canvas</h1>
      <p>
        This is a simple image compression tool that uses canvas to resize
        images.
      </p>

      <form @submit.prevent="handleResizeClick">
        <FieldInput
          class="max-width-input"
          type="number"
          name="maxWidth"
          label-value="Max width"
          placeholder-value="Enter number here..."
          value-type="px"
          min="1"
          :initial-value="maxWidth"
          @input="handleMaxWidthInputChange"
        />
        <FieldInput
          class="max-width-input"
          type="number"
          name="quality"
          label-value="Quality level"
          placeholder-value="Enter number here..."
          value-type="%"
          min="1"
          max="100"
          :initial-value="quality"
          @input="handleQualityInputChange"
        />
        <FieldImageUpload
          name="image-field"
          @change="handleFieldImageUploadChange"
        >
          <template #label>
            <span>Upload an image</span>
          </template>
        </FieldImageUpload>

        <button class="btn" :disabled="!formIsValid || formHasNotChanged">
          Resize and compress
        </button>
      </form>

      <div class="output">
        <OriginalImgOutput :file="file" />
        <ResizedImage
          :key="resizeKey"
          :file="resizeFile"
          :max-width="resizeMaxWidth"
          :quality="resizeQuality"
          @change="handleResizeChange"
        />
      </div>
    </div>

    <footer class="size-reduction" :class="{ active: sizeReduction }">
      Size reduced by <span>{{ sizeReduction }}%</span>
    </footer>
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
      quality: "75",
      resizeFile: undefined,
      resizeMaxWidth: 500,
      resizeQuality: 0.75,
      resizeKey: 0,
      sizeReduction: undefined,
    };
  },

  computed: {
    formIsValid() {
      return this.file && this.maxWidth && this.quality;
    },

    formHasNotChanged() {
      return (
        this.resizeFile === this.file &&
        this.resizeMaxWidth === Number(this.maxWidth) &&
        this.quality === `${this.resizeQuality * 100}`
      );
    },
  },

  methods: {
    handleFieldImageUploadChange(file) {
      this.file = file;
    },

    handleMaxWidthInputChange(value) {
      this.maxWidth = value;
    },

    handleQualityInputChange(value) {
      this.quality = value;
    },

    handleResizeClick() {
      if (!this.formIsValid || this.formHasNotChanged) return;

      this.resizeKey += 1;
      this.resizeFile = this.file;
      this.resizeMaxWidth = Number(this.maxWidth);
      this.resizeQuality = Number(this.quality) / 100;
    },

    handleResizeChange({ originalSize, resizeSize }) {
      console.log({ originalSize, resizeSize });
      this.sizeReduction = (
        ((originalSize - resizeSize) / originalSize) *
        100
      ).toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
  padding: 3.2rem;
  text-align: center;

  &.size-reduction-active {
    padding-bottom: 18.2rem;
  }
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

.size-reduction {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 15rem;
  padding: 2rem;
  margin-top: 2rem;
  background-color: #24a0ed;
  color: white;
  transform: translate3d(0, 100%, 0);
  transition: transform 0.2s ease-in-out;

  &.active {
    transform: translate3d(0, 0, 0);
  }

  > span {
    display: block;
    margin: 0.25em 0;
    font-size: 3.2em;
    font-weight: bold;
  }
}
</style>
