import Link from "next/link";
import { useCart } from "../lib/cartState";
import CartCount from "./CartCount";
import SignOut from "./SignOut";
import NavStyles from "./styles/NavStyles";
import { useUser } from "./User";

const Nav = () => {
  const user = useUser();

  const cartCount = user?.cart?.reduce((tally, cartItem) => {
    return tally + cartItem?.quantity;
  }, 0);
  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href={"/products"}>Products</Link>

      {user && (
        <>
          <Link href={"/sell"}>Sell</Link>
          <Link href={"/orders"}>Orders</Link>
          <Link href={"/account"}>Account</Link>
          <SignOut />
          <button onClick={openCart}>
            My Cart <CartCount count={cartCount} />
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href={"/signin"}>Sign In</Link>
        </>
      )}
    </NavStyles>
  );
};

export default Nav;
