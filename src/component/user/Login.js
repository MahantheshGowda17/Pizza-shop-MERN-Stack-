import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";
import VisibilityIcon from '@mui/icons-material/Visibility'; 
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Typography } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow]= useState(false)
  const handleShow=()=>{
    setShow(!show)
  }

  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  //function to handle form submission

  useEffect (()=>{
    if(isAuthenticated) {
      window.location.href ="/";
    }
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
  },[dispatch , alert,isAuthenticated,error]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
      
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type={show?"text":"password"}
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <label className="hideAndShow" onClick={handleShow}>{show?<VisibilityOff />:<VisibilityIcon />}</label>
                </div>
                <Link to="/users/forgetPassword" className="float-right mb-4">
                  Forgot Password
                </Link>
                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py3"
                >
                  LOGIN
                </button>
                <Typography varient='subtitle2' sx={{ textAlign:'center',mt:'10px', ml:'0px', color:'black'}}>Don't have an account?<a href="/users/signup" style={{textDecoration:'none',color:"blue"}}>Register</a></Typography>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
