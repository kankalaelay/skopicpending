import React, { useEffect, useState } from 'react'
import Header from '../header/header.js';
import styles from '../../Assets/css/settings/settings.module.css'
import Sidebaroptions from '../settings/sidebaroptions.js';
import Divider from '@material-ui/core/Divider';
import Emailicon from '../../Assets/images/emailicon.svg'
import Socialmedia from '../../Assets/images/socialmedia.png'
import PasswordIcon from '../../Assets/images/password.png'
import Signouticon from '../../Assets/images/signout.png'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Notificationicon from '../../Assets/images/bell.svg';
import darkmodeicon from '../../Assets/images/darkmodeicon.png';
import axios from "axios";
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import * as Cookies from "js-cookie"
import { Redirect } from "react-router-dom"
import { calcMD5 } from "../../md5Forgot";
import FBModal from "../settings/FBModal"
import TwitterModal from "../settings/TwitterModal"
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import * as SigInOutActions from "../../store/actions/SignInActions/SignInAction"
import Notifications from "../notifications/Notifications"

function Settings() {
    const dispatch = useDispatch()
    const logOutStatus = useSelector(state => state.SignInReducer.isLogout)
    console.log(logOutStatus)

    // functionality for email,socialmedia,password change  options
    const [isfocus1, setFocus1] = useState(true)
    const [isfocus2, setFocus2] = useState(false)
    const [isfocus3, setFocus3] = useState(false)
    const [isfocus4, setFocus4] = useState(false)
    const [isChange, setChange] = useState(false)
    const [isNotificationButtonSelect, setNotificationButtonSelect] = useState(
        false
    );
    const [logOut, setLogOut] = useState(false)
    const [username, setUsername] = useState("")
    const [pwd, setpwd] = useState("")
    // NewsLetter State
    const [newsLetter, setNewsLetter] = useState("N")
    const [newsLetterchecked, setnewsLetterchecked] = useState()
    // Monthly SoptLight State
    const [monSpotLite, setmonSpotLite] = useState("N")
    const [monSpotLitecheacked, setmonSpotLitecheacked] = useState()
    //Inactivity Reminders State
    const [inavityRemd, setinavityRemd] = useState("N")
    const [inavityRemdchecked, setinavityRemdchecked] = useState()
    //ASKs you are following
    const [AsksFollw, setAsksFollw] = useState("N")
    const [AsksFollwchecked, setAsksFollwchecked] = useState()
    //Users following your ASKs
    const [ufAsks, setUfAsks] = useState("N")
    const [ufAskschecked, setUfAskschecked] = useState()
    //New #TAGS
    const [newTag, setNewTag] = useState("N")
    const [newTagchecked, setNewTagchecked] = useState()
    //#TAGS you are following
    const [tag, setTag] = useState("N")
    const [tagchecked, setTagchecked] = useState()
    //Users following your #TAGs
    const [ufHash, setUfHash] = useState("N")
    const [ufHashchecked, setUfHashchecked] = useState()
    //UPDATE
    const [update, setUpdate] = useState("N")
    const [updatechecked, setUpdatechecked] = useState()
    //Likes
    const [like, setLike] = useState("N")
    const [likechecked, setLikechecked] = useState()
    //Receive email from users
    const [receivemail, setReceivemail] = useState("N")
    const [receivemailchecked, setReceviemailchecked] = useState()
    //fb permissions
    const [fbpermissions, setfbpermissions] = useState()
    //Twitter permissions
    const [tweetperssions, setTweetperssions] = useState()
    //Modal
    const [fbshow, setfbshow] = useState(false)
    const [tweetShow, setTweetShow] = useState(false)
    const onThemeChange = () => {
        setChange(!isChange);
    }

    const sidebarChildoptionsFocus1 = () => {
        setFocus1(!isfocus1);

        setFocus2(false);
        setFocus3(false);
        setFocus4(false);

    }

    const sidebarChildoptionsFocus2 = () => {
        setFocus2(!isfocus2);
        window.scrollTo(0, 500)
        setFocus1(false);
        setFocus3(false);
        setFocus4(false);


    }
    const sidebarChildoptionsFocus3 = () => {

        setFocus3(!isfocus3);
        window.scrollTo(0, 700)
        setFocus4(false);
        setFocus2(false);
        setFocus1(false);
    }

    const sidebarChildoptionsFocus4 = () => {

        setFocus4(!isfocus4);
        window.scrollTo(0, 900)
        setFocus3(false);
        setFocus2(false);
        setFocus1(false);
    }
    useEffect(() => {
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
                'Set-Cokkie': Cookies.get("JSESSIONID")
            },
            withCredentials: true,
        }
        axios.get(
            'http://dev.skopic.com:9090/skopicportal/jsonuser/userSettings.html',
            config,
        )
            .then((res) => {
                setUsername(res.data.username)
                setpwd(res.data.userPassword)

                if (res.data.newsLetter === "Y") {
                    setnewsLetterchecked(true)
                }
                else {
                    setnewsLetterchecked(false)
                }
                if (res.data.monSpotLite === "Y") {
                    setmonSpotLitecheacked(true)

                }
                else {
                    setmonSpotLitecheacked(false)
                }
                if (res.data.missYou === "Y") {
                    setinavityRemdchecked(true)

                }
                else {
                    setinavityRemdchecked(false)
                }
                if (res.data.opq === "Y") {
                    setAsksFollwchecked(true)
                }
                else {
                    setAsksFollwchecked(false)
                }
                if (res.data.ufAsk === "Y") {
                    setUfAskschecked(true)
                }
                else {
                    setUfAskschecked(false)
                }
                if (res.data.newHash === "Y") {
                    setNewTagchecked(true)
                }
                else {
                    setNewTagchecked(false)
                }
                if (res.data.hash === "Y") {
                    setTagchecked(true)
                }
                else {
                    setTagchecked(false)
                }
                if (res.data.ufHash === "Y") {
                    setUfHashchecked(true)
                }
                else {
                    setUfHashchecked(false)
                }
                if (res.data.update === "Y") {
                    setUpdatechecked(true)
                }
                else {
                    setUpdatechecked(false)
                }
                if (res.data.like === "Y") {
                    setLikechecked(true)
                }
                else {
                    setLikechecked(false)
                }
                if (res.data.usermes === "Y") {
                    setReceviemailchecked(true)
                }
                else {
                    setReceviemailchecked(false)
                }
                if (res.data.fbPermission === "Y") {
                    setfbpermissions(true)
                }
                else {
                    setfbpermissions(false)
                }
                if (res.data.twitterPermission === "Y") {
                    setTweetperssions(true)
                }
                else {
                    setTweetperssions(false)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        console.log(newsLetter)
        console.log(monSpotLite)
    }, [])

    const newsLetterChange = () => {
        if (newsLetter === "Y") {
            setNewsLetter("N")
            setnewsLetterchecked(true)
        }
        else {
            setNewsLetter("Y")
            setnewsLetterchecked(false)
        }
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
                'Set-Cokkie': Cookies.get("JSESSIONID")
            },
            withCredentials: true,
        }
        let formdata = new FormData()
        formdata.append('notificationStatus', newsLetter);
        formdata.append("cnfrm", "newsLetter")
        axios.post(
            'http://dev.skopic.com:9090/skopicportal/user/notification.html',
            formdata,
            config
        )
    }
    //MonthlySpotLight
    const monSpotLiteChange = () => {
        if (monSpotLite === "Y") {
            setmonSpotLite("N")
            setmonSpotLitecheacked(true)
        }
        else {
            setmonSpotLite("Y")
            setmonSpotLitecheacked(false)
        }
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
                'Set-Cokkie': Cookies.get("JSESSIONID")
            },
            withCredentials: true,
        }
        let formdata = new FormData()
        formdata.append('notificationStatus', monSpotLite);
        formdata.append("cnfrm", "monSpotLite")
        axios.post(
            'http://dev.skopic.com:9090/skopicportal/user/notification.html',
            formdata,
            config
        )
    }

    // Inactivity Reminder
    const inavityRemdChange = () => {
        if (inavityRemd === "Y") {
            setinavityRemd("N")
            setinavityRemdchecked(true)
        }
        else {
            setinavityRemd("Y")
            setinavityRemdchecked(false)
        }
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
                'Set-Cokkie': Cookies.get("JSESSIONID")
            },
            withCredentials: true,
        }
        let formdata = new FormData()
        formdata.append('notificationStatus', inavityRemd);
        formdata.append("cnfrm", "missYou")
        axios.post(
            'http://dev.skopic.com:9090/skopicportal/user/notification.html',
            formdata,
            config
        )
    }
    //ASKs you are following
    const AsksFollowChange = () => {
        if (AsksFollw === "Y") {
            setAsksFollw("N")
            setAsksFollwchecked(true)
        }
        else {
            setAsksFollw("Y")
            setAsksFollwchecked(false)
        }
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
                'Set-Cokkie': Cookies.get("JSESSIONID")
            },
            withCredentials: true,
        }
        let formdata = new FormData()
        formdata.append('notificationStatus', AsksFollw);
        formdata.append("cnfrm", "opq")
        axios.post(
            'http://dev.skopic.com:9090/skopicportal/user/notification.html',
            formdata,
            config
        )
    }
    //Users following your ASKs

    const UsersFollowAsksChange = () => {
        if (ufAsks === "Y") {
            setUfAsks("N")
            setUfAskschecked(true)
        }
        else {
            setUfAsks("Y")
            setUfAskschecked(false)
        }
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
                'Set-Cokkie': Cookies.get("JSESSIONID")
            },
            withCredentials: true,
        }
        let formdata = new FormData()
        formdata.append('notificationStatus', ufAsks);
        formdata.append("cnfrm", "ufAsk")
        axios.post(
            'http://dev.skopic.com:9090/skopicportal/user/notification.html',
            formdata,
            config
        )
    }
    //New#Tag
    const NewTagChange = () => {
        if (newTag === "Y") {
            setNewTag("N")
            setNewTagchecked(true)
        }
        else {
            setNewTag("Y")
            setNewTagchecked(false)
        }
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
                'Set-Cokkie': Cookies.get("JSESSIONID")
            },
            withCredentials: true,
        }
        let formdata = new FormData()
        formdata.append('notificationStatus', newTag);
        formdata.append("cnfrm", "newHash")
        axios.post(
            'http://dev.skopic.com:9090/skopicportal/user/notification.html',
            formdata,
            config
        )
    }
    //#TAGS you are following
    const TagFollowingChange = () => {
        if (tag === "Y") {
            setTag("N")
            setTagchecked(true)
        }
        else {
            setTag("Y")
            setTagchecked(false)
        }
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
                'Set-Cokkie': Cookies.get("JSESSIONID")
            },
            withCredentials: true,
        }
        let formdata = new FormData()
        formdata.append('notificationStatus', tag);
        formdata.append("cnfrm", "hash")
        axios.post(
            'http://dev.skopic.com:9090/skopicportal/user/notification.html',
            formdata,
            config
        )
    }
    //Users following your #TAGS
    const UserFollowTagChange = () => {
        if (ufHash === "Y") {
            setUfHash("N")
            setUfHashchecked(true)
        }
        else {
            setUfHash("Y")
            setUfHashchecked(false)
        }
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
                'Set-Cokkie': Cookies.get("JSESSIONID")
            },
            withCredentials: true,
        }
        let formdata = new FormData()
        formdata.append('notificationStatus', ufHash);
        formdata.append("cnfrm", "ufHash")
        axios.post(
            'http://dev.skopic.com:9090/skopicportal/user/notification.html',
            formdata,
            config
        )
    }
    //UPDATES
    const UpdateChange = () => {
        if (update === "Y") {
            setUpdate("N")
            setUpdatechecked(true)
        }
        else {
            setUpdate("Y")
            setUpdatechecked(false)
        }
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
                'Set-Cokkie': Cookies.get("JSESSIONID")
            },
            withCredentials: true,
        }

        let formdata = new FormData()
        formdata.append('notificationStatus', update);
        formdata.append("cnfrm", "upnot")
        axios.post(
            'http://dev.skopic.com:9090/skopicportal/user/notification.html',
            formdata,
            config
        )
    }
    //Likes
    const LikesChange = () => {
        if (like === "Y") {
            setLike("N")
            setLikechecked(true)
        }
        else {
            setLike("Y")
            setLikechecked(false)
        }
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
                'Set-Cokkie': Cookies.get("JSESSIONID")
            },
            withCredentials: true,
        }

        let formdata = new FormData()
        formdata.append('notificationStatus', like);
        formdata.append("cnfrm", "like")
        axios.post(
            'http://dev.skopic.com:9090/skopicportal/user/notification.html',
            formdata,
            config
        )
    }
    //Receive messages from users
    const ReciveMailChange = () => {
        if (receivemail === "Y") {
            setReceivemail("N")
            setReceviemailchecked(true)
        }
        else {
            setReceivemail("Y")
            setReceviemailchecked(false)
        }
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
                'Set-Cokkie': Cookies.get("JSESSIONID")
            },
            withCredentials: true,
        }

        let formdata = new FormData()
        formdata.append('notificationStatus', receivemail);
        formdata.append("cnfrm", "usermes")
        axios.post(
            'http://dev.skopic.com:9090/skopicportal/user/notification.html',
            formdata,
            config
        )
    }

    //Styles
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '17ch',
        },
    }));
    console.log(pwd)
    const classes = useStyles();
    //Password State
    const [pwdCr, setpwdCr] = React.useState({
        password: '',
        showPassword: false,
    });
    const [pwdNw, setpwdNw] = React.useState({
        password: '',
        showPassword: false,
    });
    const [pwdCn, setpwdCn] = React.useState({
        password: '',
        showPassword: false,
    });

    const notificationButtonSelection = () => {
        setNotificationButtonSelect(!isNotificationButtonSelect);
    };
    const [msgCr, setMsgCr] = useState("")
    const [msgNw, setMsgNw] = useState("")
    const [msgCn, setMsgCn] = useState("")
    const [msg, setMsg] = useState("")

    const handleChange1 = (prop) => (event) => {
        setpwdCr({ ...pwdCr, [prop]: event.target.value });
    };

    const handleClickShowPassword1 = () => {
        setpwdCr({ ...pwdCr, showPassword: !pwdCr.showPassword });

    };

    const handleMouseDownPassword1 = (event) => {
        event.preventDefault();
    };

    const handleChange2 = (prop) => (event) => {
        setpwdNw({ ...pwdNw, [prop]: event.target.value });

    };

    const handleClickShowPassword2 = () => {
        setpwdNw({ ...pwdNw, showPassword: !pwdNw.showPassword });

    };

    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };

    const handleChange3 = (prop) => (event) => {
        setpwdCn({ ...pwdCn, [prop]: event.target.value });
    };

    const handleClickShowPassword3 = () => {
        setpwdCn({ ...pwdCn, showPassword: !pwdCn.showPassword });
    };

    const handleMouseDownPassword3 = (event) => {
        event.preventDefault();
    };
    const passwordChangehandler = () => {
        let flag = 0
        let encodedNewPassword = calcMD5(pwdNw.password)
        let encodedCurrentPassword = calcMD5(pwdCr.password)

        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
                'Set-Cokkie': Cookies.get("JSESSIONID")
            },
            withCredentials: true,
        }
        let formdata = new FormData()
        formdata.append("password_n", encodedNewPassword)
        formdata.append("userEmail", username)
        formdata.append("password_c", encodedCurrentPassword)
        if (pwdCr.password === "") {
            setMsgCr("Please enter current password")
        }
        else if (pwdCr.password !== "") {
            if (encodedCurrentPassword !== pwd) {
                setMsgCr("Invalid current password.")
            }
        }
        else {
            setMsgCr("")
        }
        if (pwdNw.password === "") {
            setMsgNw("Please enter new password.")
            flag = 1
        }
        else if (pwdNw.password.length < 8) {
            setMsgNw("Specify a password with eight characters or more.")
            flag = 1
        }
        else if (pwdCr.password == pwdNw.password) {
            setMsgNw("New Password should not be same as Old Password")
            flag = 1
        }
        else if (pwdNw.password.charAt(0) === "") {
            setMsgNw("Does not allow a data with first character as a blank.")
            flag = 1
        }
        else {
            setMsgNw("")
        }
        if (pwdCn.password === "") {
            setMsgCn("Please enter confirm password")
            flag = 1
        }
        else if (pwdCn.password.length < 8) {
            setMsgCn("Specify a password with eight characters or more.")
            flag = 1
        }
        else if (pwdNw.password !== pwdCn.password) {
            setMsgCn("New and confirm New Password have to be same")
            flag = 1
        }
        else {
            setMsgCn("")
        }
        if (flag === 1) {
            return false
        }
        else (
            axios.post(
                `http://dev.skopic.com:9090/skopicportal/jsonuser/passProfile.html`,
                formdata,
                config
            )
                .then((res) => {

                    if (res.data.status === "Success") {
                        setMsg("Password changed successfully")
                    }
                    else {
                        setMsg(null)
                    }
                })
        )
    }

    const signOut = () => {
        dispatch(SigInOutActions.signOut())
    }
    if (logOutStatus) {
        return <Redirect to="/" />
    }

    return (
        <React.Fragment>
            <div className={` ${styles.body} ${isChange && styles.darkthemebody}`}>
                <Header navactive={isChange} onNotificationOptionClick={notificationButtonSelection} />
                <div className={` container ` }>
            <div className={` row justify-content-md-center`} >
            <div className={` col-md-10 `} >
            <div className={` row `} >
                    <div className={` col-md-4 col-lg-3 ${styles.sidebarParentoptions} ${isChange ? styles.sidebarParentoptionsdarkTheme : ''}`}>
                        <div className={styles.sidebarParentoptions1}>
                            <Sidebaroptions active={isfocus1} text="Email Notification" onSidebaroptionClick={sidebarChildoptionsFocus1} />
                            <Divider variant="fullWidth"></Divider>
                            <Sidebaroptions active={isfocus2} text="Social Media" onSidebaroptionClick={sidebarChildoptionsFocus2} />
                            <Divider variant="fullWidth" ></Divider>
                            <Sidebaroptions active={isfocus3} text="Dark Mode" onSidebaroptionClick={sidebarChildoptionsFocus3} />
                            <Divider variant="fullWidth" ></Divider>
                            <Sidebaroptions active={isfocus4} text="Password Change" onSidebaroptionClick={sidebarChildoptionsFocus4} />
                        </div>

                    </div>

                    <div className={` col-md-8 col-lg-7 styles.sidebartoggleoptions `}  > 

                        <div className={`${styles.sidebarchildoptions} ${isfocus1 && styles.focusapperance} ${isChange ? styles.sidebarchildoptionsdarkTheme : ''}`} >
                            <div className={styles.emailnotify}>
                                <div className={styles.emailicon}>
                                    <img src={Emailicon} alt="email" className={styles.settingsicon} />
                                    <img src={Notificationicon} alt="notification" className={styles.emailnotification} />
                                </div>
                                <p className={styles.sidebarchildoptionsheader}><b>Email Notification</b></p>
                            </div>

                            <span className={styles.emailnotificationsoptions}><p>Newsletter </p>
                                <input type="checkbox" id="Newsletter" value={newsLetter} onChange={newsLetterChange} checked={newsLetterchecked} /><label className={styles.inputlabel} htmlFor="Newsletter">Toggle</label>

                            </span>

                            <span className={styles.emailnotificationsoptions}><p>Monthly SpotLight</p>
                                <input type="checkbox" id="MonthlySpotLight" value={monSpotLite} onClick={monSpotLiteChange} checked={monSpotLitecheacked} /><label className={styles.inputlabel} htmlFor="MonthlySpotLight">Toggle</label>

                            </span>
                            <span className={styles.emailnotificationsoptions}><p>Inactivity Reminder</p>
                                <input type="checkbox" id="Inactivity" value={inavityRemd} onClick={inavityRemdChange} checked={inavityRemdchecked} /><label className={styles.inputlabel} htmlFor="Inactivity">Toggle</label>

                            </span>
                            <Divider variant="inset" className={styles.divider}></Divider>

                            <span className={styles.emailnotificationsoptions}><p>ASKs you are following</p>
                                <input type="checkbox" id="ASKs you are following" value={AsksFollw} onClick={AsksFollowChange} checked={AsksFollwchecked} /><label className={styles.inputlabel} htmlFor="ASKs you are following">Toggle</label>

                            </span>
                            <span className={styles.emailnotificationsoptions}><p>Users following your ASKs</p>
                                <input type="checkbox" id="Users following your ASKs" value={ufAsks} onClick={UsersFollowAsksChange} checked={ufAskschecked} /><label className={styles.inputlabel} htmlFor="Users following your ASKs">Toggle</label>

                            </span>
                            <span className={styles.emailnotificationsoptions}><p>New #TAGs</p>
                                <input type="checkbox" id="New #TAGs" value={newTag} onClick={NewTagChange} checked={newTagchecked} /><label className={styles.inputlabel} htmlFor="New #TAGs">Toggle</label>

                            </span>
                            <span className={styles.emailnotificationsoptions}><p>#TAGs you are following</p>
                                <input type="checkbox" id="#TAGs you are following" value={tag} onClick={TagFollowingChange} checked={tagchecked} /><label className={styles.inputlabel} htmlFor="#TAGs you are following">Toggle</label>

                            </span>
                            <span className={styles.emailnotificationsoptions}><p>Users following your #TAGs</p>
                                <input type="checkbox" id="Users following your #TAGs" value={ufHash} onClick={UserFollowTagChange} checked={ufHashchecked} /><label className={styles.inputlabel} htmlFor="Users following your #TAGs">Toggle</label>

                            </span>
                            <span className={styles.emailnotificationsoptions}><p>UPDATEs</p>
                                <input type="checkbox" id="UPDATEs" value={update} onClick={UpdateChange} checked={updatechecked} /><label className={styles.inputlabel} htmlFor="UPDATEs">Toggle</label>

                            </span>
                            <span className={styles.emailnotificationsoptions}><p>Likes</p>
                                <input type="checkbox" id="Likes" value={like} onClick={LikesChange} checked={likechecked} /><label className={styles.inputlabel} htmlFor="Likes">Toggle</label>

                            </span>
                            <span className={`${styles.emailnotificationsoptions} ${styles.lastoption}`}><p>Receive email from users</p>
                                <input type="checkbox" id="Receive email from users" value={receivemail} onClick={ReciveMailChange} checked={receivemailchecked} /><label className={styles.inputlabel} htmlFor="Receive email from users">Toggle</label>

                            </span>




                        </div>
                        <div className={`${styles.sidebarchildoptions} ${isfocus2 && styles.focusapperance} ${isChange && styles.sidebarchildoptionsdarkTheme}`} >
                            <div className={styles.sidebarchildoptionsocialmediapswdchange}>
                                <img src={Socialmedia} alt="socailmedia" className={`${styles.settingsicon} ${styles.socialmedia} ${isChange && styles.buttontextdarkTheme}`} />
                                <p className={styles.sidebarchildoptionsheader1}>
                                    <b>Social Media </b>
                                </p>
                            </div>
                            <span className={styles.emailnotificationsoptions}><p>Facebook </p>
                                <input type="checkbox" id="Facebook" onClick={() => setfbshow(true)} /><label className={styles.inputlabel} htmlFor="Facebook">Toggle</label>

                            </span>

                            <span className={styles.emailnotificationsoptions}><p>Twitter</p>
                                <input type="checkbox" id="Twitter" onClick={() => setTweetShow(true)} /><label className={styles.inputlabel} htmlFor="Twitter">Toggle</label>

                            </span>
                            <span className={`${styles.emailnotificationsoptions} ${styles.lastoption}`}><p>LinkedIn</p>
                                <input type="checkbox" id="LinkedIn" /><label className={styles.inputlabel} htmlFor="LinkedIn">Toggle</label>

                            </span>


                            <FBModal
                                show={fbshow}
                                onHide={() => setfbshow(false)}
                            />
                            <TwitterModal
                                show={tweetShow}
                                onHide={() => setTweetShow(false)}
                            />

                        </div>


                        <div className={`${styles.sidebarchildoptions}  ${isfocus3 && styles.focusapperance} ${isChange && styles.sidebarchildoptionsdarkTheme}`} >
                            <div className={styles.sidebarchildoptionsocialmediapswdchange}>
                                <img src={darkmodeicon} alt="darkmode" className={`${styles.settingsicon} ${styles.socialmedia} ${isChange && styles.buttontextdarkTheme}`} />
                                <p className={styles.sidebarchildoptionsheader1}>
                                    <b>Darkmode</b>
                                </p>
                            </div>
                            <span className={styles.emailnotificationsoptions}><p>Enable </p>
                                <input type="checkbox" id="Enable" onChange={onThemeChange} /><label className={styles.inputlabel} htmlFor="Enable">Toggle</label>

                            </span>
                        </div>





                        <div className={`${styles.sidebarchildoptions} ${isfocus4 && styles.focusapperance} ${isChange ? styles.sidebarchildoptionsdarkTheme : ''}`} >
                            <div className={styles.sidebarchildoptionsocialmediapswdchange}>
                                <img src={PasswordIcon} alt="Passwordchange" className={`${styles.settingsicon} ${styles.password} ${isChange && styles.buttontextdarkTheme}`} />

                                <p className={styles.sidebarchildoptionsheader2}>
                                    <b>Password Change</b>
                                </p>
                            </div>

                            <span className={styles.resetpassword}><p className={styles.passwordlabel}>Current Password</p>
                                <div>
                                    {/* <TextField className={styles.inputpassword} type="password" /> */}
                                    <FormControl className={clsx(classes.margin, classes.textField)}>
                                        {/* <InputLabel htmlFor="standard-adornment-password">Password</InputLabel> */}
                                        <Input
                                            helpertext="incorrect input"
                                            type={pwdCr.showPassword ? 'text' : 'password'}
                                            value={pwdCr.password}
                                            inputProps={{ maxLength: 50 }}
                                            onChange={handleChange1('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword1}
                                                        onMouseDown={handleMouseDownPassword1}
                                                        className={styles.eyeshowhide}
                                                    >
                                                        {pwdCr.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />

                                    </FormControl>
                                    {/* <img src={Eyepswd} alt="eyepassword" className={styles.passwordimg} /> */}
                                </div>

                            </span>
                            <p className={styles.message}>{msgCr}</p>
                            <span className={styles.resetpassword}><p className={styles.passwordlabel}>New Password</p>
                                <div>
                                    {/* <TextField className={styles.inputpassword} type="password" />
                                    <img src={Eyepswd} alt="eyepassword" className={styles.passwordimg} /> */}
                                    <FormControl className={clsx(classes.margin, classes.textField)}>
                                        {/* <InputLabel htmlFor="standard-adornment-password">Password</InputLabel> */}
                                        <Input
                                            type={pwdNw.showPassword ? 'text' : 'password'}
                                            value={pwdNw.password}
                                            inputProps={{ maxLength: 50 }}
                                            onChange={handleChange2('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword2}
                                                        onMouseDown={handleMouseDownPassword2}
                                                    >
                                                        {pwdNw.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </div>
                            </span>
                            <p className={styles.message}>{msgNw}</p>
                            <span className={styles.resetpassword}><p className={styles.passwordlabel}>Confirm New Password</p>
                                <div>
                                    {/* <TextField className={styles.inputpassword} type="password" />
                                    <img src={Eyepswd} alt="eyepassword" className={styles.passwordimg} /> */}

                                    <FormControl className={clsx(classes.margin, classes.textField)}>
                                        {/* <InputLabel htmlFor="standard-adornment-password">Password</InputLabel> */}
                                        <Input
                                            type={pwdCn.showPassword ? 'text' : 'password'}
                                            value={pwdCn.password}
                                            inputProps={{ maxLength: 50 }}
                                            onChange={handleChange3('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword3}
                                                        onMouseDown={handleMouseDownPassword3}
                                                    >
                                                        {pwdCn.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </div>
                            </span>
                            <p className={styles.message}>{msgCn}</p>
                            <Button className={styles.submit} onClick={passwordChangehandler}>Save</Button>

                            <p className={styles.message}>{msg}</p>
                        </div>
                        <div className={`${styles.sidebarchildoptions} ${styles.signoutbutton} ${isChange && styles.sidebarchildoptionsdarkTheme}`}>


                            <IconButton type="submit" className={`${styles.signout} ${isChange ? styles.submitdarkTheme : ''}`} onClick={signOut}>
                                <img src={Signouticon} className={isChange ? styles.buttontextdarkTheme : ''} alt="SignOut" />
                          Sign OUT
                        </IconButton>
                        </div>
                    </div>
                    {(isNotificationButtonSelect) ?
                        <>
                            <div className={`col-sm-3 ${styles.notifications} `} >
                                <div className={styles.notificationscroll}>
                                    <Notifications />
                                </div>
                            </div>
                        </>
                        :
                        null
                    }
                </div>

            </div>
        </div>
        </div>
        </div>

        </React.Fragment>
    )
}

export default Settings
