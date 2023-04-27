import React from "react"
import "./Profile.css";
import ProfileDetail from "./ProfileDetails/ProfileDetails"
import  ProfileImage  from "../../../Assets/images/ProfileImage1.png"
import {useSelector} from "react-redux"

function Profile() {
    const userDetails=useSelector(state=>state.SignInReducer.userDetails)
     let profileImagePath = "http://dev.skopic.com:9090/skopicimage";
return(
    <>
    <div className="Profile">
        {

(userDetails && Object.keys(userDetails).length !== 0)
?
(userDetails.userData && Object.keys(userDetails.userData).length !== 0)
            ?
    <img src={`${profileImagePath}${userDetails.userData.tenantLogo}`} alt="Community Image" className="Community-Image"/>
    :
    null
    :
    null
        }
    <ProfileDetail/>
    
    </div>
    </>
)
}
export default Profile