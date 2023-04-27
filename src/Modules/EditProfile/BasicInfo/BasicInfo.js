import React,{useState,useEffect} from  "react"
import style from "./BasicInfo.module.css"
import {useSelector} from "react-redux"
import Edit from  "../../../Assets/images/edit.svg"
import * as Cookies from "js-cookie"
import axios from "axios"

function BasicInfo (){

let profileInfoData=useSelector((state)=>state.EditProfileReducer.profileInfo)
console.log(profileInfoData)


    const [edit, setEdit] = useState(true);
 
  const [buttonStyle,setButtonStyle]=useState({
    border:0,
    padding:"20px",
    display:"inline-block"
  })
const[ Name, setName]=useState("Hello")
const[displayName,setDisplayName]=useState()
const [firName,setFirName]=useState()
const[midName,setmidName]=useState()
const[latname,setLatName]=useState()
const [pro,setPro]=useState()
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
formData.append("displayName",displayName)
formData.append("firstName",firName)
formData.append("lastName",latname)
formData.append("middleName",midName)
formData.append("shortBio","This is Raghu from QA TEam")

const config = {     
  headers: { 'content-type': 'x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
  "Set-Cookie":Cookies.get("JSESSIONID"),
  },
  withCredentials: true,  
}

axios.post(
  `http://dev.skopic.com:9090/skopicportal/user/updatebasicProfile.html` ,
  formData,
  config,
)
.then((res)=>{
   console.log(res.data)
})


}

  return(
<>
{
  (profileInfoData && profileInfoData.length !== 0)
  ?
  <>
<div className={style.basicinfo}>
  <div className={style.infoDetals}>
      <h3 className={style.infoHead}>Basic Information</h3>
        <button style={buttonStyle}onClick={UpdateItems} className={style.EditButton}><img src={Edit} alt="Edit"/></button>
      </div>
      {edit?(
        <div className={style.BasicDetails}>
              <p>Email :  {profileInfoData.username} </p>   
              <p>DispalyName : {profileInfoData.userDisplayName}</p>
              <p>Name :  {`${profileInfoData.firstName}  ${profileInfoData.middleName} ${profileInfoData.lastName}`}</p>
              <p>Public Profile :{profileInfoData.shortBio}</p>
        </div>
        ):(
          <div  className={style.EditDetails}>
          <p  className={style.EditName}>Email:    {profileInfoData.username} </p>
          <div className={style.EditInputfeild}>
              <label className={style.EditName}>Display Name:</label>
          <input type="text"  value={displayName}     placeholder={profileInfoData.userDisplayName}    onChange={(e)=>{setDisplayName(e.target.value)}}/>
          </div>
          <div className={style.EditInputfeild}>
          <label className={style.EditName}>First Name:</label>
          <input type="text" value={firName} placeholder={profileInfoData.firstName}     onChange={(e)=>{setFirName(e.target.value)}} /  >
          </div>
          <div className={style.EditInputfeild}>
          <label className={style.EditName}>Middle Name:</label>
          <input type="text"  value={midName} placeholder={profileInfoData.middleName}   onChange={(e)=>{setmidName(e.target.value)}}/  >
          </div>
          <div className={style.EditInputfeild}>
          <label className={style.EditName}>Last Name:</label>
          <input type="text"  value={latname} placeholder={profileInfoData.lastName} onChange={(e)=>{setLatName(e.target.value)}} /  >
          </div>
          <div className={style.EditTextfeild}>
          <label className={style.EditName}>Public Profile:</label>
          <textarea  placeholder={profileInfoData.shortBio}  rows="4" cols="50"/>
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
export default BasicInfo