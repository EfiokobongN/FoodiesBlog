import React from 'react'
import { Link } from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../UserContext";
import "./Post3.css";


function Navbar() {

  const {setUserInfo,userInfo} = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const useremail = userInfo?.useremail;

  return (


    <div class="container-fluid  mb-3">
        <nav class="navbar navbar-expand-lg bg-light navbar-light py-2 py-lg-0 px-lg-5">

            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between px-0 px-lg-3 text-uppercase" id="navbarCollapse">
                <div class="navbar-nav mr-auto py-0">
                <Link to="/about-us" class="nav-item nav-link">About-us</Link>
                <Link to="/contact-us" class="nav-item nav-link">contact-us</Link>

                    {useremail && (
          <>
              <Link to="/" class="nav-item nav-link">Home</Link>
            <Link to="/create" class="nav-item nav-link">Create Post</Link>
            <a class="nav-item nav-link" onClick={logout} >Logout ({useremail})</a>
          </>
        )}
        {!useremail && (
          <>
           
            <Link to="/register" class="nav-item nav-link">Sign-Up</Link>
          </>
        )}
        
                </div>
                <div>
                <Link to="/" >
                <h1 class="m-0 display-5 text-uppercase"><span class="text-primary">Foodies</span>Blog</h1>
                </Link>
                </div>
            </div>
        </nav>
    </div>
 
  );
}

export default Navbar;
