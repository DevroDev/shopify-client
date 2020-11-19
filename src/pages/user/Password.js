import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(password);

    await auth
      .currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("")
        toast.success("Password Updated");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter New Password"
            disabled={loading}
          />
          <br/>
          <button className="btn btn-primary" disabled={!password||password.length<6 || loading}>
            Submit
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid pt-5">
      <div className="row pt-3">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading</h4>
          ) : (
            <h4>Password Update</h4>
          )}
          <br/>
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
