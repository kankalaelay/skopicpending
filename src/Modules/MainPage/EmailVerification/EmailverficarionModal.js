import React, { Component } from 'react'
import {Modal ,Button} from "react-bootstrap";
import "./EmailverficationModal.css"
import axios from 'axios'
import * as Cookies from "js-cookie"
import * as CryptoJS from "crypto-js"
import {Redirect} from "react-router-dom"

class EmailverficationModal extends React.Component {
	state={
		code:"",
		isAuthenticated:false,
		errorMessage:"",
		message:"",
	}
	updateCode=(e)=>{
		this.setState({code:e.target.value})
	}

	codeSubmitHandler=(e,id)=>{
		e.preventDefault();
		let formData=new FormData()
		 var encodedemail=CryptoJS.AES.encrypt(this.props.email, 'skopic').toString()
		formData.append("j_username",encodedemail)
		const config = {     
			headers: { 'content-type': 'x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
			"Set-Cookie":Cookies.get("JSESSIONID"),
			},
			withCredentials: true,  
		}
		let currentComponent = this
		axios.post(
			`http://dev.skopic.com:9090/skopicportal/index/createSixdigitcodeUser.html?sixDigitCode=${this.state.code}&sixDigitCodeStatus=approved`, 
			formData,
			config,
		  )
			.then(function (response) {
			if(response.data==="Registered"||response.data=="SkopicUser"){
				currentComponent.setState({	isAuthenticated:true})

				axios.request({
					url: `http://dev.skopic.com:9090/skopicportal/jsonuser/land?redirectTenantId=${id}`,
					method: "POST",
					headers: {
					  "Access-Control-Allow-Origin": "*",
					  "Set-Cookie":Cookies.get("JSESSIONID"),
							 },
			  
					withCredentials: true,
							})
		
				           axios.request({
                    url:`http://dev.skopic.com:9090/skopicportal/jsonuser/getUserData`,
                    method:"GET",
                   headers: {  "Access-Control-Allow-Origin": "*",
                    "Set-Cookie":Cookies.get("JSESSIONID"),
                    },
                    withCredentials: true, 
                })
			
				

						
			}
			else{
				currentComponent.setState({errorMessage:"The code you entered is incorrect. Please try again."})
			  }
		  })
		  .catch(function (error) {
			  console.log(error);
		  })
	}
	ResendCode=()=>{
	
		this.setState({message:"Sending new Code"})
		let formData=new FormData()
		var encodedemail=CryptoJS.AES.encrypt(this.props.email, 'skopic').toString()
		formData.append("j_username",encodedemail)
		const config = {     
			headers: { 'content-type': 'x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
			"Set-Cookie":Cookies.get("JSESSIONID"),
			},
			withCredentials: true,  
		}
		let currentComponent = this
		  axios.post(
			`http://dev.skopic.com:9090/skopicportal/jsonindex/resendVerificationCode.html?emailType=Resend`, 
			formData,
			config
		  )
			.then((response) => {
				if(response.data.status==="success"){
					currentComponent.setState({message:"The code as been sent your Email, The code exires in 24hrs"})
				}
			})
			.catch(function (error) {
				console.log(error);
			})
			
	}
	closeHandler=()=>{
		this.setState({
			message:null,
			code:"",
			errorMessage:null,

		})
	}
	render() {
		const {code} = this.state;
		const isEnabled =
			  code.length >= 6
			  if(this.state.isAuthenticated){
				return <Redirect to='/home' />
			  }  
		return (
			
			<Modal
				{...this.props}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				className="Add"
			>
				<div >
				<Modal.Header closeButton onClick={this.closeHandler}>
					<Modal.Title id="contained-modal-title-vcenter">
						Email Verification
          </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h3 className="text-head">Email verification required!</h3>
                    <p className="text">Please enter the 6-digit code sent to {this.props.email}.</p>
                    <form onSubmit={(e)=>this.codeSubmitHandler(e,this.props.tentId)}>
                        <div className="EnterCode">
                            <input type="password" placeholder="Enter code" name="Enter code"value={this.state.code} onChange={this.updateCode}/>
                        </div>
						<p className="errorMessage" style={{textAlign:"center"}}>{this.state.errorMessage}</p>
						<p className="ResendCode" onClick={this.ResendCode}>Resend Code</p>
                        <button type="submit"  disabled={!isEnabled}className="FinishSignUp">Finish Sign Up</button>
                    </form>
					<p className="ResendMessage" style={{textAlign:"center"}}>{this.state.message}</p>
				</Modal.Body>
				</div>
			</Modal>
			
		);
	}
}
export default  EmailverficationModal