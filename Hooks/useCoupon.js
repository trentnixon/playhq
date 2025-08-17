import Cookies from 'js-cookie';
import { useState } from 'react';
import { fetcher } from '../lib/api';
import { getAccountFromLocalCookie } from '../lib/auth';
const qs = require('qs');

export const useCoupon = () => {
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('neutral'); // neutral, positive, expired, invalid

  const validateCoupon = async code => {
    setLoading(true);
    setError(null);
    setStatus('neutral');
    const query = qs.stringify(
      {
        filters: {
          CouponCode: code,
        },
      },
      {
        encodeValuesOnly: true,
      }
    );

    const user = await getAccountFromLocalCookie();

    if (user) {
      try {
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/coupons?${query}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('jwt')}`,
            },
          }
        );

        console.log('response ', response);

        if (response.data && response.data.length > 0) {
          const coupon = response.data[0].attributes;

          if (!coupon.IsActive) {
            setStatus('invalid');
            setError('Coupon is not active');
            return;
          }

          if (new Date(coupon.ExpirationDate) < new Date()) {
            setStatus('expired');
            setError('Coupon has expired');
            return;
          }

          if (coupon.UsageLimit > 0 && coupon.UsedCount >= coupon.UsageLimit) {
            setStatus('invalid');
            setError('Coupon usage limit reached');
            return;
          }

          setCoupon(coupon);
          setStatus('positive');
        } else {
          setStatus('invalid');
          setError('Coupon not found');
        }
      } catch (err) {
        setStatus('invalid');
        setError('An error occurred while validating the coupon');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError('User not authenticated');
      setStatus('invalid');
    }
  };

  return {
    coupon,
    loading,
    error,
    status,
    validateCoupon,
  };
};

export default useCoupon;
