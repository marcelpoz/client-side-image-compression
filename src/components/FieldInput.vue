<template>
  <div class="field-input">
    <label v-if="labelValue" class="field-input__label" :for="name">{{
      labelValue
    }}</label>
    <div class="field-input__input">
      <input
        :type="type"
        :id="name"
        :name="name"
        :value="value"
        @input="handleInput"
        :placeholder="placeholderValue"
      />
      <span v-if="valueType">{{ valueType }}</span>
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
    labelValue: {
      type: String,
      default: undefined,
    },
    initialValue: {
      type: String,
      default: undefined,
    },
    placeholderValue: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: "text",
    },
    valueType: {
      type: String,
      default: undefined,
    },
  },

  data() {
    return {
      value: this.initialValue || "",
    };
  },

  emits: ["input"],

  methods: {
    handleInput({ target }) {
      this.value = target.value;
      this.$emit("input", this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.field-input {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__label {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  &__input {
    display: flex;
    gap: 0.25em;
    align-items: center;
  }

  &__input input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 0.5rem;
    font-size: 1.6rem;
    font-weight: bold;
    color: #000;
    background-color: #fff;
    outline: none;
  }

  &__input span {
    display: block;
    font-size: 1.2rem;
  }
}
</style>
