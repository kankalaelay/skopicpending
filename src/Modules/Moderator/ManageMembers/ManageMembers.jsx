import React, { useEffect } from 'react';
import Moderator from '../ManageMembers/ManagememModerator';
import Invitemembers from './Invitemembers';
import Members from './Members';
import * as moderatorActions from '../../../store/actions/Moderator/moderatoractions'
import { useSelector, useDispatch } from 'react-redux'

const ManageMembers = (props) => {
    const userDetails = useSelector((state) => state.SignInReducer.userDetails)

    const dispatch = useDispatch()

    useEffect(()=>{
        if (userDetails && Object.keys(userDetails).length !== 0) {
        dispatch(moderatorActions.fetchManageMembersData(userDetails.userData.tenantId))
        }

    },[])

    return (
        <div>

            {
                (props.subMenuItem === "Invite Members")
                    ?
                    <Invitemembers />
                    :
                    (props.subMenuItem === "Moderators")
                        ?
                        <Moderator />
                        :
                        <Members tenantId={props.tenantValue} />

            }

        </div>
    );
};

export default ManageMembers;