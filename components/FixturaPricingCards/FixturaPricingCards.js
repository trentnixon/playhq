import React, { useEffect, useMemo, useState } from "react";
import { ProductCard } from "./components/ProductCard";
import { useGetSubscriptionTiers } from "../../Hooks/useSubscriptionTiers";
import { P } from "../Members/Common/Type";
import { Tabs } from "@mantine/core";
import { IconUsersGroup, IconShield } from "@tabler/icons-react";
import { trackButtonClick } from "../../lib/GA";
import Section from "../UI/DefaultSection";
import FixturaLoader from "../UI/Loaders/FixturaLoader";

const FixturaPricingCards = () => {
  const [products, setProducts] = useGetSubscriptionTiers();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sectionData = {
    title: "Experience Fixtura with a Two-Week Free Trial",
    paragraphs: [
      "Dive into the world of Fixtura, a platform now serving Cricket, AFL, and Netball clubs and associations. Enjoy access to AI-generated write-ups, comprehensive fixture summaries, top performance highlights, custom videos, and stunning images tailored to each sport.",
      "When you're ready to elevate your club's digital presence, seamlessly transition to a full subscription with our flexible pricing model.",
    ],
  };

  const sortedProducts = useMemo(() => products?.sort((a, b) => a.id - b.id), [products]);

  useEffect(() => {
    const fetchSubscriptionTiers = async () => {
      setLoading(true);
      setError(null);
      try {
        await setProducts();
      } catch (error) {
        console.error("Failed to fetch subscription tiers:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!products) {
      fetchSubscriptionTiers();
    }
  }, [setProducts, products]);

  const handleTabChange = (tabValue) => {
    trackButtonClick(`Pricing Tab - ${tabValue}`);
  };

  const renderProducts = (isClub) => (
    <div className="row justify-content-center">
      {sortedProducts?.map(product => {
        const { isActive, isClub: productIsClub } = product.attributes;
        if (isActive && productIsClub === isClub) {
          return (
            <ProductCard
              key={product.id}
              product={product.attributes}
              signUp={true}
            />
          );
        }
        return null;
      })}
    </div>
  );

  if (loading) {
    return <FixturaLoader />;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

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
          <Tabs.Tab value="Club" icon={<IconShield size="1.2rem" color="black" />} aria-label="Club Pricing">
            <P Weight={600} size={14} marginBottom="0" textAlign="center">Club</P>
          </Tabs.Tab>
          <Tabs.Tab value="Association" icon={<IconUsersGroup size="1.2rem" color="black" />} aria-label="Association Pricing">
            <P Weight={600} size={14} marginBottom="0" textAlign="center">Association</P>
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
