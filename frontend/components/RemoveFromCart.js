import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "./User";

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: none;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const RemoveFromCart = ({ id }) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION);

  const updateCart = (cache, payload) => {
    console.log(cache, payload);
    cache.evict(cache.identify(payload.data.deleteCartItem));
  };

  const removeCartItemHandler = () => {
    removeFromCart({
      variables: { id },
      /* refetchQueries: [{ query: CURRENT_USER_QUERY }], */
      update: updateCart,
      /* optimisticResponse: {
        deleteCartItem: {
          __typename: "CartItem",
          id: id,
        },
      }, */
    });
  };

  return (
    <BigButton
      onClick={removeCartItemHandler}
      disabled={loading}
      type="button"
      title="Remove this item from cart"
    >
      &times;
    </BigButton>
  );
};

export default RemoveFromCart;
