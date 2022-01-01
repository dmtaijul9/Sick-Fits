import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const DeleteProduct = ({ id, children }) => {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION
  );

  const update = (cache, payload) => {
    cache.evict(cache.identify(payload.data.deleteProduct));
  };

  const deleteHandle = () => {
    const deleteConfirm = confirm("Are You Sure ?");
    if (deleteConfirm) {
      console.log("Deleting");

      deleteProduct({ variables: { id }, update }).catch((err) =>
        alert(err.message)
      );
    }
  };

  return (
    <button type="button" onClick={deleteHandle}>
      {" "}
      {children}{" "}
    </button>
  );
};

export default DeleteProduct;
