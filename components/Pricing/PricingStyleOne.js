import React, { useEffect } from "react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { useGetSubscriptionTiers } from "../../Hooks/useSubscriptionTiers";

const PricingStyleOne = () => {
  const [products, GetsetSubscriptionTiers] = useGetSubscriptionTiers();

  useEffect(() => {
    if (products === null) GetsetSubscriptionTiers();
  }, [GetsetSubscriptionTiers]);

  if (products === null) return <>Creating Subscriptions Options</>;
  return (
    <>
      <div className="pricing-area ptb-100 bg-f9f6f6">
        <div className="container">
          <div className="section-title">
            <h2>One plan One Price Policy</h2>
            <p>Need help choosing a plan? No problem, we only offer one!</p>
            <p>
              Unlike other services that may have multiple tiers of plans to
              choose from, we have a single, all-inclusive option that covers
              everything you need and any future additions we make.
            </p>
            <p>
              So you can focus on getting the best value for your club, without
              worrying about what&lsquo;s included in each plan.
            </p>
          </div>

          <div className="row justify-content-center">
            {products.map((product, i) => {
              console.log(product);
              if (product.attributes.isActive)
                return <ProductCard key={i} product={product.attributes} signUp={true} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingStyleOne;
