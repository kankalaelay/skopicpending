import React from 'react'
import style from './video.module.css';
import image from'../../../Assets/images/image-1.jpg'

const Video=()=>{
    return (
        <div className={style.Intro}>
           <img src={image} alt="sigin video"/> 
        </div>
    )
}

export default Video
