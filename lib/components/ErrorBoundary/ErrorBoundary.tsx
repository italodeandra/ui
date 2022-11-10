"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import Alert from "../Alert/Alert";
import Button from "../Button/Button";

export default class ErrorBoundary extends Component<
  {
    title?: ReactNode;
    content?: ReactNode;
    tryAgain?: string;
    children: ReactNode;
  },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_error: Error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error({ error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Alert
          variant="error"
          title={this.props.title || "Oops, there was an unexpected error"}
          actions={
            this.props.tryAgain && (
              <Button
                variant="text"
                color="error"
                onClick={() => this.setState({ hasError: false })}
              >
                {this.props.tryAgain}
              </Button>
            )
          }
        >
          {this.props.content}
        </Alert>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}
