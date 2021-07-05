import React from "react";
import Paginator from "./Paginator";
import { render, screen } from '@testing-library/react';

describe("Paginator component tests", () => {
  test("pages count is 11 but should be showed only 10", () => {
    render(<Paginator totalItemsCount={11} pageSize={1} portionSize={10} onPageChanged={ () => {}} currentPage={'1'}/>);
    let spans = screen.AllByText('span');
    expect(spans.length).toBe(10);
  });

  test("if pages count is more then 10 button NEXT should be present", () => {
    const component = render(<Paginator totalItemsCount={11} pageSize={1} portionSize={10} onPageChanged={ () => {}} currentPage={'1'}/>);
    const root = component.root;
    let button = root.findAllByType("button");
    expect(button.length).toBe(1);
  });
});