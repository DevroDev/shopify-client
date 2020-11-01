import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {createOrUpdateUser} from "../../functions/auth";

//api ko authtoken po pay mae function


const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    //console.log(window.location.href)
    //console.log()
  }, []);

  const handleSubmit = async (e) => { 
    e.preventDefault();

    //validation
    if (!email || !password) {
      toast.error("Email is password is Required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //console.log("Result",result)//result jsonn

      if (result.user.emailVerified) {
        //remove user email from local Storage
        window.localStorage.removeItem("emailForRegistration");
        //get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        //redux store
        //console.log('user',user,'idTokenResult',idTokenResult);

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));

        //redirect
        history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <br />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-raised">
        Complete Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Complete Register</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;