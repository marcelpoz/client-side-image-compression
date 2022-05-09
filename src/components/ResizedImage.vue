<template>
  <section class="resized-image">
    <h3 class="resized-image__title">Resized image</h3>
    <div class="resized-image__inner">
      <Loader v-if="loading" class="resized-image__loader" />
      <span v-else-if="!file">Upload an image first chap</span>
      <figure class="resized-image__result" v-else>
        <img :src="result" alt="" />
        <figcaption>
          Dimensions: <strong>{{ width }}x{{ height }}</strong>
        </figcaption>
        <figcaption>
          File size: <strong>{{ size }}</strong>
        </figcaption>
      </figure>
    </div>
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

  watch: {
    file: {
      immediate: true,
      handler(file) {
        if (!file) return;

        try {
          this.loading = true;
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const image = new Image();
          image.src = URL.createObjectURL(file);
          image.onload = () => {
            const ratio = this.maxWidth / image.width;

            if (ratio < 1) {
              canvas.width = image.width * ratio;
              canvas.height = image.height * ratio;
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

              canvas.toBlob(
                (blob) => {
                  const result = URL.createObjectURL(blob);
                  const size = `${Math.round(blob.size / 1024)} KB`;
                  const resizedImage = new Image();
                  resizedImage.src = result;
                  resizedImage.onload = () => {
                    this.size = size;
                    this.width = resizedImage.width;
                    this.height = `${resizedImage.height}px`;
                    this.result = result;
                  };
                },
                "image/jpeg",
                0.75
              );
            } else {
              this.result = URL.createObjectURL(file);
              this.size = `${Math.round(file.size / 1024)} KB`;
              this.width = image.width;
              this.height = `${image.height}px`;
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
