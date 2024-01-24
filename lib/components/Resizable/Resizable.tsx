import React, {
  cloneElement,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLatest } from "react-use";
import clsx from "clsx";

export default function Resizable({
  children,
  minWidth,
  maxWidth,
  width,
  onResize,
}: {
  children: ReactElement;
  minWidth?: number;
  maxWidth?: number;
  width?: number;
  onResize: (width?: number) => void;
}) {
  let [internalWidth, setInternalWidth] = useState(width);
  let [isResizing, setResizing] = useState(false);
  let isResizingRef = useLatest(isResizing);
  let initialMouseXPos = useRef(0);
  let initialWidth = useRef(0);

  useEffect(() => {
    onResize(internalWidth);
  }, [internalWidth, onResize]);

  let onMouseDown = (e: React.MouseEvent) => {
    let parent = e.currentTarget?.parentNode as HTMLDivElement;
    let rect = parent.getBoundingClientRect();
    initialWidth.current = rect.width;
    initialMouseXPos.current = e.clientX;
    setResizing(true);
  };

  useEffect(() => {
    let onMouseMove = (e: MouseEvent) => {
      if (isResizingRef.current) {
        let newWidth =
          initialWidth.current - (e.clientX - initialMouseXPos.current);
        if (minWidth !== undefined && newWidth < minWidth) {
          newWidth = minWidth;
        }
        if (maxWidth !== undefined && newWidth > maxWidth) {
          newWidth = maxWidth;
        }
        setInternalWidth(newWidth);
      }
    };

    let onMouseUp = () => {
      setResizing(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isResizingRef, maxWidth, minWidth, onResize]);

  return cloneElement(children, {
    className: clsx("relative", children.props.className),
    style: { width: internalWidth },
    children: (
      <>
        <div
          className={clsx(
            "absolute left-0 top-0 bottom-0 z-10 w-1 cursor-e-resize select-none transition-colors hover:bg-zinc-700",
            {
              "bg-zinc-700": isResizing,
            },
          )}
          onMouseDown={onMouseDown}
        />
        {children.props.children}
      </>
    ),
  });
}
