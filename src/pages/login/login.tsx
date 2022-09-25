import _ from "lodash";
import * as React from "react";
import {
  LoginForm,
  LoginMainFooterBandItem,
  LoginPage,
  BackgroundImage,
} from "@patternfly/react-core";
import { useHistory } from "react-router-dom";
import { loginDB, createAccount } from "../../utils/db";

import "./login.scss";

const Login: React.FC = () => {
  // Handle session
  const history = useHistory();
  const session = localStorage.getItem("hideandseek");
  if (session) {
    history.push("/events");
  }

  const [state, setState] = React.useState({
    usernameValue: "",
    isValidUsername: true,
    passwordValue: "",
    isValidPassword: true,
    isSingedUp: false,
    errorMessage: "",
  });

  const handleUsernameChange = (value: string) => {
    setState({ ...state, usernameValue: value });
  };

  const handlePasswordChange = (value: string) => {
    setState((preState) => ({ ...preState, passwordValue: value }));
  };

  const handleSingedUp = (event?: any) => {
    if (event) {
      event.preventDefault();
    }
    setState((preState) => ({ ...preState, isSingedUp: !preState.isSingedUp }));
  };

  const displayErrorMessage = (msg: string) => {
    setState((preState) => ({ ...preState, errorMessage: msg }));
  };

  const onLoginButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setState((preState) => ({
      ...preState,
      isValidPassword: !!preState.passwordValue,
      isValidUsername: !!preState.usernameValue,
    }));
    if (state.usernameValue && state.passwordValue) {
      const [sessionId, error] = await loginDB(
        state.usernameValue,
        state.passwordValue
      );
      if (!error) {
        localStorage.setItem(
          "hideandseek",
          `${state.usernameValue}:${sessionId}`
        );
        history.push("/events");
      } else {
        displayErrorMessage(error);
      }
    } else {
      displayErrorMessage("Invalid login credentials.");
    }
  };

  const onSignUpButtonClick = async (event: any) => {
    event.preventDefault();
    setState((preState) => ({
      ...preState,
      isValidPassword: !!preState.passwordValue,
      isValidUsername: !!preState.usernameValue,
    }));
    if (state.usernameValue && state.passwordValue) {
      const error = await createAccount(
        state.usernameValue,
        state.passwordValue
      );
      if (!error) {
        alert("User is created successfully, Log in and have fun :P");
        handleSingedUp();
      } else {
        displayErrorMessage(error);
      }
    } else {
      displayErrorMessage("Invalid user info.");
    }
  };

  const signUpForAccountMessage = (
    <LoginMainFooterBandItem>
      {!state.isSingedUp ? (
        <>
          Need an account?{" "}
          <a href="." onClick={handleSingedUp}>
            Sign up.
          </a>
        </>
      ) : (
        <>
          Already have account?{" "}
          <a href="." onClick={handleSingedUp}>
            Log in.
          </a>
        </>
      )}
    </LoginMainFooterBandItem>
  );

  const errorMessage = <div style={{ color: "red" }}>{state.errorMessage}</div>;

  const defaultFilter = <filter></filter>;

  const loginForm = !state.isSingedUp ? (
    <LoginForm
      showHelperText={!!state.errorMessage}
      helperText={errorMessage}
      usernameLabel="Username"
      usernameValue={state.usernameValue}
      onChangeUsername={handleUsernameChange}
      isValidUsername={state.isValidUsername}
      passwordLabel="Password"
      passwordValue={state.passwordValue}
      onChangePassword={handlePasswordChange}
      isValidPassword={state.isValidPassword}
      onLoginButtonClick={onLoginButtonClick}
    />
  ) : (
    <LoginForm
      showHelperText={!!state.errorMessage}
      helperText={errorMessage}
      usernameLabel="Username"
      usernameValue={state.usernameValue}
      onChangeUsername={handleUsernameChange}
      isValidUsername={state.isValidUsername}
      passwordLabel="Password"
      passwordValue={state.passwordValue}
      onChangePassword={handlePasswordChange}
      isValidPassword={state.isValidPassword}
      onLoginButtonClick={onSignUpButtonClick}
      loginButtonLabel="Create User"
    />
  );
  const footerListItems = (
    <img
      className="login-form__sward"
      src={"./img/fun.gif"}
      alt="PatternFly logo"
    />
  );

  return (
    <>
      <BackgroundImage src={"./img/background.jpg"} filter={defaultFilter} />
      <div className="login-form__login">
        <LoginPage
          brandImgSrc={"./img/title.png"}
          footerListItems={footerListItems}
          backgroundImgAlt="Images"
          loginTitle={
            !state.isSingedUp ? "Log in to your account" : "Create new account"
          }
          signUpForAccountMessage={signUpForAccountMessage}
        >
          {loginForm}
        </LoginPage>
      </div>
    </>
  );
};

export default Login;
