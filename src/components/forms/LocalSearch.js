import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  //Filter and search step 3
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <input
      type="search"
      placeholder="Search Filter"
      value={keyword}
      onChange={handleSearchChange}
      className="form-control mb-4"
    />
  );
};

export default LocalSearch;