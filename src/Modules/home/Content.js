import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import FeedPost from "./FeedPost";
import styles from "../../Assets/css/home/Content.module.css";
import Asks from "../../Assets/images/searchask.png";
import Updates from "../../Assets/images/searchupdate.png";
import Tags from "../../Assets/images/searchhashtag.png";
import Says from "../../Assets/images/searchsay.png";
import NoDataFound from "../../Assets/images/data-not-found.svg";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import * as feedActions from "../../store/actions/feedactions/feedActionCreator";
import * as SignInActions from "../../store/actions/SignInActions/SignInAction";

import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import { makeStyles, withStyles } from "@material-ui/core/styles";

function MiddleContent() {
  const feedData = useSelector((state) => state.feedReducer.feedData);
  const isLoaded = useSelector((state) => state.feedReducer.isLoaded);

  const nearByCommuntysData = useSelector(
    (state) => state.mapReducer.nearByCommunitysData
  );
  const SignInCheckData = useSelector(
    (state) => state.SignInReducer.SignInCheckData
  );
  const changeCommunityData = useSelector(
    (state) => state.followReducer.changeCommunityData
  );

  // console.log(SignInCheckData.status)

  //   if(nearByCommuntysData)
  //   {
  //           Object.entries(nearByCommuntysData.physicalTenantList).map(item => {
  //         console.log(item[1])
  //       })
  // console.log(nearByCommuntysData)
  // if(feedData)
  // {
  // console.log(feedData.msgListSize)
  // }

  //     console.log(nearByCommuntysData.countryList)
  //   }
  // Object.entries(nearByCommuntysData).map(item => {
  //     // console.log(item[0],"",item[1])
  //     for(var j=0;j<item.length;j++)
  //     {
  //         console.log(j)
  //     }
  //   })
  //     var newarray = nearByCommuntysData.map(getCommunitysData)
  //     const markers = [];

  //       function getCommunitysData(result){
  //         var communitydata=result.countryList
  //         // markers.push({
  //         //       id: result.physicalTenantCountryId,
  //         //       title: "marker: " + result.physicalTenantList,
  //         //       lat: result.physicalLats,
  //         //       lng: result.physicalLags
  //         //     });
  // console.log(communitydata)
  //       }

  // if (feedData) {
  //     console.log(feedData.breadCountLength)
  // }
  const [value, setValue] = React.useState(0);
  const [isfilterbuttonselect1, setfilterbuttonselect1] = useState(false);
  const [isfilterbuttonselect2, setfilterbuttonselect2] = useState(false);
  const [isfilterbuttonselect3, setfilterbuttonselect3] = useState(false);
  const [isfilterbuttonselect4, setfilterbuttonselect4] = useState(false);
  const [isfilterselect, setfilterselect] = useState("");

  const [isaskortagselect, setaskortagselect] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SignInActions.fetchloginUser(""));
    dispatch(feedActions.fetchFeedData("?startlimit=0"));
    dispatch(feedActions.fetchcontirbutors(""));
    dispatch(feedActions.fetchSettings(""));
    dispatch(feedActions.fetchUserNames("@"));

    // setTimeout(() => {
    //     dispatch(feedActions.fetchFeedData('?startlimit=0'))
    //     dispatch(SignInActions.fetchloginUser(''))
    //     dispatch(feedActions.fetchcontirbutors(''))
    //     dispatch(feedActions.fetchSettings(''))
    //     dispatch(feedActions.fetchUserNames('@'));

    // }, 500);
    // if (SignInCheckData) {
    //     if (SignInCheckData && Object.keys(SignInCheckData).length !== 0) {
    //         if (SignInCheckData.status === "AUTHORIZED") {
    //             // dispatch(feedActions.changeCommunity(SignInCheckData.userTenant, SignInCheckData.userTenantId))
    //             dispatch(feedActions.fetchFeedData('?startlimit=0'))
    //             dispatch(SignInActions.fetchloginUser(''))
    //             dispatch(feedActions.fetchcontirbutors(''))
    //             dispatch(feedActions.fetchSettings(''))
    //             dispatch(feedActions.fetchUserNames('@'));
    //         }
    //     }
    // }
  }, []);

  useEffect(() => {
    if (SignInCheckData) {
      if (SignInCheckData && Object.keys(SignInCheckData).length !== 0) {
        if (SignInCheckData.status === "AUTHORIZED") {
          // dispatch(feedActions.changeCommunity(SignInCheckData.userTenant, SignInCheckData.userTenantId))
          dispatch(SignInActions.fetchloginUser(""));
          dispatch(feedActions.fetchFeedData("?startlimit=0"));
          dispatch(feedActions.fetchcontirbutors(""));
          dispatch(feedActions.fetchSettings(""));
          dispatch(feedActions.fetchUserNames("@"));
        }
      }
    }
  }, [SignInCheckData]);

  const onbuttonClick = (id) => {
    setfilterselect(`&&filtertype=${id}`);

    dispatch(feedActions.fetchFeedData(`?filtertype=${id}&startlimit=0`));

    if (id === "ask") {
      setfilterbuttonselect1(!isfilterbuttonselect1);
      setfilterbuttonselect2(false);
      setfilterbuttonselect3(false);
      setfilterbuttonselect4(false);
    } else if (id === "say") {
      setfilterbuttonselect2(!isfilterbuttonselect2);
      setfilterbuttonselect1(false);
      setfilterbuttonselect3(false);
      setfilterbuttonselect4(false);
    } else if (id === "update") {
      setfilterbuttonselect3(!isfilterbuttonselect3);
      setfilterbuttonselect1(false);
      setfilterbuttonselect2(false);
      setfilterbuttonselect4(false);
    } else {
      setfilterbuttonselect4(!isfilterbuttonselect4);
      setfilterbuttonselect1(false);
      setfilterbuttonselect2(false);
      setfilterbuttonselect3(false);
    }
    setaskortagselect(id);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.content}>
      <Feed />
      <div className={styles.container}>
        <div className={styles.rect}>
          {isaskortagselect === "ask" || isaskortagselect === "hashtag" ? (
            <Paper square className={styles.paperbgcolor}>
              <Tabs
                value={value}
                TabIndicatorProps={{ style: { background: "#4795DE" } }}
                textColor="primary"
                onChange={handleChange}
                variant="fullWidth"
                className={styles.tabsWrapper}
              >
                <Tab label="All" className={styles.tab} id="allTab" />

                <Tab label="Following" className={styles.tab} id="followTab" />
              </Tabs>
            </Paper>
          ) : (
            ""
          )}
          {isLoaded ? (
            feedData && Object.keys(feedData).length !== 0 ? (
              feedData.breadCountLength > 0 ? (
                <FeedPost
                  listdata={feedData.feed}
                  data={feedData}
                  value={value}
                  filtertype={isfilterselect}
                />
              ) : (
                <div className={styles.nodata}>
                  <img src={NoDataFound} alt="NoDataFound" />
                  <p>No Data to Show</p>
                </div>
              )
            ) : (
              <div className={styles.nodata}>
                <img src={NoDataFound} alt="NoDataFound" width="200" />
                <p>No Data Found</p>
              </div>
            )
          ) : (
            <CircularProgress className={styles.loader} />
          )}
        </div>

        <div className={styles.roundcontentandroundborder}>
          <div className={styles.roundcontent}>
            <div className={styles.asksayNav}>
              <ul>
                <li className={styles.ask}>
                  <a
                    onClick={() => onbuttonClick("ask")}
                    id="ask"
                    className={` ${
                      isfilterbuttonselect1 ? styles.askbuttonimage : ""
                    }`}
                  >
                    {" "}
                    <span>Ask</span>{" "}
                  </a>
                </li>
                <li className={styles.say}>
                  <a
                    onClick={() => onbuttonClick("say")}
                    id="say"
                    className={`${
                      isfilterbuttonselect2 ? styles.saybuttonimage : ""
                    }`}
                  >
                    {" "}
                    <span>Say</span>{" "}
                  </a>
                </li>
                <li className={styles.update}>
                  <a
                    onClick={() => onbuttonClick("update")}
                    id="update"
                    className={`${
                      isfilterbuttonselect3 ? styles.updatebuttonimage : ""
                    }`}
                  >
                    {" "}
                    <span>Update</span>{" "}
                  </a>
                </li>
                <li className={styles.tag}>
                  <a
                    onClick={() => onbuttonClick("hashtag")}
                    id="hashtag"
                    className={`${
                      isfilterbuttonselect4 ? styles.tagbuttonimage : ""
                    }`}
                  >
                    {" "}
                    <span>Tag</span>{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.roundborder}></div>
        </div>
      </div>
    </div>
  );
}

export default MiddleContent;
