import React, { createContext, useState, useContext } from "react";

const CouponContext = createContext();

export const CouponProvider = ({ children }) => {
  const [coupon, setCoupon] = useState(null);

  return (
    <CouponContext.Provider value={{ coupon, setCoupon }}>
      {children}
    </CouponContext.Provider>
  );
};

export const useCouponContext = () => {
  return useContext(CouponContext);
};
