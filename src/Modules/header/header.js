import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../Assets/images/skopic.png';
import Homeicon from '../../Assets/images/homeicon1.svg'
import profileimageicon from '../../Assets/images/ProfileImageIcon.png'
import crownicon from '../../Assets/images/crown1.svg'
import Settingsicon from '../../Assets/images/settings.svg'
import Notificationicon from '../../Assets/images/bell.svg'
import Searchicon from '../../Assets/images/search.svg'
import humberger from '../../Assets/images/humberger.svg'
import { Link } from 'react-router-dom'
import EllipseIcon from '../../Assets/images/Ellipse.svg';
import searchask from '../../Assets/images/searchask.png';
import searchsay from '../../Assets/images/searchsay.png';
import searchupdate from '../../Assets/images/searchupdate.png';
import searchhashtag from '../../Assets/images/searchhashtag.png';
import styles from '../../Assets/css/header/header.module.css';
import axios from 'axios';
// import { useHistory } from "react-router-dom";
import closebutton from '../../Assets/images/closebutton.png';
import follow from '../../Assets/images/followicon.png'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import saysoutline from '../../Assets/images/saysoutline.png';
import filtericon from '../../Assets/images/filter-search.svg';
import { Dialog, DialogContent, Button, Divider, Tooltip } from '@material-ui/core';
import PrimaryModeratorCrown from '../../Assets/images/PrimaryModeratorCrown.svg'
import SecondaryModeratorCrown from '../../Assets/images/SecondaryModeratorCrown.svg'

//actions from redux
import * as userActions from '../../store/actions/searchactions/userActionCreator'
import * as moderatorActions from '../../store/actions/Moderator/moderatoractions'
import * as notificationActions from '../../store/actions/notificationsactions/notificationActionCreator'
import * as mapActions from '../../store/actions/mapactions/mapAction'








const Header = (props) => {

    const userDetails = useSelector((state) => state.SignInReducer.userDetails)
    // const userSearchData = useSelector(state => state.userReducer.userSearchData)
    // console.log(userSearchData)
    const dispatch = useDispatch()

    // const history = useHistory();


    const [isIconfocus1, setIconfocus1] = useState(false);
    const [isIconfocus2, setIconfocus2] = useState(false);
    const [isIconfocus3, setIconfocus3] = useState(false);
    const [isIconfocus4, setIconfocus4] = useState(false);
    const [isbuttonselect, setbuttonselect] = useState('&comun=all');

    const [isselect, setSelect] = useState(false);
    const [isShowSearchIcon, setShowSearchIcon] = useState(false)
    const [isAllcommunitysButtonClicked, setAllcommunitysButtonClicked] = useState(true)
    const [ispresentcommunityButtonClicked, setpresentcommunityButtonClicked] = useState(false)
    const [iswhitespace, setwhitespace] = useState(false)

    const [content, setContent] = useState('')
    const [results, setResults] = useState([])
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');


    useEffect(() => {

        // var paramssetvalue = "";

        //     var searchcontent = document.getElementById('searchEntry').value;
        //     var choseask = document.getElementById('ask');
        //     var chosesay = document.getElementById('say');
        //     var iupdate = document.getElementById('iupdate');
        //     var htag = document.getElementById('tag');
        //     paramssetvalue = paramssetvalue.concat(searchcontent);
        //         paramssetvalue = paramssetvalue.concat(isbuttonselect);
        //     if (choseask.checked)
        //         paramssetvalue = paramssetvalue.concat("&chose=choseask")
        //     if (chosesay.checked)
        //         paramssetvalue = paramssetvalue.concat("&chose=chosesay")
        //     if (iupdate.checked)
        //         paramssetvalue = paramssetvalue.concat("&chose=iupdate")
        //     if (htag.checked)
        //         paramssetvalue = paramssetvalue.concat("&chose=htag")

        //     setsearchdata(paramssetvalue)
    }, [content])

    const oncommunityselection = (id) => {
        if (id === "&comun=all") {
            setAllcommunitysButtonClicked(!isAllcommunitysButtonClicked)
            setpresentcommunityButtonClicked(false)

        }
        if (id === "&comun=in") {
            setpresentcommunityButtonClicked(!ispresentcommunityButtonClicked)
            setAllcommunitysButtonClicked(false)
        }
        setbuttonselect(id)
        // console.log(id)
        console.log(isbuttonselect)

    }


    const homeIconClick = () => {
        setIconfocus1(!isIconfocus1)
        setIconfocus2(false)
        setIconfocus3(false)
        setIconfocus4(false)
    }

    const addContactIconClick = () => {
        setIconfocus1(false)
        setIconfocus2(!isIconfocus2)
        setIconfocus3(false)
        setIconfocus4(false)
        dispatch(moderatorActions.fetchModeratingCommunityList(''))


    }

    const settingsIconClick = () => {
        setIconfocus1(false)
        setIconfocus2(false)
        setIconfocus3(!isIconfocus3)
        setIconfocus4(false)
        dispatch(mapActions.fetchNearByCommunitysData('?mapStatus=IndexNear'))

    }

    const notificationIconClick = () => {

        props.onNotificationOptionClick()
        dispatch(notificationActions.fetchNotificationData(''))

        setIconfocus1(false)
        setIconfocus2(false)
        setIconfocus3(false)
        setIconfocus4(!isIconfocus4)
    }





    const selectOptions = () => {

        setShowSearchIcon(!isShowSearchIcon)

    }

    const oniconselect = () => {
        setSelect(!isselect)

    }

    const onsearch = (e, scrollType) => {
        e.preventDefault();
        setOpen(true)
        setScroll(scrollType);

    }

    const handleClose = () => {
        setOpen(false)
    }


    const handleSearchKeyDown = (e) => {
        // setContent(e.target.value)
        if (e.key === 'Enter') {

            var paramssetvalue = "";

            var searchcontent = document.getElementById('searchEntry').value;
            var choseask = document.getElementById('ask');
            var chosesay = document.getElementById('say');
            var iupdate = document.getElementById('iupdate');
            var htag = document.getElementById('tag');
            paramssetvalue = paramssetvalue.concat(searchcontent);
            paramssetvalue = paramssetvalue.concat(isbuttonselect);
            if (choseask.checked)
                paramssetvalue = paramssetvalue.concat("&chose=choseask")
            if (chosesay.checked)
                paramssetvalue = paramssetvalue.concat("&chose=chosesay")
            if (iupdate.checked)
                paramssetvalue = paramssetvalue.concat("&chose=iupdate")
            if (htag.checked)
                paramssetvalue = paramssetvalue.concat("&chose=htag")

            dispatch(userActions.fetchSearchData(paramssetvalue))

            setwhitespace(!iswhitespace)
        }
    }



    // const { messageList, totalList } = results
    // var profileImagePath = "http://dev.skopic.com:9090/skopicimage";
    // var profileimagelocalPath = "http://localhost:8080/skopicimage";
    // sticky-top bg-light
    return (
        <React.Fragment>
            <nav className={`navbar navbar-expand-md  navbar-light ${styles.navbarexpand}`}>
                <div className="container">
                <button className={`navbar-toggler ${styles.navbartoggler}`} type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <img src={humberger} ></img>
                </button>
                <div>
                    <Link to="/home"
                        role="button">
                        <img className="navbar-brand " style={{ cursor: "pointer" }} src={logo} alt="Skopic Logo" />

                    </Link>
                </div>
                {/* <form > */}
                <div className={styles.whitespace}>
                    <div className={`${content.length > 0 ? styles.searchform : ''} ${styles.subwhitespace} ${iswhitespace ? styles.noshowwhitespace : ''}`}>
                        <div className={styles.searchbarmargin} >
                            <input type="text" aria-label="search" value={content} className={`nav-link ${styles.searchbar} ${props.navactive ? styles.searchbardarkTheme : ''}`} id="searchEntry" onClick={selectOptions} onChange={e => setContent(e.target.value)} onKeyDown={handleSearchKeyDown} />



                            {content.length <= 0
                                ?
                                <button className={`nav-link ${styles.searchicon} ${props.navactive ? styles.searchbardarkTheme : ''} ${isShowSearchIcon ? styles.searchicondisplay : ''}`} type="submit" onClick={onsearch} > <img src={Searchicon} className={props.navactive ? styles.searchicondarkTheme : ''} alt="search" /></button>
                                :
                                ''
                            }
                            <a className={` ${isShowSearchIcon ? styles.filter : styles.filterbefore} ${isselect ? styles.filterafter : ''} ${props.navactive ? styles.iconbuttonimagedarkMode : ''}`} onClick={oniconselect}><img src={filtericon} alt="fiter"></img></a>
                            {content.length > 0
                                ?

                                <p className={`${styles.searchinfocontent} ${iswhitespace ? styles.noshosearchinfocontent : ''}`}>Searching for <b>{content}</b></p>

                                :
                                ''
                            }
                            <div className={`${styles.searchdropdown} ${isselect && styles.searchoptions}`}>

                                <div>
                                    <button id="AllCommunitys" className={`${styles.allcommunitys} ${isAllcommunitysButtonClicked ? styles.buttonselectionstyle : ''}`} onClick={() => oncommunityselection("&comun=all")}>All Communitys</button>
                                    <button id="presentcommunity" className={`${styles.thiscommunity} ${ispresentcommunityButtonClicked ? styles.buttonselectionstyle : ''}`} onClick={() => oncommunityselection("&comun=in")}>This Community</button>
                                    {/* 
                                    <input type="radio" name="comun" id="presentcommunity" />This Community
                               <input type="radio" name="comun" id="AllCommunitys" defaultChecked />All Communitys */}
                                </div>

                                <table className={styles.filteroptions}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span><input type="checkbox" className={styles.filtercheckboxes} name="chose" id="ask" defaultChecked /> <svg xmlns="http://www.w3.org/2000/svg" width="60.313" height="20.316" viewBox="0 0 60.313 20.316">
                                                    <g id="Group_1846" data-name="Group 1846" transform="translate(-26.063 -695)">
                                                        <text id="ASK" transform="translate(59.376 710)" fill="#373334" font-size="14" font-family="AcuminPro-Regular, Acumin Pro"><tspan x="0" y="0">ASK</tspan></text>
                                                        <g id="Group_1721" data-name="Group 1721" transform="translate(-15716 -2441.921)">
                                                            <path id="Path_509" data-name="Path 509" d="M270.891,256.525l8.346,10.785-8.323-2.91" transform="translate(15488.138 2889.927)" fill="#2168b2" />
                                                            <path id="Path_510" data-name="Path 510" d="M240.435,253.575c-.087,5.054,5.509,9.283,12.5,9.447s12.725-3.8,12.812-8.852-5.509-9.282-12.5-9.448S240.52,248.522,240.435,253.575Z" transform="translate(15501.629 2892.205)" fill="#2168b2" />
                                                            <text id="Q" transform="translate(15748.999 3151)" fill="#fff" font-size="14" font-family="Helvetica"><tspan x="0" y="0">Q</tspan></text>
                                                        </g>
                                                    </g>
                                                </svg></span>

                                            </td>
                                            <td>
                                                <span><input type="checkbox" className={styles.filtercheckboxes} name="chose" id="say" defaultChecked /><svg xmlns="http://www.w3.org/2000/svg" width="59.769" height="19.993" viewBox="0 0 59.769 19.993">
                                                    <g id="Group_1845" data-name="Group 1845" transform="translate(-24.919 -659)">
                                                        <text id="SAY" transform="translate(59.688 674)" fill="#373334" font-size="14" font-family="AcuminPro-Regular, Acumin Pro"><tspan x="0" y="0">SAY</tspan></text>
                                                        <g id="Group_1720" data-name="Group 1720" transform="translate(-15636 -2479.442)">
                                                            <path id="Path_71" data-name="Path 71" d="M153.465,257.746l-10.547,11.992,11.185-5.219" transform="translate(15518.22 2888.698)" fill="#45a735" />
                                                            <path id="Path_72" data-name="Path 72" d="M169.318,255.769c.089,4.9-5.832,9-13.224,9.16s-13.455-3.677-13.543-8.576,5.832-9,13.224-9.161S169.231,250.871,169.318,255.769Z" transform="translate(15518.368 2891.255)" fill="#45a735" />
                                                            <path id="Path_73" data-name="Path 73" d="M174.421,258.414a2.066,2.066,0,1,1-2.061-1.917A1.992,1.992,0,0,1,174.421,258.414Z" transform="translate(15507.076 2889.493)" fill="#fff" />
                                                            <path id="Path_74" data-name="Path 74" d="M156.412,258.337a2.065,2.065,0,1,1-2.061-1.916A1.992,1.992,0,0,1,156.412,258.337Z" transform="translate(15515.053 2889.521)" fill="#fff" />
                                                            <path id="Path_75" data-name="Path 75" d="M165.463,258.337a2.066,2.066,0,1,1-2.061-1.916A1.992,1.992,0,0,1,165.463,258.337Z" transform="translate(15511.044 2889.521)" fill="#fff" />
                                                        </g>
                                                    </g>
                                                </svg>
                                                </span>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span><input type="checkbox" className={styles.filtercheckboxes} name="chose" id="iupdate" defaultChecked /><svg xmlns="http://www.w3.org/2000/svg" width="83.896" height="21.435" viewBox="0 0 83.896 21.435">
                                                    <g id="Group_1847" data-name="Group 1847" transform="translate(-27.524 -729.862)">
                                                        <text id="UPDATE" transform="translate(58.42 746)" fill="#373334" font-size="14" font-family="AcuminPro-Regular, Acumin Pro"><tspan x="0" y="0">UPDATE</tspan></text>
                                                        <g id="Group_1722" data-name="Group 1722" transform="translate(27.524 729.862)">
                                                            <g id="Group_177" data-name="Group 177" transform="translate(14.981 6.251)">
                                                                <path id="Path_82" data-name="Path 82" d="M374.455,264.582l-6.873,2.332-1.041-6.669" transform="translate(-366.541 -253.105)" fill="#e82727" />
                                                                <path id="Path_83" data-name="Path 83" d="M368.561,249.207l2.758-1.779,1.892,2.479-2.759,1.778Z" transform="translate(-367.436 -247.428)" fill="#e82727" />
                                                                <path id="Path_84" data-name="Path 84" d="M371.694,259.12l3.1,1.136-1.22,2.811-3.1-1.136Z" transform="translate(-368.283 -252.607)" fill="#e82727" />
                                                                <path id="Path_85" data-name="Path 85" d="M371.364,252.615l3.063-.933.87,2.415-3.063.932Z" transform="translate(-368.677 -249.312)" fill="#e82727" />
                                                                <path id="Path_86" data-name="Path 86" d="M372.455,255.568l3.224.146-.167,3.145-3.223-.144Z" transform="translate(-369.087 -251.034)" fill="#e82727" />
                                                                <path id="Path_87" data-name="Path 87" d="M376.146,254.784c-.124-1.881-.907-3.365-1.748-3.317s-1.417,1.61-1.291,3.49.91,3.366,1.748,3.318S376.275,256.665,376.146,254.784Z" transform="translate(-369.442 -249.216)" fill="#e82727" />
                                                                <path id="Path_88" data-name="Path 88" d="M373.868,262.122c.974-1.694,1.159-3.36.413-3.721s-2.134.719-3.107,2.413-1.159,3.36-.417,3.721S372.9,263.817,373.868,262.122Z" transform="translate(-368.207 -252.258)" fill="#e82727" />
                                                                <path id="Path_89" data-name="Path 89" d="M374.752,249.409c-.51-.559-1.048-.919-1.2-.8s.138.665.65,1.225,1.048.919,1.2.8S375.264,249.968,374.752,249.409Z" transform="translate(-369.629 -247.941)" fill="#e82727" />
                                                                <path id="Path_90" data-name="Path 90" d="M373.965,248.475c-.4-.458-.857-.738-1.009-.624s.048.58.451,1.039.858.738,1.011.623S374.368,248.934,373.965,248.475Z" transform="translate(-369.36 -247.604)" fill="#e82727" />
                                                            </g>
                                                            <g id="Group_178" data-name="Group 178" transform="translate(2.031)">
                                                                <path id="Path_91" data-name="Path 91" d="M358.778,236.206l5.711,4.219-5.682,4.251" transform="translate(-350.152 -236.206)" fill="#e82727" />
                                                                <path id="Path_92" data-name="Path 92" d="M346.369,251.572l-3.076-1.258,1.337-2.765,3.077,1.259Z" transform="translate(-343.293 -241.23)" fill="#e82727" />
                                                                <path id="Path_93" data-name="Path 93" d="M354.2,244.369l-.536-3.03,3.25-.486.535,3.031Z" transform="translate(-347.887 -238.265)" fill="#e82727" />
                                                                <path id="Path_94" data-name="Path 94" d="M347.977,248.085l-2.446-1.934,1.8-1.929,2.446,1.934Z" transform="translate(-344.284 -239.757)" fill="#e82727" />
                                                                <path id="Path_95" data-name="Path 95" d="M350.145,245.79l-1.523-2.616,3.019-1.487,1.524,2.616Z" transform="translate(-345.654 -238.634)" fill="#e82727" />
                                                                <path id="Path_96" data-name="Path 96" d="M348.162,242.5c-1.687,1.068-2.669,2.449-2.193,3.087s2.23.289,3.921-.779,2.669-2.449,2.193-3.087S349.85,241.434,348.162,242.5Z" transform="translate(-344.425 -238.508)" fill="#e82727" />
                                                                <path id="Path_97" data-name="Path 97" d="M355.229,240.873c-2.08.105-3.729.817-3.684,1.589s1.771,1.313,3.852,1.208,3.73-.817,3.683-1.589S357.31,240.768,355.229,240.873Z" transform="translate(-346.947 -238.268)" fill="#e82727" />
                                                                <path id="Path_98" data-name="Path 98" d="M344.411,248.488c-.258.692-.317,1.3-.13,1.359s.55-.451.809-1.143.318-1.3.132-1.359S344.669,247.8,344.411,248.488Z" transform="translate(-343.682 -241.138)" fill="#e82727" />
                                                                <path id="Path_99" data-name="Path 99" d="M343.934,249.976c-.22.553-.247,1.054-.062,1.115s.515-.335.735-.889.248-1.055.062-1.117S344.156,249.421,343.934,249.976Z" transform="translate(-343.495 -241.908)" fill="#e82727" />
                                                            </g>
                                                            <g id="Group_179" data-name="Group 179" transform="translate(0 11.236)">
                                                                <path id="Path_100" data-name="Path 100" d="M339.647,262.885l1.89-6.508,6.526,3.061" transform="translate(-339.647 -256.377)" fill="#e82727" />
                                                                <rect id="Rectangle_329" data-name="Rectangle 329" width="3.097" height="3.29" transform="matrix(0.003, -1, 1, 0.003, 9.233, 10.086)" fill="#e82727" />
                                                                <path id="Path_101" data-name="Path 101" d="M348.576,265.105l-2.8,1.674-1.795-2.535,2.8-1.676Z" transform="translate(-341.568 -259.119)" fill="#e82727" />
                                                                <path id="Path_102" data-name="Path 102" d="M355.248,268.88l-.936,2.839-2.648-.738.937-2.84Z" transform="translate(-344.97 -261.588)" fill="#e82727" />
                                                                <path id="Path_103" data-name="Path 103" d="M351.7,267.568l-1.987,2.34-2.7-1.94L349,265.63Z" transform="translate(-342.912 -260.476)" fill="#e82727" />
                                                                <path id="Path_104" data-name="Path 104" d="M348.371,269.885c1.745.99,3.516,1.258,3.957.6s-.614-1.995-2.359-2.983-3.515-1.256-3.955-.6S346.625,268.9,348.371,269.885Z" transform="translate(-342.423 -260.88)" fill="#e82727" />
                                                                <path id="Path_105" data-name="Path 105" d="M343.9,263.675c.944,1.708,2.317,2.808,3.067,2.457s.592-2.019-.353-3.727-2.32-2.807-3.069-2.456S342.95,261.968,343.9,263.675Z" transform="translate(-341.163 -257.93)" fill="#e82727" />
                                                                <path id="Path_106" data-name="Path 106" d="M357.341,274.115c.791-.061,1.42-.258,1.4-.441s-.674-.278-1.465-.217-1.42.258-1.4.44S356.547,274.177,357.341,274.115Z" transform="translate(-346.836 -263.935)" fill="#e82727" />
                                                                <path id="Path_107" data-name="Path 107" d="M359.051,274.041c.642-.038,1.15-.218,1.138-.4s-.545-.3-1.184-.26-1.147.217-1.136.4S358.412,274.079,359.051,274.041Z" transform="translate(-347.718 -263.906)" fill="#e82727" />
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                                </span>

                                            </td>
                                            <td>
                                                <span><input type="checkbox" className={styles.filtercheckboxes} name="chose" id="tag" defaultChecked /><svg xmlns="http://www.w3.org/2000/svg" width="54.114" height="18.118" viewBox="0 0 54.114 18.118">
                                                    <g id="Group_1848" data-name="Group 1848" transform="translate(-28.471 -772.13)">
                                                        <text id="TAG" transform="translate(56.585 786)" fill="#373334" font-size="14" font-family="AcuminPro-Regular, Acumin Pro"><tspan x="0" y="0">TAG</tspan></text>
                                                        <g id="Group_1719" data-name="Group 1719" transform="translate(28.471 772.13)">
                                                            <path id="Path_77" data-name="Path 77" d="M454.357,259.2l-3,.012,1.265-17.684,3.007-.015Z" transform="translate(-446.6 -241.514)" fill="#efba29" />
                                                            <path id="Path_78" data-name="Path 78" d="M467.6,259.95l-3.006.016,1.266-17.685,3.007-.012Z" transform="translate(-452.465 -241.849)" fill="#efba29" />
                                                            <path id="Path_79" data-name="Path 79" d="M463.3,249.837l-.17,2.727-19.486.261.18-2.734Z" transform="translate(-443.186 -245.201)" fill="#efba29" />
                                                            <path id="Path_80" data-name="Path 80" d="M462.488,261.314l-.192,2.725-19.475.121.189-2.731Z" transform="translate(-442.821 -250.284)" fill="#efba29" />
                                                        </g>
                                                    </g>
                                                </svg>
                                                </span>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>




                            </div>

                        </div>
                    </div>
                </div>




                <div className={`collapse navbar-collapse ${styles.collapse}`} id="collapsibleNavbar" style={{ flexDirection: "row-reverse" }}>
                    <ul className={`navbar-nav ${styles.navbarnav}`}>

                        <li className="nav-item">
                            <div className={`nav-link ${styles.iconadjust}`}>

                                <Link
                                    className={`${styles.iconbuttons}  ${isIconfocus3 && styles.iconbuttonsactive} ${props.navactive ? styles.iconbuttonsdarkTheme : ''}`} onClick={settingsIconClick}
                                    to="/activity"
                                    role="button"
                                >
                                    <img src={profileimageicon} className={styles.headerprofileimage} alt="profile" width="24" />
                                    <p>Me</p>
                                </Link>
                            </div>
                        </li>

                        <li className="nav-item">
                            <div className={`nav-link ${styles.iconadjust}`}>
                                <Link
                                    className={`${styles.iconbuttons} ${isIconfocus1 && styles.iconbuttonsactive} ${props.navactive ? styles.iconbuttonsdarkTheme : ''}`}
                                    role="button"
                                    to="/home"
                                    onClick={homeIconClick}
                                >
                                    <img src={Homeicon} className={props.navactive ? styles.iconbuttonimagedarkMode : ''} alt="home" width="22" />
                                    <p>Home</p>
                                </Link>
                            </div>
                        </li>
                        {
                            (userDetails && Object.keys(userDetails).length !== 0)
                                ?
                                (userDetails.userData.isModerator === "1"||userDetails.userData.isAdmin==="1")
                                    ?
                                    <li className="nav-item">
                                        <div className={`nav-link ${styles.iconadjust}`}>
                                            <Link
                                                role="button"
                                                className={` ${styles.iconbuttons}  ${isIconfocus2 && styles.iconbuttonsactive} ${props.navactive ? styles.iconbuttonsdarkTheme : ''}`} onClick={addContactIconClick}
                                                to="/Moderator"
                                            >
                                                <img src={crownicon} className={props.navactive ? styles.iconbuttonimagedarkMode : ''} alt="moderator" width="35" />
                                                <img src={EllipseIcon} alt="Notification" className={styles.moderatorEllipse} />
                                                <p>Moderator</p>
                                            </Link>
                                        </div>
                                    </li>
                                    :
                                    null
                                :
                                null
                        }

                        <li className="nav-item">
                            <div className={`nav-link ${styles.iconadjust}`}>
                                <a
                                    className={`${styles.iconbuttons}  ${isIconfocus4 && styles.iconbuttonsactive} ${props.navactive ? styles.iconbuttonsdarkTheme : ''}`} onClick={notificationIconClick}

                                    role="button"
                                >
                                    <img src={Notificationicon} className={props.navactive ? styles.iconbuttonimagedarkMode : ''} alt="Notification" width="21" />
                                    <img src={EllipseIcon} alt="Notification" className={styles.Ellipse} />
                                    <p>Notifications</p>
                                </a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className={`nav-link ${styles.iconadjust}`}>

                                <Link
                                    className={`${styles.iconbuttons}  ${isIconfocus3 && styles.iconbuttonsactive} ${props.navactive ? styles.iconbuttonsdarkTheme : ''}`} onClick={settingsIconClick}
                                    to="/Settings"
                                    role="button"
                                >
                                    <img src={Settingsicon} className={props.navactive ? styles.iconbuttonimagedarkMode : ''} alt="settings" width="24"/>
                                    <p>Settings</p>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Header
