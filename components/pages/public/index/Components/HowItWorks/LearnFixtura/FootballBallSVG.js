import React from "react";
export const FootballBallSVG = React.forwardRef((props, ref) => {
    return (
      <svg
        width="118"
        height="118"
        viewBox="0 0 118 118"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
      >
        <circle
          cx="59"
          cy="59"
          r="56.25"
          stroke="white"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M59 27.75L88.75 49.3125L77.75 84H40.25L29.25 49.3125L59 27.75Z"
          stroke="white"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M56.5 27.75C56.5 29.1307 57.6193 30.25 59 30.25C60.3807 30.25 61.5 29.1307 61.5 27.75H56.5ZM61.5 2.75C61.5 1.36929 60.3807 0.25 59 0.25C57.6193 0.25 56.5 1.36929 56.5 2.75H61.5ZM79.6706 82.3995C78.7866 81.3388 77.2102 81.1955 76.1495 82.0794C75.0888 82.9634 74.9455 84.5398 75.8294 85.6005L79.6706 82.3995ZM91.4544 104.35C92.3384 105.411 93.9148 105.554 94.9755 104.671C96.0362 103.787 96.1795 102.21 95.2956 101.15L91.4544 104.35ZM87.8463 46.9816C86.5589 47.4807 85.9199 48.9289 86.4191 50.2162C86.9182 51.5036 88.3664 52.1426 89.6537 51.6434L87.8463 46.9816ZM113.029 42.5809C114.316 42.0818 114.955 40.6336 114.456 39.3463C113.957 38.0589 112.509 37.4199 111.221 37.9191L113.029 42.5809ZM42.5132 85.951C43.4181 84.9082 43.3063 83.3293 42.2635 82.4243C41.2207 81.5194 39.6418 81.6312 38.7368 82.674L42.5132 85.951ZM22.7368 101.111C21.8319 102.154 21.9437 103.733 22.9865 104.638C24.0293 105.543 25.6082 105.431 26.5132 104.389L22.7368 101.111ZM28.3463 51.6434C29.6336 52.1426 31.0818 51.5036 31.5809 50.2162C32.0801 48.9289 31.4411 47.4807 30.1537 46.9816L28.3463 51.6434ZM6.77871 37.9191C5.49136 37.4199 4.04316 38.0589 3.54405 39.3463C3.04495 40.6336 3.68394 42.0818 4.97129 42.5809L6.77871 37.9191ZM61.5 27.75V2.75H56.5V27.75H61.5ZM75.8294 85.6005L91.4544 104.35L95.2956 101.15L79.6706 82.3995L75.8294 85.6005ZM89.6537 51.6434L113.029 42.5809L111.221 37.9191L87.8463 46.9816L89.6537 51.6434ZM38.7368 82.674L22.7368 101.111L26.5132 104.389L42.5132 85.951L38.7368 82.674ZM30.1537 46.9816L6.77871 37.9191L4.97129 42.5809L28.3463 51.6434L30.1537 46.9816Z"
          fill="white"
        />
      </svg>
    );
  });