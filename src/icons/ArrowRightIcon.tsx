import React from "react";

export const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 6H23M23 6L18 1M23 6L18 11"
        stroke="currentColor"
        strokeWidth="var(--gl-icon-stroke-width)"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
};
