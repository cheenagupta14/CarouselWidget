import * as React from "react";
import TestRenderer from 'react-test-renderer';
import Carousel from "./index";
import ErrorDialog from "../ErrorDialog/index";
const nock = require("nock");

global.window = { innerWidth: 1024}; // mocking the window object

describe(" Test Carousel Component", () => {
    const testRenderer = TestRenderer.create(<Carousel />);
    const testInstance = testRenderer.root;
      
    it("Component is rendered" , () => {
        expect(testInstance.type).not.toEqual("undefined");
    });

    it("Clicking Next button load next image index to active image indexes and removes the previous one", () => {
        const instance = testRenderer.getInstance();
        instance.state = {
            ...instance.state,
            activeIndexes:  [0,1,2,3]
        }; // initialize the activeIndexes value

        const expectedResult = {...instance.state, activeIndexes: [1,2,3,4]}
        instance.onSliderButtonClick("Next");
        expect(instance.state).toEqual(expectedResult);
    });

    it("Clicking Previous button load previous image index to active image indexes and removes the last one", () => {
        const instance = testRenderer.getInstance();
        instance.state = {
            ...instance.state,
            activeIndexes:  [1,2,3,4]
        }; // initialize the activeIndexes value

        const expectedResult = {...instance.state, activeIndexes: [0,1,2,3]}
        instance.onSliderButtonClick("Prev");
        expect(instance.state).toEqual(expectedResult);
    });

    it("Layout for desktop is rendered if window width is greater than 480px", () => {
        expect(testInstance.findAllByProps({id:"desktop"})).not.toEqual("undefined");
        expect(testInstance.findAllByProps({id:"mobile"})).toEqual([]);
    });

    it("Error dialog displayed when fetch calls fails", () => {
      nock("https://pixabay.com/")   // mock the fetch call
      .get("/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=beautiful+landscape&image_type=photo")
      .reply(404, {
           msg: 'Something went wrong',
      });
      const testRenderer = TestRenderer.create(<Carousel />);
      const instance = testRenderer.getInstance();
      expect(instance.state.error).not.toEqual(null);
      expect(testInstance.findByType(ErrorDialog).props.error).toBe({"msg": "Something went wrong" });
    });

});