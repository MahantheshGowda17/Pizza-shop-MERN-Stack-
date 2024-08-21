import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";

import Search from "./Search";
import "../../App.css";
import { Box, Grid, Paper, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';


const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully");
  };

  return (
    <>
      <nav className="navbar row sticky-top">
        {/* logo */}
        <div className="col-12 col-md-3">
          <Link to="/">
            <img src="/images/lp.png" alt="logo" className="logo" /> 
          </Link>
        </div>

        {/* search bar and search icon */}

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/eats/stores/search/:keyword" element={<Search />} />
          </Routes>
        </div>

        {/* Login */}
       

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          {/* ml-> margin left (3unit from left) */}
          <Link id="home" to="/"sx={{fontSize:50}}><HomeIcon /></Link>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span className="ml-3" id="cart">
             <ShoppingCartIcon/>
            </span>
            <span className="ml-1" id="cart_count">
              {cartItems.length}
            </span>
          </Link>
          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="/"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  ></img>
                </figure>

                <span>{user && user.name}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                <Link className="dropdown-item" to="/eats/orders/me/myOrders">
                  Orders
                </Link>

                <Link className="dropdown-item" to="/users/me">
                  Profile
                </Link>

                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/users/login" className="btn ml-4" id="login_btn">
                <LoginIcon sx={{fontSize:30}}/>
              </Link>
            )
          )}
        </div>
      </nav>
      <Paper
    sx={{
       position:'relative',
        backgroundColor:'grey.800',
        color:'#fff',
        mb:4,
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",
        backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkScIZavRMG2fEwXU2IUfMLbDih9fKK-UBePnYizmSD1lVMxKF_pgSHpv1BXLh_9P9GOs&usqp=CAU)',
    }}>
        <Box 
        sx={{
        //position:"absolute",
        top:0,
        bottom:0,
        left: 0,
        right : 0,
        background:"rgba(0,0,0,0.3)",
        }}>
            <Grid container>
                <Grid item md={6}>
                    <Box
                    sx={{
                        position:"relative",
                        p:{xs:3, md:6},
                        pr:{md:'0'}
                    }}>
                        <Typography component="h1" variant="h3" color="inherit">Just have a fresh-baked pizza delivered to your door....<SentimentSatisfiedAltIcon sx={{ fontSize: 35}}/> </Typography>
                        <Typography component="h5" color="inherit">Best pizza, Best value <FavoriteIcon sx={{fontSize:"h5"}}/> </Typography>
                    </Box>

                </Grid>

            </Grid>
             
        </Box>

    </Paper>
    </>
  );
};

export default Header;