import React,{useState} from  "react"
import style from "./Otherinfo.module.css"
import {useSelector} from "react-redux"
import Edit from  "../../../Assets/images/edit.svg";
import * as Cookies from "js-cookie"
import axios from "axios"

function OtherInfo (){

  const profileInfoData=useSelector((state)=>state.EditProfileReducer.profileInfo)


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
    formData.append("occupation	","IT Employee")
    formData.append("dateOfBirth","")
    formData.append("gender","Male")
    formData.append("interest","")
    formData.append("qualification","High School")
    formData.append("imgpath	","")

    const config = {     
      headers: { 'content-type': 'x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
      "Set-Cookie":Cookies.get("JSESSIONID"),
      },
      withCredentials: true,  
    }
    
    axios.post(
      `http://dev.skopic.com:9090/skopicportal/user/optionalProfile.html` ,
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
      <h3 className={style.infoHead}>Other Information</h3>
        <button style={buttonStyle}onClick={UpdateItems} className={style.EditButton}><img src={Edit} alt="Edit"/></button>
      </div>
      {edit?(
        <div className={style.BasicDetails}>
              <p>Gender:  {profileInfoData.gender}</p>
              <p>Qualifications :  {profileInfoData.qualification}</p>
              <p>Occupation :   {profileInfoData.occupation}</p>
              <p> Date of Birth:     {profileInfoData.dateofbirth}</p>
              <p>Interests :     {profileInfoData.interest}</p>

        </div>
        ):(
          <div  className={style.EditDetails}>
          <div className={style.EditInputfeild}>
              <label className={style.EditName}>Gender</label>
              <select className={style.EditSelectFeild}>
              <option value="Do not wish to answer"></option>
              <option value="Male">Male</option>
              <option value="Felmale">Female</option>
              <option value="others">others</option>
            </select>
          </div>
          <div className={style.EditInputfeild}>
          <label className={style.EditName}>Qualifications:</label>
          <select className={style.EditSelectFeild}>
              <option value="Select">Select</option>
              <option value="Ph.D">Ph.D</option>
              <option value="Post-Masters">Post-Masters</option>
              <option value="Masters">Masters</option>
              <option value="Pre-Masters">Pre-Masters</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Pre-Bachelors">Pre-Bachelors</option>
              <option value="Associate">Associate</option>
              <option value="Diploma">Diploma</option>
              <option value="Vocational">Vocational</option>
              <option value="Post Doctoral">Post Doctoral</option>
              <option value="High School">High School</option>
            </select>
          </div>
          <div className={style.EditInputfeild}>
          <label className={style.EditName}>Occupation:</label>
          <input type="text" placeholder="Occupation"  /  >
          </div>
            <div className={style.EditInputfeild}>
            <label className={style.EditName}>Date of Birth:</label>
            <select className={style.EditSubSelectFeild}>
            <option value="Day">Day</option> 
              <option value="1">1</option>
              <option value="">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
               <option value="12">12</option>
               <option value="13">13</option>
            </select>
            <select className={style.EditSubSelectFeild}>
            <option value="Month">Month</option> 
              <option value="January">January</option>
              <option value="Febuary">Febuary</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="Noverber">November</option>
              <option value="December">December</option>
            </select>
            <select className={style.EditSubSelectFeild}>
            <option value="Year">Year</option> 
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
            </div>
          <div className={style.EditTextfeild}>
          <label className={style.EditName}>Interests:</label>
          <textarea   rows="4" cols="50"/>
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
export default OtherInfo
