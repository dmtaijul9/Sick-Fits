import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import Head from "next/head";

import DisplayError from "./ErrorMessage";

const ProductStyle = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2.5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      price
      description
      status
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const SingleProduct = ({ id }) => {
  const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  console.log(loading, error, data);
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <DisplayError error={error} />;
  }

  const { Product } = data;

  return (
    <ProductStyle>
      <Head>
        <title>Sick Fits | {Product?.name} </title>
      </Head>
      <img
        src={Product?.photo?.image?.publicUrlTransformed}
        alt={Product?.photo?.altText}
      />
      <div className="details">
        <h2> {Product?.name} </h2>
        <p> {Product?.description} </p>
      </div>
    </ProductStyle>
  );
};

export default SingleProduct;
