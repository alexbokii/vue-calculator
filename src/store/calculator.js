const module = {
  namespaced: true,
  state: {
    operator: null,
    numValueOne: "",
    numValueTwo: "",
    lastTyped: 0,
  },
  mutations: {
    setNumValue(state, value) {
      if(!state.operator) {
        state.numValueOne += value;
        state.lastTyped = state.numValueOne;
      }
      else if(state.operator) {
        state.numValueTwo += value;
        state.lastTyped = state.numValueTwo;
      }
    },
    setOperator(state, value) {
      if(!state.numValueOne) {
        if(!isNaN(state.lastTyped)) {
          state.numValueOne = state.lastTyped;
        }
      }
      else if(state.numValueOne && state.operator && state.numValueTwo) {
        let result;
        if(state.numValueOne && state.operator && state.numValueTwo) {
          result = eval(parseFloat(state.numValueOne) + state.operator + parseFloat(state.numValueTwo));
          state.numValueOne = result;
          state.numValueTwo = "";
          state.lastTyped = result;
        }
      }
      state.operator = value;
    },
    calculateResult(state) {
      let result;
      if(state.numValueOne && state.operator && state.numValueTwo) {
        result = eval(parseFloat(state.numValueOne) + state.operator + parseFloat(state.numValueTwo));
      }
      else {
        result = 0;
      }
      state.operator = null;
      state.numValueOne = "";
      state.numValueTwo = "";
      state.lastTyped = result;
    },
    reset(state) {
      state.operator = null;
      state.numValueOne = "";
      state.numValueTwo = "";
      state.lastTyped = 0;
    },
    positiveToNegative(state) {
      if(!isNaN(state.lastTyped)) {
        if(state.numValueTwo && state.numValueTwo === state.lastTyped) {
          state.numValueTwo *= -1;
          state.lastTyped = state.numValueTwo;
        }
        else if(state.numValueOne && state.numValueOne === state.lastTyped) {
          state.numValueOne *= -1;
          state.lastTyped = state.numValueOne;
        }
      }
    },
    calculatePercentage(state) {
      if(state.numValueOne && !state.operator && !state.numValueTwo) {
        let result = state.numValueOne / 100;
        state.operator = null;
        state.numValueOne = result;
        state.numValueTwo = "";
        state.lastTyped = result;
      }
      else if(state.numValueOne && state.operator && state.numValueTwo) {
        let result = state.numValueOne / 100 * state.numValueTwo;
        state.numValueTwo = result;
        state.lastTyped = result;
      }
    },
  },
  actions: {
    update({ commit }, value) {
      if(!isNaN(value) || value === ".") {
        commit("setNumValue", value);
      }
      else if(value === "=") {
        commit("calculateResult");
      }
      else if(value === "AC") {
        commit("reset");
      }
      else if(value === "%") {
        commit("calculatePercentage");
      }
      else if(value === "+/-") {
        commit("positiveToNegative");
      }
      else {
        commit("setOperator", value);
      }
    },
  },
};

export default module;
