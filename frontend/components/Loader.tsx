import React from "react";

type Props = {
  color: string;
};

const Loader = ({ color }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "auto", background: "none" }}
      className="m-auto h-7 w-7"
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <g>
        <path
          fill="none"
          stroke={`${color}`}
          strokeWidth="12"
          d="M50 15a35 35 0 1024.749 10.251"
        ></path>
        <path fill={`${color}`} d="M49 3v24l12-12L49 3"></path>
        <animateTransform
          attributeName="transform"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 50 50;360 50 50"
        ></animateTransform>
      </g>
    </svg>
  );
};

export default Loader;
