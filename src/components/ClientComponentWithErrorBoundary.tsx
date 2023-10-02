import { Suspense } from "react";
import ErrorBoundary from "../../lib/components/ErrorBoundary";

function AsyncComponentWithError() {
  throw Error("Test error");
  // noinspection UnreachableCodeJS
  return null;
}

export default function ClientComponentWithErrorBoundary() {
  return (
    <ErrorBoundary tryAgain="Try again">
      <Suspense fallback={<>Loading...</>}>
        <AsyncComponentWithError />
      </Suspense>
    </ErrorBoundary>
  );
}
