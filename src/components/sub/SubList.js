import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        className="col m-2 btn btn-outlined-primary btn-lg btn-block btn-raised"
      >
        <Link to={`/sub/${s.slug}`}>{s.name}</Link>
      </div>
    ));

  return (
    <>
      <div>
        <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
          Sub Category
        </h4>
      </div>
      <div className="container">
        <div className="row">
          {loading ? (
            <h4 className="text-center text-warning">Loading.....</h4>
          ) : (
            showSubs()
          )}
        </div>
      </div>
    </>
  );
};

export default SubList;
