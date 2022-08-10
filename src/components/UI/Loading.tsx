import React from "react";
import classes from "./Loading.module.css"
import { Spin } from "antd";

const Loading = () => {
    return (
      <div className={classes.loading}>
        <Spin tip="Loading..." />
      </div>
    );
};

export default Loading;