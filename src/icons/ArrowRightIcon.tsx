import React from "react";

export type IconWeight = "regular" | "bold";

interface ArrowRightIconProps extends React.SVGProps<SVGSVGElement> {
  weight?: IconWeight;
}

export const ArrowRightIcon = ({
  weight = "regular",
  ...props
}: ArrowRightIconProps) => {
  if (weight === "bold") {
    return (
      <svg
        viewBox="0 0 25 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M23.8457 6L24.3506 6.52148L23.8457 7.04297L18.0391 13.043L16.9609 12L21.5361 7.27148L0 7.27539V5.77539L21.5371 5.77148L16.9609 1.04297L18.0391 0L23.8457 6Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23.666 6L24.0029 6.34766L23.666 6.69531L17.8594 12.6953L17.1406 12L22.126 6.84766L0 6.85156V5.85156L22.127 5.84766L17.1406 0.695312L17.8594 0L23.666 6Z"
        fill="currentColor"
      />
    </svg>
  );
};
