
import React, { useState, useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import '../../../Assets/css/Moderator/ModeratorHeader.css'
import { useEffect } from 'react';
import { setNestedObjectValues } from 'formik';
import { useSelector, useDispatch } from 'react-redux'
import * as moderatorActions from '../../../store/actions/Moderator/moderatoractions'







const ConfirmDialogDemo = (props) => {
    const moderatingCommunitysData = useSelector((state) => state.ModeratorReducer.moderatingCommunitysData)
    const blockData=useSelector((state)=>state.ModeratorReducer.Blockedusersdata)
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const [isBlockusers, setBlockusersArray] = useState([])

    const data = useSelector(state => state.ManagemembersReducer.ManagemebersData)
    const userDetails = useSelector((state) => state.SignInReducer.userDetails)

    



    useEffect(() => {
        let BlockUsers = []
        if (moderatingCommunitysData && Object.keys(moderatingCommunitysData).length !== 0) {
          
           moderatingCommunitysData.restrictions.filter(restrictions => restrictions.isPm === "1").map(moderatorId =>
            BlockUsers.push(moderatorId.tenantId)
           
            )
            setBlockusersArray([...isBlockusers, BlockUsers])
         
          
       

            

        }
        
       
    }, [moderatingCommunitysData])

    const dispatch = useDispatch()

const accept=()=>{

    let id = props.id;
        if (userDetails && Object.keys(userDetails).length !== 0) {
            // // console.log(userDetails.userData.tenantId)
            // setTenantID([userDetails.userData.tenantId])
            dispatch(moderatorActions.fetchBlockMembersData(`?tenantId=${userDetails.userData.tenantId}&selectedIds=${id}`))
            // dispatch(moderatorActions.fetchBlockedUsersData())
            dispatch(moderatorActions.fetchManageMembersData(userDetails.userData.tenantId))

        }

        document.getElementById(id)


}



    return (
        <div>


            <div >
                <ConfirmDialog />




                <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message={`Are you sure you want to ${props.isBlocked === 5?"Un":''}block the user?`}
                    header="Block users confirmation"  accept={accept}/>
                <span>
                    {/* <Button onClick={() => setVisible(true)} icon="pi pi-ban" label={props.isBlocked === 5 ? "UnblockUser" : "Blockuser"} className="blockuser-confirmbutton" /></span> */}
                    <Button onClick={() => setVisible(true)} icon="pi pi-ban" label={props.isBlocked === 5 ? "UnblockUser" : "Blockuser"} className="blockuser-confirmbutton" /></span>
            </div>
        </div>
    )
}
export default ConfirmDialogDemo;