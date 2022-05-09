<template>
  <div class="field-image-upload">
    <label class="field-image-upload__label" :for="name"> </label>
    <div class="field-image-upload__input">
      <input type="file" :id="name" :name="name" @change="handleChange" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: undefined,
    },
  },

  emits: ["change"],

  data() {
    return {
      file: this.value,
    };
  },

  methods: {
    handleChange(event) {
      this.file = event.target.files[0];
      this.$emit("change", this.file);
    },
  },
};
</script>

<style lang="scss" scoped>
.field-image-upload {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 1rem;

  &__label {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  &__input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
}
</style>
