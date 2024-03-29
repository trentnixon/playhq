import React, { useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { useGetSubscriptionTiers } from "../../Hooks/useSubscriptionTiers";
import { P } from "../Members/Common/Type";
import { Tabs } from "@mantine/core";
import { IconUsersGroup, IconShield } from "@tabler/icons-react";
import { trackButtonClick } from "../../lib/GA";
import Section from "../UI/DefaultSection";

const PricingStyleOne = () => {
  const [products, GetsetSubscriptionTiers] = useGetSubscriptionTiers();

  const SectionData = {
    title: "Experience Fixtura with a Two-Week Free Trial",
    paragraphs: [
      `Explore the benefits of Fixtura's platform tailored for cricket clubs and associations. Gain access to AI-generated write-ups, insightful fixture summaries, top performance highlights, custom videos, and quality images.`,
      `Experience the convenience and value Fixtura brings to your club with a Two-Week Free Trial.`,
      `When you're ready, you can easily subscribe using the pricing model below.`
   ],
  };

  useEffect(() => {
    if (products === null) GetsetSubscriptionTiers();
  }, [GetsetSubscriptionTiers]);

  const handleTabChange = (tabValue) => {
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
    <>
      <Section {...SectionData} color="light">
        <Tabs
          variant="pills"
          radius="lg"
          defaultValue="Club"
          color="blue.5"
          onTabChange={handleTabChange}
        >
          <Tabs.List position="center">
            <Tabs.Tab
              value="Club"
              icon={<IconShield size="1.2rem" color="black" />}
            >
              <P Weight={600} size={14} marginBottom="0"  textAlign={"center"}>
                Club
              </P>
            </Tabs.Tab>
            <Tabs.Tab
              value="Association"
              icon={<IconUsersGroup size="1.2rem" color="black" />}
            >
              <P Weight={600} size={14} marginBottom="0" textAlign={"center"} >
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
      </Section>
    </>
  );
};

export default PricingStyleOne;
