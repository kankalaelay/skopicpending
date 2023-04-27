import React, { Component } from "react";
import style from "./Signup.module.css";
import google from "../../../Assets/images/google.svg";
import facebook from "../../../Assets/images/facebook.svg";
import apple from "../../../Assets/images/Apple.svg"
import axios from "axios"
import EmailverficationModal from "../EmailVerification/EmailverficarionModal";
import * as Cookies from "js-cookie"
import * as CryptoJS from "crypto-js"
import { calcMD5 } from "../../../md5Forgot";

class Signup extends Component {
  state = {
    email: "",
    validEmail: false,
    password: "",
    validPassword: false,
    validForm: false,
    dispalyname: "",
    validName: false,
    country: "Countries",
    validCountries: false,
    SelectCountries:[],
    community: "Default Community",
    validCommunity: false,
    modalShow:false,
    SelectCommunities:[],
    emailerror:"",
    erroremailStatus:true,
    asignValue:""
  };

  validateForm = () => {
    const {
      validEmail,
      validPassword,
      validName,
      validCountries,
      validCommunity,
    } = this.state;
    this.setState({
      validForm:
        validEmail &&
        validPassword &&
        validName &&
        validCountries &&
        validCommunity,
    });
  };
  handleShow=()=> {
		this.setState({ show:true });
	}
  handleClose=()=>   {
		this.setState({ show: false });
	}
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
  updateName = (dispalyname) => {
    this.setState({ dispalyname }, this.nameValidate);
  };
  nameValidate = () => {
    const { dispalyname } = this.state;
    let nameValid = true;
    // must be 4 chars and no empty
    if (dispalyname.length < 4 || dispalyname === "") {
      nameValid = false;
    }
    this.setState({ nameValid }, this.validateForm);
  };
  updateCountries = (country) => {
    this.setState({ country }, this.countryValidate);
  };
  countryValidate = () => {
    const { country } = this.state;
    let validCountries = true;
    if (country === "Countries") {
      validCountries = false;
    }
    this.setState({ validCountries }, this.validateForm);
  };
  updateCommunity = (community) => {
    this.setState({ community}, this.communityValidate);
  };
  communityValidate = () => {
    const { community } = this.state;
    let validCommunity = true;
    if (community === "Default Community") {
      validCommunity = false;
    }
    this.setState({ validCommunity }, this.validateForm);
  };
  componentDidMount() {
    const config = {     
      headers: { 'content-type': 'x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
      "Set-Cookie":Cookies.get("JSESSIONID"),
      },
      withCredentials: true,  
  }
let countries=this.state.country
    axios.get(
      `http://dev.skopic.com:9090/skopicportal/jsonindex/main.html?logParam=restrict`, 
      config
    )
      .then((response) => {
    this.setState({SelectCountries:response.data.countryList})
    this.setState({SelectCommunities:response.data.countryTenantList.India })
      })
    
  }
  submitHandler = (e,id) => {
    e.preventDefault();
    let encodedemail=CryptoJS.AES.encrypt(this.state.email, 'skopic').toString()
    let encodepassword=calcMD5(this.state.password)
      let formData=new FormData()
      formData.append("email",encodedemail)
      formData.append("displayName",this.state.dispalyname)
      formData.append("password",encodepassword)
      formData.append("password_c",encodepassword)
      formData.append("userTenant",this.state.community)
      let data=new FormData()
      data.append("mail",this.state.email)
      const config = {     
        headers: { 'content-type': 'x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
        "Set-Cookie":Cookies.get("JSESSIONID"),
        },
        withCredentials: true,  
    }
  
    axios.post(
        `http://dev.skopic.com:9090/skopicportal/jsonindex/sendVerificationCode.html?redirectTenantId=${id}`, 
        formData,
        config,
      )
        .then(function (response) {

          
      })
      .catch(function (error) {
          console.log(error);
      })
     
      
  };
  isSubmitEnabled = () => {
    if (
      this.state.emailValid &&
      this.state.passwordValid &&
      this.state.nameValid &&
      this.state.validCountries &&
      this.state.validCommunity&&
      this.state.erroremailStatus
    ) {
      return true;
    } else {
      return false;
    }
  };
  onEnterEmail=(e)=>{
    if(e.key==="Tab" && this.state.emailValid ){
     let data = new FormData()
     data.append("mail",this.state.email)
 
     const config = {     
       headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
       "Set-Cookie":Cookies.get("JSESSIONID"),
       },
       withCredentials: true, 
 
   }
   let currentComponent = this
   axios.post(
     "http://dev.skopic.com:9090/skopicportal/jsonindex/validateTempUserEmail.html", 
       data,
     config,
   )
     .then(function (response) {
       if(response.data.status==="SkopicUser"){
        currentComponent.setState({ emailerror:"There is an existing account with this email address"})
        currentComponent.setState({ erroremailStatus: false})
       }
       else{
        currentComponent.setState({ emailerror:""})
        currentComponent.setState({ erroremailStatus: true})
       }
   })
   .catch(function (error) {
       console.log(error);
   })
  }
}
asignId=(value)=>{
 this.setState({asignValue:value})
 console.log(this.state.asignValue)
}

  render() {
    const isEnabled = this.isSubmitEnabled();
    let modalClose = () => this.setState({ modalShow: false });
    const emailEntered=this.onEnterEmail
   
    return (
      <>
        <div className={style.Signup}>
        <form onSubmit={(e)=>this.submitHandler(e,this.state.asignValue)}>
          <div className={`modal-box ${style.SignupForm}`}>
              <div className={style.SignupFormElemnts}>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.updateEmail(e.target.value)}
                  onKeyDown={emailEntered}
                  maxLength="50"
                />
              </div>
              <p style={{fontSize:"10px",margin:"0px",padding:"0px",color:"red"}}>{this.state.emailerror}</p>
              <div className={style.SignupFormElemnts}>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.updatePassword(e.target.value)}
                  maxLength="50"
                />
              </div>
              <div className={style.SignupFormElemnts}>
                <input
                  type="text"
                  placeholder="display name"
                  name="name"
                  value={this.state.dispalyname}
                  onChange={(e) => this.updateName(e.target.value)}
                  maxLength="50"
                />
              </div>
              <div className={style.SignupFormElemnts}>
                <select
                  value={this.state.country}
                  onChange={(e) => this.updateCountries(e.target.value)}
                >
                  <option value="Countries">Countries</option>
                   {this.state.SelectCountries.map((countries)=>(
                     <option key={countries.country_code} value={countries.country_name}>{countries.country_name}</option>
                   ))}
                </select>
              </div>
              <div className={style.DefaultCommunity}>
                <select
                  value={this.state.community}
                  onChange={(e) => this.updateCommunity(e.target.value)}
                >
                  <option value="Default Community">Default Community</option>
                    {this.state.SelectCommunities.map((communities)=>(
                      <option value={communities.name}   onClick={()=>this.asignId(communities.id)}>{communities.name}</option>
                    ))}
                </select>
              </div>
              </div>
              <div className={style.TandC}>
            <p>
              By Siging Up, you accept to Skopic's <span>Trems of service</span>{" "}
              and <span>privacy</span>
            </p>
          </div>
          <button
                type="submit"
                className={style.SignupButton}
                disabled={!isEnabled}
                onClick={() => this.setState({ modalShow: true })}
              >
                sign up
              </button>         
            </form>
          
          
            <EmailverficationModal
            show={this.state.modalShow}
            onHide={modalClose}
            email={this.state.email}
            tentId={this.state.asignValue}
           />

<div className={style.Changesignin}>
          <p><span>or</span></p>
            <div className={style.Signinicon}>
              <img
                src={google}
                alt="google icon"
                className={style.googleicon}
              />
              <img
                src={facebook}
                alt="google icon"
                className={style.facebookicon}
              />
                 <img
                src={apple}
                alt="google icon"
                className={style.facebookicon}
              />
            </div>
          </div>
        </div>
        <div className={style.footerElemnts}>
                  <span>About |</span>
                  <span>  Privacy |</span>
                  <span>Terms |</span>
                  <span>Blog |</span>
                  <span> Timeline |</span>
                  <span>Careers |</span>
                  <span> Contact |</span>
                  <span>Help |</span>
                  <span> Nearby Communities |</span>
                  <span>User Guidelines |</span>
                  <span>Cookies </span>
              </div>
              <div style={{ textAlign:"center",} }>Skopic &#169; 2020</div>
      </>
    );
  }
}
export default Signup;
