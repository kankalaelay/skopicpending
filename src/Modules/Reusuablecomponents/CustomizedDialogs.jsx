import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import feedstyles from '../../Assets/css/home/feedpost.module.css'
import sampledialogcancel from '../../Assets/images/Add.png'
import * as feedactions from '../../store/actions/feedactions/feedActionCreator'
import { useSelector, useDispatch } from 'react-redux'

import { blue } from '@material-ui/core/colors';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function SimpleDialog(props) {
    // const classes = useStyles();
    const { onClose, open } = props;

    const handleClose = () => {
        onClose(false);
    };

    var profileImagePath = "http://dev.skopic.com:9090/skopicimage";
    // var profileimagelocalPath = "http://localhost:8080/skopicimage";

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} key={`simpleDialog${props.id}`}>
            <div className={feedstyles.materialdialog} >
                {
                    (props.Followers)
                        ?
                        <div className={feedstyles.sampledialogcountandcancel}>
                            <p className={feedstyles.sampledialogtotalcount}>
                                <b>{props.Followers} following</b>
                            </p>
                            <a onClick={handleClose}><img src={sampledialogcancel} /></a>
                        </div>
                        :

                        <div className={feedstyles.sampledialogcountandcancel}>
                            <p className={feedstyles.sampledialogtotalcount}>
                                {
                                    (props.likes === 1)
                                        ?
                                        <b>{props.likes} Like</b>
                                        :
                                        <b>{props.likes} Likes</b>
                                }
                            </p>
                            <a onClick={handleClose}><img src={sampledialogcancel} /></a>
                        </div>

                }
                {
                    (props.followersData)
                        ?
                        props.followersData.map((followersresult) => (
                            <>
                                <div className={feedstyles.followersmodal}>
                                    <Avatar src={`${profileImagePath}${followersresult.uimage}`} className={feedstyles.sampledialogvatar} />
                                    <div >
                                        <p className={feedstyles.sampledialogdisplayname}>

                                            {followersresult.displayName}

                                        </p>
                                        <p className={feedstyles.sampledialgoxtext}>ASK {followersresult.askcount} | SAY {followersresult.saycount} | UPDATE {followersresult.updatecount} | TAG {followersresult.hashtagcount}</p>
                                    </div>
                                    {/* <Divider/> */}

                                </div>
                                <Divider className={feedstyles.divider} />
                            </>
                        ))
                        :
                        (props.likesData)
                            ?
                            props.likesData.map((likesresult) => (
                                <>
                                    <div className={feedstyles.followersmodal}>
                                        <Avatar src={`${profileImagePath}${likesresult.uimage}`} className={feedstyles.sampledialogvatar} />
                                        <div>
                                            <p className={feedstyles.sampledialogdisplayname}>

                                                {likesresult.displayName}

                                            </p>
                                            <p className={feedstyles.sampledialgoxtext}>ASK {likesresult.askcount} | SAY {likesresult.saycount} | UPDATE {likesresult.updatecount} | TAG {likesresult.hashtagcount}</p>
                                        </div>
                                        {/* <Divider/> */}

                                    </div>
                                    <Divider className={feedstyles.divider} />
                                </>
                            ))

                            :
                            <span>NO Data</span>
                }

            </div>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};



export default function SimpleDialogDemo(props) {
    const followerCountData = useSelector((state) => state.followReducer.FollowerCountData)

    const dispatch = useDispatch()

    const [isCountData, setCountData] = useState(props.voteUp)
    const [isFollowCountData, setFollowCountData] = useState(props.followCount)
    //  console.log(props.followCount)


    useEffect(() => {

        //         // if (props.isVoteup==="1") {
        //         //     setCountData(isCountData + 1)
        //         // }
        //         // console.log(props.isVoteup)
        // if(props.isFollow==="followed")
        // {
        //     setFollowCountData(isFollowCountData+1)

        // }
        //     else if(props.isFollow==="followed"{
        //         setFollowCountData(isFollowCountData-1)

        //     }
        // console.log(isFollowCountData)

    }, [])
    // console.log(followerCountData)
    const [open, setOpen] = React.useState(false);


    const handleClickOpen = (id, type) => {
        setOpen(true);
        dispatch(feedactions.fetchFollowerCount(id, type))

    };

    const handleClose = () => {
        setOpen(false);
        // setCountData(prev=>prev+1)
        // console.log(isCountData)

    };

    return (
        <div key={`followerorlikes${props.id}`}>

            {
                (props.followCount)
                    ?
                        (props.followCount === 1)
                            ?

                            <a onClick={() => handleClickOpen(props.id, "follow")} id={props.id} className={feedstyles.followerbgcolor}>

                                {
                                    (props.isFollow === "followed")
                                        ?
                                        <>
                                            {props.followCount + 1} followers
                                        </>
                                        :
                                        (props.isFollow === "unfollowed")
                                            ?
                                            <>
                                                {props.followCount} follower
                                            </>
                                            :
                                            <>
                                                {props.followCount} follower
                                            </>

                                }
                            </a>
                            :
                        (props.followCount > 1)
                            ?
                            <a onClick={() => handleClickOpen(props.id, "follow")} id={props.id} className={feedstyles.followerbgcolor}>
                                {
                                    (props.isFollow === "followed")
                                        ?
                                        <>
                                            {props.followCount + 1} followers
                                        </>
                                        :
                                        (props.isFollow === "unfollowed")
                                            ?
                                            <>
                                                {props.followCount} follower
                                            </>
                                            :
                                            <>
                                                {props.followCount} follower
                                            </>
                                }
                                {/* {props.followCount} followers */}
                            </a>
                   :
                   <span>
                                            {props.followCount} followers
                       
                   </span>
                   :
                    (props.voteUp === 1)
                        ?
                        <a variant="outlined" color="primary" onClick={() => handleClickOpen(props.id, "like")} id={props.id} className={feedstyles.followerbgcolor}>
                            {props.voteUp} like
                        </a>
                        :
                        <>
                        <a variant="outlined" color="primary" onClick={() => handleClickOpen(props.id, "like")} id={props.id} className={feedstyles.followerbgcolor}>
                            {props.voteUp} likes
                        </a>
                        </>

            }

            {
                (followerCountData && Object.keys(followerCountData).length !== 0)
                    ?
                    <SimpleDialog open={open} onClose={handleClose} Followers={props.followCount} followersData={followerCountData.follweduserprofile} key={props.id} likes={props.voteUp} likesData={followerCountData.likeduserprofile} />
                    :
                    ''
            }
        </div>
    );
}
