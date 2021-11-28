import emailRegExp from "./emailRegExp"

describe("emailRegExp", () => {
  test("should return true for valid email", () => {
    expect(emailRegExp.test("italodeandra@gmail.com")).toBe(true)
  })

  test("should return true for invalid email", () => {
    expect(emailRegExp.test("italodeandra.com")).toBe(false)
  })
})
