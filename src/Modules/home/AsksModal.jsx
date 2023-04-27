import React, { useEffect, useState } from "react";
import "../../Assets/css/home/AsksModal.css";
import { Modal, Button, ModalFooter } from "react-bootstrap"
import { useSelector,useDispatch } from 'react-redux';
import Post from '../home/post';
import { CircularProgress } from "@material-ui/core";


import * as feedactions from '../../store/actions/feedactions/feedActionCreator'


function AsksModal(props) {
  const AskCanAns = useSelector(state => state.followReducer.sayData)
  const saysCanAns = useSelector(state => state.followReducer.askData)
  const isLoaded=useSelector(state => state.followReducer.isLoaded)

  const [modalText, setModalText] = useState("")

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.isPostOption === "ASK") {
      setModalText("Possible answers to your ASK")
    }
    else if (props.isPostOption === "SAY") {
      setModalText("A few ASKs you could answer")

    }
    else {
      setModalText("")
    }


  }, [props.isPostOption])

  const onAskCommunitySelection=(id)=>{
    
    dispatch(feedactions.askYourCommunity(id));
    
    setTimeout(()=>{
      dispatch(feedactions.fetchFeedData('?startlimit=0'))

    },500)
    
    props.setSaysShow(false);
    


  }

  const onInviteHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      size="lg"
      centered
      className="my-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="title"
          style={{ fontSize: "18px", fontWeight: "bold", padding: "10px", paddingBottom: "0px" }}
        >
          {modalText}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="ModalPosts">
        {
        (isLoaded)
          ?
          (AskCanAns && Object.keys(AskCanAns).length > 0)
            ?
            <>
            <Post listdata={AskCanAns.messageList} data={AskCanAns} isAskModal="isAskModal" />
            <p className="Message">Can not find any related Ask's</p>
            </>
            :
            (saysCanAns && Object.keys(saysCanAns).length > 0)
              ?
              <Post listdata={saysCanAns.messageList} data={saysCanAns} isAskModal="isAskModal" />
              :
              <p className="Message">Can not find any related Say's</p>
              :
              <CircularProgress className="loader"/>
        }
      </Modal.Body>
      <ModalFooter  >
        <div className="ModalFooter">
          {
            (isLoaded)
            ?
            (AskCanAns && Object.keys(AskCanAns.messageList).length > 0 || saysCanAns && Object.keys(saysCanAns.messageList).length > 0)
              ?
              <span>Not happy with results?</span>
              :
              <span>Sorry! No Results Found</span>
              :
              null
          }

          {
          (props.isPostOption === "ASK")
              ?
              < button className="PostCommunity askCommunity" onClick={()=>onAskCommunitySelection(AskCanAns.messageConnectionID)}>ASK Community</button>
              :
              null
            // <button className="PostCommunity sayCommunity">SAY Community</button>
          }

        </div>
      </ModalFooter>
    </Modal >
  );
}
export default AsksModal;
