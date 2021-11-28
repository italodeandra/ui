import getInitials from "./getInitials"

describe("getInitials", () => {
  test("should return the name initials", () => {
    const initials = getInitials("Ítalo Andrade")
    expect(initials).toBe("ÍA")
  })
})
