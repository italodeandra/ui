import { render, screen } from "@testing-library/react"
import goToIdSmoothly from "./goToIdSmoothly"
import user from "@testing-library/user-event"

describe("goToIdSmoothly", () => {
  test("should scroll into view the href of clicked element", async () => {
    const scrollIntoViewSpy = (Element.prototype.scrollIntoView = jest.fn())

    render(
      <>
        <a href={"#test"} onClick={goToIdSmoothly}>
          Go to test
        </a>
        <div id="test" />
      </>
    )

    const button = screen.getByText("Go to test")

    user.click(button)

    expect(scrollIntoViewSpy).toBeCalledTimes(1)
  })

  test("should scroll into view the href of the parent of the clicked element", async () => {
    const scrollIntoViewSpy = (Element.prototype.scrollIntoView = jest.fn())

    render(
      <>
        <a href={"#test"}>
          <button onClick={goToIdSmoothly}>Go to test</button>
        </a>
        <div id="test" />
      </>
    )

    const button = screen.getByText("Go to test")

    user.click(button)

    expect(scrollIntoViewSpy).toBeCalledTimes(1)
  })

  test("should scroll into view the href of the parent of the parent of the clicked element", async () => {
    const scrollIntoViewSpy = (Element.prototype.scrollIntoView = jest.fn())

    render(
      <>
        <a href={"#test"}>
          <div>
            <button onClick={goToIdSmoothly}>Go to test</button>
          </div>
        </a>
        <div id="test" />
      </>
    )

    const button = screen.getByText("Go to test")

    user.click(button)

    expect(scrollIntoViewSpy).toBeCalledTimes(1)
  })

  test("should scroll into view the body when no hash", async () => {
    const scrollIntoViewSpy = (Element.prototype.scrollIntoView = jest.fn())

    render(
      <>
        <a href={"/"} onClick={goToIdSmoothly}>
          Go to body
        </a>
        <div />
      </>
    )

    const button = screen.getByText("Go to body")

    user.click(button)

    expect(scrollIntoViewSpy).toBeCalledTimes(1)
  })

  test("should scroll into view the body when no href at all", async () => {
    const scrollIntoViewSpy = (Element.prototype.scrollIntoView = jest.fn())

    render(
      <>
        <a onClick={goToIdSmoothly}>Go to body</a>
        <div />
      </>
    )

    const button = screen.getByText("Go to body")

    user.click(button)

    expect(scrollIntoViewSpy).toBeCalledTimes(1)
  })

  test("should do nothing", async () => {
    const scrollIntoViewSpy = (Element.prototype.scrollIntoView = jest.fn())

    render(
      <a href={"#test"} onClick={goToIdSmoothly}>
        Do nothing
      </a>
    )

    const button = screen.getByText("Do nothing")

    user.click(button)

    expect(scrollIntoViewSpy).toBeCalledTimes(0)
  })
})
