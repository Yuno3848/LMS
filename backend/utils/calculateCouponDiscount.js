export const calculateDiscountPrice = (basePrice, coupon) => {
  if (!coupon || !coupon.isActive) return basePrice;

  if (coupon.discountType === 'percentage') {
    return Math.max(0, basePrice - (basePrice * coupon.discountValue) / 100);
  }

  if (coupon.discountType === 'fixed') {
    return Math.max(0, basePrice - (basePrice - coupon.discountValue) / 100);
  }

  return basePrice;
};
