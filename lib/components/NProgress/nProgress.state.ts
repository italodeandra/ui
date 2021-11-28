import { proxy } from "valtio";

let timeout;

const NProgressState = proxy({
  initialDelay: 300,
  value: undefined as number | undefined,
  set(value: number | undefined) {
    NProgressState.value = value;
  },
  start() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      NProgressState.set(0);
      timeout = undefined;
    }, NProgressState.initialDelay);
  },
  finish() {
    clearTimeout(timeout);
    if (NProgressState.value !== undefined) {
      NProgressState.set(100);
    }
  },
});

export default NProgressState;
