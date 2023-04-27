import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useSelector, useDispatch } from "react-redux";
import ModeratorLocationIcon from "../../../Assets/images/moderatorLocationIcon.svg";
import EditPhotoDropdown from "../../../Assets/images/EditPhotoDropdown.svg";
import Edit from "../../../Assets/images/edit.svg";
import Delete from "../../../Assets/images/Delete.svg";
import CloseButton from "../../../Assets/images/CloseButton.svg";
import Add from "../../../Assets/images/Add.svg";
import Deletephoto from "../../../Assets/images/Add.png";

import "../../../Assets/css/Moderator/ModeratorHeader.css";
import * as moderatorActions from "../../../store/actions/Moderator/moderatoractions";

import { Button, Modal } from "react-bootstrap";

import "primeflex/primeflex.css";
import ModeratorDescriptionValidation from "./ModeratorDescriptionValidation";
import ModeratorAlert from "../ReusableModeratorComponents/ModeratorAlert";
import { Checkbox, CircularProgress, ImageList } from "@mui/material";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p
      className={`${"photoDescriptionArea"} ${
        text && text !== "" ? "textColor" : null
      }`}
    >
      {text && text !== "" ? (
        isReadMore ? (
          text.slice(0, 102)
        ) : (
          text
        )
      ) : (
        <span className="initial-Description">Add description…</span>
      )}
      {text && text.length > 120 ? (
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...See More" : "Show Less"}
        </span>
      ) : null}
    </p>
  );
};

export const PhotoInfo = ({
  isOverPhotoCount,
  setCheckedImage,
  isImageChecked,
  setTenantID,
  isUpdateText,
  setPhotoDescription,
}) => {
  const timeLineImagesList = useSelector(
    (state) => state.EditCommunityReducer.timeLineImagesList
  );
  const imageServerURL = "http://dev.skopic.com:9090/skopicimage/";

  const [isDescriptionText, setDescriptionText] = useState("");
  const [setLocationSelect, isLocationSelect] = React.useState("");
  const [isLat, setLat] = React.useState("");
  const [isLng, setLng] = React.useState("");

  useEffect(() => {
    if (isDescriptionText) {
      setPhotoDescription(isDescriptionText);
    }
  }, [isDescriptionText]);

  const onCheckboxChecked = (event, imageId, tenantId) => {
    // console.log(imageId,"+++",tenantId)
    if (event.target.checked) {
      setCheckedImage([...isImageChecked, imageId]);
    } else {
      setCheckedImage((prev) =>
        prev.filter((curritem) => curritem !== imageId)
      );
    }
    setTenantID(tenantId);
  };

  return (
    <React.Fragment>
      {
        timeLineImagesList && Object.keys(timeLineImagesList).length !== 0 ? (
          timeLineImagesList.imagesDetails.map((ImagesList) => (
            <div className="Phototimeline">
              <Card className="Phototimelinecard">
                <CardMedia
                  component="img"
                  height="140"
                  image={`${imageServerURL}${ImagesList.timelineLogo}`}
                  alt="UserFollowingCommunity"
                  className="CommunityIcon"
                />

                {isOverPhotoCount ? (
                  <Checkbox
                    className="checked-delete-photo"
                    onChange={(event) =>
                      onCheckboxChecked(
                        event,
                        ImagesList.imageId,
                        ImagesList.tenantId
                      )
                    }
                  />
                ) : (
                  <>
                    <span className="editPhotoDropDown">
                      <img src={EditPhotoDropdown} />
                    </span>

                    <div className="PhotoEditDeleteOptions">
                      <li>
                        <img src={Edit} />
                        Edit photo
                      </li>
                      <li>
                        <img src={Delete} />
                        Delete Photo
                      </li>
                    </div>
                  </>
                )}
              </Card>
              {/* <div className="PhotoEditDeleteOptions">
                                        <li>
                                            <img src={Edit}/>
                                            Edit photo
                                        </li>
                                        <li>
                                        <img src={Delete}/>
                                            Delete Photo
                                        </li>
                                </div> */}
              {isOverPhotoCount ? (
                <ModeratorDescriptionValidation
                  desc={ImagesList.tmlPhotoDesc}
                  setDescriptionText={setDescriptionText}
                  index={ImagesList.imageId}
                  isLocationSelect={isLocationSelect}
                  setLng={setLng}
                  setLat={setLat}
                />
              ) : (
                // <textarea className="photoDescriptionArea" placeholder="Add description…" value={ImagesList.tmlPhotoDesc} />
                <>
                  <ReadMore>{ImagesList.tmlPhotoDesc}</ReadMore>

                  <div className="LocationandCountDisplay">
                    <span>
                      <img src={ModeratorLocationIcon} />
                      {ImagesList.locName}
                    </span>
                    <span>
                      <label>{ImagesList.tmlPhotoDesc.length}/200</label>
                    </span>
                  </div>
                </>
              )}
              {isOverPhotoCount ? (
                ImagesList.tmlPhotoDesc.length !== 0 ? (
                  <p>{isUpdateText}</p>
                ) : null
              ) : (
                <></>
              )}
            </div>
          ))
        ) : (
          <p>No Data</p>
        )
        // <CircularProgress />
      }
    </React.Fragment>
  );
};

// const AddPhotoText = (props) => {

//     return (
//         <span className="AddPhotoLink">
//             <img src={Add} />
//             {/* Add Photo */}
//             <label for="AddPhoto" className='AddPhotoLabel'>Add Photo</label>
//             <input id="AddPhoto" className='AddPhotoInput' type="file" onChange={props.onPhotoUpload} multiple></input>
//         </span>
//     )
// }

const Phototimeline = () => {
  const moderatorTenantList = useSelector(
    (state) => state.EditCommunityReducer.moderatorTenantList
  );
  const userDetails = useSelector((state) => state.SignInReducer.userDetails);

  const [isPhotoUpload, setPhotoUpload] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [isModeratorTenantListId, setModeratorTenantListId] = useState(false);
  const [isTenantID, setTenantID] = useState();

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (moderatorTenantList && Object.keys(moderatorTenantList).length !== 0) {
      moderatorTenantList.tenantList.map(
        (tenantlist) =>
          parseInt(tenantlist.id) === userDetails.userData.tenantId
            ? // console.log(userDetails.userData.tenantName)
              tenantlist.count > 14
              ? setModeratorTenantListId(true)
              : setModeratorTenantListId(false)
            : null
        // console.log(tenantlist.id)
        // if (tenantlist.id === userDetails.userData.tenantId) {
        // setModeratorTenantListId(isModeratorTenantListId => [...isModeratorTenantListId, tenantlist])
        // }
      );
    }

    if (userDetails && Object.keys(userDetails).length !== 0) {
      setTenantID(userDetails.userData.tenantId);
    }
  }, [moderatorTenantList]);

  // useEffect(() => {
  //     if (isModeratorTenantListId && Object.keys(isModeratorTenantListId).length !== 0 && userDetails && Object.keys(userDetails).length !== 0) {
  //         isModeratorTenantListId.forEach(function (id) {
  //             if (parseInt(id) === userDetails.userData.tenantId) {
  //                 console.log(userDetails.userData.tenantName)
  //                 // if()
  //             }

  //         })

  //     }
  // })

  const onModalSelect = () => {
    setModalShow(false);
  };

  const onPhotoUploadSelect = () => {
    if (isModeratorTenantListId) {
      setOpen(true);
    }
  };

  const onPhotoUpload = (e) => {
    setPhotoUpload(URL.createObjectURL(e.target.files[0]));
    setModalShow(true);
    // console.log(URL.createObjectURL(e.target.files[0]))
  };

  return (
    <React.Fragment>
      <div className="AddPhoto">
        <span>
          *You may add up to 14 photos not exceeding, 50 MB in total and 5 MB
          per piece
        </span>
        {/* <AddPhotoText onPhotoUpload={onPhotoUpload} /> */}
        <span className="AddPhotoLink">
          <img src={Add} />
          {/* Add Photo */}
          <label for="AddPhoto" className="AddPhotoLabel">
            Add Photo
          </label>
          {isModeratorTenantListId ? (
            <input
              id="AddPhoto"
              className="AddPhotoInput"
              type="text"
              onClick={onPhotoUploadSelect}
            ></input>
          ) : (
            <input
              id="AddPhoto"
              className="AddPhotoInput"
              type="file"
              onChange={onPhotoUpload}
            ></input>
          )}
        </span>
        <AddPhotoModal
          show={modalShow}
          onHide={() => onModalSelect()}
          modalShow={modalShow}
          setModalShow={setModalShow}
          isPhotoUpload={isPhotoUpload}
        />
      </div>
      <div className="photoGrid">
        <PhotoInfo />
      </div>
      <ModeratorAlert open={open} setOpen={setOpen} isTenantID={isTenantID} />
    </React.Fragment>
  );
};

export default Phototimeline;

function AddPhotoModal(props) {
  const userDetails = useSelector((state) => state.SignInReducer.userDetails);

  const dispatch = useDispatch();
  const [isFile, setFile] = useState([]);
  const [isSingleFile, setisSingleFile] = useState(true);
  const [isOverCountLimit, setOverCountLimit] = useState(false);
  const [isDescriptionText, setDescriptionText] = useState("");
  const [setLocationSelect, isLocationSelect] = React.useState(null);
  const [isLat, setLat] = React.useState(null);
  const [isLng, setLng] = React.useState(null);

  useEffect(() => {
    if (!props.modalShow) {
      setFile([]);
    }
  }, [props.modalShow]);

  useEffect(() => {
    let singleFile = [];
    if (props.isPhotoUpload) {
      singleFile.push(props.isPhotoUpload);
      setFile([...isFile, singleFile]);
      setisSingleFile(true);
    }
  }, [props.isPhotoUpload]);

  let fileObj = [];
  let fileArray = [];
  const uploadMultipleFiles = (e) => {
    fileObj.push(e.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    setFile([...isFile, fileArray]);
    setisSingleFile(false);
    // this.setState({ file: this.fileArray })
  };
  const uploadFiles = (e) => {
    e.preventDefault();
    console.log(isFile);
  };

  const onPhotoRemove = (index) => {
    let multiphotoremove = `multiphoto${index}`;
    document.getElementById(multiphotoremove).style.display = "none";
  };

  let imgPreview;

  const onPhotoUploadSubmit = (e) => {
    e.preventDefault();
    if (userDetails && Object.keys(userDetails).length !== 0) {
      for (let i = 0; i < isFile.length; i++) {
        dispatch(
          moderatorActions.uploadPhototoPhototimeline(
            `tenantId=${userDetails.userData.tenantId}&&img="${isFile[i]}"&&tmlPhotoDesc=${isDescriptionText}&&locName=""`
          )
        );
        // console.log(`tenantId=${userDetails.userData.tenantId}&&img=${isFile[i][0]}&&tmlPhotoDesc=${isDescriptionText}&&locName=${setLocationSelect}`)
      }
    }
    // for(let uploadPhoto=0;)
  };

  if (props.isPhotoUpload) {
    imgPreview = (
      <img
        src={props.isPhotoUpload}
        alt="uploadedphoto"
        className="single-multi-phototimelineimage"
      />
    );
  }

  return (
    <React.Fragment>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // className='Phototimeline-modal'
      >
        <div
          className={` ${
            isSingleFile ? "Phototimeline-modal" : "Advanced-phototimelinewidth"
          }`}
        >
          <Modal.Header
            closeButton
            // className={classes.heading}
          >
            <span className="post-phototimeline-heading">
              Post Photo to Timeline
            </span>
          </Modal.Header>

          <Modal.Body className="Phototimeline-modal-body">
            <div>
              {isSingleFile ? (
                <div>
                  <div className="photo-preview">{imgPreview}</div>
                  <div>
                    {/* <InputTextarea placeholder="Add a description" className='photo-preview-description' /> */}
                    <ModeratorDescriptionValidation
                      setOverCountLimit={setOverCountLimit}
                      postbutton="postbutton"
                      setDescriptionText={setDescriptionText}
                      isLocationSelect={isLocationSelect}
                      setLat={setLat}
                      setLng={setLng}
                    />
                    {/* <div className='phototimeline-location-tag'>
                                                <LocationTag />
                                                <div><label>0/200</label></div>
                                            </div> */}
                    <span
                      className="Delete-Photo-icon"
                      onClick={() => onPhotoRemove()}
                    >
                      <img src={CloseButton} alt="remove" />
                    </span>
                  </div>
                </div>
              ) : (
                <div className="multifile-upload">
                  {(isFile || []).map((url, index) => (
                    <div className="multiphoto-main" id={`multiphoto${index}`}>
                      <div className="multiphoto-preview">
                        <img
                          src={url}
                          alt="..."
                          className="single-multi-phototimelineimage"
                        />
                      </div>
                      <div>
                        <ModeratorDescriptionValidation
                          index={index}
                          setOverCountLimit={setOverCountLimit}
                          postbutton="postbutton"
                          setDescriptionText={setDescriptionText}
                          isLocationSelect={isLocationSelect}
                          setLat={setLat}
                          setLng={setLng}
                        />
                        {/* <InputTextarea placeholder="Add a description" className='photo-preview-description multi-photopreviewdescription' /> */}

                        <span
                          className="multiphoto-delete"
                          onClick={() => onPhotoRemove(index)}
                        >
                          <img src={Deletephoto} alt="remove" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* <AddPhotoText onPhotoUpload={uploadMultipleFiles} /> */}
            <span className="AddPhotoLink Multiphoto-addlink">
              <img src={Add} />
              {/* Add Photo */}
              <label for="AddMultiplePhoto" className="AddPhotoLabel">
                Add Photo
              </label>
              <input
                id="AddMultiplePhoto"
                className="AddPhotoInput"
                type="file"
                onChange={uploadMultipleFiles}
                multiple
              ></input>
            </span>
            <Button onClick={(e) => onPhotoUploadSubmit(e)} id="postbutton">
              Post
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </React.Fragment>
  );
}
