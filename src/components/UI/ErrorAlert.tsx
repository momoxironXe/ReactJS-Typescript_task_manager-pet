import React from "react";
import { Alert } from 'antd';

const ErrorAlert: React.FC<{message: string, description: string}> = (props) => {
    return (
      <Alert
        message={props.message}
        description={props.description}
        type="error"
        showIcon
      />
    );
};

export default ErrorAlert;