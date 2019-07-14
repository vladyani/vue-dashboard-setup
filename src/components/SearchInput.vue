<template>
  <input
    id="search"
    name="search"
    :class="{dark}"
    :value="searchValue"
    @input="handleInputChange"
  />
</template>

<script>
  export default {
    name: 'SearchInput',
    props: {
      searchValue: {
        type: String,
        required: true,
      },
      dark: {
        type: Boolean,
        default: false,
      }
    },
    methods: {
      handleInputChange(e) {
        this.$emit('input', e.target.value);
      }
    }
  };
</script>

<style lang="scss" scoped>
  input {
    color: #ffffff;
    text-align: center;
    font-size: 18px;
    font-weight: 300;
    height: 30px;
    border: 0;
    background: none;
    border-bottom: 1px solid #ffffff;
    transition: box-shadow .3s ease-out;

    &:focus {
      outline: none;
      box-shadow: 0 10px 20px -8px rgba(255, 255, 255, .3);
    }
  }

  .dark {
    color: #1e3d4a;
    border-bottom-color: #1e3d4a;

    &:focus {
      outline: none;
      box-shadow: 0 10px 20px -8px rgba(#1e3d4a, .3);
    }
  }
</style>
