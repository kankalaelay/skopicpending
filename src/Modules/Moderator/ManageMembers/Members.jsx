
import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from "../../../Assets/css/Moderator/Managemembes.module.css"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import * as moderatorActions from '../../../store/actions/Moderator/moderatoractions'
import ConfirmDialogDemo from "../ReusableModeratorComponents/Blockmembersmodal"

const Members = (props) => {
    const data = useSelector(state => state.ManagemembersReducer.ManagemebersData)
    const userDetails = useSelector((state) => state.SignInReducer.userDetails)
    const blockedUsersData = useSelector((state) => state.ModeratorReducer.Blockedusersdata)
    const tenantValue = props.tenantId

    
    const dispatch = useDispatch()
    let serverImageURL = "http://dev.skopic.com:9090/skopicimage/"


    const onBlockMemberSelect = (i) => {
        let id = i;
        if (userDetails && Object.keys(userDetails).length !== 0) {
            // // console.log(userDetails.userData.tenantId)
            // setTenantID([userDetails.userData.tenantId])
            // dispatch(moderatorActions.fetchBlockMembersData(`?tenantId=${userDetails.userData.tenantId}&selectedIds=${id}`))


        }
        // document.getElementById(id)


    }

    // Manage members community Invite as Moderator in submenu of ManageMembers actions

    const OnInviteAsModerator = (userID) => {
        if (userDetails && Object.keys(userDetails).length !== 0) {
            let formData = new FormData();
            formData.append("tenantId", userDetails.userData.tenantId)
            formData.append("selectedIds", userID);


            dispatch(moderatorActions.fetchInviteAsModerator(formData))
            alert("Invitation has been sent successfully")
        }



    }


    // Manage members community Remove as Moderator in submenu of ManageMembers actions

    const onRemoveAsModerator = (userID) => {
        if (userDetails && Object.keys(userDetails).length !== 0) {
            let formData = new FormData();
            formData.append("tenantId", userDetails.userData.tenantId)
            
             formData.append("rejectedIds",userID );

            dispatch(moderatorActions.fetchRemoveAsModerator(formData))
            alert('removed as moderator ')
        }
        console.log(userID)
    }




    const warnUserCommunity = (userID) => {

        if (userDetails && Object.keys(userDetails).length !== 0) {
            let formData = new FormData();
            formData.append("tenantId", userDetails.userData.tenantId)
            formData.append("userId", userID);
            formData.append("warnMessage", `Your community moderator has noted that the content you posted recently in crossword is not in compliance with the <a id="userguidlines" href="http://dev.skopic.com:9090/skopicportal/user/userGuide.html" tabindex="41">user guidelines</a> of Skopic. As a matter of courtesy and requirement, we ask that everyone of us maintain the decorum of our online community by following the best practices for sharing content. Please be advised that any future noncompliance shall result in blocking you from the community`);
            dispatch(moderatorActions.fetchwarnUserCommunity(formData))
            alert("Warning sent successfully")


        }

    }


    return (
        <div className={style.container} >
            {(data && data.length !== 0) ?
                <>
                    {data.map((result, i) =>
                        <div className={style.communityUsers}>
                            <div className={style.childimage} key={i}>
                                <Avatar className={style.Linkedinimage} src={result.uimage} alt="image" />
                                <div>
                                    <span >{result.displayName}</span>
                                    {
                                        (result.isModerator === "1" || result.isModerator === "2")
                                            ?
                                            <p>Moderator</p>
                                            :
                                            null
                                    }

                                </div>
                            </div>
                            <div className={style.dropdown}>

                                <span className={style.link}> <ExpandMoreIcon></ExpandMoreIcon>
                                    <ul className={style.dlist}>

                                        {
                                            (
                                                result.isModerator === "1" || result.isModerator === "2"
                                            ) ?
                                                <li onClick={() =>onRemoveAsModerator(result.id)}><HighlightOffIcon className={style.moderatoricons} ></HighlightOffIcon>Remove as moderator</li>
                                                :

                                                <li onClick={() => OnInviteAsModerator(result.id)}>Invite as moderator</li>
                                        }

                                        <li onClick={() => warnUserCommunity(result.id)} ><WarningAmberRoundedIcon className={style.moderatoricons}></WarningAmberRoundedIcon>Send warning</li>

                                        {/* <li onClick={() => onBlockMemberSelect(result.id)} id={result.i}> */}
                                        <ConfirmDialogDemo isBlocked={result.isBlocked} id={result.id} />
                                        {/* </li> */}

                                    </ul>
                                </span>

                            </div>
                        </div>
                    )}

                </>
                :
                null
            }
        </div>
    );
};

export default Members;