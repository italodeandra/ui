import { render, screen } from "@testing-library/react";
import DateFormat from "./DateFormat";

describe("DateFormat", () => {
  test("should print date formatted", () => {
    const date = "1997-03-22 07:50";

    render(<DateFormat date={date} />);

    expect(screen.getByText("03/22/1997, 7:50 AM")).toBeInTheDocument();
  });

  test("should print nothing when undefined date", () => {
    const { container } = render(<DateFormat date={undefined} />);

    expect(container).toHaveTextContent("");
  });

  test('should print "Invalid date" when date is invalid', () => {
    const invalidDate = "invalid";

    render(<DateFormat date={invalidDate} />);

    expect(screen.getByText("Invalid date")).toBeInTheDocument();
  });

  test('when using "as" property should print date formatted', () => {
    const date = "1997-03-22 07:50";

    render(<DateFormat component="span" date={date} />);

    expect(screen.getByText("03/22/1997, 7:50 AM")).toBeInTheDocument();
  });
});
