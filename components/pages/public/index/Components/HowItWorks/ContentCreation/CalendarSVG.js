import React from 'react';

const CalendarSVG = React.forwardRef((props, ref) => (
  <svg
    width='306'
    height='343'
    viewBox='0 0 306 343'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    ref={ref}
  >
    <rect
      x='3'
      y='40.5'
      width='300'
      height='300'
      rx='2'
      stroke='#9CCDE9'
      stroke-width='5'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M228 3V78'
      stroke='#9CCDE9'
      stroke-width='5'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M78 3V78'
      stroke='#9CCDE9'
      stroke-width='5'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M3 153H303'
      stroke='#9CCDE9'
      stroke-width='5'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <rect
      x='58.6445'
      y='204.814'
      width='37.5'
      height='37.5'
      stroke='#9CCDE9'
      stroke-width='5'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
));

CalendarSVG.displayName = 'CalendarSVG';

export default CalendarSVG;
