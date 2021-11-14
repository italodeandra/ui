import numericArray from "./numericArray"

describe("numericArray", () => {
  test("should return array of 5 numbers", () => {
    const array = numericArray(5)
    expect(array).toStrictEqual([1, 2, 3, 4, 5])
  })
})
