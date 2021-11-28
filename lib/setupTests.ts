import "@testing-library/jest-dom/extend-expect"
import { matchers } from "@emotion/jest"

expect.extend(matchers)

Object.assign(window, {
  visualViewport: { height: window.innerHeight, width: window.innerWidth },
})
