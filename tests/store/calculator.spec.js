import calculator from "@/store/calculator";

describe("store/calculator", () => {
  const mutations = calculator.mutations;
  const actions = calculator.actions;
  let state;
  beforeEach(() => {
    state = {
      operator: null,
      numValueOne: "",
      numValueTwo: "",
      lastTyped: 0,
    };
  });

  describe("mutations", () => {
    // setNumValue
    describe("setNumValue", () => {
      describe("when an operator is equal to null and numValueOne equals to ''", () => {
        it("sets numValueOne", () => {
          mutations.setNumValue(state, 5);
          expect(state.numValueOne).toBe("5");
        });
      });

      describe("when an operator is equal to null and numValueOne is not equal to ''", () => {
        it("updates numValueOne", () => {
          state.numValueOne = "5";
          mutations.setNumValue(state, 6);
          expect(state.numValueOne).toBe("56");
        });
      });

      describe("when an operator is not equal to null and numValueTwo is equal to ''", () => {
        it("sets numValueTwo", () => {
          state.numValueOne = "5";
          state.operator = "+";
          mutations.setNumValue(state, 6);
          expect(state.numValueTwo).toBe("6");
        });
      });

      describe("when an operator is not equal null and numValueTwo is not equal to ''", () => {
        it("updates numValueTwo", () => {
          state.numValueOne = "1";
          state.operator = "+";
          state.numValueTwo = "3";
          mutations.setNumValue(state, 7);
          expect(state.numValueTwo).toBe("37");
        });
      });
    });

    // setOperator
    describe("setOperator", () => {
      describe("when numValueOne does not have a value", () => {
        describe("if lastTyped is a number", () => {
          it("sets a numValueOne to be equal to lastTyped value", () => {
            state.numValueOne = "";
            state.lastTyped = "123";
            mutations.setOperator(state, "+");
            expect(state.numValueOne).toBe("123");
          });
        });

        describe("if lastTyped is not a number", () => {
          it("does not update numValueOne", () => {
            state.numValueOne = "";
            state.lastTyped = "-";
            mutations.setOperator(state, "+");
            expect(state.numValueOne).toBe("");
          });
        });
      });

      it("sets the value of an operator", () => {
        state.numValueOne = "4";
        mutations.setOperator(state, "+");
        expect(state.operator).toBe("+");
      });
    });

    // calculateResult
    describe("calculateResult", () => {
      describe("when an operator is equal to +", () => {
        it("performs addition", () => {
          state.operator = "+";
          state.numValueOne = "3";
          state.numValueTwo = "7";
          mutations.calculateResult(state);
          expect(state.lastTyped).toBe(10);
        });
      });

      describe("when an operator is equal to -", () => {
        it("performs subtraction", () => {
          state.operator = "-";
          state.numValueOne = "1006";
          state.numValueTwo = "8";
          mutations.calculateResult(state);
          expect(state.lastTyped).toBe(998);
        });
      });

      describe("when an operator is equal to *", () => {
        it("performs multiplication", () => {
          state.operator = "*";
          state.numValueOne = "180";
          state.numValueTwo = "7";
          mutations.calculateResult(state);
          expect(state.lastTyped).toBe(1260);
        });
      });

      describe("when an operator is equal to /", () => {
        it("performs division", () => {
          state.operator = "/";
          state.numValueOne = "3206";
          state.numValueTwo = "1603";
          mutations.calculateResult(state);
          expect(state.lastTyped).toBe(2);
        });
      });

      it("updates state", () => {
        state.operator = "/";
        state.numValueOne = "3206";
        state.numValueTwo = "1603";
        mutations.calculateResult(state);
        expect(state.operator).toBe(null);
        expect(state.numValueOne).toBe("");
        expect(state.numValueTwo).toBe("");
      });
    });

    // reset
    describe("reset", () => {
      it("resets the state to initial values", () => {
        state.operator = "/";
        state.numValueOne = "3206";
        state.numValueTwo = "1603";
        mutations.reset(state);
        expect(state.operator).toBe(null);
        expect(state.numValueOne).toBe("");
        expect(state.numValueTwo).toBe("");
        expect(state.lastTyped).toBe(0);
      });
    });

    // positiveToNegative
    describe("positiveToNegative", () => {
      it("change lastTyped number from positive to negative and back", () => {
        state.numValueOne = "37";
        state.numValueTwo = "5";
        state.lastTyped = "5";
        mutations.positiveToNegative(state);
        expect(state.numValueOne).toBe("37");
        expect(state.numValueTwo).toBe(-5);
        expect(state.lastTyped).toBe(-5);
      });
    });

    // calculatePercentage
    describe("calculatePercentage", () => {
      describe("when only numValueOne has value", () => {
        it("returns 1 percent of the numValueOne", () => {
          state.numValueOne = "37";
          state.numValueTwo = "";
          state.operator = null;
          mutations.calculatePercentage(state);
          expect(state.numValueOne).toBe(0.37);
          expect(state.lastTyped).toBe(0.37);
        });
      });
    });
  });

  describe("actions", () => {
    let context;
    beforeEach(() => {
      context = {
        commit: jest.fn(),
      };
    });

    describe("update", () => {
      describe("when a value is a number", () => {
        it("calls mutation setNumValue", () => {
          actions.update(context, 3);
          expect(context.commit).toHaveBeenCalledWith("setNumValue", 3);
        });
      });

      describe("when a value is equal to '.'", () => {
        it("calls mutation setNumValue", () => {
          actions.update(context, ".");
          expect(context.commit).toHaveBeenCalledWith("setNumValue", ".");
        });
      });

      describe("when a value is equal to '='", () => {
        it("calls mutation calculateResult", () => {
          actions.update(context, "=");
          expect(context.commit).toHaveBeenCalledWith("calculateResult");
        });
      });

      describe("when a value is equal to '%'", () => {
        it("calls mutation calculatePercentage", () => {
          actions.update(context, "%");
          expect(context.commit).toHaveBeenCalledWith("calculatePercentage");
        });
      });

      describe("when a value is equal to '+/-'", () => {
        it("calls mutation positiveToNegative", () => {
          actions.update(context, "+/-");
          expect(context.commit).toHaveBeenCalledWith("positiveToNegative");
        });
      });

      describe("when a value is equal to 'AC'", () => {
        it("calls mutation reset", () => {
          actions.update(context, "AC");
          expect(context.commit).toHaveBeenCalledWith("reset");
        });
      });

      describe("when a value is not specified in checks", () => {
        it("calls mutation setOperator", () => {
          calculator.actions.update(context, "-");
          expect(context.commit).toHaveBeenCalledWith("setOperator", "-");
        });
      });
    });
  });
});
