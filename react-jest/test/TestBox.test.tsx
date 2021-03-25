import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import ReactTestUtils from 'react-dom/test-utils';

import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

import { TestBox } from '../testbox';

let container: any = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("<TestBox />", ()=>{
    // Arrange
    const spy = jest.spyOn(console, 'log');
    const parentUpdater = () => console.log('updater has run');
    
    const val = {
      title: 'title',
      body: 'body'
    }

  
    beforeEach(()=> {
      // Act
      act(()=>{
        render(<TestBox changes={parentUpdater} id={1} value={val}></TestBox>, container);
      });
  
    });

    test("TestBox is created", ()=>{
      const testBox = document.getElementsByTagName("TestBox");
    
      // Assert
      expect(testBox).not.toBeNull();
    });

    test("title works", ()=>{
      const title = document.getElementsByClassName("title") as HTMLCollectionOf<HTMLInputElement>;

      title[0].value = "test";
      ReactTestUtils.Simulate.change(title[0]);
      
      // Assert
      expect(title).not.toBeNull();
      expect(spy).toHaveBeenCalled();
    });
    test("body works", ()=>{
      const body = document.getElementsByClassName("body") as HTMLCollectionOf<HTMLInputElement>;

      body[0].value = "test";
      ReactTestUtils.Simulate.change(body[0]);
      
      // Assert
      expect(body).not.toBeNull();
      expect(spy).toHaveBeenCalled();
    });
});
