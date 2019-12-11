<template>
  <button 
    :class="buttonClass"
    @click="onClickButton(buttonValue)"
  >
    <span>{{ buttonValue }}</span>
  </button>
</template>

<script>
export default {
  props: {
    buttonValue: {
      default: "",
      type: String,
    },
    buttonClass: {
      default: "",
      type: String,
    },
  },
  methods: {
    onClickButton (value) {
      this.$emit("clicked", value);
    },
  },
};
</script>

<style scoped>
  button {
    border-radius: 50%;
    border: none;
    color: #fff;
    width: 4em;
    height: 4em;
    font-size: 100%;
  }

  button span {
    font-size: 1.75em;
    line-height: 1.2em;
  }

  .btn-light-grey {
    background-color: #a6a6a6;
    color: #000;
  }

  .btn-grey {
    background-color: #333333;
  }

  .btn-grey-wide {
    background-color: #333333;
    width: 8.5em;
    text-align: left;
    padding-left: 1.5em;
    border-radius: 2.5em;
  }

  .btn-orange {
    background-color: #ff9501;
  }
</style>
