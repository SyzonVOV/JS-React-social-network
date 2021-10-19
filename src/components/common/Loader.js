import React from "react";
import { Spin } from 'antd';
// import loader from "../../assets/images/loader.svg";

let Loader = () => {
  // return <div className="image-loader"><img src={loader} alt="loader"/></div>
  return <div className="image-loader"><Spin size="large" tip="Loading..."/></div>
};

export default Loader;