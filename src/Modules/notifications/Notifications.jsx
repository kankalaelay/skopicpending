import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Dropdown, Tabs, Tab } from 'react-bootstrap';
import notificationstyles from '../../Assets/css/notications/notifications.module.css'
import styles from '../../Assets/css/home/post.module.css'
import dropdownarrow from '../../Assets/images/pulldown.svg'
import removenotitifcationicon from '../../Assets/images/removenotitifcationicon.svg'
import unfollowtagicon from '../../Assets/images/unfollow.svg'
import * as notificationActions from '../../store/actions/notificationsactions/notificationActionCreator'
import { useDispatch } from 'react-redux'
//e.currentTargetid for gettting current id value

import { Divider } from '@material-ui/core';
import { Link } from "react-router-dom";


import { Avatar, CircularProgress } from '@material-ui/core';

const Notifications = () => {
    const notificationData = useSelector((state) => state.notificationReducer.notificationData)
    const NStatus = useSelector((state) => state.notificationStatusReducer.notificationStatus)
    const NRStatus = useSelector((state) => state.notificationStatusReducer.notificationRemoveStatus)

    const dispatch = useDispatch()
    console.log(notificationData)

    const [filter, setFilter] = useState("show:all") // initial filter state here
    // var profileimagelocalPath = "http://localhost:8080/skopicimage";
    var profileImagePath = "http://dev.skopic.com:9090/skopicimage";

    var filtervalue = '';
    var notificationstatus = '';


    // useEffect(() => {


    //     window.addEventListener("click", infiniteScroll);

    //     return () => {
    //         window.removeEventListener('click', infiniteScroll)
    //     }

    // }, []);

    const onFilterSelection = (e) => {
        e.preventDefault()
        filtervalue = e.target.value
        setFilter(e.target.value)
        //    setFilter({value:e.target.value})
        dispatch(notificationActions.fetchNotificationData(filtervalue))
    }

    const onViewStatus = (status, id) => {
        if (status === "unread" || status === null) {
            notificationstatus = `?viewstatus=read&&id=${id}`
            dispatch(notificationActions.fetchNotificationStatus(notificationstatus))
            // if (NStatus) {
            //     if (NStatus.status === "Success") {
            //         document.getElementById(id).style.backgroundColor = "#F3F2F0"

            //     }
            // }
            document.getElementById(id).style.backgroundColor = "rgb(243 242 240 / 43%)"

        }
    }

    const onremoveNotification = (id) => {
        let toremovenotification = `?edit=remove&&notiid=${id}`
        dispatch(notificationActions.fetchNotificationRemoveStatus(toremovenotification))

        document.getElementById(id).style.display = "none"



    }

    const onUnfollowNotification = (id) => {
        let tounfollownotification = `?edit=unfollow&&msgid=${id}`
        dispatch(notificationActions.fetchNotificationUnfollowStatus(tounfollownotification))

    }

    return (
        <>
            {
                (notificationData && Object.keys(notificationData).length !== 0)
                    ?
                    (notificationData.breadCountLength > 0)
                        ?
                        <div>
                            <div className={notificationstyles.filterdropdown}>
                                <h5>Notifications</h5>
                                <div className={notificationstyles.selectpulldown}>
                                <select
                                    onChange={(e) => onFilterSelection(e)}
                                    value={filter}>
                                    <option value="">Show:All</option>
                                    <option value="?filtertype=ask">ASK</option>

                                    <option value="?filtertype=say">SAY</option>
                                    <option value="?filtertype=tag">TAG</option>
                                    <option value="?filtertype=update">UPDATE</option>
                                    <option value="?filtertype=moderator">Moderator</option>

                                </select>
                                </div>
                            </div>
                            <div className={notificationstyles.recentTitle}>Recent</div>
                            {
                                (notificationData.notificationList.length !== 0)
                                    ?
                                    notificationData.notificationList.map((notificationdata) => (
                                        notificationdata.recentRealier === "RECENT"
                                            ?
                                            <div className={`${notificationdata.viewstatus === "read" ? notificationstyles.notificationbody : notificationstyles.unreadnotification}`} onClick={() => onViewStatus(notificationdata.viewstatus, notificationdata.id)} key={notificationdata.id} id={notificationdata.id}>
                                                <div className={notificationstyles.notificationmessagebody} >
                                                    <div>
                                                        <Avatar src={`${profileImagePath}${notificationdata.uimage}`} variant="rounded" className={notificationstyles.avatarimage} />

                                                        {
                                                            (notificationdata.keyword === "A")
                                                                ?
                                                                <div className={notificationstyles.askcount}><span></span></div>
                                                                :
                                                                (notificationdata.keyword === "S" || notificationdata.keyword === "P")
                                                                    ?

                                                                    <div className={notificationstyles.saycount}><span></span></div>
                                                                    :
                                                                    (notificationdata.keyword === "I")
                                                                        ?

                                                                        <div className={notificationstyles.updatecount}><span></span></div>
                                                                        :
                                                                        (notificationdata.keyword === "H" || notificationdata.keyword === "X")
                                                                            ?

                                                                            <div className={notificationstyles.tagcount}><span></span></div>

                                                                            :
                                                                            ''
                                                        }

                                                    </div>
                                                    <div className={styles.mesageandtime}>
                                                        <p dangerouslySetInnerHTML={{ __html: notificationdata.Message }}></p>
                                                        <p className={notificationstyles.messagetime}>{notificationdata.Message_Time}ago in{notificationdata.tenantName}</p>
                                                    </div>
                                                </div>
                                                <div className={`${styles.dropdown}`}>

                                                    <a className={` ${notificationdata.viewstatus === "read" ? notificationstyles.notificationdropdown : notificationstyles.unreadnotificationdropdown}`} id={notificationdata.id}>
                                                        <img src={dropdownarrow} alt="dropdown" />
                                                    </a>
                                                    <div className={`${styles.dropdownlinks} ${notificationstyles.notificationdropdownlinks}`}>
                                                        <ul>
                                                            <li>
                                                                <a className={notificationstyles.removenotifiction} onClick={() => onremoveNotification(notificationdata.id)}><img src={removenotitifcationicon} alt="removenotification" /><span>Remove  this notification   </span></a>

                                                            </li>
                                                            {
                                                                (notificationdata.keyword === "H" || notificationdata.keyword === "X" )
                                                                    ?

                                                                    <li>
                                                                        <a className={notificationstyles.removenotifiction} onClick={() => onUnfollowNotification(notificationdata.messageId)}><img src={unfollowtagicon} alt="unfollowtag" /><span>Unfollow this TAG</span></a>

                                                                    </li>
                                                                    :
                                                                    ''
                                                            }
                                                            <li>

                                                            </li>
                                                        </ul>


                                                    </div>

                                                </div>


                                            </div>
                                            :
                                            ''
                                    ))
                                    :
                                    <p>No Recent data</p>
                            }
                            <p className={notificationstyles.earlierTitle}>Earlier</p>
                            {
                                notificationData.notificationList.length !== 0
                                    ?
                                    notificationData.notificationList.map((notificationdata) => (
                                        notificationdata.recentRealier === "EARLIER"
                                            ?
                                            <div className={`${notificationdata.viewstatus === "read" ? notificationstyles.notificationbody : notificationstyles.unreadnotification}`} onClick={() => onViewStatus(notificationdata.viewstatus, notificationdata.id)} key={notificationdata.id} id={notificationdata.id}>
                                                <div className={notificationstyles.notificationmessagebody}>
                                                    <div>
                                                        <Avatar src={`${profileImagePath}${notificationdata.uimage}`} variant="rounded" className={notificationstyles.avatarimage} />

                                                        {
                                                            (notificationdata.keyword === "A")
                                                                ?
                                                                <div className={notificationstyles.askcount}><span></span></div>
                                                                :
                                                        (notificationdata.keyword === "S" || notificationdata.keyword === "P")
                                                            ?

                                                            <div className={notificationstyles.saycount}><span></span></div>
                                                            :
                                                            (notificationdata.keyword === "I")
                                                                ?

                                                                <div className={notificationstyles.updatecount}><span></span></div>
                                                                :
                                                                (notificationdata.keyword === "H" || notificationdata.keyword === "X")
                                                                    ?

                                                                    <div className={notificationstyles.tagcount}><span></span></div>

                                                                    :
                                                                    ''}

                                                    </div>
                                                    <div className={styles.mesageandtime}>
                                                        <p dangerouslySetInnerHTML={{ __html: notificationdata.Message }}></p>
                                                        <p className={notificationstyles.messagetime}>{notificationdata.Message_Time}ago in{notificationdata.tenantName}</p>
                                                    </div>
                                                </div>
                                                <div className={`${styles.dropdown}`}>

                                                    <a className={`${notificationdata.viewstatus === "read" ? notificationstyles.notificationdropdown : notificationstyles.unreadnotificationdropdown}`} id={notificationdata.id}>
                                                        <img src={dropdownarrow} alt="dropdown" />
                                                    </a>
                                                    <div className={`${styles.dropdownlinks} ${notificationstyles.notificationdropdownlinks}`}>
                                                        <ul>
                                                            <li>
                                                                <a className={notificationstyles.removenotifiction} onClick={() => onremoveNotification(notificationdata.id)}><img src={removenotitifcationicon} alt="removenotification" /><span>Remove  this notification   </span></a>

                                                            </li>
                                                            {(notificationdata.keyword === "H" || notificationdata.keyword === "X" )
                                                                ?

                                                                <li>
                                                                    <a className={notificationstyles.removenotifiction} onClick={() => onUnfollowNotification(notificationdata.messageId)}><img src={unfollowtagicon} alt="unfollowtag" /><span>Unfollow this TAG</span></a>
                                                                </li>
                                                                :
                                                                ''}
                                                            <li>

                                                            </li>
                                                        </ul>


                                                    </div>

                                                </div>


                                            </div>
                                            :
                                            ''


                                    ))
                                    :
                                    <p>No Earlier Data</p>
                            }
                        </div>
                        :
                        <p>No Data</p>
                    :
                    <CircularProgress className={notificationstyles.loader} />
            }
        </>
    )
}

export default Notifications
