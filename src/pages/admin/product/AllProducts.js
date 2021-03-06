import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
//functions
import { getProductsByCount, removeProduct } from "../../../functions/product";
//Components
import AdminNav from "../../../components/nav/AdminNav";
import AdminProductCard from "../../../components/cards/AdminProductCard";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  //redux
  const {user}=useSelector((state)=>({...state}))
  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    let answer = window.confirm("Are you sure you want to delete");
    if (answer) {
      //console.log("send delete request")
      removeProduct(slug, user.token)
        .then((res) => {
        loadAllProducts();
        toast.error(`${res.data.title} is deleted`)
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };
  return (
    <div className="container-fluid pt-5">
      <div className="row  pt-3">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? <h4>Loading......</h4> : <h4>All Products</h4>}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 pb-3">
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
