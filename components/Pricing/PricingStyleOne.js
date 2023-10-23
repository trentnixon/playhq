import React, { useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { useGetSubscriptionTiers } from "../../Hooks/useSubscriptionTiers";
import { P } from "../Members/Common/Type";
import { Tabs } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconUsers,
  IconUsersGroup,
  IconShield,
} from "@tabler/icons-react";
import { trackButtonClick } from "../../lib/GA";

const PricingStyleOne = () => {
  const [products, GetsetSubscriptionTiers] = useGetSubscriptionTiers();

  useEffect(() => {
    if (products === null) GetsetSubscriptionTiers();
  }, [GetsetSubscriptionTiers]);

  const handleTabChange = (tabValue) => {
    console.log("trackButtonClick");
    trackButtonClick(`Pricing Tab - ${tabValue}`);
  };
  const renderProducts = (isClub) => (
    <div className="row justify-content-center">
      {products.map((product, i) => {
        const { isActive, isClub: productIsClub } = product.attributes;
        if (isActive && productIsClub === isClub) {
          return (
            <ProductCard key={i} product={product.attributes} signUp={true} />
          );
        }
        return null; // Return null for items that shouldn't be rendered
      })}
    </div>
  );

  if (products === null)
    return (
      <div className="pricing-area ptb-100 bg-f9f6f6">
        <div className="container">
          <div className="section-title">Creating Subscriptions Options</div>
        </div>
      </div>
    );

  return (
    <div className="pricing-area ptb-100 bg-f9f6f6">
      <div className="container">
        <div className="section-title">
          <h2>Unlock the Full Power of Fixtura</h2>
          <P>
            With our single subscription tier, cricket clubs and associations
            gain access to Fixtura's complete asset suite. Enjoy AI-generated
            write-ups, fixture and results summaries, top-performances
            highlights, tailored videos, high-quality images, and sponsor
            displays – all at an affordable price.
          </P>
          <P>Elevate your club's digital presence with Fixtura today!</P>
        </div>
        <Tabs
          variant="pills"
          radius="lg"
          defaultValue="Club"
          color="blue.1"
          onTabChange={handleTabChange}
        >
          <Tabs.List position="center">
            <Tabs.Tab
              value="Club"
              icon={<IconShield size="1.2rem" color="black" />}
            >
              <P Weight={600} size={14} marginBottom="0" textAlign={"center"}>
                Club
              </P>
            </Tabs.Tab>
            <Tabs.Tab
              value="Association"
              icon={<IconUsersGroup size="1.2rem" color="black" />}
            >
              <P Weight={600} size={14} marginBottom="0" textAlign={"center"}>
                Association
              </P>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="Club" pt="xs">
            {renderProducts(true)}
          </Tabs.Panel>

          <Tabs.Panel value="Association" pt="xs">
            {renderProducts(false)}
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default PricingStyleOne;
