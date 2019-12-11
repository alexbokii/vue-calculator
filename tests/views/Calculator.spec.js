import { shallowMount } from "@vue/test-utils";
import Calculator from "@/views/Calculator";
import Button from "@/components/Button";
import Display from "@/components/Display";

const data = {
  calculatorButtons: [
    { name: "1", class: "btn-grey" },
    { name: "2", class: "btn-grey" },
  ],
};

const mockStore = {
  dispatch: jest.fn(),
};

const createTestSubject = () => {
  return shallowMount(Calculator, {
    mocks: {
        $store: mockStore,
      },
  }, data);
};

describe("views/Calculator", () => {

  let wrapper;
  beforeEach(() => {
    wrapper = createTestSubject();
  });

  it("renders the view", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("child components", () => {
    it("renders Button component", () => {
      expect(wrapper.find(Button).exists()).toBe(true);
    });

    it("renders Display component", () => {
      expect(wrapper.find(Display).exists()).toBe(true);
    });
  });

  describe("onButtonClick method", () => {
    it("dispatches update action", () => {
      wrapper.vm.onButtonClick();
      expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
