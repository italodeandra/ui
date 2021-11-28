import camelCaseToDash from "./camelCaseToDash"

describe("camelCaseToDash", () => {
  test("two words should have the dash", () => {
    expect(camelCaseToDash("boxShadow")).toBe("box-shadow")
  })
  test("one word should not have the dash", () => {
    expect(camelCaseToDash("transform")).toBe("transform")
  })
})
