import { SVGProps } from "react";

export function IconReset({
  width = "1em",
  height = "1em",
  fill = "none",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 21 21"
      {...props}
    >
      <g
        fill={fill}
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.5 3.5c-2.414 1.377-4 4.022-4 7a8 8 0 1 0 8-8"></path>
        <path d="M6.5 7.5v-4h-4"></path>
      </g>
    </svg>
  );
}
