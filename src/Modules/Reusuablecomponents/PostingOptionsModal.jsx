import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import downarrow from '../../Assets/images/downarrow.svg';
import { useSelector, useDispatch } from 'react-redux'

import backbutton from '../../Assets/images/locationtagbackbutton.svg'
import rightArrow from '../../Assets/images/rightArrow.svg'


import styles from '../../Assets/css/home/post.module.css'
import Multiselect from '../Reusuablecomponents/Multiselect.jsx'

import clsx from 'clsx';

import { Divider, Avatar } from '@material-ui/core';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles({
    paperWidthSm: {
        borderRadius: 25,
        width: 560,
        overflow: "hidden",
        maxWidth: "none"

    },
    rounded: {
        borderRadius: 12
    }
});





function SimpleDialog(props) {
    const settingsData = useSelector((state) => state.voteupReducer.settingsData)



    const classes = useStyles();

    const { onClose, open } = props;

    const [value, setValue] = React.useState(null);
    const [isCommunitySelectCount, setCommunitySelectCount] = React.useState(null)


    const handleChange = (event) => {
        setValue(event.target.value);
        // console.log(event.target.value)
    };



    const handleClose = () => {
        onClose(false);
    };

    const onPostOptionSubmit = () => {

        props.setPostingOption(value)
        handleClose();
        setValue(null)

    }

    var profileImagePath = "http://dev.skopic.com:9090/skopicimage";



    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} key={`simpleDialog2${props.id}`} classes={{ paperWidthSm: classes.paperWidthSm }}>
            <div className={styles.mapcontainer}>
                <div className={styles.addlocation}>
                    <a onClick={handleClose}><img src={backbutton} alt="backbutton" /></a>
                    <h5 className={styles.locationheading}>Who can see your {props.isPostOption}</h5>
                    <button className={styles.locationsubmit} onClick={onPostOptionSubmit}>Done</button>
                </div>
                <Divider />
                {
                    (settingsData && Object.keys(settingsData).length !== 0)
                        ?
                        <>
                            <div className={`${styles.postingoptionsradio}`}>
                                <div className={styles.postingoptionschild}>

                                    <Avatar src={`${profileImagePath}${props.pimage}`} variant="rounded" classes={{ rounded: classes.rounded }} />
                                    <div className={styles.postinfo}>
                                        <div>
                                            <p>{props.tenantName}</p>
                                            {
                                                (props.isPostOption === "UPDATE")
                                                    ?
                                                    <>
                                                        <Multiselect tenantName={props.tenantName} setCommunitySelectCount={setCommunitySelectCount} setTenantId={props.setTenantId}/>
                                                    </>
                                                    :
                                                    null
                                            }

                                        </div>
                                        <span>Anyone in {props.tenantName}</span>
                                    </div>
                                </div>
                                <label className={styles.container}>
                                    <input type="radio" name="radio" className={styles.containerinput} value="" onChange={handleChange} />
                                    <span className={styles.checkmark}></span>
                                </label>
                            </div>



                            <div className={`${styles.postingoptionsradio} ${settingsData.fbPagePerms === "" ? styles.disableRadioOptions : null}`}>
                                <div className={styles.postingoptionschild}>
                                    <Avatar src={`${profileImagePath}${props.pimage}`} variant="rounded" classes={{ rounded: classes.rounded }} />
                                    <div className={styles.postinfo}>
                                        {
                                            (isCommunitySelectCount > 0)
                                                ?
                                                <p>{props.tenantName} +{isCommunitySelectCount}, Facebook</p>
                                                :
                                                <p>{props.tenantName} + Facebook</p>
                                        }
                                        <span>Anyone in {props.tenantName}, post to Facebook</span><br />
                                        {
                                            (settingsData.fbPagePerms === "")
                                                ?
                                                <span className={`alert alert-info ${styles.warningmsg}`}>If you want to post on facebook you need to authenticate first</span>
                                                :
                                                null
                                        }
                                    </div>

                                </div>
                                <label className={styles.container}>
                                    <input type="radio" name="radio" className={styles.containerinput} value="facebook" onChange={handleChange} />
                                    <span className={styles.checkmark}></span>
                                </label>

                            </div>




                            <div className={`${styles.postingoptionsradio} ${settingsData.twitterPermission === "" ? styles.disableRadioOptions : null}`}>
                                <div className={styles.postingoptionschild}>
                                    <Avatar src={`${profileImagePath}${props.pimage}`} variant="rounded" classes={{ rounded: classes.rounded }} />
                                    <div className={styles.postinfo}>
                                        {
                                            isCommunitySelectCount > 0
                                                ?
                                                <p>{props.tenantName} +{isCommunitySelectCount}, Twitter</p>
                                                :
                                                <p>{props.tenantName} + Twitter</p>

                                        }
                                        <span>Anyone in {props.tenantName}, post to Twitter</span><br />
                                        {
                                            (settingsData.twitterPermission === "")
                                                ?
                                                <span className={`alert alert-warning ${styles.warningmsg}`}>If you want to post on twitter you need to authenticate first</span>
                                                :
                                                null
                                        }
                                    </div>

                                </div>
                                <label className={styles.container}>
                                    <input type="radio" name="radio" className={styles.containerinput} value="twitter" onChange={handleChange} />
                                    <span className={styles.checkmark}></span>
                                </label>

                            </div>

                            <div className={`${styles.postingoptionsradio} ${(settingsData.fbPagePerms === "" || settingsData.twitterPermission === "") ? styles.disableRadioOptions : null}`}>
                                <div className={styles.postingoptionschild}>
                                    <Avatar src={`${profileImagePath}${props.pimage}`} variant="rounded" classes={{ rounded: classes.rounded }} />
                                    <div className={styles.postinfo}>
                                        {
                                            isCommunitySelectCount > 0
                                                ?
                                                <p>{props.tenantName} +{isCommunitySelectCount}, Facebook , Twitter</p>
                                                :
                                                <p>{props.tenantName} + Facebook + Twitter</p>

                                        }
                                        <span>Anyone in {props.tenantName}, post to Facebook & Twitter</span><br />
                                        {
                                            ((settingsData.fbPagePerms === "" || settingsData.twitterPermission === ""))
                                                ?
                                                <span className={`alert alert-info ${styles.warningmsg}`}>If you want to post on facebook and twitter you need to authenticate first</span>
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                                <label className={styles.container}>
                                    <input type="radio" name="radio" className={styles.containerinput} value="fbandtwitter" onChange={handleChange} />
                                    <span className={styles.checkmark}></span>
                                </label>

                            </div>
                        </>
                        :
                        <p>No Data</p>
                }

            </div>

        </Dialog>
    );
}



SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};




export default function PostingOptionsModal(props) {

    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);


    };

    const handleClose = () => {
        setOpen(false);

    };

    return (
        <div>
            {/* <a className={styles.locationpinchildpost}><img src={locationpinchildpost} onClick={handleClickOpen} /></a> */}
            <div onClick={handleClickOpen}>
                <span>{props.tenantName}</span>
                <img src={downarrow} className={styles.postdropdown} />
            </div>

            <SimpleDialog open={open} onClose={handleClose} tenantName={props.tenantName} pimage={props.pimage} setPostingOption={props.setPostingOption} isPostOption={props.isPostOption} setTenantId={props.setTenantId}/>

        </div>
    );
}
