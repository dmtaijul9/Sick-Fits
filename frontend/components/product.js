import React from "react";
import Link from "next/link";
import ItemStyle from "./styles/ItemStyles";
import Title from "./styles/Title";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import DeleteProduct from "./DeleteProduct";

const Product = ({ product }) => {
  return (
    <>
      <ItemStyle>
        <img
          src={`${product?.photo?.image?.publicUrlTransformed}`}
          alt={`${product.name}`}
        />
        <Title>
          <Link href={`product/${product.id}`}>{product.name}</Link>
        </Title>
        <PriceTag> {formatMoney(product.price)} </PriceTag>
        {/* TODO: Adding button etc */}
        <p> {product.description} </p>
        <div className="buttonList">
          <Link
            href={{
              pathname: "/update",
              query: {
                id: product.id,
              },
            }}
          >
            Edit ✎
          </Link>
          <DeleteProduct id={product.id}>Delete</DeleteProduct>
        </div>
      </ItemStyle>
    </>
  );
};
export default Product;
