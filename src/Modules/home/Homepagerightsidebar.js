import React, { useState, useEffect } from "react";
import style from "../../Assets/css/home/Homepagerightsidebar.module.css";
// import ContributorImage from "../assests/Images/ContributorImage.png"
import Profile from "../../Assets/images/ProfileImageIcon.png";
import contributerstick from "../../Assets/images/contributerstick.svg";

import {
  Avatar,
  Button,
  CircularProgress,
  StylesProvider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import { useDispatch, useSelector } from "react-redux";
import UpdateTagPostDataModal from "../Reusuablecomponents/UpdateTagPostDataModal";
import CarouselDemo from "./CarouselDemo";
import * as TagActions from "../../store/actions/TrendingTags/TagActions";
import * as TagDisplay from "../../store/actions/TrendingTags/TagDisplay";
import axios from "axios";
import * as Cookies from "js-cookie";

function HomeSide() {
  const contibutorsData = useSelector(
    (state) => state.feedReducer.contibutorsData
  );
  const isLoaded = useSelector((state) => state.feedReducer.isLoaded);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.SignInReducer.userDetails);
  const [modalShow, setModalShow] = React.useState(false);
  const [isModalType, setModalType] = React.useState(null);
  const [trendingList, setTrendingList] = React.useState([]);
  const [istrendingAsks, setTrendingAsks] = React.useState([]);

  useEffect(() => {
    setTimeout(() => {
      axios
        .request({
          url: `http://dev.skopic.com:9090/skopicportal/jsonmessage/trending-items?task=tags`,
          method: "post",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Set-Cookie": Cookies.get("JSESSIONID"),
          },
          withCredentials: true,
        })
        .then((res) => {
          setTrendingList(res.data.trendingTags);
        });
      axios
        .request({
          url: `http://dev.skopic.com:9090/skopicportal/jsonmessage/trending-items?task=`,
          method: "post",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Set-Cookie": Cookies.get("JSESSIONID"),
          },
          withCredentials: true,
        })
        .then((res) => {
          setTrendingAsks(res.data.trendingAsks);
        });
    }, 500);
  }, []);

  const onUpdateSelection = (modalType) => {
    setModalShow(true);
    setModalType(modalType);
  };

  const onModalSelect = () => {
    setModalShow(false);
  };

  const moreTrendingTags = () => {
    dispatch(TagActions.fetchTagData());
  };
  const TagDetail = (tagValue) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        "Set-Cookie": Cookies.get("JSESSIONID"),
      },
      withCredentials: true,
    };
    const Data = new FormData();
    Data.append("id", tagValue);
    Data.append("in_pop_columns", "all");
    Data.append("in_limit", "0");
    dispatch(TagDisplay.fecthDisplayData(tagValue));
    axios
      .post(
        `http://dev.skopic.com:9090/skopicportal/jsonuser/childSays.html`,

        Data
      )
      .then((res) => {
        console.log(res.data);
      });
    console.log(tagValue);
  };

  var profileImagePath = "http://dev.skopic.com:9090/skopicimage";

  return (
    <React.Fragment>
      <div className={style.rightSidebar}>
        <span className={style.contributertick}>
          <img src={contributerstick} alt="tick" />
          Contributors
        </span>

        <div>
          <CarouselDemo />
        </div>

        {/* <div id="demo" className={`carousel slide ${style.Contributers}`} data-ride="carousel" data-interval="false">

                    <div className="container carousel-inner">
                        <div className="carousel-item active">
                            {
                                (isLoaded)
                                    ?
                                    (contibutorsData && Object.keys(contibutorsData).length !== 0)
                                        ?
                                        contibutorsData.contribut.slice(0,6).map((result) => (
                                            <div className={`row ${style.avatarrow}`}>
                                                <Avatar className={style.contributersavatar} src={`${profileImagePath}${result.uImage}`}></Avatar>
                                            </div>
                                        ))
                                        :
                                        <div>
                                            <p>There is no Contributors</p>

                                            <div className={`row ${style.avatarrow}`}>
                                                <Avatar alt="Contibutors" src={`${profileImagePath}`} />
                                                <Avatar alt="Contibutors" src={`${profileImagePath}`} />
                                                <Avatar alt="Contibutors" src={`${profileImagePath}`} />

                                            </div>
                                            <div className={`row ${style.avatarrow}`}>
                                                <Avatar alt="Contibutors" src={`${profileImagePath}`} />
                                                <Avatar alt="Contibutors" src={`${profileImagePath}`} />
                                                <Avatar alt="Contibutors" src={`${profileImagePath}`} />

                                            </div>

                                        </div>
                                    :
                                    <CircularProgress />

                            }

                        </div>





                    </div>

                    <a className={`carousel-control-prev`} href="#demo" role="button" data-slide="prev">
                        <ArrowBackIosOutlinedIcon className={style.Arrow} />
                    </a>
                    <a className={`carousel-control-next`} href="#demo" data-slide="next">
                        <ArrowForwardIosOutlinedIcon className={style.Arrow} />
                    </a>
                </div> */}

        <div
          className={style.ShareUpdate}
          onClick={() => onUpdateSelection("UPDATE")}
        >
          <h5 className={`h17 bold dark-gray`}>Share UPDATE</h5>

          <a className={style.shareupdatelink}>
            <ArrowRightAltOutlinedIcon />
          </a>
        </div>

        <UpdateTagPostDataModal
          show={modalShow}
          onHide={() => onModalSelect()}
          modalShow={modalShow}
          setModalShow={setModalShow}
          isModalType={isModalType}
        />

        <div
          className={style.CreateTag}
          onClick={() => onUpdateSelection("TAG")}
        >
          <h5 className={`h17 bold dark-gray`}>Create TAG</h5>
          <a to="/" className={style.shareupdatelink}>
            <ArrowRightAltOutlinedIcon />
          </a>
        </div>
        <div className={style.Trending}>
          <h2>See what is trending</h2>
          <div className={style.tagSection}>
            <h6>TAGs</h6>
            {trendingList && Object.keys(trendingList).length !== 0 ? (
              <div>
                {trendingList.map((trendinglist, i) => (
                  <p
                    onClick={() => TagDetail(trendinglist.id)}
                    key={trendinglist.id}
                  >
                    {" "}
                    {trendinglist.hash_tag_name}{" "}
                  </p>
                ))}
                <a className={style.Seemore} onClick={moreTrendingTags}>
                  See All{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6.093"
                    height="9.64"
                    viewBox="0 0 6.093 9.64"
                  >
                    <g
                      id="Group_2347"
                      data-name="Group 2347"
                      transform="translate(1.273 8.367) rotate(-90)"
                    >
                      <line
                        id="Line_43"
                        data-name="Line 43"
                        x2="3.547"
                        y2="3.547"
                        fill="none"
                        stroke="#373334"
                        stroke-linecap="round"
                        stroke-width="1.8"
                      />
                      <line
                        id="Line_44"
                        data-name="Line 44"
                        x1="3.547"
                        y2="3.547"
                        transform="translate(3.547)"
                        fill="none"
                        stroke="#373334"
                        stroke-linecap="round"
                        stroke-width="1.8"
                      />
                    </g>
                  </svg>
                </a>
              </div>
            ) : (
              <p className={style.message}>NO Tags are Trending</p>
            )}
          </div>

          <div className={style.asksection}>
            <h6>ASKs</h6>
            {istrendingAsks && Object.keys(istrendingAsks).length !== 0 ? (
              istrendingAsks.map((trendinglist) => (
                <>
                  <ul className={style.asks}>
                    <li>
                      <div className={style.askprofile}>
                        <Avatar
                          variant="square"
                          src={trendinglist.uimage}
                          className={style.askavatar}
                        />
                        <div className={style.askprofilecontnet}>
                          <p>{trendinglist.displayName}</p>
                          <p>{trendinglist.Message}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </>
              ))
            ) : (
              <p>No Data</p>
            )}
            <a className={style.Seemore}>
              See All{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6.093"
                height="9.64"
                viewBox="0 0 6.093 9.64"
              >
                <g
                  id="Group_2347"
                  data-name="Group 2347"
                  transform="translate(1.273 8.367) rotate(-90)"
                >
                  <line
                    id="Line_43"
                    data-name="Line 43"
                    x2="3.547"
                    y2="3.547"
                    fill="none"
                    stroke="#373334"
                    stroke-linecap="round"
                    stroke-width="1.8"
                  />
                  <line
                    id="Line_44"
                    data-name="Line 44"
                    x1="3.547"
                    y2="3.547"
                    transform="translate(3.547)"
                    fill="none"
                    stroke="#373334"
                    stroke-linecap="round"
                    stroke-width="1.8"
                  />
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomeSide;
