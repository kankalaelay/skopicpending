import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import * as feedactions from '../../store/actions/feedactions/feedActionCreator'
import { useSelector, useDispatch } from 'react-redux'
import { blue } from '@material-ui/core/colors';
import sampledialogcancel from '../../Assets/images/Add.png'
import deleteicon from '../../Assets/images/Delete.svg'

import feedstyles from '../../Assets/css/home/feedpost.module.css'


const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function DeleteDialog(props) {
    const deleteStatusData = useSelector((state) => state.followReducer.DeleteStatus)

    const dispatch = useDispatch()

    // const classes = useStyles();
    const { onClose, open } = props;

    const handleClose = () => {
        onClose(false);
    };

    const onDeletePost = (id) => {
        if (document.getElementById(id).style.display = "block") {
            document.getElementById(id).style.display = "none"
        }
        else {
            document.getElementById(id).style.display = "block"

        }
        let messageid = `?messageID=${id}`
        let deletePostId=`FeedDataDelete${id}`
        dispatch(feedactions.fetchDeleteStatus(messageid))
        props.setDeletePostId(deletePostId)
        props.setDeletePost(true)
        // dispatch(feedactions.fetchFeedData('?startlimit=0'))
        onClose(false)

    }
    // console.log(deleteStatusData)

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} key={props.id}>
            <div className={feedstyles.materialdialog}>

                <div className={feedstyles.sampledialogcountandcancel}>
                    <p><b>Delete</b></p>
                    <a onClick={handleClose}><img src={sampledialogcancel} /></a>
                </div>
                <div>
                    <p>Are you sure you want to delete this {props.type}</p>
                    <button onClick={() => onDeletePost(props.id)} className={feedstyles.dialogdeletebutton}>Delete</button>
                </div>




            </div>
        </Dialog>
    );
}

DeleteDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default function ReusuableDeleteDialogmodal(props) {

    const [open, setOpen] = useState(false);
   const [msgtype,setmsgtype]=useState('')


    const handleClickOpen = () => {
        setOpen(true);
        if(props.type==="OpenASK")
        {
            // msgtype="Ask"
            setmsgtype("Ask")
        }
        else if(props.type==="OpenSAY")
        {
            // msgtype="Say"
            setmsgtype("Say")

        }
        else if(props.type==="impupdate")
        {
            // msgtype="Update"
            setmsgtype("Update")

        }
        else if(props.type==="hashTAG"){
        //    msgtype="Tag"
           setmsgtype("Tag")

        }
        else{
            setmsgtype(props.type)
            // msgtype=props.type
        }

    };

    const handleClose = () => {
        setOpen(false);


    };



    return (
        <div key={props.id}>

            <a onClick={() => handleClickOpen()}>
                <img src={deleteicon} />
            Delete
        </a>
            <DeleteDialog open={open} onClose={handleClose} id={props.id} type={msgtype} setDeletePost={props.setDeletePost} setDeletePostId={props.setDeletePostId}/>

        </div>
    );
}
