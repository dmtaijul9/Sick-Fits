import gql from "graphql-tag";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { perPage } from "../config";

import Product from "./product";

export const ALl_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int!) {
    allProducts(skip: $skip, first: $first) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

function Products({ page }) {
  const { loading, error, data } = useQuery(ALl_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });

  const ProductListStyle = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
  `;
  if (loading) {
    return <p>Loading .....</p>;
  }

  if (error) {
    return <p>Something is wrong</p>;
  }

  return (
    <div>
      <ProductListStyle>
        {data.allProducts.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </ProductListStyle>
    </div>
  );
}

export default Products;
