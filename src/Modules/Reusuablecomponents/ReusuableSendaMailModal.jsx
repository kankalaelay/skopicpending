import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import * as feedactions from '../../store/actions/feedactions/feedActionCreator'
import { useSelector, useDispatch } from 'react-redux'
import Checkbox from '@material-ui/core/Checkbox';
import { blue } from '@material-ui/core/colors';
import { Divider } from '@material-ui/core';
import sampledialogcancel from '../../Assets/images/Add.png'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import feedstyles from '../../Assets/css/home/feedpost.module.css'
import sendanemail from '../../Assets/images/sendemail.svg'
import PostMessageValidation from './PostMessageValidation';




const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});


function SendEmailDialog(props) {
    
    const dispatch = useDispatch()


    const { onClose, open } = props;

    const handleClose = () => {
        onClose(false);
    };



    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >
            <div className={feedstyles.reportdialog}>
                
                            <div className={feedstyles.sampledialogcountandcancel}>
                                <p className={feedstyles.reportheading}><b>Send email </b></p>
                                <a onClick={handleClose}><img src={sampledialogcancel} /></a>
                            </div>

                            <div>
                                <PostMessageValidation messageType={"sendaMail"} displayName={props.displayName} id={props.id}/>
                            </div>
                      
            </div>

        </Dialog>
    );
}

SendEmailDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default function ReusuableSendaMailModal(props) {

    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);



    const handleClickOpen = (id) => {

        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);

    };

    return (
        <div>

            <span onClick={() => handleClickOpen(props.id)} key={props.id}>
            <img src={sendanemail}/>
            Send email to {props.displayName}
                        </span>
            
                    <SendEmailDialog open={open} onClose={handleClose} id={props.id} displayName={props.displayName}/>
            
        </div>
    );
}
