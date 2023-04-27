import React,{useEffect} from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


const AlertBox = (props) => {


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
                        <span>Removed Successfully</span>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>
    );
};

export default AlertBox;