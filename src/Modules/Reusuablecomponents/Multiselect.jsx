import React, { useEffect } from 'react'
import rightArrow from '../../Assets/images/rightArrow.svg'
import styles from '../../Assets/css/home/post.module.css'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import downarrow from '../../Assets/images/downarrow.png';
import backbutton from '../../Assets/images/locationtagbackbutton.svg'
import { Divider, Avatar, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import * as feedactions from '../../store/actions/feedactions/feedActionCreator'

import Checkbox from '@material-ui/core/Checkbox';
import { NavItem } from 'react-bootstrap';



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

    const communitiesData = useSelector((state) => state.followReducer.communitiesData)
    const isLoading = useSelector((state) => state.followReducer.isLoaded)

    const classes = useStyles();

    const { onClose, open } = props;

    const [value, setValue] = React.useState(null);

    const [ischecked, setChecked] = React.useState([]);

    const handleChange = (event) => {
        setValue(event.target.value);
        // console.log(event.target.value)
    };


    const onCheckboxChecked = (event, id) => {
        // setChecked(event.target.checked)

        if (event.target.checked) {
            setChecked([...ischecked, id])
        }
        else {
            setChecked((prev) => prev.filter((curritem) => curritem !== id))

        }


    }

    const handleClose = () => {
        onClose(false);
    };

    const onPostOptionSubmit = () => {

        // props.setPostingOption(value)
        handleClose();
        setValue(null)
        props.setCommunitysSelect(ischecked.length)
        props.setTenantId(ischecked)
        setChecked([])
        // console.log(ischecked)


    }

    var profileImagePath = "http://dev.skopic.com:9090/skopicimage";



    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} key={`simpleDialog2${props.id}`} classes={{ paperWidthSm: classes.paperWidthSm }}>
            <div className={styles.mapcontainer}>
                <div className={styles.addlocation}>
                    <a onClick={handleClose}><img src={backbutton} alt="backbutton" /></a>
                    <h5 className={styles.locationheading}>Select Communities</h5>
                    <button className={styles.locationsubmit} onClick={onPostOptionSubmit}>Done</button>
                </div>
                <Divider />
                {/* <span>{ischecked.length>0?ischecked.length:null}</span> */}
                <div className={styles.moderatorcommunityparentdiv}>
                    {
                        (isLoading)
                            ?
                            (communitiesData && Object.keys(communitiesData).length !== 0)
                                ?
                                communitiesData.restrictions.map((community) => (
                                    <div className={styles.moderatorcommunitychilddiv}>
                                        <div className={styles.moderatorcommunity}>
                                            <img src={`${profileImagePath}${community.thumbnailLogo}`} />
                                            <p>{community.tenantName}</p>

                                        </div>
                                        <div>

                                            <Checkbox
                                                color="primary"
                                                id={`communityId${community.tenantId}`}
                                                defaultChecked={props.tenantName === community.tenantName ? true : false}
                                                onChange={(event) => onCheckboxChecked(event, community.tenantId)}
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            />
                                        </div>
                                    </div>
                                ))
                                :
                                <p> No Data</p>
                            :
                            <CircularProgress />
                    }

                </div>

            </div>

        </Dialog >
    );
}



SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};




function Multiselect(props) {

    const dispatch = useDispatch()


    const [open, setOpen] = React.useState(false);
    const [isCommunitysSelect, setCommunitysSelect] = React.useState(null)

    useEffect(() => {
        props.setCommunitySelectCount(isCommunitysSelect)
    }, [isCommunitysSelect])

    const handleClickOpen = () => {
        setOpen(true);
        dispatch(feedactions.getModeratingCommunitys())


    };

    const handleClose = () => {
        setOpen(false);

    };
    return (
        <>
            <div onClick={handleClickOpen} className={styles.selectmultiplecommunitys}>
                <p>{
                    isCommunitysSelect > 0
                        ?
                        <>
                            ,+{isCommunitysSelect}
                        </>
                        : null
                }

                    (SelectCommunities)</p>
                <img src={rightArrow} alt="rightarrow" />
            </div>
            <SimpleDialog open={open} onClose={handleClose} tenantName={props.tenantName} setCommunitysSelect={setCommunitysSelect} setTenantId={props.setTenantId} />
        </>

    )
}

export default Multiselect
