import React ,{Component}from 'react';
import style from "./MainPage.module.css";
import Signin from "./SignIn/Signin";
import Signup from "./Signup/Signup";
import Video from "./Video/Video";
import Switch from "./Switch/Switch"

class MainPage extends Component{
    render(){
      return(
        <>
        <div className={style.App}>
         <Video/>
         <Switch> 
         <div label="SIGN IN"> 
          <Signin/>
         </div> 
         <div label="SIGN UP"> 
          <Signup/>
         </div> 
         
      </Switch>   
        </div>
        
        </>
      )
    }
  }
  
  export default MainPage;