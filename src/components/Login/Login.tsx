import React, { useState } from "react";
import { Layout, Col, Row } from "antd";
import LoginForm from "./LoginForm";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authFirebase, db } from "../../firebase";
import { LoginFormType } from "../../models";
import { useAppDispatch } from "../../hooks/redux-models";
import { authActions } from "../../store/auth";
import ErrorAlert from "../UI/ErrorAlert";
import { doc, setDoc } from "firebase/firestore";
import { Task } from "../../models";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [errorDescription, setErrorDescription] = useState<string>("");

  const onRegister = (values: LoginFormType) => {
    createUserWithEmailAndPassword(authFirebase, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userInitialTasks: Task[] = [
          {
            title: "This is your first demo task",
            description: `Hello, ${user.email}. Do you like my app?`,
            data: new Date().getTime(),
            from: "admin",
            to: user.email!,
            status: false,
          },
        ];
        setDoc(doc(db, "users", user.uid), {
          email: user.email,
          tasks: userInitialTasks,
          deliveredTasks: [],
        }).then();
        dispatch(authActions.login({ uid: user.uid, email: values.email }));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorDescription(errorMessage);
      });
  };

  const onLogin = (values: LoginFormType) => {
    signInWithEmailAndPassword(authFirebase, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(authActions.login({ uid: user.uid, email: values.email }));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorDescription(errorMessage);
      });
  };

  return (
    <Layout>
      <Layout.Content>
        <Row>
          <Col
            xs={0}
            lg={12}
            style={{
              height: "100vh",
              background: "url(https://source.unsplash.com/random)",
              backgroundSize: "cover",
            }}
          ></Col>
          <Col
            xs={24}
            lg={12}
            style={{
              height: "100vh",
            }}
          >
            <LoginForm onRegister={onRegister} onLogin={onLogin} />
            {errorDescription && (
              <ErrorAlert message="Error!" description={errorDescription} />
            )}
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default Login;
