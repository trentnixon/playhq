import { Stack } from '@mantine/core';

import React from 'react';

import { SelectedPlan } from './SelectedPlan';
import { PricingCTAOptions } from './FrontEndCTAOptions';
import {
  PricingDescription,
  PricingHeader,
  PricingSubtitle,
} from './PricingCopy';

export const ProductCard = props => {
  const { product, signUp, BTN = null, isActive, selected } = props;

  return (
    <ProductCardContainer {...props}>
      <ProductCardInnerContainer {...props}>
        <PricingHeader product={product} />
        <PricingSubtitle product={product} />

        <Stack align='center' justify='flex-start' spacing={0} mb={10}>
          <PricingDescription {...props} />

          {isActive ? (
            <SelectedPlan />
          ) : (
            <PricingCTAOptions signUp={signUp} Name={product.Name} BTN={BTN} />
          )}
        </Stack>
      </ProductCardInnerContainer>
    </ProductCardContainer>
  );
};

const ProductCardContainer = props => {
  return (
    <div className={`${props.className} col-lg-4 col-md-12`}>
      {props.children}
    </div>
  );
};

const ProductCardInnerContainer = props => {
  const { timing } = props;

  return (
    <div
      className='pricing-table active-plan'
      data-aos='fade-up'
      data-aos-duration='1500'
      data-aos-delay={timing ? timing * 100 : 0 * 100}
    >
      {props.children}
    </div>
  );
};
