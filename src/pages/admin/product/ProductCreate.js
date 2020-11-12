import React, { useState, useEffect } from "react";
//antd
import { LoadingOutlined } from "@ant-design/icons";
//redux
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
//function
import { getCategories, getCategorySubs } from "../../../functions/category";
import { createProduct } from "../../../functions/product";
//component
import AdminNav from "../../../components/nav/AdminNav";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import FileUpload from "../../../components/forms/FileUpload";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue", "Red", "Yellow"],
  brands: [
    "Nike",
    "Apple",
    "Microsoft",
    "Lenovo",
    "Yeezy",
    "Ferarri",
    "Yamaha",
    "Sony",
  ],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState("");
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  //rerender category on state change
  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  //submitting category to db
  const handleSubmit = (e) => {
    e.preventDefault();
    //createCategory(product,authtoken)
    createProduct(values, user.token)
      .then((res) => {
        //console.log(res);
        window.alert(`${res.data.title} is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        //if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  //handle on change function ta khu chin c ko lite ma lote tot buu
  //name ko select mat pee on Change
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  //category ko change mae function
  const handleCategoryChange = (e) => {
    e.preventDefault();
    //console.log("Clicked Category", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      //console.log("Sub Options on category click", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product create</h4>
          )}
          <hr />
          {/*JSON.stringify(values.images)*/}
          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            values={values}
            subOptions={subOptions}
            showSub={showSub}
            setValues={setValues}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
