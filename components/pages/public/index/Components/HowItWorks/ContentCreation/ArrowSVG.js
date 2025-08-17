import React from 'react';

const ArrowSVG = React.forwardRef((props, ref) => (
  <svg
    ref={ref}
    className='arrow'
    viewBox='0 0 76 76'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M66.5 53.8333H9.5'
      stroke='#D4D8DA'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M57 12.6665L66.5 22.1665L57 31.6665'
      stroke='#D4D8DA'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M57 63.3335L66.5 53.8335L57 44.3335'
      stroke='#D4D8DA'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M66.5 22.1668H9.5'
      stroke='#D4D8DA'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
));

ArrowSVG.displayName = 'ArrowSVG';

export default ArrowSVG;
