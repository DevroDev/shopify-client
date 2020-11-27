import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  let dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form className="search-container my-2 my-lg-0" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="text"
        value={text}
        className="form-control"
        placeholder="Search"
      />
      <SearchOutlined
        className="float-left mx-2 py-1"
        onClick={handleSubmit}
        style={{ cursor: "pointer",fontSize: "1.5rem"}}
      />
    </form>
  );
};

export default Search;
