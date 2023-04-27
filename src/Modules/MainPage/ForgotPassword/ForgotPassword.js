import React, { useState } from "react";
import style from"./ForgotPassword.module.css"
import Forgotpassword from "../../../Assets/images/Forgotpassword.png"
import axios from "axios";
import * as Cookies from "js-cookie"
import Video from "../Video/Video";
import { Link } from "react-router-dom";

function ForgotPassword(){
  
  const[email,setEmail]=useState('');
  const [message, setMessage]=useState("")

  const setEmailValidation=(e)=>{
    setEmail(e.target.value)
}
  const onSubmitHandler=(e)=>{
    e.preventDefault()
    const config = {     
      headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
      "Set-Cookie":Cookies.get("JSESSIONID"),
      },
      withCredentials: true,
        
  }

  axios.post(
    `http://dev.skopic.com:9090/skopicportal/index/validateActivationStatus.html?email=${email}`, 
    config,
  )
 

  axios.post(
    `http://dev.skopic.com:9090/skopicportal/index/getUserPassword.html?emailId=${email}`,
    config,

  )
    .then(function (response) {
      if(response.data==="Success"){
        setMessage("Temporary password sent to your email")
      }
      else{
        setMessage("No such email exists")
      }
  })
  .catch(function (error) {
      console.log(error);
  })
}
const isSubmitHandler=()=>{
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
{
   return false
  }
  else{
    return true
  }
}
const isEnabled=isSubmitHandler()
return(
    <>
    <div className={style.main}>
    <Video/>
      <div className={style.ForgotPassword}>
        <img src={Forgotpassword} alt="Forgotpassword-Image" className={style.ForgotPasswordImage}/>
        <h3 className={style.ForgotHead}>Forgot Password</h3>
        <p className={style.Forgottext}>Enter your email to reset your password</p>
        <form onSubmit={ onSubmitHandler}>
            <div className={`modal-box ${style.AddEmail}`}>
            <div className={style.ForgotFromEmail }>
            <input type="email" placeholder="Email" name="email" value={email} onChange={(e)=>setEmailValidation(e)}  />
            </div>
            </div>
          <button type="submit" className={style.Reset} disabled={!isEnabled}>Reset</button>
        </form>
        <Link  to={"/"}>
        <p className={style.BackSignIN} >Back to Sign In</p>
        </Link>
        <p className={style.ForgotMessage}>{message}</p>
        <div className={style.footerElemnts}>
          <div className={style.footerLinks}>
            <a href="#">About</a> | 
            <a href="#">Privacy</a> | 
            <a href="#">Terms</a> | 
            <a href="#">Blog</a> | 
            <a href="#">Timeline</a> | 
            <a href="#">Careers</a> | 
            <a href="#">Contact</a> | 
            <a href="#">Help</a> | 
            <a href="#">Nearby Communities</a> | 
            <a href="#">User Guidelines</a> | 
            <a href="#">Cookies</a>
          </div>
          <div>Skopic &#169; 2020</div>
        </div>
      </div>
      </div>
      
    </>
)
}

export default ForgotPassword