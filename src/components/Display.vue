<template>
  <div class="display">
    <span class="result-container">
      {{ result }}
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    result() {
      return this.$store.state.calculator.lastTyped;
    },
  },
};
</script>

<style scoped>
  .display {
    height: 8em;
    color: #fff;
    padding: 3em 0.5em 2em;
    display: flex;
    justify-content: flex-end;
  }

  .result-container {
    font-size: 3em;
    text-align: right;
  }
</style>
