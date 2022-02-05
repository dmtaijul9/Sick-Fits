const calcTotalPrice = (cart) => {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally;

    const singleItemPrice = cartItem?.product?.price * cartItem?.quantity;

    return tally + singleItemPrice;
  }, 0);
};

export default calcTotalPrice;
