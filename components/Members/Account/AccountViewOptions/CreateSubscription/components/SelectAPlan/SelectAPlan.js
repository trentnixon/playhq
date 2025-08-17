import { useEffect, useState } from 'react';
import { Group } from '@mantine/core';
import { useGetSubscriptionTiers } from '../../../../../../../Hooks/useSubscriptionTiers';
import { useAccountDetails } from '../../../../../../../context/userContext';
import { FindAccountType } from '../../../../../../../lib/actions';
import { CreateNewInvoice } from './components/CreateANewInvoice';
import dayjs from 'dayjs';
import { FixturaLoading } from '../../../../../Common/Loading';
import { ProductCard } from '../../../../../../pages/public/FixturaPricingCards/components/ProductCard';

// Custom hook to handle fetching of subscription tiers
const useFetchSubscriptionTiers = () => {
  const [products, getSetSubscriptionTiers] = useGetSubscriptionTiers();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products === null) {
      getSetSubscriptionTiers()
        .then(() => setLoading(false))
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [products, getSetSubscriptionTiers]);

  return { products, loading };
};

// Shared component for creating cards

export const SelectAPlan = props => {
  const { products, loading } = useFetchSubscriptionTiers();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { account } = useAccountDetails();

  if (loading) return <FixturaLoading />;
  if (!products) return <div>Error loading Subscriptions Options</div>;

  const accountType = FindAccountType(account);
  const isAccountClub = accountType === 'Club';

  const handleConfirm = productId => setSelectedProductId(productId);

  return (
    <>
      <div className='row justify-content-center'>
        {products.map((product, i) => {
          const { isActive, isClub: productIsClub } = product.attributes;

          if (
            isActive &&
            productIsClub === isAccountClub &&
            (selectedProductId === null || product.id === selectedProductId)
          ) {
            const endDate = dayjs(props.startDate)
              .add(product.attributes.DaysInPass, 'day')
              .format();

            return (
              <CreateCards
                key={i}
                product={product.attributes}
                signUp={false}
                timing={i}
                selected={product.id === selectedProductId}
                selectedEndDate={endDate}
                BTN={
                  <Group position='center' px={10}>
                    <CreateNewInvoice
                      productId={product.id}
                      selected={product.id === selectedProductId}
                      onConfirm={handleConfirm}
                      endDate={endDate}
                      {...props}
                    />
                  </Group>
                }
                {...props}
              />
            );
          }
          return null; // Return null for items that shouldn't be rendered
        })}
      </div>
    </>
  );
};

export const CreateCards = props => {
  const { selected } = props;
  return (
    <ProductCard
      className={selected ? 'col-lg-12' : 'opacity-5'}
      withTool={false}
      {...props}
    />
  );
};
