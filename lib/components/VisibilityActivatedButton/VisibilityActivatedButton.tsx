import { ComponentProps, useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import Button from "../Button";

export default function VisibilityActivatedButton({
  rootMargin,
  threshold,
  root,
  ...props
}: ComponentProps<typeof Button> & {
  root?: Element | Document | null;
  threshold?: number;
  rootMargin?: string;
}) {
  const observerRef = useRef<HTMLButtonElement | null>(null);

  const intersection = useIntersection(observerRef, {
    root,
    rootMargin,
    threshold,
  });

  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      observerRef.current?.click();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection?.isIntersecting]);

  return <Button ref={observerRef} {...props} />;
}
