import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

import Product from "./product";

export const ALl_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
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

function Products() {
  const { loading, error, data } = useQuery(ALl_PRODUCTS_QUERY);

  if (loading) {
    return <p>Loading .....</p>;
  }

  if (error) {
    return <p>Something is wrong</p>;
  }

  const ProductListStyle = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
  `;

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
