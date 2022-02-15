import { proxy } from "valtio";

let timeout;

const nProgressState = proxy({
  initialDelay: 300,
  value: undefined as number | undefined,
  progresses: 0,
  set(value: number | undefined) {
    nProgressState.value = value;
  },
  start() {
    console.error(
      "`nProgressState.start()` is deprecated. use `startProgress()` instead."
    );
    startProgress();
  },
  finish() {
    console.error(
      "`nProgressState.finish()` is deprecated. use `finishProgress()` instead."
    );
    finishProgress();
  },
});

export default nProgressState;

export function startProgress() {
  nProgressState.progresses++;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    nProgressState.set(0);
    timeout = undefined;
  }, nProgressState.initialDelay);
}

export function finishProgress() {
  if (nProgressState.progresses <= 1) {
    clearTimeout(timeout);
    if (nProgressState.value !== undefined) {
      nProgressState.set(100);
    }
  }
  nProgressState.progresses--;
  if (nProgressState.progresses < 0) {
    nProgressState.progresses = 0;
  }
}
