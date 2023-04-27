import React ,{useEffect,useState}from "react";
import BasicProfile from "./BasicInfo/BasicInfo"
import ContactProfile from "./ContactInfo/ContactInfo"
import Header from "../header/header"
import OtherInfo from "./Otherinfo/OtherInfo";
import {useDispatch} from "react-redux"
import * as ProfileInfo from "../../store/actions/EditProfile/EditProfileActions"
import Sidebaroptions from "../settings/sidebaroptions.js"
import Divider from "@material-ui/core/Divider";
import "./EditProfile.css";


function EditProfile(){
      const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(ProfileInfo.fetchProfileData())  
        // dispatch(CommunityActions.fetchCommunityData())
    },[])


    const [isfocus1, setFocus1] = useState(true);
  const [isfocus2, setFocus2] = useState(false);
  const [isfocus3, setFocus3] = useState(false);
  const [isfocus4, setFocus4] = useState(false);

  const sidebarChildoptionsFocus1 = () => {
    setFocus1(!isfocus1);

    setFocus2(false);
    setFocus3(false);
    setFocus4(false);
  };

  const sidebarChildoptionsFocus2 = () => {
    setFocus2(!isfocus2);
    window.scrollTo(0, 400);
    setFocus1(false);
    setFocus3(false);
    setFocus4(false);
  };
  const sidebarChildoptionsFocus3 = () => {
    setFocus3(!isfocus3);
    window.scrollTo(0, 700);
    setFocus4(false);
    setFocus2(false);
    setFocus1(false);
  };
  return(
    <>
  <Header/>
  <div className="EditProfile">

  <div className="sidebarParentoptions">
  <div className="sidebarParentoptions1">
   <Sidebaroptions
                active={isfocus1}
                text="Basic Information"
                onSidebaroptionClick={sidebarChildoptionsFocus1}
              />
              <Divider variant="fullWidth"></Divider>
              <Sidebaroptions
                active={isfocus2}
                text="Contact Information"
                onSidebaroptionClick={sidebarChildoptionsFocus2}
              />
              <Divider variant="fullWidth"></Divider>
              <Sidebaroptions
                active={isfocus3}
                text="Other Information"
                onSidebaroptionClick={sidebarChildoptionsFocus3}
              />
  </div>
</div>

<div className="sidebartoggleoptions">
<BasicProfile/>
<ContactProfile/>
<OtherInfo/>
</div>

</div>
</>
  )
}

export default EditProfile;
