import React from "react";
import {useSelector} from 'react-redux';
import style from "../../Assets/css/home/TrendingTagResults.module.css"
import Post from '../home/post';
import CircularProgress from '@material-ui/core/CircularProgress';
import backwardarrow from '../../Assets/images/backwardarrow.png'

const TredingTagsReuslts=()=>{
    const TredingTagResults= useSelector(state => state.TagReducer.tredingTagsResults)
    console.log(TredingTagResults)
    return(
      <>
       {    
         (TredingTagResults && Object.keys(TredingTagResults).length > 0)
        ?
            <div className={style.TagResults}>
              <a href="/home"><img src={backwardarrow} /></a>
              <span style={{fontSize:"20px",marginLeft:"10px"}}>Trending TAGs</span>
            <Post listdata={TredingTagResults} data={TredingTagResults}/>
            </div>
            :
            <p>no records found</p>

 }
      </>
    )
}



export default TredingTagsReuslts
