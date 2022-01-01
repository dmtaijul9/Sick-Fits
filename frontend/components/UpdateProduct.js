import { useMutation, useQuery } from "@apollo/client";
import Router from "next/router";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";

const UPDATE_PRODUCT_QUERY = gql`
  query UPDATE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      price
      description
      status
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
      status
    }
  }
`;

const UpdateProduct = ({ id }) => {
  // 1. I need to get the existing product

  const { loading, error, data } = useQuery(UPDATE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });

  // 2.5. create some state for the form inputs

  const { inputs, handleChange, resetForm, clearForm } = useForm(data?.Product);

  // 2. i need to get the mutation to update the product

  const [
    updateProduct,
    { loading: updateLoading, error: updateError, data: updateData },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await updateProduct({
      variables: {
        id,
        ...inputs,
      },
    }).catch((err) => console.error(err));

    Router.push({
      pathname: `/product/${res?.data?.updateProduct?.id}`,
    });
  };

  if (loading) {
    return <p>Loading ...</p>;
  }

  // 3. I need the form to handle the  updates
  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            required
            type="text"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            required
            type="number"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            required
            rows={5}
            type="text"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
};

export default UpdateProduct;
