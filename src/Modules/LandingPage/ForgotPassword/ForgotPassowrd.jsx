import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState, Component } from 'react';
import * as Cookies from "js-cookie";
import { colors } from '@material-ui/core';
import { color, height } from '@mui/system';
import { red } from '@mui/material/colors';
import * as ForgotpassAction from "../../../store/actions/Forgotpassword/ForgotpassAction"
import "../ForgotPassword/ForgotPassword.css"
import { stepButtonClasses } from '@mui/material';
import styles from '../../../Assets/css/home/Feed.module.css'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  borderRadius: '16px',
  textAlign: 'center',
  boxShadow: 2,
  boxShadow: 24,
  pt: 4,
  px: 4,
  pb: 3,

};


function ForgotPassowrd(props) {
  const errormessage = useSelector((state) => state.NewforgotpassReducer.message)


  const [email, setEmail] = useState('');
  const [message, setMessage] = useState("")
  const [open, setOpen] = React.useState(false);

  // const handleChange = (e) => setEmail(e.target.email);
  const dispatch = useDispatch()


  const handleClose = () => {
    // setOpen(false);
    props.setSuccess(false)
    // props.setErrorMessage('')
  };
  // const setClose=()=>{
  //   setSuccess(false)
  // }



  useEffect(() => {


    if (props.emailvalue &&props.emailvalue!=='' && props.emailvalue.length > 0) {
      setEmail(props.emailvalue)
      setOpen(true)

    }
    else{
      setOpen(false)
    }
  }, [props.emailvalue])

 

  useEffect(() => {
    if (errormessage !== "" && errormessage) {
      if (errormessage === "Fail") {
        props.setForgotOpen(true)

      } else if (errormessage === "invalid") {
        props.setForgotOpen(true)
      }
      
    }

  }, [errormessage])

  const handleOpen = () => {
    // setOpen(true);
    if (props.emailvalue !== '' && props.emailvalue.length>0) {
     
      dispatch(ForgotpassAction.NewForgotpass(props.emailvalue))
    }




  };

  // useEffect(() => {


  // }, [email])
  // const isSubmitHandler = () => {
  //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  //     return setOpen(false)
  //   }
  //   else {
  //     return setOpen(true)
  //   }
  // }





  return (
    <React.Fragment>

      {/* <Button variant="contained" onClick={handleOpen} disabled={!isEnabled}
        className={`email===""` && email.length > 0 ? !isEnabled : null}>Reset Password</Button><br /> */}





      <Button
        // id="postSubmitButton"
        onClick={handleOpen}

        className={`${ open ?  "resetButtonEnabled":"resetButtonDisabled" }`}
      >Reset Password
      </Button>





      <span onClose={handleClose}>Cancel</span>

      <Modal
        hideBackdrop
        open={props.open}

        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 410,height:230 }}>

          <h5 id="child-modal-title">Password reset link is sent to your mail</h5>

          <p>{email}</p>
          <Button variant="contained" onClick={handleClose}>Ok</Button>

        </Box>
      </Modal>
    </React.Fragment>
  );
}

const NestedModal = (props) => {
  const errormessage = useSelector((state) => state.NewforgotpassReducer.message)

  const dispatch = useDispatch()


  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSuccess, setSuccess] = useState(false)

  useEffect(() => {
    if (errormessage !== "" && errormessage) {
      if (errormessage === "Fail") {
        setErrorMessage("There is no such email exists")

      } else if (errormessage === "invalid") {
        setErrorMessage("Please enter valid mail")
      }
      else {

        setSuccess(true)
        setErrorMessage('')

      }
    }

  }, [errormessage])


  useEffect(() => {
    if (!open) {
      setErrorMessage('')
      setEmail('')
    }
  }, [open])

  const handleChange = (e) => {
    e.preventDefault()
    setEmail(e.target.value)
  };





  const handleOpen = () => {
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false);

  };

  return (
    <div>
      <span variant="contained" onClick={handleOpen}>Forgot password?</span>



      <Modal

        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 380 }}>
          <h2 id="parent-modal-title">Forgot password?</h2>
          <p id="parent-modal-description">
            enter your mail for the reset link
          </p>



          <TextField Textalign="center" id="standard-basic" variant="standard" type="email" placeholder="Email" name="email" value={email} onChange={handleChange} />
          <p className="errorpop">{errorMessage} </p>

          <ForgotPassowrd emailvalue={email} open={isSuccess} setSuccess={setSuccess} setForgotOpen={setOpen} />
        </Box>
      </Modal>
    </div>
  );
}

export default  NestedModal