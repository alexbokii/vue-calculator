import { shallowMount, createLocalVue } from "@vue/test-utils";
import Display from "@/components/Display";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    calculator: {
      namespaced: true,
      state: {
        lastTyped: 9,
      },
    },
  },
});

const createTestSubject = () => {
  return shallowMount(Display, {
    store,
    localVue,
  });
};

describe("components/Display", () => {
  it("renders the component", () => {
    let wrapper = createTestSubject();
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the value of lastTyped from a state", () => {
    let wrapper = createTestSubject();
    expect(wrapper.find(".result-container").text()).toBe("9");
  });
});
