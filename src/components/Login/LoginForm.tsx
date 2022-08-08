import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { LoginFormType } from "../../models";

const LoginForm: React.FC<{
  onRegister: (values: LoginFormType) => void;
  onLogin: (values: LoginFormType) => void;
}> = (props) => {
  const [loginState, setLoginState] = useState<boolean>(true);

  const onChangeFormState = () => {
    setLoginState((prevState) => !prevState);
  };

  const onFinish = (values: LoginFormType) => {
    if (loginState) {
      props.onLogin(values);
    } else {
      props.onRegister(values);
    }
  };

  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          {loginState ? "Log in" : "Register"}
        </Button>
      </Form.Item>
      <Form.Item>
        Or{" "}
        <Button onClick={onChangeFormState} type="link">
          {" "}
          {loginState ? "register now!" : "log in!"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
