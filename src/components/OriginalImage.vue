<template>
  <div class="original-image">
    <h3 class="original-image__title">Original image</h3>
    <div class="original-image__inner">
      <Loader v-if="loading" class="original-image__loader" />
      <span v-else-if="!file">Upload an image first chap</span>
      <span v-else-if="error">Something went wrong oh no!</span>
      <figure class="original-image__result" v-else>
        <img :src="result" alt="" />
        <figcaption>Original dimensions: {{ width }}*{{ height }}</figcaption>
        <figcaption>File size: {{ size }}</figcaption>
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
        this.result = URL.createObjectURL(file);
        this.size = `${Math.round(file.size / 1024)} KB`;
        const image = new Image();
        image.src = this.result;
        image.onload = () => {
          this.width = `${image.width}`;
          this.height = `${image.height}px`;
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
