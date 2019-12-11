<template>
  <div class="calculator-container">
    <Display />
    <ul class="buttons-container">
      <li 
        v-for="(calculatorButton, index) in calculatorButtons"
        :key="index"
      >
        <Button 
          :button-class="calculatorButton.class"
          :button-value="calculatorButton.name"
          @clicked="onButtonClick"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Display from "@/components/Display.vue";

export default {
  name: "Calculator",
  components: {
    Button,
    Display,
  },
  data() {
    return {
      calculatorButtons: [
        { name: "AC", class: "btn-light-grey" },
        { name: "+/-", class: "btn-light-grey" },
        { name: "%", class: "btn-light-grey" },
        { name: "/", class: "btn-orange" },
        { name: "7", class: "btn-grey" },
        { name: "8", class: "btn-grey" },
        { name: "9", class: "btn-grey" },
        { name: "*", class: "btn-orange" },
        { name: "4", class: "btn-grey" },
        { name: "5", class: "btn-grey" },
        { name: "6", class: "btn-grey" },
        { name: "-", class: "btn-orange" },
        { name: "1", class: "btn-grey" },
        { name: "2", class: "btn-grey" },
        { name: "3", class: "btn-grey" },
        { name: "+", class: "btn-orange" },
        { name: "0", class: "btn-grey-wide" },
        { name: ".", class: "btn-grey" },
        { name: "=", class: "btn-orange" },
      ],
    };
  },
  methods: {
    onButtonClick (value) {
      this.$store.dispatch("calculator/update", value);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul {
    list-style: none;
  }

  .calculator-container {
    background-color: #000;
    width: 20em;
    padding: 1em;
    border-radius: 1em;
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
    width: 18em;
    height: 24em;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
