import objectDiff from "./objectDiff"

describe("objectDiff", () => {
  test("should return the deep object difference with deep difference", () => {
    const objectA = { a: 1, b: 2, d: { d1: 1 } }
    const objectB = { b: 2, c: 3, d: { d1: 1, d2: 2 } }

    expect(objectDiff(objectA, objectB)).toStrictEqual({ c: 3, d: { d2: 2 } })
  })
  test("should return the deep object difference without deep difference", () => {
    const objectA = { a: 1, b: 2, d: { d1: 1 } }
    const objectB = { b: 2, c: 3, d: { d1: 1 } }

    expect(objectDiff(objectA, objectB)).toStrictEqual({ c: 3 })
  })
})
