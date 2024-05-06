import React, { useEffect, useState } from "react";
import { ProductCard } from "./components/ProductCard";
import { useGetSubscriptionTiers } from "../../Hooks/useSubscriptionTiers";
import { P } from "../Members/Common/Type";
import { Tabs } from "@mantine/core";
import { IconUsersGroup, IconShield } from "@tabler/icons-react";
import { trackButtonClick } from "../../lib/GA";
import Section from "../UI/DefaultSection";

const FixturaPricingCards = () => {
  const [products, setProducts] = useGetSubscriptionTiers();
  const [loading, setLoading] = useState(false);

  const sectionData = {
    title: "Experience Fixtura with a Two-Week Free Trial",
    paragraphs: [
      "Dive into the world of Fixtura, a platform now serving Cricket, AFL, and Netball clubs and associations. Enjoy access to AI-generated write-ups, comprehensive fixture summaries, top performance highlights, custom videos, and stunning images tailored to each sport.",
      "When you're ready to elevate your club's digital presence, seamlessly transition to a full subscription with our flexible pricing model.",
    ],
  };

  useEffect(() => {
    async function fetchSubscriptionTiers() {
      try {
        setLoading(true);
        await setProducts();
      } catch (error) {
        console.error("Failed to fetch subscription tiers:", error);
      } finally {
        setLoading(false);
      }
    }

    if (!products) {
      fetchSubscriptionTiers();
    }
  }, [setProducts, products]);

  const handleTabChange = (tabValue) => {
    trackButtonClick(`Pricing Tab - ${tabValue}`);
  };

  const renderProducts = (isClub) => (
    <div className="row justify-content-center">
      {products?.map((product, index) => {
        const { isActive, isClub: productIsClub } = product.attributes;
        if (isActive && productIsClub === isClub) {
          return (
            <ProductCard
              key={index}
              product={product.attributes}
              signUp={true}
            />
          );
        }
        return null;
      })}
    </div> 
  );

  if (!products) {
    return (
      <div className="pricing-area ptb-100 bg-f9f6f6">
        <div className="container">
          <div className="section-title">Creating Subscriptions Options</div>
        </div>
      </div>
    );
  }

  return (
    <Section {...sectionData} color="light">
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
            <P Weight={600} size={14} marginBottom="0" textAlign="center">
              Club
            </P>
          </Tabs.Tab>
          <Tabs.Tab
            value="Association"
            icon={<IconUsersGroup size="1.2rem" color="black" />}
          >
            <P Weight={600} size={14} marginBottom="0" textAlign="center">
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
  );
};

export default FixturaPricingCards;

// Dev Notes:
// - Improved error handling with try-catch and logging.
// - Introduced loading state for better UI management and user feedback.
// - Refactored useEffect to encapsulate logic and handle asynchronous actions.
// - Utilized optional chaining (?) for safer access to potentially undefined properties.
// - Improved readability with clearer variable names and simplified JSX structure.

// Recommendations:
// - Consider implementing error feedback to the user through UI, not just console.
// - Possible addition of loading indicators or skeletons during fetch operations.

// LLm Notes:
// This component displays subscription products for a sports association management platform. It is located under `src/components/Pricing/FixturaPricingCards.jsx` in the project structure. It dynamically fetches product data, handles user interactions with tabs, and displays product cards conditionally based on the type of club.
