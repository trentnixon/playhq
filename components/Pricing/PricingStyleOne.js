import React, { useEffect } from "react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { useGetSubscriptionTiers } from "../../Hooks/useSubscriptionTiers";
import { P } from "../Members/Common/Type";

const PricingStyleOne = () => {
  const [products, GetsetSubscriptionTiers] = useGetSubscriptionTiers();

  useEffect(() => {
    if (products === null) GetsetSubscriptionTiers();
  }, [GetsetSubscriptionTiers]);

  if (products === null)
    return (
      <>
        <div className="pricing-area ptb-100 bg-f9f6f6">
          <div className="container">
            <div className="section-title">Creating Subscriptions Options</div>
          </div>
        </div>
      </>
    );
  return (
    <>
      <div className="pricing-area ptb-100 bg-f9f6f6">
        <div className="container">
          <div className="section-title">
            <h2>Customized Coverage for Every Club</h2>

            <P>
              Our three distinct subscription tiers are designed to cater to
              your specific goals and budget. With flexibility at your
              fingertips, you can choose the level of content and analysis that
              best serves your club. Here, your focus stays where it belongs, on
              the game.
            </P>
          </div>

          <div className="row justify-content-center">
            {products.map((product, i) => {
              console.log(product);
              if (product.attributes.isActive)
                return (
                  <ProductCard
                    key={i}
                    product={product.attributes}
                    signUp={true}
                  />
                );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingStyleOne;
