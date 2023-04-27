import React, { useEffect, useState } from "react";
import Header from "../header/header.js";
import styles from "../../Assets/css/home/home.module.css";

import TredingTagsResults from "../home/TredingTagsResults.jsx";
import MiddleContent from "./Content.js";
import Homepagesidebar from "../home/Homepagesidebar.js";
import Homepagerightsidebar from "../home/Homepagerightsidebar.js";
import Searchresult from "./searchresult.jsx";
import { useSelector } from "react-redux";
import Notifications from "../notifications/Notifications.jsx";

const Home = (props) => {
  const userSearchData = useSelector(
    (state) => state.userReducer.userSearchData
  );
  const TredingTagResults = useSelector(
    (state) => state.TagReducer.tredingTagsResults
  );
  const [isNotificationButtonSelect, setNotificationButtonSelect] =
    useState(false);
  // useEffect(() => {

  //     window.onscroll=function(){
  //         myfunction();
  //     };
  //      var header=document.getElementById('headerbar');
  //      console.log(header)
  //      var sticky=header.offsetTop;

  //      function myfunction(){
  //          if(window.pageYOffset>sticky){
  //              header.classList.add("sticky");
  //          }
  //          else{
  //              header.classList.remove("sticky");
  //          }
  //      }

  // })
  const notificationButtonSelection = () => {
    setNotificationButtonSelect(!isNotificationButtonSelect);
  };

  return (
    <React.Fragment>
      <Header onNotificationOptionClick={notificationButtonSelection} />
      <div className={`container`}>
        <div className={`row ${styles.homeRow}`}>
          <div className={`col-sm-3 ${styles.leftColumn}`}>
            <Homepagesidebar />
          </div>
          {userSearchData && Object.keys(userSearchData).length > 0 ? (
            <div className={`col-sm-6 ${styles.midColumn}`}>
              <Searchresult />
            </div>
          ) : TredingTagResults && Object.keys(TredingTagResults).length > 0 ? (
            <div className={`col-sm-6 ${styles.midColumn}`}>
              <TredingTagsResults />
            </div>
          ) : (
            <div className={`col-sm-6 ${styles.midColumn}`}>
              <MiddleContent />
            </div>
          )}
          <div className={`col-sm-3 ${styles.homerightsidebar}`}>
            <Homepagerightsidebar />
          </div>
          {isNotificationButtonSelect ? (
            <div className={`col-sm-3  ${styles.notifications}`}>
              <div className={styles.notificationscroll}>
                <Notifications />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
