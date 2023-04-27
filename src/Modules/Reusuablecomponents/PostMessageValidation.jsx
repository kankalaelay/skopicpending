import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import profileimage from '../../Assets/images/profileimage.png'
import styles from '../../Assets/css/home/post.module.css'
import locationpinchildpost from '../../Assets/images/locationpinchildpost.png'
import * as feedactions from '../../store/actions/feedactions/feedActionCreator'
import { useSelector, useDispatch } from 'react-redux'
import * as childSayActions from '../../store/actions/searchactions/childsayActionCreator'
import LocationTag from '../Reusuablecomponents/LocationTag'
import * as SignInActions from '../../store/actions/SignInActions/SignInAction'



const PostMessageValidation = (props) => {

    const [isInputData, setInputData] = React.useState(false)
    const dispatch = useDispatch()
    const [isButtonEnable, setButtonEnable] = React.useState(false)
    const [setLocationSelect, isLocationSelect] = React.useState('')
    const [isLat, setLat] = React.useState('')
    const [isLng, setLng] = React.useState('')

    // var newLine = "\r\n\r\n"
    // // var mybr = document.createElement('br');
    // var data1 = [];
    // var data2 = [];
    var TotalLetters = 280;
    // var j = 0;
    // var strArray = [];
    var inputDataLen;

    const ignoreSpaceandUrls = (mstrData, txtId) => {

        let inputData = mstrData;


        if (inputData.length !== 0) {
            setInputData(true)
        }
        else {
            setInputData(false)
        }
        inputDataLen = inputData.length;
        // var commas;
        // var dsr = navigator.userAgent.split("MSIE");
        let inputText = document.getElementById(txtId).value;
        inputText = inputText.replace(/\n/g, " ");
        let strArray = inputText.split(" ");
        let validlettercount = 0;
        let i;
        for (i = 0; i < strArray.length; i++) {
            if (strArray[i].indexOf("http://") == -1
                && strArray[i].indexOf("www.") == -1
                && strArray[i].indexOf("https://") == -1
                && strArray[i].indexOf("HTTP://") == -1
                && strArray[i].indexOf("WWW.") == -1
                && strArray[i].indexOf("HTTPS://") == -1) {
                validlettercount = validlettercount + strArray[i].length;
            } else if (strArray[i].indexOf("http://")
                && strArray[i].indexOf("www.")
                && strArray[i].indexOf("https://")
                && strArray[i].indexOf("HTTP://")
                && strArray[i].indexOf("WWW.")
                && strArray[i].indexOf("HTTPS://")) {
                validlettercount = validlettercount + strArray[i].length;
            }
        }
        inputDataLen = validlettercount;
    }



    const myFunction = (id) => {
        let inputValue;

        let letterCounter;
        let sayButton = `buttonforchildsay${id}`
        let saveButton
        if (props.messageType === "feedTextArea") {
            inputValue = `textInput${id}`
            letterCounter = `letterCounterEdit${id}`

        }
        else if (props.messageType === "sendaMail") {

            inputValue = `textInputMail${id}`
            letterCounter = `letterCounterMail${id}`
        }
        else if (props.messageType === "editBio") {
            inputValue = `bioInput${id}`
            letterCounter = `letterCounterBio${id}`
            saveButton = `buttonforBioSave${id}`

        }
        else {
            inputValue = `textInputPost${id}`
            letterCounter = `letterCounterSay${id}`
            saveButton = `buttonforEdit${id}`

        }




        // var say_ButtonId=document.getElementById(sayButton)

        let letters = document.getElementById(inputValue).value;
        ignoreSpaceandUrls(letters, inputValue);
        if (document.getElementById(letterCounter) !== null) {
            var label_count = document.getElementById(letterCounter);
            label_count.innerText = TotalLetters - inputDataLen;

        }


        if (inputDataLen.length != 0 && isInputData) {
            if (inputDataLen > TotalLetters) {
                document.getElementById(letterCounter).style.color = "red";
                if (props.messageType === "feedTextArea" || props.messageType === "sendaMail" || props.messageType === "editBio") {
                    document.getElementById(saveButton).style.disabled = true;
                    document.getElementById(saveButton).style.backgroundColor = "lightgray";
                }
                else {
                    document.getElementById(sayButton).style.disabled = true;
                    document.getElementById(sayButton).style.backgroundColor = "lightgray";
                }
                setButtonEnable(false)


            } else {

                document.getElementById(letterCounter).style.color = "black";
                if (props.messageType === "feedTextArea" || props.messageType === "sendaMail" || props.messageType === "editBio") {
                    document.getElementById(saveButton).style.disabled = false;
                    document.getElementById(saveButton).style.backgroundColor = "#2181ce";
                }
                else {
                    document.getElementById(sayButton).style.disabled = false;
                    document.getElementById(sayButton).style.backgroundColor = "#36B549"
                }
                setButtonEnable(true)


            }

        }
    }


    const submit = (id) => {

        let inputValue = `textInputPost${id}`
        let lettersCount = document.getElementById(inputValue).value;
        let letterCounter = `letterCounterSay${id}`

        if (isInputData && isButtonEnable) {
            let lnglat;
            if (isLat !== "" & isLng !== "") {
                lnglat = isLat + "," + isLng
            }
            else {
                lnglat = ""
            }


            dispatch(feedactions.postChildSayData(`?Parent_ID=${id}&Message=${lettersCount}&userLoc=&msgLoc=${lnglat}&locName=${setLocationSelect}`))
            setLat('')
            setLng('')
            isLocationSelect('')
            setTimeout(function () {
                dispatch(childSayActions.fetchChildSayData(`?id=${id}`))

            }, 500);
            // dispatch(childSayActions.fetchChildSayData(`?id=${id}&in_pop_columns=all&in_limit=0`))
            document.getElementById(inputValue).value = "";
            document.getElementById(letterCounter).innerText = TotalLetters;
            setInputData('')
            // console.log(setLocationSelect,isLat,isLng)

        }



    }

    const onCancelSelection = (id) => {
        let inputText;
        let letterCounter;
        let postMessage;
        let buttonforEdit;
        let buttonforCancel
        if (props.messageType === "editBio") {
            inputText = `bioInput${id}`
            letterCounter = `letterCounterBio${id}`
            postMessage = `postBioMessage${id}`
            buttonforEdit = `buttonforBioSave${id}`
            buttonforCancel = `buttonforBioCancel${id}`

        }
        else {
            inputText = `textInput${id}`
            letterCounter = `letterCounterEdit${id}`
            postMessage = `postMessage${id}`
            buttonforEdit = `buttonforEdit${id}`
            buttonforCancel = `buttonforCancel${id}`


        }
        // let buttonforEdit = `buttonfor${id}`


        if (document.getElementById(inputText).style.display === "none") {
            document.getElementById(inputText).style.display = "block"
            document.getElementById(buttonforEdit).style.display = "block"
            document.getElementById(buttonforCancel).style.display = "block"
            document.getElementById(letterCounter).style.display = "block"
            if (props.messageType === "feedTextArea") {
                document.getElementById(postMessage).style.display = "none"
            }
        }
        else {
            document.getElementById(inputText).style.display = "none"
            document.getElementById(buttonforEdit).style.display = "none"
            document.getElementById(buttonforCancel).style.display = "none"
            document.getElementById(letterCounter).style.display = "none"
            if (props.messageType === "feedTextArea") {
                document.getElementById(postMessage).style.display = "block"
            }
        }

    }

    const onSendaMail = (id) => {
        let inputValue = `textInputMail${id}`
        let letterCounter = `letterCounterMail${id}`
        let lettersCount = document.getElementById(inputValue).value;
        console.log(lettersCount)

        dispatch(feedactions.postaMailData(`?mid=${id}&comment=${lettersCount}&checkHsh=message`))

        document.getElementById(inputValue).value = "";
        document.getElementById(letterCounter).innerText = TotalLetters;



    }

    const onEditPost = (id) => {
        let inputValue = `textInput${id}`
        let letterCounter = `letterCounterEdit${id}`
        let lettersCount = document.getElementById(inputValue).value;
        if (props.filtertype === "&&filtertype=update") {
            dispatch(feedactions.editaUpdate(`?announceID=${id}&message=${lettersCount}&ident=actUpdate&argval=share&timeZone=IST`))
        }
        else {
            dispatch(feedactions.editaPost(`?messageID=${id}&message=${lettersCount}`))
        }
        dispatch(feedactions.fetchFeedData(`?startlimit=0${props.filtertype}`))
        document.getElementById(inputValue).value = "";
        document.getElementById(letterCounter).innerText = TotalLetters;


    }

    const onBioUpdate = (id) => {
        let editBioInputValue = `bioInput${id}`
        let editBioLetterCounter = `letterCounterBio${id}`
        let editBioLetterCount = document.getElementById(editBioInputValue).value;
        dispatch(feedactions.fetchEditBio(`shortBio=${editBioLetterCount}`))



        setTimeout(() => {
            dispatch(SignInActions.fetchloginUser(''))
        }, 500);

        document.getElementById(editBioInputValue).value = "";
        document.getElementById(editBioLetterCounter).innerText = TotalLetters;

        props.setEditBio(false)
    }


    return (
        <div key={props.id}>
            {/* <textarea rows="2" cols="50" id={`textInput${props.id}`} onKeyUp={() => myFunction(props.id)}></textarea> */}
            <div className={styles.sendaMailModel}>
                {
                    (props.messageType === "feedTextArea")
                        ?
                        <>
                            <textarea rows="2" cols="50" id={`textInput${props.id}`} onInput={() => myFunction(props.id)} onFocus={() => myFunction(props.id)} defaultValue={props.Message} className={styles.EditPostMessage}></textarea>
                            <p dangerouslySetInnerHTML={{ __html: props.Message }} className={styles.postMessage} id={`postMessage${props.id}`}></p>
                        </>
                        :
                        (props.messageType === "sendaMail")
                            ?
                            <textarea rows="4" cols="50" className={styles.sendamailtextarea} id={`textInputMail${props.id}`} onInput={() => myFunction(props.id)} placeholder={`What would you like to say to ${props.displayName}`}></textarea>
                            :
                            (props.messageType === "editBio")
                                ?
                                <>
                                    <textarea rows="2" className={`${styles.editBioTextArea} ${props.isEditBio ? styles.editBioInfo : styles.editBioInfoNone}`} cols="20" id={`bioInput${props.id}`} onInput={() => myFunction(props.id)} onFocus={() => myFunction(props.id)} defaultValue={props.Message}></textarea>
                                    {/* <p id={`postBioMessage${props.id}`} className={styles.postMessage} onClick={() => onBioSelection(props.id)}>
                                        {props.Message}
                                    </p> */}
                                </>
                                :

                                <>
                                    <Avatar src={props.userImageSrc} variant="square" />
                                    <input className={styles.commentinput} placeholder="Say something..." type="text" id={`textInputPost${props.id}`} onInput={() => myFunction(props.id)} />
                                    {/* <a className={styles.locationpinchildpost}><img src={locationpinchildpost} /></a> */}
                                    <LocationTag isLocationSelect={isLocationSelect} setLat={setLat} setLng={setLng} id={props.id} />

                                </>
                }
            </div>
            <div className={styles.postbuttonandlabel}>
                {

                    (props.messageType === "feedTextArea")
                        ?
                        (isInputData)
                            ?
                            <>
                                <button className={styles.editPost} id={`buttonforEdit${props.id}`} onClick={() => onEditPost(props.id)}>SAVE</button>
                                <a onClick={() => onCancelSelection(props.id)} id={`buttonforCancel${props.id}`}>Cancel</a>
                                <label id={`letterCounterEdit${props.id}`}>280</label>

                            </>
                            :
                            ''
                        :
                        (props.messageType === "sendaMail")
                            ?
                            <>
                                <button id={`buttonforEdit${props.id}`} className={styles.sendaMail} onClick={() => onSendaMail(props.id)}>Send</button>
                                <label id={`letterCounterMail${props.id}`}>280</label>

                            </>
                            :
                            (props.messageType === "editBio")
                                ?
                                <>
                                    <button id={`buttonforBioSave${props.id}`} onClick={() => onBioUpdate(props.id)} className={`${styles.editbioSave} ${props.isEditBio ? styles.editBioInfo : styles.editBioInfoNone}`}>Save</button>
                                    <a onClick={() => onCancelSelection(props.id)} id={`buttonforBioCancel${props.id}`} className={props.isEditBio ? styles.editBioInfo : styles.editBioInfoNone}>Cancel</a>
                                    <label id={`letterCounterBio${props.id}`} className={props.isEditBio ? styles.editBioInfo : styles.editBioInfoNone}>280</label>
                                </>
                                :

                                <>
                                    {
                                        (isInputData)
                                            ?
                                            <button className={styles.childpost} id={`buttonforchildsay${props.id}`} onClick={() => submit(props.id)} >POST</button>

                                            :
                                            <span></span>
                                    }
                                    <label id={`letterCounterSay${props.id}`}>280</label>

                                </>
                }
                {/* <label id={`letterCounter${props.id}`}>280</label> */}

            </div>
            {/* <button onClick={() => submit} id={`saybutton${props.id}`}>Say</button><br /> */}
            {/* <label id={`letterCounter${props.id}`}>280</label> */}
            {/* <p id={`content${props.id}`}></p><br /><br /> */}
        </div>
    )
}

export default PostMessageValidation
