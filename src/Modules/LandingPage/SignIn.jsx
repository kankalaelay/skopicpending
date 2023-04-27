import style from "../../Assets/css/LandingPage/SignIn.module.css";
import google from "../../Assets/images/LandingPageImages/Google.svg";
import facebook from "../../Assets/images/LandingPageImages/Facebook.svg";
import axios from "axios";
import * as Cookies from "js-cookie";
import * as CryptoJS from "crypto-js";
import { calcMD5 } from "../../md5Forgot";
import { useDispatch, useSelector } from "react-redux";
import * as SignInActions from "../../store/actions/SignInActions/SignInAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useState, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import ForgotPassword from "./ForgotPassword/ForgotPassowrd";
let errorMessage = false;
const config = {
  headers: {
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Set-Cookie": Cookies.get("JSESSIONID"),
  },
  withCredentials: true,
};

function SignIn() {
  let loadingStatus = useSelector((state) => state.SignInReducer.isloading);
  let message = useSelector((state) => state.SignInReducer.errorMessage);
  let authenticationVerficationStatus = useSelector(
    (state) => state.SignInReducer.isAuthorized
  );

  let dispatch = useDispatch();
  const [email, setEmail] = useState("");
  let emailValue = useRef("");
  const [password, setPassword] = useState("");
  let validationValue = 0;

  const updateEmail = (e) => {
    emailValue.current = e.target.value;
    setEmail(emailValue.current);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const verifyEmailHandler = (e) => {
    if (email == "" || email.length == 0 || email == null) {
      errorMessage = false;
    }
    if (email != "") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMessage = true;
      }
    } else {
      errorMessage = false;
    }
    let data = new FormData();
    data.append("mail", email);

    if (!errorMessage && email != "") {
      axios.post(
        "http://dev.skopic.com:9090/skopicportal/jsonindex/validateTempUserEmail.html",
        data,
        config
      );
    }
  };
  const activiationCheckHandler = () => {
    if (!errorMessage && email != "") {
      axios.post(
        `http://dev.skopic.com:9090/skopicportal/index/validateActivationStatus.html?email=${email}`,
        config
      );
    }
  };

  const clearMessage = () => {
    errorMessage = false;
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let encodedEmail = CryptoJS.AES.encrypt(email, "skopic").toString();
    let encodedPassword = calcMD5(password);
    let formData = new FormData();
    formData.append("j_username", encodedEmail);
    formData.append("j_password", encodedPassword);
    formData.append("si_remember", "_spring_security_remember_me=true");

    dispatch(SignInActions.signinUser(formData));
  };

  const buttonDisablerHandler = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8) {
      return true;
    } else {
      return false;
    }
  };

  let isEnabled = buttonDisablerHandler();
  if (authenticationVerficationStatus) {
    return <Redirect to="/Home" />;
  }
  return (
    <>
      <div className={style.Signin}>
        <div className={style.SigninFrom}>
          <form onSubmit={submitHandler}>
            <div className={style.SigninFromEmail}>
              <input
                type="email"
                placeholder="email"
                name="email"
                value={email}
                ref={emailValue}
                onChange={(e) => updateEmail(e)}
                maxLength={50}
                onBlur={(e) => verifyEmailHandler(e)}
                onKeyDown={clearMessage}
              />
            </div>
            {errorMessage ? (
              <p className={style.ErrorMsg}>Please enter a valid Email.</p>
            ) : null}
            <div className={style.SigninFromPassword}>
              <input
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => updatePassword(e)}
                onFocus={activiationCheckHandler}
                maxLength={32}
              />
            </div>

            <p className={style.ForgotPassowrd}>
              <ForgotPassword />
            </p>
            <button
              type="submit"
              disabled={isEnabled}
              className={style.SigninButton}
            >
              {loadingStatus ? (
                <CircularProgress style={{ width: "20px", height: "20px" }} />
              ) : (
                <>sign in</>
              )}
            </button>
          </form>
        </div>
        <div className={style.Changesignin}>
          <span>OR</span>
        </div>
        <div className={style.SocailSignIn}>
          Sign In with{" "}
          <img src={google} alt="googleImage" className={style.SocailImage} />
        </div>
        <div className={style.SocailSignIn}>
          Sign In with{" "}
          <img
            src={facebook}
            alt="FacebookImage"
            className={style.SocailImage}
          />
        </div>
      </div>
      <p className={style.StatusMessage}>{message}</p>
    </>
  );
}
export default SignIn;
