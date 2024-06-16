import React from "react";
import { H1, HighlightSpan, P } from "../../Primitives/Text";
import styles from "./CustomizationOptions.module.scss";
import { Container } from "../../Primitives/Containers";

const CustomizationOptions = () => {
  return (
    <div className={styles.customizationOptions}>
      <Container>
        <H1 className="fade-in-up">Customization Options</H1>
        <P className="fade-in-up">
          <HighlightSpan>
            Tailor Your Templates to Reflect Your Brand
          </HighlightSpan>
        </P>
        <P className="fade-in-up">
          Fixtura offers extensive customization options, allowing you to tailor
          templates to match your club’s brand. Update logos, colors, images,
          and sponsor information with ease to ensure your content is always
          on-brand and professional.
        </P>
        <img
          src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Fixtura_Templates_20c0c11830.png"
          alt="Customization Options"
          className={`${styles.image} fade-in-up`}
        />
      </Container>
    </div>
  );
};

export default CustomizationOptions;
