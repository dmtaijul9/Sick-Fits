import CartStyles from "./styles/CartStyles";
import CloseButton from "./styles/CloseButton";
import Supreme from "./styles/Supreme";
import { useUser } from "./User";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";
import calcTotalPrice from "../lib/calcTotalPrice";
import { useCart } from "../lib/cartState";
import RemoveFromCart from "./RemoveFromCart";
import Checkout from "./Checkout";

const CartItemStyles = styled.div`
  display: grid;
  padding: 1rem 0;
  grid-template-columns: auto 1fr auto;
  border-bottom: 1px solid var(--lightGrey);

  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem }) => {
  const { product } = cartItem;
  return (
    <CartItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt="image"
        width={100}
        height={80}
      />
      <div>
        <h3> {product?.name} </h3>
        <p>
          {" "}
          {formatMoney(product?.price * cartItem?.quantity)} -{" "}
          <em>
            {" "}
            {cartItem?.quantity} &times; {product?.price} each
          </em>{" "}
        </p>
      </div>
      <RemoveFromCart id={cartItem?.id} />
    </CartItemStyles>
  );
};

const Cart = () => {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();

  if (!me) return null;
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me?.name}'s Cart</Supreme>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {me?.cart?.map((cartItem) => {
          return <CartItem key={cartItem.id} cartItem={cartItem} />;
        })}
      </ul>
      <footer>
        <p> {formatMoney(calcTotalPrice(me?.cart))} </p>
        <Checkout />
      </footer>
    </CartStyles>
  );
};

export default Cart;
