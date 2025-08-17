import React, { useEffect, useState } from 'react';
import { TextInput, Button, Loader, Text, Group, Box } from '@mantine/core';
import useCoupon from '../../../../../Hooks/useCoupon';
import { useCouponContext } from '../../../../../context/CouponContext';

const CouponInput = () => {
  const [code, setCode] = useState('');
  const { coupon: validCoupon, setCoupon: setValidCoupon } = useCouponContext();
  const { coupon, loading, error, status, validateCoupon } = useCoupon();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    validateCoupon(code);
    setSubmitted(true);
  };

  useEffect(() => {
    if (status === 'positive' && coupon) {
      console.log('coupon ', coupon);
      setValidCoupon(coupon);
    }
  }, [status, coupon, setValidCoupon]);

  const handleReset = () => {
    setCode('');
    setSubmitted(false);
  };

  return (
    <Group position='apart' mb={10}>
      <Box>
        {loading && <Text>Loading...</Text>}
        {status === 'positive' && (
          <Text color='green'>
            Coupon applied! Discount: {coupon.DiscountValue}{' '}
            {coupon.DiscountType}
          </Text>
        )}
        {status === 'expired' && <Text color='red'>Coupon has expired.</Text>}
        {status === 'invalid' && <Text color='red'>{error}</Text>}
        {error && status !== 'invalid' && (
          <Text color='red'>Something went wrong: {error}</Text>
        )}
      </Box>

      <div className='coupon-input'>
        {submitted ? (
          status === 'positive' ? (
            <Text>Submitted</Text>
          ) : (
            <Button onClick={handleReset}>Submitted - Try Again</Button>
          )
        ) : validCoupon ? (
          <Text>Coupon Applied</Text>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <Group position='apart'>
              <TextInput
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder='Enter coupon code'
                disabled={loading}
                required
                style={{ maxWidth: '400px' }}
              />
              <Button type='submit' disabled={loading}>
                {loading ? <Loader size='sm' color='white' /> : 'Apply'}
              </Button>
            </Group>
          </form>
        )}
      </div>
    </Group>
  );
};

export default CouponInput;
