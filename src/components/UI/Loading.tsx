import React from "react";
import classes from "./Loading.module.css"
import { Spin } from "antd";

const Loading: React.FC = () => {
    return (
      <div className={classes.loading}>
        <Spin tip="Loading..." />
      </div>
    );
};

export default Loading;