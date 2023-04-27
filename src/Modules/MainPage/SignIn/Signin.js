import React, { Component } from "react";
import style from "./Signin.module.css";
import google from "../../../Assets/images/google.svg";
import facebook from "../../../Assets/images/facebook.svg";
import apple from "../../../Assets/images/Apple.svg";
import axios from "axios";
import * as Cookies from "js-cookie";
import { Link, Redirect } from "react-router-dom";
import Loader from "../Loader/Loader";
import * as CryptoJS from "crypto-js";
import { calcMD5 } from "../../../md5Forgot";
import * as SignInActions from "../../../store/actions/SignInActions/SignInAction"
import { connect } from "react-redux";
import {bindActionCreators} from "redux"
import * as feedActions from '../../../store/actions/feedactions/feedActionCreator'
import FooterComponent from "../../Reusuablecomponents/FooterComponent";

class Signin extends Component {
  state = {
    email: "",
    validEmail: false,
    password: "",
    validPassword: false,
    validForm: false,
    isLoding: false,
    encrytemil: "",
    isAllFeedLoad:false
  };
  validateForm = () => {
    const { validEmail, validPassword } = this.state;
    this.setState({
      validForm: validEmail && validPassword,
    });
  };
  updateEmail = (email) => {
    this.setState({ email }, this.emailValidate);
  };

  emailValidate = () => {
    const { email } = this.state;
    let emailValid = true;
    // checks for format _@_._
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailValid = false;
    }

    this.setState({ emailValid }, this.validateForm);
  };
  updatePassword = (password) => {
    this.setState({ password }, this.passwordValidate);
  };

  passwordValidate = () => {
    const { password } = this.state;
    let passwordValid = true;

    // must be 8 chars

    if (password.length < 8) {
      passwordValid = false;
    }
    this.setState({ passwordValid }, this.validateForm);
  };

  hideLoader = () => {
    this.setState({ isLoading: false });
  };

  showLoader = () => {
    this.setState({ isLoading: true });
  };

  submitHandler = (e) => {
    let feedparams='?startlimit=0'
    e.preventDefault();
    let encodeemail = CryptoJS.AES.encrypt(
      this.state.email,
      "skopic"
    ).toString();
    let encodepassword = calcMD5(this.state.password);
    let formData = new FormData();
    formData.append("j_username", encodeemail);
    formData.append("j_password", encodepassword);
    formData.append("si_remember", "_spring_security_remember_me=true");
      this.props.SignInActions.signinUser(formData)      
      // this.props.feedActions.fetchFeedData(feedparams)
  };

  isSubmitEnabled = () => {
    if (this.state.emailValid && this.state.passwordValid) {
      return true;
    } else {
      return false;
    }
  };
  onEnterEmail = (e) => {
    if (e.key === "Tab" && this.state.emailValid) {
      let data = new FormData();
      data.append("mail", this.state.email);

      const config = {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Set-Cookie": Cookies.get("JSESSIONID"),
        },
        withCredentials: true,
      };
      axios.post(
        "http://dev.skopic.com:9090/skopicporta/jsonindex/validateTempUserEmail.html",
        data,
        config
      );
      axios.post(
        `http://dev.skopic.com:9090/skopicporta/index/validateActivationStatus.html?email=${this.state.email}`,
        config
      );
    }
  };
 
  render() {
    const isEnabled = this.isSubmitEnabled();
    if(this.props.isAuthorized){
      return <Redirect to='/Home' />
    }

    const emailEntered = this.onEnterEmail;

    return (
      <>
        <div className={style.Signin}>
        <form onSubmit={this.submitHandler}>
          <div className={`modal-box ${style.SigninFrom}`} >
            
              <div className={style.SigninFromEmail }>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.updateEmail(e.target.value)}
                  onKeyDown={emailEntered}
                />
              </div>
              <div className={style.SigninFromPassword}>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.updatePassword(e.target.value)}
                />
              </div>
              
            
          </div><div className={style.KeepSignIn}>
                <input type="checkbox" className={style.Checkbox} />
                <span className={style.Hello}>Keep me signed in</span>
              </div>
              <button
                type="submit"
                className={style.SigninButton}
                disabled={!isEnabled}
                onClick={this.isencryipted}
              >
                sign in
              </button>
          </form>
          <p className={style.ForgotPassowrd}>
            <Link to={"/ForgotPassword"}>forgot password?</Link>
          </p>

          <div className={style.Changesignin}>
            <p><span>or</span></p>
            <div className={style.Signinicon}>
              <a
                href="http://dev.skopic.com:9090/skopicporta/gmail/getGmailRedirectURL.html"
                target="_self"
              >
                <img
                  src={google}
                  alt="google icon"
                  className={style.googleicon}
                />
              </a>
              <img
                src={facebook}
                alt="facebook icon"
                className={style.facebookicon}
              />
              <img src={apple} alt="apple icon" className={style.appleicon} />
            </div>
          </div>
          <p style={{ marginTop: "20px", textAlign: "center" }}>
            {this.props.errorMessage}
          </p>
          <p style={{ marginTop: "20px", textAlign: "center" }}>
           
          {(this.props.isLoading) ? <Loader /> : null}
          </p>
        </div>
        <div className={style.footerElemnts}>
          <div className={style.footerLinks}>
          <FooterComponent/>
            {/* <a href="#">About</a> | 
            <a href="#">Privacy</a> | 
            <a href="#">Terms</a> | 
            <a href="#">Blog</a> | 
            <a href="#">Timeline</a> | 
            <a href="#">Careers</a> | 
            <a href="#">Contact</a> | 
            <a href="#">Help</a> | 
            <a href="#">Nearby Communities</a> | 
            <a href="#">User Guidelines</a> | 
            <a href="#">Cookies</a> */}
          </div>
          {/* <div>Skopic &#169; 2020</div> */}
        </div>
        
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    isAuthorized: state.SignInReducer.isAuthorized, 
    errorMessage:state.SignInReducer.errorMessage,
    isLoading:state.SignInReducer.isloading
  }
}
function mapDispatchToProps(dispatch) {
  return {
    SignInActions: bindActionCreators(SignInActions, dispatch),
    feedActions:bindActionCreators(feedActions,dispatch)
  };
}
export default connect(mapStateToProps,mapDispatchToProps) (Signin);
