import sleep from "./sleep"

describe("sleep", () => {
  test("should wait 1ms", async () => {
    await sleep(1)
    expect(true).toBeTruthy()
  })
})
