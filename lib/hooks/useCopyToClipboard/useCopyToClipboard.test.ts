// eslint-disable-next-line no-restricted-imports
import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import writeText from "copy-to-clipboard";
import * as useMountedState from "react-use/lib/useMountedState";
import useCopyToClipboard from "./useCopyToClipboard";

jest.mock("copy-to-clipboard", () => {
  const original = jest.requireActual("copy-to-clipboard");
  return {
    __esModule: true,
    default: jest.fn(original.default),
  };
});

describe("useCopyToClipboard", () => {
  test("should copy text and then reset it", () => {
    const text = "Test";

    const { result } = renderHook(() => useCopyToClipboard());

    const copy = result.current[1];

    act(() => copy(text));

    let state = result.current[0];

    expect(state.value).toBe(text);

    const reset = result.current[2];

    act(() => reset());

    state = result.current[0];

    expect(state.value).toBeUndefined();
  });

  test("should copy nothing when not mounted anymore", () => {
    jest
      .spyOn(useMountedState, "default")
      .mockImplementationOnce(() => () => false);

    const text = "Test";

    const { result } = renderHook(() => useCopyToClipboard());

    const copy = result.current[1];

    act(() => copy(text));

    const state = result.current[0];

    expect(state.value).toBeUndefined();
  });

  test("should return error when trying to copy a not string or number", () => {
    const object = { object: "not a string" } as never;

    const { result } = renderHook(() => useCopyToClipboard());

    const copy = result.current[1];

    act(() => copy(object));

    const state = result.current[0];

    expect(state.error).toBeInstanceOf(Error);
  });

  test("should return error when trying to copy an empty string", () => {
    const empty = "";

    const { result } = renderHook(() => useCopyToClipboard());

    const copy = result.current[1];

    act(() => copy(empty));

    const state = result.current[0];

    expect(state.error).toBeInstanceOf(Error);
  });

  test(`should return error when "copy-to-clipboard throws"`, () => {
    (
      writeText as unknown as jest.Mock<typeof writeText>
    ).mockImplementationOnce(() => {
      throw Error();
    });

    const text = "Test";

    const { result } = renderHook(() => useCopyToClipboard());

    const copy = result.current[1];

    act(() => copy(text));

    const state = result.current[0];

    expect(state.error).toBeInstanceOf(Error);
  });
});
