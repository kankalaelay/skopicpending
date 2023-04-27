
import style from "../../Assets/css/LandingPage/SignUp.module.css"
import google from "../../Assets/images/LandingPageImages/Google.svg"
import facebook from "../../Assets/images/LandingPageImages/Facebook.svg"
import axios from "axios";
import * as Cookies from "js-cookie";
import * as CryptoJS from "crypto-js";
import { calcMD5 } from "../../md5Forgot";
import {useDispatch,useSelector} from "react-redux"
import CircularProgress from '@material-ui/core/CircularProgress';
import  EmailverficationModal from "./EmailVerification/EmailverficarionModal";
import {useState,useRef, useEffect} from "react"


let errorStatus=false;
let emailErrorMsg=""
let passwordErrorMsg="";
let displaynameErrorMsg=""
let countryErrorMsg="";
let communityErrormsg="";
let SignupStatus=0;
let z= null;
let communityValue=""

const config = {
    headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Set-Cookie": Cookies.get("JSESSIONID"),
        },
        withCredentials: true,
    };

function SignUp() {
    const[email,setEmail]=useState("")
    let emailValue=useRef("")
    const[password,setPassword]=useState("")
    const [displayName,serDisplayName]=useState("")
    const [country,setCountry]=useState("Country")
    const [countryData,setCountryData]=useState("")
    const[community,setCommunity]=useState("Default Community")
    const [communityData,setCommunityData]=useState("")
    const[verficationModal,setVerficationModal]=useState(false)
useEffect(()=>{
    
    axios.get(
        `http://dev.skopic.com:9090/skopicportal/jsonindex/main.html?logParam=restrict`, 
        config
     )
        .then((res)=>{
            setCountryData(res.data.countryList)
            setCommunityData(res.data.countryTenantList)
            
        })
        
},[])


//  Input Value Change Handles
    const emailChangeHandler=(e)=>{
        emailValue.current=e.target.value
        setEmail(emailValue.current)
    }
    const passwordChangeHandler=(e)=>{
        setPassword(e.target.value)
    }
    const displaynameChangeHandler=(e)=>{
        serDisplayName(e.target.value)
    }
    const countryChnageHandler=(e)=>{
        setCountry(e.target.value)
  
        
    }
    const communityChangeHandler=(e)=>{
        setCommunity(e.target.value)
    }
    const asignId=(id)=>{
        return communityValue=id
    }
    
    const modalClose=()=>setVerficationModal(false)
    // Validating Inputs
    const validateEmailHandler=()=>{
        if (email == '' || email.length == 0 || email == null){
            errorStatus=false
        }
        if(email !=""){
            if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
               emailErrorMsg="Please Enter the Valid Email"
            }
        }
        else{
            errorStatus=false
        }
        let data = new FormData();
        data.append("mail", email);
      
            if(!errorStatus && email !=""){
            axios.post(
                "http://dev.skopic.com:9090/skopicportal/jsonindex/validateTempUserEmail.html",
                data,
                config
            )
            .then((res)=>{
                if(res.data.status==="TempUser"){
                    setVerficationModal(true)
                }
                else if(res.data.status==="SkopicUser"){
                    errorStatus=true
                }
                else if(res.data.status==="NewUser")
                {
                    errorStatus=false
                }

            })
            }
    }

    const clearMessage=()=>{
        errorStatus=false
        emailErrorMsg=""
   
    }


const  SignUpHandler=(e,value)=>{

    
    e.preventDefault()

    let encodedEmail=CryptoJS.AES.encrypt(email, 'skopic').toString()
    let encodePassword=calcMD5(password)
    let formData=new FormData()
    formData.append("email",encodedEmail)
    formData.append("displayName",displayName)
    formData.append("password",encodePassword)
    formData.append("password_c",encodePassword)
    formData.append("userTenant",community)

    axios.post(
        `http://dev.skopic.com:9090/skopicportal/jsonindex/sendVerificationCode.html?redirectTenantId=${value}`, 
        formData,
        config,
      )
      .then((res)=>{
          if(res.data.status==="TempUser" && res.data.status==="success"){
                setVerficationModal(true)
          }

      })

}
    const buttonDisablerHandler=()=>{
         if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || (password.length < 8) || (displayName.length<4) || (country==="Country") || (community==="Default Community")|| (errorStatus=true))
    
        {
           return true
          }
          else{
            return false
          }
    }

    let isEnabled=buttonDisablerHandler()
    if(country==="country"){
        return z=null
     }
     else{
         z=communityData[country]
     }
    return(
<>
        <div className={style.Signup}>
            <div className={style.SignupForm}>
                <form onSubmit={(e)=>SignUpHandler(e,communityValue)}>
                    <div className={style.SignupFormElemnts}>
                        <input
                        type="email"
                        placeholder="email"
                        name="email"
                        maxLength={50}
                        value={email}
                        onChange={(e)=>emailChangeHandler(e)}
                        onBlur={validateEmailHandler}
                        onKeyDown={clearMessage}
                        />
                    </div>  
                    <span className={style.ErrorMsg}>{emailErrorMsg}</span>
                    <div className={style.SignupFormElemnts}>
                            <input
                            type="password"
                            placeholder="password"
                            name="password"
                            value={password}
                            maxLength={32}
                            onChange={(e)=>passwordChangeHandler(e)}
                            />
                    </div>
                    <span className={style.ErrorMsg}>{passwordErrorMsg}</span>
                    <div className={style.SignupFormElemnts}>
                    <input
                        type="text"
                        placeholder="display name"
                        name="name"
                        value={displayName}
                        maxLength="50"
                        onChange={(e)=>displaynameChangeHandler(e)}
                        />
                    </div>
                    <span className={style.ErrorMsg}>{displaynameErrorMsg}</span>
                    <div className={style.SignupFormElemnts}>
                        <select
                        value={country}
                        onChange={(e)=>countryChnageHandler(e)}
                        >
                        <option value="Country">Country</option>
                        {  (countryData && countryData.length !== 0)
  ?
                        countryData.map((countriesList)=>
                     <option key={countriesList.country_code} value={countriesList.country_name}>{countriesList.country_name}</option>
                   )
                :
                <option value="Country">Country</option> }

                        </select>
                    </div>
                    <span className={style.ErrorMsg}>{countryErrorMsg}</span>
                    <div className={style.DefaultCommunity}>
                            <select
                            value={community}
                            onChange={(e)=>communityChangeHandler(e)}
                            >
                             <option value="Default Community">Default Community</option>  
                                {
                                    (z===undefined)
                                    ?
                                    <option value="Default Community">Default Community</option>
                                    :
                                    
                                    z.map((communityList)=> (communityList.type==="public")?<option key={communityList.id} value={communityList.name}  onClick={()=>asignId(communityList.id)}>{communityList.name}</option>:<></>)
                                    
                                }
                            </select>
                    </div>
                    <span className={style.ErrorMsg}>{communityErrormsg}</span>
                    <p>
                    <div className={style.TandC}>
              By Signing Up, you accept to Skopic's <span> terms of service</span>{" "}
              and <span> privacy.</span>
              </div>
            </p>
                    <button
                        type="submit"
                        className={style.SignupButton}
                        disabled={isEnabled}
                        >
                         
                            sign up
                    </button>
                </form>
            </div>
            {(errorStatus)?<p className={style.ErrorMsg}>There is an existing account with this email address</p>:null}
            <div className={style.Changesignin}><span>OR</span></div>
            <div className={style.SocailSignIn}>Sign Up with <img src={google} alt="googleImage" className={style.SocailImage} /></div>
            <div className={style.SocailSignIn}>Sign Up with <img src={facebook} alt="FacebookImage" className={style.SocailImage} /></div>
        </div>
       

        <EmailverficationModal
            show={verficationModal}
            onHide={modalClose}
            email={email}
            tentId={communityValue}
           />
</>
    );
}
export default SignUp