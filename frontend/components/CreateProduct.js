import { useMutation, gql } from "@apollo/client";
import useForm from "../lib/useForm";
import Form from "./styles/Form";

import DisplayError from "./ErrorMessage";
import { ALl_PRODUCTS_QUERY } from "./Products";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? and what types are they .

    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        price: $price
        description: $description
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      price
    }
  }
`;

const CreateProduct = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: "Sick fits",
    image: "",
    description: "This is a nice product ever i see ",
    price: 26564,
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    const res = await createProduct({
      variables: inputs,
      refetchQueries: [{ query: ALl_PRODUCTS_QUERY }],
    });

    console.log(res);

    clearForm();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input required type="file" name="image" onChange={handleChange} />
        </label>
        <label htmlFor="name">
          Name
          <input
            required
            type="text"
            name="name"
            placeholder="Enter Your Name"
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

        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
};

export default CreateProduct;
