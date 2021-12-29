import React from "react";
import Link from "next/link";
import ItemStyle from "./styles/ItemStyles";
import Title from "./styles/Title";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";

const SingleProduct = ({ product }) => {
  return (
    <>
      <ItemStyle>
        <img
          src={`${product?.photo?.image?.publicUrlTransformed}`}
          alt={`${product.name}`}
        />
        <Title>
          <Link href={`product${product.name}`}>{product.name}</Link>
        </Title>
        <PriceTag> {formatMoney(product.price)} </PriceTag>
        {/* TODO: Adding button etc */}
        <p> {product.description} </p>
      </ItemStyle>
    </>
  );
};
export default SingleProduct;
