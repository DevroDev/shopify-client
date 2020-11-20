import React, { useState,useEffect } from "react";

//firebase
import { auth } from "../../firebase";
import { toast } from "react-toastify";

//redux
import { useSelector } from "react-redux";

const Register = ({history}) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user,history]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log('Env---->',process.env.REACT_APP_REGISTER_REDIRECT_URL)
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`
    );
    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control text-primary"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
        autoFocus
      />
      <br/>
      <button type="submit" className="mt-3 btn-primary">
        Register
      </button>
    </form>
  );

  return (
    <div className="container-fluid form-container p-5">
      <div className="row">
        <div className="col-md-12 text-center register-form boxShadow  pt-5">
          <h3 className="pb-5" style={{color:'white'}}>Register</h3>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
