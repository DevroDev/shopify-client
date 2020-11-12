import React from "react";
import { Link } from "react-router-dom";
import avatar from "../../images/fav.png";
//antd
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
//Card
const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;
  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : avatar}
          style={{ height: "250px", objectFit: "cover" }}
          className="p-1"
          alt="product"
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(slug)}
          className="text-danger"
        />,
      ]}
      className="m-2"
    >
      <Meta
        title={title}
        description={`${description
          .split(" ")
          .slice(0, 20)
          .join(" ")}   ........`}
      />
    </Card>
  );
};

export default AdminProductCard;
