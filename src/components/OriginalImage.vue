<template>
  <div class="original-image">
    <h3 class="original-image__title">Original image</h3>
    <div class="original-image__inner">
      <Loader v-if="loading" class="original-image__loader" />
      <span v-else-if="!file">Upload an image first kidda</span>
      <span v-else-if="error">Something went wrong oh no!</span>
      <figure class="original-image__result" v-else>
        <img :src="result" alt="" />
        <figcaption>
          Dimensions: <strong>{{ width }}x{{ height }}</strong>
        </figcaption>
        <figcaption>
          File size: <strong>{{ size }}</strong>
        </figcaption>
      </figure>
    </div>
  </div>
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
    file(file) {
      if (!file) return;

      try {
        this.loading = true;
        const result = URL.createObjectURL(file);
        const image = new Image();
        image.src = result;
        image.onload = () => {
          this.width = `${image.width}`;
          this.height = `${image.height}px`;
          this.size = `${Math.round(file.size / 1024)} KB`;
          this.result = result;
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
.original-image {
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
