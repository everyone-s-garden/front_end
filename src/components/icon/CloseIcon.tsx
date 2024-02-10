import React from 'react';

const CloseIcon = ({ fill }: { fill: string }) => {
  return (
    <svg viewBox="0 0 512 512" fill={fill} height="1rem" width="1rem">
      <path
        fill={fill}
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M368 368L144 144M368 144L144 368"
      />
    </svg>
  );
};

export default CloseIcon;
