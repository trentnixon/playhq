import React from "react";
import styles from "../../../styles/Loader.module.css"; // Import the CSS module for styles
import { Center } from "@mantine/core";

const FixturaLoader = () => {

  return (
    <Center>
      <div className={styles.pathRatio}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 518 514"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
         
            d="M110.5 331.5C79.5 332.699 61.0004 318.5 61.0004 318.5C61.0004 318.5 25.0003 297 25.5003 253.5C26.0003 210 70.0002 180 92.0002 180C114 180 398.5 176.5 425.5 176.5C452.5 176.5 492.5 150.5 492.5 102C492.5 53.5001 452 25 425.5 25C399 25 99.5004 25 88.5004 25C77.5004 25 25.5004 41.5 25.5004 102C25.5004 162.5 80.0004 176.5 88.5004 176.5C97.0004 176.5 259 180 272 180C285 180 336.5 202 337 253.5C337.5 305 287 331.5 272 331.5C257 331.5 132 331.5 110.5 331.5ZM110.5 331.5C141.5 330.301 178 367.5 180 409C182 450.5 152 489 101.5 488C51 487 25.5003 445 25.5003 409C25.5003 373 46.5 353.5 63.5 342.5C80.5 331.5 99.119 331.5 110.5 331.5Z"
            stroke="#94CEFB"
            strokeWidth="50"
            className={styles.path}
          />
        </svg>
      </div>
    </Center>
  );
};

export default FixturaLoader;
