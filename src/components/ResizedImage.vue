<template>
  <section class="resized-image">
    <h3 class="resized-image__title">Resized image</h3>
    <div class="resized-image__inner">
      <Loader v-if="loading" class="resized-image__loader" />
      <span v-else-if="!file">Click the resize button then ar kid</span>
      <figure class="resized-image__result" v-else>
        <img :src="result" alt="" />
        <figcaption>
          Dimensions: <strong>{{ width }}x{{ height }}</strong>
        </figcaption>
        <figcaption>
          File size: <strong>{{ size }} KB</strong>
        </figcaption>
      </figure>
    </div>

    <footer class="resized-image__footer">
      <a class="btn" :disabled="!result" :href="result" download
        >↓ Download image</a
      >
    </footer>
  </section>
</template>

<script>
import Loader from "./Loader.vue";

export default {
  components: {
    Loader,
  },

  props: {
    file: {
      type: File,
      default: undefined,
    },

    maxWidth: {
      type: Number,
      default: 500,
    },

    quality: {
      type: Number,
      default: 0.75,
    },
  },

  data() {
    return {
      loading: false,
      error: false,
      result: undefined,
      width: "unknown",
      height: "unknown",
      size: "unknown",
    };
  },

  emits: ["change"],

  watch: {
    file: {
      immediate: true,
      handler(file) {
        if (!file) return;

        try {
          this.loading = true;

          // Get the original size of the file in KB
          const originalSize = Math.round(file.size / 1024);

          // Bind the file to an image object and load it
          const image = new Image();
          image.src = URL.createObjectURL(file);
          image.onload = () => {
            // Check if the image is too large
            const ratio = this.maxWidth / image.width;

            // When the ratio is lower than 1, the image is larger than it should be and we need to resize it
            if (ratio < 1) {

              // Create 2D canvas context
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");

              // Set the width and height of the canvas resized to the original image and ratio calculated above
              canvas.width = image.width * ratio;
              canvas.height = image.height * ratio;

              // Draw the image on the canvas based on these sizes
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

              // Convert this new canvas to a blob
              canvas.toBlob(
                (blob) => {
                  // Create a new file object from the blob and get its size
                  const result = URL.createObjectURL(blob);

                  // Load the new file object into its own image object
                  const resizedImage = new Image();
                  resizedImage.src = result;
                  resizedImage.onload = () => {
                    // After loading it we can get its file size, new dimensions and display it
                    this.size = Math.round(blob.size / 1024);
                    this.width = resizedImage.width;
                    this.height = `${resizedImage.height}px`;
                    this.result = result;

                    // Emit the change to the parent component
                    this.$emit("change", {
                      originalSize,
                      resizeSize: this.size,
                    });
                  };
                },
                "image/jpeg",
                this.quality
              );
            } else {
              this.result = URL.createObjectURL(file);
              this.size = originalSize;
              this.width = image.width;
              this.height = `${image.height}px`;
              this.$emit("change", {
                originalSize,
                resizeSize: originalSize, // * Unchanged so identical to original
              });
            }
          };
        } catch (error) {
          this.error = true;
          console.error(error);
        } finally {
          this.loading = false;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.resized-image {
  &__title {
    margin-bottom: 1em;
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 500px;
    width: 500px;
    background-color: #fafafa;
    border: 1px solid #ccc;
  }

  &__result {
    > img {
      max-width: 100%;
    }

    > figcaption {
      margin: 0.5em 0;
    }
  }

  &__loader {
    font-size: 4.8rem;
  }
}
</style>
