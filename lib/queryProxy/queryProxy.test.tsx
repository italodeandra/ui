import queryProxy from "./queryProxy";

describe("queryProxy", () => {
  test("setParams with clear should clear the params", () => {
    const stateProxy = queryProxy("");
    const state = stateProxy.createState("0");

    state.setParams({ test: "ae" });

    expect(state.params).toEqual({ test: "ae" });

    state.setParams({});

    expect(state.params).toEqual({ test: "ae" });

    state.setParams({}, true);

    expect(state.params).toEqual({});
  });
});
