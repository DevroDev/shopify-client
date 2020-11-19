import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//ant
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
//redux
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
//function
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
//component
import CategoryForm from "../../../components/forms/CategoryForm";
import AdminNav from "../../../components/nav/AdminNav";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  //search and filtering in 5 step
  //step1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  //rerender category on state change
  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  //submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        //console.log(res)
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadCategories();
      })
      .catch((err) => {
        //console.log(err)
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
      });
  };

  //delete function
  const handleRemove = async (slug) => {
    //let answer=window.confirm("Delete?");
    //console.log(answer,slug)
    if (window.confirm("Aye you sure want to Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} was deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data);
          }
          loadCategories();
        });
    }
  };


  //Filter and search step 4
  const searched=(keyword)=>(c)=>c.name.toLowerCase().includes(keyword)

  return (
    <div className="container-fluid pt-5">
      <div className="row  pt-3">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Create category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          {/*Filter and search step 2*/}
          <LocalSearch keyword={keyword} setKeyword={setKeyword}/>
          <hr />
          {/*Filter and Search step 5*/}
          {categories.filter(searched(keyword)).map((c) => (
            <div className="alert alert-primary" key={c._id}>
              {c.name}
              <span
                onClick={() => handleRemove(c.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/category/${c.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
