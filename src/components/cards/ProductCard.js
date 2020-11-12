import React from "react";
import { Link } from "react-router-dom";
import avatar from "../../images/fav.png";
import { showAverage } from "../../functions/rating";

import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, description, images, slug, price } = product;
  return (
    <>
      <div>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating Yet</div>
        )}
      </div>
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : avatar}
            style={{ height: "200px", objectFit: "cover" }}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-primary" />
            <br />
            View Product
          </Link>,
          <div>
            <ShoppingCartOutlined className="text-danger" />
            <br />
            Add To Cart
          </div>,
        ]}
        className="m-2 boxShadow"
      >
        <Meta
          title={title}
          description={`${description
            .split(" ")
            .slice(0, 18)
            .join(" ")}   ........`}
        />
        <h4 className="priceButton">{`$ ${price}`}</h4>
      </Card>
    </>
  );
};

export default ProductCard;
