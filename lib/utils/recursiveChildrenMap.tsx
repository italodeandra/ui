import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";

export default function recursiveChildrenMap(
  children: ReactNode,
  fn: (child: ReactElement) => ReactElement
): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    if (child.props.children) {
      child = cloneElement(child, {
        children: recursiveChildrenMap(child.props.children, fn),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    }

    return fn(child);
  });
}
