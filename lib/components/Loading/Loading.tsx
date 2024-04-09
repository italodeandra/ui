export default function Loading({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className={className}
    >
      <circle cx="4" cy="12" r="3" fill="currentColor">
        <animate
          id="svgSpinners3DotsFade0"
          fill="freeze"
          attributeName="opacity"
          begin="0;svgSpinners3DotsFade1.end-0.5s"
          dur="1.5s"
          values="1;0.2"
        />
      </circle>
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.4">
        <animate
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinners3DotsFade0.begin+0.3s"
          dur="1.5s"
          values="1;0.2"
        />
      </circle>
      <circle cx="20" cy="12" r="3" fill="currentColor" opacity="0.3">
        <animate
          id="svgSpinners3DotsFade1"
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinners3DotsFade0.begin+0.6s"
          dur="1.5s"
          values="1;0.2"
        />
      </circle>
    </svg>
  );
}
