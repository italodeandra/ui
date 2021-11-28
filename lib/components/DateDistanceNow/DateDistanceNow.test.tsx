import { render, screen } from "@testing-library/react"
import DateDistanceNow from "./DateDistanceNow"

describe("DateDistanceNow", () => {
  test("should print less than a minute when using a Date", () => {
    const date = new Date()
    date.setSeconds(date.getSeconds() - 10)

    render(<DateDistanceNow date={date} />)

    expect(screen.getByText("less than a minute")).toBeInTheDocument()
  })

  test("should print less than a minute when using a string", () => {
    const date = new Date()
    date.setSeconds(date.getSeconds() - 10)

    render(<DateDistanceNow date={date.toISOString()} />)

    expect(screen.getByText("less than a minute")).toBeInTheDocument()
  })

  test("should print nothing when empty", () => {
    render(
      <span data-testid="empty">
        <DateDistanceNow date="" />
      </span>
    )

    expect(screen.getByTestId("empty")).toHaveTextContent("")
  })

  test('when using "as" property should print less than a minute when using a Date', () => {
    const date = new Date()
    date.setSeconds(date.getSeconds() - 10)

    render(<DateDistanceNow component="span" date={date} />)

    expect(screen.getByText("less than a minute")).toBeInTheDocument()
  })

  test("should print less than 20 seconds when including seconds", () => {
    const date = new Date()
    date.setSeconds(date.getSeconds() - 10)

    render(<DateDistanceNow date={date} includeSeconds />)

    expect(screen.getByText("less than 20 seconds")).toBeInTheDocument()
  })

  test("should print Invalid date", () => {
    const date = "NotADate"

    render(<DateDistanceNow date={date} />)

    expect(screen.getByText("Invalid date")).toBeInTheDocument()
  })
})
