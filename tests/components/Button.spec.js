import { shallowMount } from "@vue/test-utils";
import Button from "@/components/Button";

const createTestSubject = (propsData) => {
  return shallowMount(Button, {
    propsData: {
      ...propsData,
    },
  });
};

describe("components/Button", () => {
  it("renders the component", () => {
    let wrapper = createTestSubject({ buttonValue: "TestValue", buttonClass: "TestClass" });
    expect(wrapper.exists()).toBe(true);
  });

  describe("properties", () => {
    describe("class name", () => {
      it("sets the class name for a button", () => {
        let wrapper = createTestSubject({ buttonClass: "myTestBtnClass" });
        expect(wrapper.find("button").classes("myTestBtnClass")).toBe(true);
      });

      it("does not set a class if a prop is not passed", () => {
        let wrapper = createTestSubject();
        expect(wrapper.find("button").classes("")).toEqual([]);
      });
    });

    describe("text", () => {
      it("sets the text for a button", () => {
        let wrapper = createTestSubject({ buttonValue: "Hello" });
        expect(wrapper.find("button").text()).toBe("Hello");
      });

      it("does not set a text if a prop is not passed", () => {
        let wrapper = createTestSubject();
        expect(wrapper.find("button").text()).toBe("");
      });
    });
  });

  describe("onclick action", () => {
    it("emits an event to a parent", () => {
      let wrapper = createTestSubject();
      wrapper.find("button").trigger("click");
      expect(wrapper.emitted()).toBeTruthy();
    });

    it("passes the value", () => {
      let wrapper = createTestSubject({ buttonValue: "Hello" });
      wrapper.find("button").trigger("click");
      expect(wrapper.emitted()).toEqual({ "clicked": [["Hello"]] });
    });
  });
});
