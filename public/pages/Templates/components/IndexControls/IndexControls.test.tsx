/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
// @ts-ignore
import userEventModule from "@testing-library/user-event";
import IndexControls from "./IndexControls";
import { getApplication, getNavigationUI, getUISettings } from "../../../../services/Services";

jest.mock("../../../../services/Services", () => ({
  ...jest.requireActual("../../../../services/Services"),
  getUISettings: jest.fn(),
  getApplication: jest.fn(),
  getNavigationUI: jest.fn(),
}));

beforeEach(() => {
  (getUISettings as jest.Mock).mockReturnValue({
    get: jest.fn().mockReturnValue(false), // or false, depending on your test case
  });
  (getApplication as jest.Mock).mockReturnValue({});

  (getNavigationUI as jest.Mock).mockReturnValue({});
});

describe("<IndexControls /> spec", () => {
  const userEvent = userEventModule.setup();

  it("renders the component", async () => {
    const { container } = render(<IndexControls value={{ search: "testing" }} onSearchChange={() => {}} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("onChange with right data", async () => {
    const onSearchChangeMock = jest.fn();
    const { getByPlaceholderText } = render(<IndexControls value={{ search: "" }} onSearchChange={onSearchChangeMock} />);

    await userEvent.type(getByPlaceholderText("Search..."), "test");
    await waitFor(() => {
      expect(onSearchChangeMock).toBeCalledTimes(4);
      expect(onSearchChangeMock).toBeCalledWith({
        search: "test",
      });
    });
  });
});
