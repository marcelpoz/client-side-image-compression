<template>
  <section class="resized-image">
    <h3 class="resized-image__title">Resized image</h3>
    <div class="resized-image__inner">
      <Loader v-if="loading" class="resized-image__loader" />
      <span v-else-if="!file">Upload an image first chap</span>
      <figure class="resized-image__result" v-else>
        <img :src="result" alt="" />
        <figcaption><strong>Resized dimensions:</strong> {{ width }}*{{ height }}</figcaption>
        <figcaption><strong>File size:</strong> {{ size }}</figcaption>
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
      result: undefined,
      width: "unknown",
      height: "unknown",
      size: "unknown",
    };
  },

  watch: {
    file(file) {
      try {
        this.loading = true;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = URL.createObjectURL(file);
        image.onload = () => {
          const ratio = this.maxWidth / image.width;
          canvas.width = image.width * ratio;
          canvas.height = image.height * ratio;
          console.log(canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

          canvas.toBlob((blob) => {
            this.result = URL.createObjectURL(blob);
            this.size = `${Math.round(blob.size / 1024)} KB`;
            const resizedImage = new Image();
            resizedImage.src = this.result;
            resizedImage.onload = () => {
              this.width = `${resizedImage.width}`;
              this.height = `${resizedImage.height}px`;
            };
          }, "image/jpeg", 0.75);
        };
      } catch (error) {
        this.error = true;
        console.error(error);
      } finally {
        this.loading = false;
      }
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
