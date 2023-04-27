import React from "react";
import "./FollowCommunities.css"
import Add from "../../../../Assets/images/Add.svg"


 function FollowCommunities(){
     return(
        <div className="FollowCommunities">
            <img src={Add} alt="AddOption"/>
           <p > Follow more communities</p>
        </div>
     )
 }


export default  FollowCommunities