import { render, screen } from "@testing-library/react";
import Orange from "../../styles/colors/Orange";
import Json from "./Json";

describe("Json", () => {
  test("should print a formatted and colored json from a object with a label", () => {
    const jsonObject = { boolean: true, null: null, number: 1, string: "text" };
    render(<Json json={jsonObject} label="Label" />);

    const boolean = screen.getByText(/true/);

    expect(boolean).toHaveStyle(`color: ${Orange.N500}`);
    expect(screen.getByText(/Label/)).toBeInTheDocument();
  });

  test("should print a formatted and colored json from a string", () => {
    const jsonString =
      '{"number": 1, "string": "text", "null": null, "boolean": true}';
    render(<Json json={jsonString} />);

    const boolean = screen.getByText(/true/);

    expect(boolean).toHaveStyle(`color: ${Orange.N500}`);
  });

  test("should print nothing when undefined", () => {
    const { container } = render(<Json json={undefined} />);

    expect(container).toHaveTextContent("");
  });

  test(`should print "Error" when invalid json`, () => {
    const consoleErrorSpy = jest.spyOn(console, "error");

    render(<Json json={"{invalid json}"} />);

    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(consoleErrorSpy).toBeCalledTimes(1);
  });

  test(`should print "Function" when a function`, () => {
    render(<Json json={() => 1} />);

    expect(screen.getByText("Function")).toBeInTheDocument();
  });
});
