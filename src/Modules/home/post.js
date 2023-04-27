import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import profileimage from '../../Assets/images/profileimage.png'
import saysoutlineimage from '../../Assets/images/noofsays.svg'
import follow from '../../Assets/images/follow.svg'
import dropdownarrow from '../../Assets/images/downarrow.svg'
import location from '../../Assets/images/userlocationtag.svg'
import dot from '../../Assets/images/dot.png'
import smalllike from '../../Assets/images/like.svg'
import like from '../../Assets/images/like.svg'
import unlike from '../../Assets/images/unlike.svg'
import edit from '../../Assets/images/edit.svg'
import share from '../../Assets/images/share.svg'
import deleteicon from '../../Assets/images/deleteicon.png'
import rating from '../../Assets/images/rating.svg'
import sendanemail from '../../Assets/images/sendanemail.png'
import report from '../../Assets/images/report.png'
import privateinvite from '../../Assets/images/privateinvite.png'




import locationpinchildpost from '../../Assets/images/locationpinchildpost.png'

import styles from '../../Assets/css/home/post.module.css'
import feedstyles from '../../Assets/css/home/feedpost.module.css'

import { Divider } from '@material-ui/core';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import * as childSayActions from '../../store/actions/searchactions/childsayActionCreator'
import * as feedactions from '../../store/actions/feedactions/feedActionCreator'
import unfollow from '../../Assets/images/unfollow.svg'
import SimpleDialogDemo from '../Reusuablecomponents/CustomizedDialogs'
import ReusuableDeleteDialogmodal from '../Reusuablecomponents/ReusuableDeleteModal';
import ReusuableReportDialogmodal from '../Reusuablecomponents/ReusuableReportDialogmodal';
import PostMessageValidation from '../Reusuablecomponents/PostMessageValidation';
import ReusuableSendaMailModal from '../Reusuablecomponents/ReusuableSendaMailModal';

import Childsay from './childsay';


const Post = (props) => {
    const followStatusData = useSelector((state) => state.followReducer.followData)

    const dispatch = useDispatch()
    // const userChildSayData = useSelector(state => state.userReducer.userChildSayData)

    console.log(props.listdata)

    // var profileimagelocalPath = "http://localhost:8080/skopicimage";
    var profileImagePath = "http://dev.skopic.com:9090/skopicimage";
    console.log(props.listdata)
    const onSayClick = (id, e) => {
        let sayid = `saySelection${id}`
        e.preventDefault();
        if (document.getElementById(sayid).style.display === "block") {
            document.getElementById(sayid).style.display = "none"
        }
        else {
            dispatch(childSayActions.fetchChildSayData(`?id=${id}`))

            document.getElementById(sayid).style.display = "block"

        }
    }
    const followunfollow = (id, followstatus) => {

        var followid = `1${id}`;
        var unfollowid = `0${id}`
        if (followstatus === "isFollow=1") {
            document.getElementById(followid).style.display = "none"
            document.getElementById(unfollowid).style.display = "block"

        }
        else {
            document.getElementById(unfollowid).style.display = "none"
            document.getElementById(followid).style.display = "block"

        }

        var followstatusparams = `?messageID=${id}&&${followstatus}`
        dispatch(feedactions.fetchFollowData(followstatusparams))

    }

    const onLikeUnlikeSelection = (id, cache) => {
        var likedid = `like${id}`
        var unlikedid = `unlike${id}`

        if (cache === "cacheUpdate") {
            document.getElementById(likedid).style.display = "none"
            document.getElementById(unlikedid).style.display = "block"

        }
        var likestatusparams = `?id=${id}&&cacheStatus=${cache}`
        dispatch(feedactions.fetchVoteUpStatus(likestatusparams))



    }

    const onEditSelection = (id) => {
        let editTextArea = `edittext${id}`
        let hideOriginalMessage = `hide${id}`

        if (document.getElementById(editTextArea).style.display === "block") {
            document.getElementById(editTextArea).style.display = "none"
            document.getElementById(hideOriginalMessage).style.display = "block"

        }
        else {
            document.getElementById(editTextArea).style.display = "block"
            document.getElementById(hideOriginalMessage).style.display = "none"


        }

    }



    return (
        <React.Fragment>
            {
                (props.data && Object.keys(props.data).length !== 0)
                    ?
                    (props.listdata)
                        ?
                        props.listdata.map((result) => (
                            <div className={styles.post}>
                                <div className={styles.avatardetails}>
                                    <div className={styles.avatardetails}>
                                        <Avatar src={`${profileImagePath}${result.uimage}`} className={styles.avatar} variant="square" />
                                        <div>
                                            {
                                                (props.isAskModal!=="isAskModal")
                                                ?
                                                <span className={feedstyles.profilename}>{result.displayName}
                                                    {
                                                        <div className={feedstyles.profilehover}>
                                                            <div className={feedstyles.profilehoverimageandcount}>
                                                                <Avatar src={`${profileImagePath}${result.uimage}`} className={styles.avatar} />
                                                                <div>
                                                                    <p className={feedstyles.profilehovername}>{result.displayName}</p>
                                                                    <p className={feedstyles.profilecount}>ASK {result.askcount} | SAY {result.saycount} | UPDATE {result.updatecount} | TAG {result.hashtagcount}</p>
                                                                </div>

                                                            </div>
                                                            <p className={feedstyles.profilehovername}>{result.shortBio}</p>
                                                        </div>

                                                    }
                                                    

                                                </span>
                                                :
                                                <span className={feedstyles.profilename}>{result.displayName}</span>
                                                
                                            }
                                            {
                                                (result.locName)
                                                    ?
                                                    <span className={styles.locationandtime}><p className={styles.profiletime}>{result.Message_Time} in {result.TenantName}</p><img src={dot} alt="dot" /><img src={location} alt="location" />{result.locName}</span>
                                                    :
                                                    <span className={styles.locationandtime}><p className={styles.profiletime}>{result.Message_Time} in {result.TenantName}</p></span>
                                            }
                                        </div>
                                    </div>
                                    <div className={feedstyles.feeddropdown}>

                                        <button className={feedstyles.feeddropdownbutton}>
                                            <img src={dropdownarrow} alt="dropdown" />
                                        </button>
                                        <div className={feedstyles.feeddropdownlinks}>

                                            {
                                                (result.message_type === "A" || result.Keyword_ID === "Open ASK"||result.Keyword_ID === "OpenASK"||result.Keyword_ID === "ASK")
                                                    ?
                                                    <ul className={feedstyles.askdropdown}>
                                                        <li>
                                                            {/* <span> <img src={report} /> Report this post</span> */}
                                                            <ReusuableReportDialogmodal id={result.id} param={"AskorSay"} />

                                                        </li>
                                                        <li>
                                                            {/* <span> <img src={sendanemail} /> Send email to {result.displayName} </span> */}
                                                            <ReusuableSendaMailModal displayName={result.displayName} id={result.id} />

                                                        </li>
                                                    </ul>
                                                    :
                                                    (result.message_type === "H" || result.Keyword_ID === "#tag" ||  result.Keyword_ID === "H")
                                                        ?
                                                        <ul>
                                                            <li>
                                                                <span> <img src={share} /> Share</span>

                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <img src={rating} />
                                                                    Ratings
                                                                </span>
                                                            </li>

                                                            <li>
                                                                {/* <span>
                                                                    <img src={edit} />
                    Edit
                        </span> */}
                                                                <a onClick={() => onEditSelection(result.id)}>
                                                                    <img src={edit} />
                                                                    Edit
                                                                </a>
                                                            </li>
                                                            <li>
                                                                {/* <span>
                                                                    <img src={deleteicon} />
Delete
</span> */}
                                                                <ReusuableDeleteDialogmodal type={"tag"} id={result.id} />

                                                            </li>

                                                        </ul>

                                                        :
                                                        (result.message_type === "I" || result.message_type === "S" || result.Keyword_ID === "Important Update" || result.Keyword_ID === "SAY")
                                                            ?
                                                            <ul>
                                                                <li>
                                                                    {/* <span>
                                                                        <img src={edit} />
                                                                            Edit
                                                                            </span> */}
                                                                    <a onClick={() => onEditSelection(result.id)}>
                                                                        <img src={edit} />
                                                                        Edit
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a>
                                                                        {/* <img src={deleteicon} /> */}
                                                                        {
                                                                            (result.Keyword_ID === "OpenSAY" || result.Keyword_ID === "S")
                                                                                ?
                                                                                <ReusuableDeleteDialogmodal type={"SAY"} id={result.id} />
                                                                                :
                                                                                <ReusuableDeleteDialogmodal type={"Update"} id={result.id} />

                                                                        }
                                                                    </a>
                                                                </li>

                                                            </ul>
                                                            :
                                                            ''
                                            }


                                        </div>

                                    </div>

                                </div>
                                <div className={styles.avatardescription}>
                                    <p dangerouslySetInnerHTML={{ __html: result.Message }} id={`hide${result.id}`}></p>

                                    <span className={feedstyles.edittextarea} id={`edittext${result.id}`} >
                                        <PostMessageValidation id={result.id} Message={result.Message} messageType={"feedTextArea"} />
                                    </span>
                                </div>
                                <div className={styles.followerandcount}>
                                    {
                                        (result.Keyword_ID === "Open ASK" || result.Keyword_ID === "#tag"||result.Keyword_ID === "ASK"||result.Keyword_ID === "H")
                                            ?
                                            <div>
                                                {
                                                    (result.followCount !== 0)
                                                        ?
                                                        <div>

                                                            <SimpleDialogDemo followCount={result.followCount} id={result.id} status={followStatusData} />

                                                        </div>
                                                        :
                                                        <div>
                                                            <span className={styles.followcount}>{result.followCount} followers</span>

                                                        </div>
                                                    // ?
                                                    // <span className={styles.followcount}>{result.followCount} follower</span>
                                                    // :
                                                    // <span className={styles.followcount}>{result.followCount} followers</span>

                                                }
                                            </div>
                                            :
                                            <div>
                                                {
                                                    (result.voteUp !== 0)
                                                        ?
                                                        <SimpleDialogDemo voteUp={result.voteUp} id={result.id} />

                                                        // <span className={styles.followcount}>{result.voteUp} like</span>
                                                        :
                                                        <span className={styles.followcount}>{result.voteUp} likes</span>

                                                }
                                            </div>
                                    }
                                    {
                                        (result.Keyword_ID === "Open ASK"||result.Keyword_ID === "OpenASK"||result.Keyword_ID === "ASK")
                                            ?
                                            <div className={styles.askcount}><span>{result.childcotentreadcount}</span></div>
                                            :
                                            (result.Keyword_ID === "SAY")
                                                ?

                                                <div className={styles.saycount}><span></span></div>
                                                :
                                                (result.Keyword_ID === "Important Update")
                                                    ?

                                                    <div className={styles.updatecount}><span></span></div>
                                                    :
                                                    (result.Keyword_ID === "#tag"||result.Keyword_ID === "H")
                                                        ?

                                                        <div className={styles.tagcount}><span>{result.childcotentreadcount}</span></div>

                                                        :
                                                        ''
                                    }
                                </div>

                                <Divider variant="fullWidth" />
                                {
                                    (result.Keyword_ID === "Open ASK"||result.Keyword_ID === "OpenASK" || result.Keyword_ID === "#tag"||result.Keyword_ID === "ASK"||result.Keyword_ID === "H")
                                        ?
                                        <div className={styles.saysandfollow}>
                                            <div className={styles.noOfsays}>
                                                
                                                {/* <img src-={dots} alt="saysdots"/> */}

                                            
                                                <a onClick={(e) => onSayClick(result.id, e)}>
                                                <img src={saysoutlineimage} alt="numberof says" />
                                                    {
                                                        (result.sayCount === 1 || result.postCount === 1)
                                                            ?
                                                            <span>{result.sayCount}{result.postCount} SAY</span>
                                                            :
                                                            <span>{result.sayCount} SAYs</span>
                                                    }
                                                </a>

                                            </div>
                                            <div className={styles.noOffollows}>
                                                {
                                                    (result.followStatus === "N")
                                                        ?
                                                        <>
                                                            <div className={`${feedstyles.noOffollows}`} id={`1${result.id}`}>
                                                                
                                                                <a className={styles.followtext} onClick={() => followunfollow(result.id, "isFollow=1")}><img src={follow} alt="follow" /> <span>Follow</span></a>
                                                            </div>
                                                            <div className={`${styles.noOffollows} ${feedstyles.unfollowdisplay} `} id={`0${result.id}`}>
                                                                
                                                                <a className={styles.followtext} onClick={() => followunfollow(result.id, "isFollow=0")}><img src={unfollow} alt="unfollow" /> <span>UnFollow</span></a>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <div className={`${styles.noOffollows} `} id={`0${result.id}`}>
                                                                
                                                                <a className={styles.followtext} onClick={() => followunfollow(result.id, "isFollow=0")}><img src={unfollow} alt="unfollow" /> <span>UnFollow</span></a>
                                                            </div>
                                                            <div className={`${feedstyles.noOffollows} ${feedstyles.followdisplay}`} id={`1${result.id}`}>
                                                                
                                                                <a className={styles.followtext} onClick={() => followunfollow(result.id, "isFollow=1")}><img src={follow} alt="follow" /> <span>Follow</span></a>
                                                            </div>
                                                        </>
                                                }
                                            </div>
                                            {
                                                (result.hashTagType === "private")
                                                    ?
                                                    <div className={feedstyles.priavteinvite}>
                                                        <img src={privateinvite} alt="Private Invite" />
                                                        <a>Invite</a>
                                                    </div>
                                                    :
                                                    ''
                                            }
                                        </div>
                                        :
                                        <div className={styles.likeunlike}>
                                            {
                                                (result.UserLikeStatus === "Active")
                                                    ?
                                                    <>
                                                        <a onClick={() => onLikeUnlikeSelection(result.id, "cacheUpdate")} id={`like${result.id}`}>
                                                            <img src={like} alt="like" />
                                                            Like
                                                        </a>
                                                        <a className={feedstyles.likedisplay} id={`unlike${result.id}`}>
                                                            <img src={unlike} alt="unlike" />
                                                            Like
                                                        </a>
                                                    </>
                                                    :
                                                    <a>
                                                        <img src={unlike} alt="unlike" />
                                                        Like
                                                    </a>
                                            }
                                        </div>
                                }
                                {/* .......................childsaydata ......................*/}


                                <div className={styles.childsayselection} id={`saySelection${result.id}`}>
                                    <PostMessageValidation id={result.id} type={"childSay"} />

                                    {/* <div className={styles.comment}>
                                        <Avatar src={profileimage} variant="square" />

                                        <input className={styles.commentinput} placeholder="Say something..." type="text" />
                                        <a><img src={locationpinchildpost} /></a>
                                    </div>
                                    <div>
                                        <button className={styles.childpost}>POST</button>
                                    </div> */}
                                    <Childsay />

                                </div>
                            </div>
                        ))
                        :
                        <p>No data found</p>
                    :
                    ''
            }
        </React.Fragment>
    )
}

export default Post
