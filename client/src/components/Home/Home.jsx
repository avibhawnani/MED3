import "./Home.scss";
import Banner from "./Banner/Banner"
import Category from "./Category/Category";
import React, { useEffect} from 'react';
import {useLocation} from "react-router-dom";
// import { Context } from "../../utils/context";

const Home = () => {
  const location = useLocation();
  useEffect(()=>{
    window.scrollTo(0,0);
  },[location]);
    return <div>
        <Banner></Banner>
        <div className="main-content">
        <div className="layout">
        <h3 className="head">Services</h3>
        <Category></Category>
        </div>
    </div>
    </div>;
};

export default Home;
