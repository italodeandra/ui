import { useId } from "react";

export default function GridPattern(props: JSX.IntrinsicElements["pattern"]) {
  let patternId = useId();

  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
      <defs>
        <pattern
          id={patternId}
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
          {...props}
        >
          <path d="M0 32V.5H32" fill="none" stroke="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
