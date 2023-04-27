import React,{useState,useRef} from "react";
import Edit from "../../../../Assets/images/edit.svg"
import Camera from "../../../../Assets/images/camera.svg"
import "./ProfileDetails.css";
import { Link, Redirect } from "react-router-dom";
import {useSelector} from "react-redux"
import axios from "axios"
import * as Cookies from "js-cookie"



function ProfileDetail() {
    let userDetails=useSelector(state=>state.SignInReducer.userDetails)
    let profileImagePath = "http://dev.skopic.com:9090/skopicimage";

    const[file,setFile]=useState()
    const fileInputRef=useRef();
    
    
    const handleChange=(event) =>{
      setFile(event.target.files[0].name)
      
    if(file!==null){
        console.log("hello")
        console.log(file)
    }
    }
 


    return(
        < >
                   {
            (userDetails && Object.keys(userDetails).length !== 0)
?
(userDetails.userData && Object.keys(userDetails.userData).length !== 0)
            ?
        <div className="ProfileDetails">
            <div className="Profilepic">

                <img src={`${profileImagePath}${userDetails.userData.uimage}`} alt="Profile Iamge" className="profile-img"/>
            
            </div>
            <button className="Camera" onClick={()=>fileInputRef.current.click()}><img src={Camera} alt="Camera"/></button>
            <input onChange={handleChange} multiple={false} ref={fileInputRef} type='file'hidden/>
            <div className="Name">
                <h2>{userDetails.userData.displayName}	</h2>
            </div>
           
            <div className="Edit" role="button" >
                <Link  to={"/EditProfile"}>
                <img src={Edit} alt="Edit"/>
                edit profile
                </Link>
            </div>
           
        </div>
    :
    null
    :
    null
    }
        </>
    )
}


export default ProfileDetail