import React from 'react';
import style from "../../../Assets/css/Moderator/Managemembes.module.css";
import { useDispatch, useSelector } from 'react-redux';
import * as moderatorActions from '../../../store/actions/Moderator/moderatoractions';
import { Avatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

import ConfirmDialogDemo from "../ReusableModeratorComponents/Blockmembersmodal"


function ManagememModerator() {
    const data = useSelector(state => state.ManagemembersReducer.ManagemebersData)
    const dispatch = useDispatch()
    let serverImageURL = "http://dev.skopic.com:9090/skopicimage/"
    
    const userDetails = useSelector((state) => state.SignInReducer.userDetails)


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

    



    return (
        <div  className={style.container} >
            {(data && data.length !== 0) ?
                <>
                    {data.map((result, i) =>
                      (result.isModerator === "1" || result.isModerator === "2")
                       ?
                        <div className={style.communityUsers}  key={i}>
                            <div className={style.avatharuser}>
                            < Avatar className={style.Linkedinimage} src={result.uimage} alt="image" />
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
                                            // (
                                            //     result.isModerator === "1" || result.isModerator === "2"
                                            // ) ?
                                                <li onClick={()=>onRemoveAsModerator(result.id)}><HighlightOffIcon className={style.moderatoricons}></HighlightOffIcon>Remove as moderator</li>
                                                // :

                                                // <li>Invite as moderator</li>
                                        }

                                        <li ><WarningAmberRoundedIcon className={style.moderatoricons}></WarningAmberRoundedIcon>Send warning</li>
                                        {/* 
                                               <ConfirmDialogDemo isBlocked={result.isBlocked} id={result.id} /> */}


                                    </ul>
                                </span>





                            </div>



                        </div>
                        :
                        null
                        )}
                </>


                : null



            }
        </div>
    );
};

export default ManagememModerator;