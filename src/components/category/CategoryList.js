import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategory = () =>
    categories.map((c) => (
      <div
        key={c._id}
        className="col m-2 btn btn-outlined-primary btn-lg btn-block btn-raised"
      >
        <Link to={`/category/${c.slug}`}>{c.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center text-warning">Loading.....</h4>
        ) : (
          showCategory()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
