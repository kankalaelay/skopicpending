import React ,{useState,useEffect}from  "react"
import style from "./ContactInfo.module.css"
import {useSelector} from "react-redux"
import Edit from  "../../../Assets/images/edit.svg"
import * as Cookies from "js-cookie"
import axios from "axios"

function ContactInfo (){

const profileInfoData=useSelector((state)=>state.EditProfileReducer.profileInfo)


let value=profileInfoData
console.log(value,"value")
    const [edit, setEdit] = useState(true);
    const [buttonStyle,setButtonStyle]=useState({
      border:0,
      padding:"20px",
      display:"inline-block"
    })
  const[ Name, setName]=useState("Hello")

  
  const UpdateItems=()=>{
    setEdit(false)
    setButtonStyle({
      ...buttonStyle,
      display:"none"
    })
  }
  const ChangeStyle=()=>{
    setEdit(true)
    setButtonStyle({
      border:0,
      padding:"20px",
      display:"inline-block"
    })
   
    let formData=new FormData()
    formData.append("phone","9747479220847")
    formData.append("zipcode","90543435")
    formData.append("address","22222222290")
    formData.append("city","")
    formData.append("country","India")
    formData.append("state","")

    const config = {     
      headers: { 'content-type': 'x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
      "Set-Cookie":Cookies.get("JSESSIONID"),
      },
      withCredentials: true,  
    }
    
    axios.post(
      `http://dev.skopic.com:9090/skopicportal/user/contactProfile.html` ,
      formData,
      config,
    )
    .then((res)=>{
       console.log(res.data)
    })
    



  }
  const nameChangeHandler=(e)=>{
    setName(e.target.value)
  }

    return(
  <>
  {
  (profileInfoData && profileInfoData.length !== 0)
  ?
  <>
  <div className={style.basicinfo}>
    <div className={style.infoDetals}>
        <h3 className={style.infoHead}>Contact Information</h3>
          <button style={buttonStyle}onClick={UpdateItems} className={style.EditButton}><img src={Edit} alt="Edit"/></button>
        </div>
        {edit?(
          <div className={style.BasicDetails}>
                <p>Phone :  {profileInfoData.phone}</p>  
                <p>Country :   {profileInfoData.country}</p>
                <p>Address :  {profileInfoData.address}</p>
                <p>City :   {profileInfoData.city}</p>
                <p>State :  {profileInfoData.state}</p>
                <p>Zip Code :    {profileInfoData.zipcode}</p>
  
          </div>
          ):(
            <div  className={style.EditDetails}>
            <div  className={style.EditInputfeild}>
            <label className={style.EditName}>Phone :</label>
            <select className={style.EditSubSelectFeild}>
              <option value="1">+1</option>
              <option value="2">+91</option>
            </select>
            <input type="text" placeholder={profileInfoData.phone} className={style.PhoneTextFeild}/>
            </div>
            <div className={style.EditInputfeild}>
            <label className={style.EditName}>Country :</label>
            <select className={style.EditSelectFeild} value={profileInfoData.country}>
              <option value="Select">-Select-</option>
              <option  value="United States">United States</option>
              <option  value="India">India</option>
              <option  value="Germany">Germany</option>
              <option  value="Australia">Australia</option>
              <option  value="New Zealand">New Zealand</option>
              <option  value="Canada">Canada</option>
              <option  value="Iceland">Iceland</option>
              <option  value="Japan">Japan</option>
              <option  value="Malaysia">Malaysia</option>
              <option  value="Nepal">Nepal</option>
              <option  value="Sri Lanka">Sri Lanka</option>
              <option  value="United Arab Emirates">United Arab Emirates</option>
              <option  value="Hong Kong">Hong Kong</option>
              <option  value="Mexico">Mexico</option>
              <option  value="Indonesia">Indonesia</option>
              <option  value="Poland">Poland</option>
              <option  value="Kenya">Kenya</option>
              <option  value="Mongolia">Mongolia</option>
              <option  value="Scotland">Scotland</option>
              <option  value="Singapore">Singapore</option>
            </select>
            </div>
            <div className={style.EditInputfeild}>
                <label className={style.EditName}>Address:</label>
            <input type="text" placeholder={profileInfoData.address}/>
            </div>
            <div className={style.EditInputfeild}>
            <label className={style.EditName}>City:</label>
            <input type="text" placeholder={profileInfoData.city} /  >
            </div>
            <div className={style.EditInputfeild}>
            <label className={style.EditName}>State :</label>
            <select className={style.EditSelectFeild}>
            <option value="Select">-Select-</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
            </div>
            <div className={style.EditInputfeild}>
            <label className={style.EditName}>Zip Code :</label>
            <input type="text" placeholder={profileInfoData.zipcode}  /  >
            </div>
            <button type="submit" className={style.SaveButton} onClick={ChangeStyle}>Save</button>
            </div>
          )}
  
  </div>
  </>
  :
  <></>
  }
  </>
    )
}
export default ContactInfo