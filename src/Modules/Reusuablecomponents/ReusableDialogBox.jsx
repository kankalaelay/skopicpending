import React from "react";
import DialogueStyles from "../../Assets/css/DialogueStyles.module.css"


function DialogBox(props){
    if(!props.showReq && !props.showPrimaryReq ){
        return<></>
    }
    else if(props.showReq){
            return(
    <>
    <div className={DialogueStyles.DialogBox}>
            <div className={DialogueStyles.Container}>
            <div className={DialogueStyles.Header}>
                            {props.title}
                            <button className={DialogueStyles.Close}  onClick={props.close}>x</button>
                    </div>
                    <div className={DialogueStyles.DialogBody}>
                        <p className={DialogueStyles.DialogBodyText}>  {props. description}  </p>
                    </div>
            </div>
    </div>
    </>
)
    }
    else if(props.showPrimaryReq){
        
        return(
            (props.list && props.list.length !== 0)
        ?
            <>
            (props.list.map())
            <div className={DialogueStyles.DialogBox}>
                    <div className={DialogueStyles.Container}>
                    <div className={DialogueStyles.Header}>
                                    {props.title}
                                    <button className={DialogueStyles.Close}  onClick={props.close}>x</button>
                            </div>
                            <div className={DialogueStyles.DialogBody}>
                                <p className={DialogueStyles.DialogBodyText}>  {props. description}  </p>
                            </div>
                    </div>
            </div>
            </>
            :
            <>
            <div className={DialogueStyles.DialogBox}>
                    <div className={DialogueStyles.Container}>
                    <div className={DialogueStyles.Header}>
                                    {props.title}
                                    <button className={DialogueStyles.Close}  onClick={props.close}>x</button>
                            </div>
                            <div className={DialogueStyles.DialogBody}>
                                <p className={DialogueStyles.DialogBodyText}> No users are following this community </p>
                            </div>
                    </div>
            </div>
            </>
        )
    }
    
}
export default DialogBox;
