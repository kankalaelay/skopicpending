import React from 'react'
import '../../Assets/css/settings/sidebaroptions.css';
import IconButton from '@material-ui/core/IconButton';

function sidebaroptions({ active, text,onSidebaroptionClick }) {
   
    return (

        <div  className={`sidebarOption ${active && 'sidebarOption--active'} `}>            

            <IconButton type="submit" className="sidebarbuttons" onClick={onSidebaroptionClick} >
                {text}
            </IconButton>

        </div>
    )
}

export default sidebaroptions
