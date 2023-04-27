import React, { useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import RemovePhoto from '../EditCommunity/RemovePhoto';


const ModeratorAlert = (props) => {
    const [open, setOpen] = React.useState(false);
    // const []


    // useEffect(()=>{

    //     if(isAlertClose){
    //         handleClose()
    //     }

    // },[isAlertClose])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className='photo-overcount-alert'>
                            {
                                (props.RemoveStatus)
                                ?
                                <span>Removed Successfully</span>
                                :
                                <RemovePhoto isTenantID={props.isTenantID} setOpen={props.setOpen} handleClose={handleClose} />
                            }
                        </div>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>
    );
};

export default ModeratorAlert;