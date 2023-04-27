import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./StartCommunities.css";
// import { useSelector,useDispatch } from "react-redux";
//  import * as CommunityActions from "../../../../store/actions/StartCommunity/StartCommunity"
import PolygonMap from "../../../Moderator/EditCommunity/Polygon";
import CommunityImage from "../../../../Assets/images/ComImage.svg";
import MapIcon from "../../../../Assets/images/MapIcon.svg";
import Camera from "../../../../Assets/images/camera.svg";
import axios from "axios";
import * as Cookies from "js-cookie";
import { Dialog, Button } from "@mui/material";

const useStyles = makeStyles({
        paperWidthSm: {
                width: 650,
                overflow: "hidden",
                maxWidth: "none",
        },
});

function StartCommunities(props) {
        const classes = useStyles();
        const [communityData, setcommunityData] = useState({});

        useEffect(() => {
                axios
                        .request({
                                url: `http://dev.skopic.com:9090/skopicportal/jsonuser/community.html`,
                                method: "Get",
                                headers: {
                                        "Access-Control-Allow-Origin": "*",
                                        "Set-Cookie": Cookies.get("JSESSIONID"),
                                },
                                withCredentials: true,
                        })
                        .then((res) => {
                                console.log(res.data);
                                setcommunityData(res.data);
                        });
        }, []);

        const [open, setOpen] = useState(false);
        const [isOpen, setIsOpen] = React.useState(false);
        const [closeW, setCloseW] = useState(false);
        const [errorMsg, setErrorMsg] = useState(false);
        const [name, setName] = useState("");
        const [description, setDescription] = useState("");
        const [tenantAddress, setTenantAddress] = useState("");
        const [tenantCity, setTenantCity] = useState("");
        const [tenantZipcode, setTenantZipcode] = useState("");
        const [tenantLat, setTenantLat] = useState("");
        const [tenantLng, setTenantLng] = useState("");
        const [countryList, setCountryList] = useState([]);
        const [statesList, setStateList] = useState([]);
        const [communityType, setCommunityType] = useState("");
        const [tenantCountry, setTenantCountry] = useState("");
        const [tenantState, settenantState] = useState("");
        const [emailID, setEmailID] = useState("");
        const [firstname, setFirstname] = useState("");
        const [lastname, setLastname] = useState("");
        const [phonenum, setPhonenum] = useState("");
        const [city, setCity] = useState("");
        const [address, setAddress] = useState("");
        const [zipcode, setZipcode] = useState("");
        const [country, setCountry] = useState("");
        const [state, setState] = useState("");
        const [logo, setLogo] = useState("");
        const [responseData, setResponseData] = useState({})

        useEffect(() => {
                setEmailID(communityData?.user?.email);
                setFirstname(communityData?.user?.firstName);
                setLastname(communityData?.user?.lastName);
                setPhonenum(communityData?.user?.phone);
                setPhonenum(communityData?.user?.phone);
                setAddress(communityData?.user?.address);
                setCity(communityData?.user?.address2);
                setZipcode(communityData?.user?.zipcode);
                setCountry(communityData?.user?.countryId);
                setState(communityData?.user?.stateId);
        }, [communityData?.user]);


        useEffect(() => {
                axios
                        .request({
                                url: `http://dev.skopic.com:9090/skopicportal/jsonuser/tenant-list`,
                                method: "Get",
                                headers: {
                                        "Access-Control-Allow-Origin": "*",
                                        "Set-Cookie": Cookies.get("JSESSIONID"),
                                },
                                withCredentials: true,
                        })
                        .then((res) => {
                                let countryArray = [];
                                if (res && Object.keys(res.data.statesList).length !== 0) {
                                        setResponseData(res.data.statesList)
                                        Object.keys(res.data.statesList).map((country) => {
                                                countryArray.push(country);

                                        });
                                        countryArray.unshift('Select');
                                        setCountryList(countryArray);

                                }
                        });
        }, []);

        //   example of state code written ends here

        const getLatLng = (data) => {
                if (Object.keys(data).length) {
                        console.log('hello');
                        setTenantLat(data.lat.toString());
                        setTenantLng(data.lng.toString());

                }
        };

        const OpenModalHandler = () => {
                let value = 1;
                if (!name || !description || !tenantAddress || !tenantCity || !tenantZipcode) {
                        setErrorMsg(true);
                } else {
                        setErrorMsg(false);
                        value = 0;
                }
                if (value === 0) {
                        setOpen(true);
                        setCloseW(true);
                }
        };

        const mapCommunity = () => {
                setIsOpen(true);
        };

        const handleClose = () => {
                setIsOpen(false);
        };

        let className = "Second";
        if (open) {
                className = "Second--active";
        }

        let block = "StartCommunity-Container";
        if (closeW) {
                block = "StartCommunity-ContainerNone";
        }

        const startCommunity = () => {
                let data = new FormData();
                data.append("modirate", "Y");
                data.append("communityView", "view");
                data.append("name", name);
                data.append("description", description);
                data.append("tenantAddress", tenantAddress);
                data.append("tenantCity", tenantCity);
                data.append("tenantZipcode", tenantZipcode);
                data.append("communityType", communityType);
                data.append("tenantLatitude", tenantLat);
                data.append("tenantLangitude", tenantLng);
                data.append("tenantCountry", tenantCountry);
                data.append("tenantState", tenantState);
                data.append("emailID", emailID);
                data.append("firstname", firstname);
                data.append("lastname", lastname);
                data.append("phonenum", phonenum);
                data.append("city", city);
                data.append("address", address);
                data.append("zipcode", zipcode);
                data.append("state", state);
                data.append("logo", "");
                axios
                        .request({
                                url: `http://dev.skopic.com:9090/skopicportal/index/newCommunity.html`,
                                method: "POST",
                                data: data,
                                headers: {
                                        "Access-Control-Allow-Origin": "*",
                                        "Set-Cookie": Cookies.get("JSESSIONID"),
                                },
                                withCredentials: true,
                        })
                        .then((res) => {
                                console.log(res.data);
                        });
        };

        const updateStateList = (evt) => {
                setStateList(responseData[evt.target.value]);
        }
        return (
                <>
                        {communityData && Object.keys(communityData).lenght !== 0 ? (
                                <>
                                        <div className="StartCommunity">
                                                <div className={block}>
                                                        <div className="StartCommunity-Header">
                                                                <p>Start Community</p>
                                                                <button
                                                                        className="StartCommunity-Header--Close"
                                                                        onClick={props.close}
                                                                >
                                                                        x
                                                                </button>
                                                        </div>
                                                        <div className="StartCommunity-Body">
                                                                <div className="StartCommunity-Body--Intialinfo">
                                                                        <div className="StartCommunity-Body--CommunityImage">
                                                                                <p>Community Picture:</p>
                                                                                <div className="StartCommunity-CommunityImage">
                                                                                        <img src={CommunityImage} alt="Community-Image" />
                                                                                        <button className="Camera-Icon">
                                                                                                <img src={Camera} alt="Camera" />
                                                                                        </button>
                                                                                </div>
                                                                        </div>
                                                                        <div className="StartCommunity-Body--CommunityType">
                                                                                <p>
                                                                                        Community Type:{" "}
                                                                                        <span className="indicatorImportant">*</span>
                                                                                </p>
                                                                                <div className="StartCommunity-CommunityOptions">
                                                                                        <div>
                                                                                                <input
                                                                                                        type="radio"
                                                                                                        name="communityType"
                                                                                                        value="public"
                                                                                                        checked="checked"
                                                                                                        onChange={(e) => setCommunityType(e.target.value)}
                                                                                                />
                                                                                                Public <span>Community accessible to all members</span>
                                                                                        </div>
                                                                                        <div>
                                                                                                <input
                                                                                                        type="radio"
                                                                                                        name="communityType"
                                                                                                        value="private"
                                                                                                        onChange={(e) => setCommunityType(e.target.value)}
                                                                                                />
                                                                                                Private{" "}
                                                                                                <span>
                                                                                                        Members join Community by invitation or by request
                                                                                                </span>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                                <div className="StartCommunity-Body--CommunityForm">
                                                                        <div className="EditInputfeild">
                                                                                <label className="EditName">
                                                                                        Community Name:
                                                                                        <span className="indicatorImportant">*</span>
                                                                                </label>
                                                                                <input
                                                                                        type="text"
                                                                                        value={name}
                                                                                        onChange={(e) => setName(e.target.value)}
                                                                                />
                                                                                {errorMsg ? (
                                                                                        <p id="name" className="StartCommunityErrorMsg">
                                                                                                Please enter this field.
                                                                                        </p>
                                                                                ) : null}
                                                                        </div>

                                                                        <label className="EditNameDesc">
                                                                                Description:<span className="indicatorImportant">*</span>
                                                                        </label>
                                                                        <textarea
                                                                                className="EditTextfeild"
                                                                                value={description}
                                                                                onChange={(e) => setDescription(e.target.value)}
                                                                        ></textarea>
                                                                        {errorMsg ? (
                                                                                <p id="" className="StartCommunityErrorMsg">
                                                                                        Please enter this field.
                                                                                </p>
                                                                        ) : null}

                                                                        <div className="EditInputfeild">
                                                                                <label className="EditName">
                                                                                        Country :<span className="indicatorImportant">*</span>
                                                                                </label>
                                                                                <select className="EditSelectFeild" onChange={updateStateList}>
                                                                                        <>
                                                                                                {countryList.map((item) => (
                                                                                                        <option key={item} value={item}>
                                                                                                                {item}
                                                                                                        </option>
                                                                                                ))}
                                                                                        </>
                                                                                </select>
                                                                                {errorMsg ? (
                                                                                        <p id="" className="StartCommunityErrorMsg">
                                                                                                Please enter this field.
                                                                                        </p>
                                                                                ) : null}
                                                                        </div>

                                                                        <div className="EditInputSubfeild">
                                                                                <label className="EditName">
                                                                                        Address:<span className="indicatorImportant">*</span>
                                                                                </label>
                                                                                <input
                                                                                        type="text"
                                                                                        value={tenantAddress}
                                                                                        onChange={(e) => setTenantAddress(e.target.value)}
                                                                                />
                                                                                {errorMsg ? (
                                                                                        <p id="" className="StartCommunityErrorMsg">
                                                                                                Please enter this field.
                                                                                        </p>
                                                                                ) : null}
                                                                        </div>

                                                                        <div className="EditInputSubfeild">
                                                                                <label className="EditName">
                                                                                        City:<span className="indicatorImportant">*</span>
                                                                                </label>
                                                                                <input
                                                                                        type="text"
                                                                                        value={tenantCity}
                                                                                        onChange={(e) => setTenantCity(e.target.value)}
                                                                                />
                                                                                {errorMsg ? (
                                                                                        <p id="" className="StartCommunityErrorMsg">
                                                                                                Please enter this field.
                                                                                        </p>
                                                                                ) : null}
                                                                        </div>

                                                                        <div className="EditInputSubfeild">
                                                                                <label className="EditName">
                                                                                        State :<span className="indicatorImportant">*</span>
                                                                                </label>
                                                                                <select className="EditSelectFeild">
                                                                                        <>
                                                                                                <option>Select</option>
                                                                                                {statesList && statesList.map((item) => (
                                                                                                        <option
                                                                                                                key={item}
                                                                                                                value={item}
                                                                                                        >
                                                                                                                {item}
                                                                                                        </option>

                                                                                                ))}

                                                                                        </>
                                                                                </select>
                                                                                {errorMsg ? (
                                                                                        <p id="" className="StartCommunityErrorMsg">
                                                                                                Please enter this field.
                                                                                        </p>
                                                                                ) : null}
                                                                        </div>

                                                                        <div className="EditInputSubfeild">
                                                                                <label className="EditName">
                                                                                        Zip Code:<span className="indicatorImportant">*</span>
                                                                                </label>
                                                                                <input
                                                                                        type="text"
                                                                                        value={tenantZipcode}
                                                                                        onChange={(e) => setTenantZipcode(e.target.value)}
                                                                                />
                                                                                 {errorMsg ? (
                                                                                <p id="" className="StartCommunityErrorMsg">
                                                                                        Please enter this field.
                                                                                </p>
                                                                        ) : null}
                                                                        </div>
                                                                </div>
                                                        </div>
                                                        <div className="StartCommunity-Footer">
                                                                <div>
                                                                        <button onClick={mapCommunity}>
                                                                                <img src={MapIcon} alt="Map-Icon" />
                                                                                Map Community
                                                                        </button>
                                                                        {errorMsg ? (
                                                                                <p id="" className="StartCommunityErrorMsg">
                                                                                        Please select map coordinates.
                                                                                </p>
                                                                        ) : null}
                                                                </div>
                                                                <div className="Submit">
                                                                        <Button variant="contained" onClick={OpenModalHandler}>
                                                                                Submit
                                                                        </Button>
                                                                        <span>1 of 2</span>
                                                                </div>
                                                                {isOpen ? (
                                                                        <Dialog
                                                                                open={isOpen}
                                                                                onClose={handleClose}
                                                                                classes={{ paperWidthSm: classes.paperWidthSm }}
                                                                        >
                                                                                <PolygonMap getLatLng={getLatLng} onMapClose={handleClose} type="add" />
                                                                        </Dialog>
                                                                ) : null}
                                                        </div>
                                                </div>
                                        </div>
                                        <div className={className}>
                                                <div className="StartCommunity">
                                                        <div className="StartCommunity-Container">
                                                                <div className="StartCommunity-Header">
                                                                        <p>Start Community</p>
                                                                        <button
                                                                                className="StartCommunity-Header--Close"
                                                                                onClick={props.close}
                                                                        >
                                                                                x
                                                                        </button>
                                                                </div>
                                                                <div className="StartCommunity-Body">
                                                                        <div className="StartCommunity-Body--Intialinfo">
                                                                                <p>
                                                                                        Email:<span className="indicatorImportant">*</span>{" "}
                                                                                        {communityData?.user?.email}{" "}
                                                                                </p>
                                                                                <p>
                                                                                        Display Name:<span className="indicatorImportant">*</span>{" "}
                                                                                        {communityData?.user?.displayName}
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                                <div className="StartCommunity-Body--PersonalForm">
                                                                        <div className="EditInputfeild">
                                                                                <label className="EditName">
                                                                                        First Name:<span className="indicatorImportant">*</span>
                                                                                </label>
                                                                                <input
                                                                                        type="text"
                                                                                        value={firstname}
                                                                                        onChange={(e) => setFirstname(e.target.value)}
                                                                                />
                                                                        </div>

                                                                        <div className="EditInputfeild">
                                                                                <label className="EditName">Last Name:</label>
                                                                                <input
                                                                                        type="text"
                                                                                        value={lastname}
                                                                                        onChange={(e) => setLastname(e.target.value)}
                                                                                />
                                                                        </div>
                                                                        <div className="EditInputfeild">
                                                                                <div>
                                                                                        <label className="EditName">
                                                                                                Phone :<span className="indicatorImportant">*</span>{" "}
                                                                                        </label>
                                                                                </div>
                                                                                <select className="EditSubSelectFeild">
                                                                                        <option value="1">+1</option>
                                                                                        <option value="2">+91</option>
                                                                                </select>
                                                                                <input
                                                                                        type="text"
                                                                                        className="PhoneTextFeild"
                                                                                        value={phonenum}
                                                                                        onChange={(e) => setPhonenum(e.target.value)}
                                                                                />
                                                                        </div>

                                                                        <div className="EditInputfeild">
                                                                                <label className="EditName">
                                                                                        Country :<span className="indicatorImportant">*</span>
                                                                                </label>
                                                                                <select className="EditSelectFeild">
                                                                                        <option value="Select">-Select-</option>
                                                                                        <option value="United States">United States</option>
                                                                                        <option value="India">India</option>
                                                                                        <option value="Germany">Germany</option>
                                                                                        <option value="Australia">Australia</option>
                                                                                        <option value="New Zealand">New Zealand</option>
                                                                                        <option value="Canada">Canada</option>
                                                                                        <option value="Iceland">Iceland</option>
                                                                                        <option value="Japan">Japan</option>
                                                                                        <option value="Malaysia">Malaysia</option>
                                                                                        <option value="Nepal">Nepal</option>
                                                                                        <option value="Sri Lanka">Sri Lanka</option>
                                                                                        <option value="United Arab Emirates">
                                                                                                United Arab Emirates
                                                                                        </option>
                                                                                        <option value="Hong Kong">Hong Kong</option>
                                                                                        <option value="Mexico">Mexico</option>
                                                                                        <option value="Indonesia">Indonesia</option>
                                                                                        <option value="Poland">Poland</option>
                                                                                        <option value="Kenya">Kenya</option>
                                                                                        <option value="Mongolia">Mongolia</option>
                                                                                        <option value="Scotland">Scotland</option>
                                                                                        <option value="Singapore">Singapore</option>
                                                                                </select>
                                                                        </div>

                                                                        <div className="EditInputSubfeild">
                                                                                <label className="EditName">
                                                                                        Address:<span className="indicatorImportant">*</span>
                                                                                </label>
                                                                                <input
                                                                                        type="text"
                                                                                        value={address}
                                                                                        onChange={(e) => setAddress(e.target.value)}
                                                                                />
                                                                        </div>

                                                                        <div className="EditInputSubfeild">
                                                                                <label className="EditName">
                                                                                        City:<span className="indicatorImportant">*</span>{" "}
                                                                                </label>
                                                                                <input
                                                                                        type="text"
                                                                                        value={city}
                                                                                        onChange={(e) => setAddress(e.target.value)}
                                                                                />
                                                                        </div>

                                                                        <div className="EditInputSubfeild">
                                                                                <label className="EditName">
                                                                                        State :<span className="indicatorImportant">*</span>
                                                                                </label>
                                                                                <select className="EditSelectFeild">
                                                                                        <option value="State">State</option>
                                                                                        <option value="1">1</option>
                                                                                        <option value="2">2</option>
                                                                                </select>
                                                                        </div>

                                                                        <div className="EditInputSubfeild">
                                                                                <label className="EditName">
                                                                                        Zip Code:<span className="indicatorImportant">*</span>
                                                                                </label>
                                                                                <input
                                                                                        type="text"
                                                                                        value={zipcode}
                                                                                        onChange={(e) => setZipcode(e.target.value)}
                                                                                />
                                                                        </div>
                                                                </div>
                                                                <div className="StartCommunity-Footer">
                                                                        <div className="CommunityGuidlines">
                                                                                <div>
                                                                                        <input type="checkbox" />{" "}
                                                                                        <span>
                                                                                                By starting a community, you are agreeing to Skopic
                                                                                                etiquette and User Guidelines
                                                                                                <span className="indicatorImportant">*</span>
                                                                                        </span>
                                                                                </div>
                                                                                <div>
                                                                                        <input type="checkbox" />{" "}
                                                                                        <span>
                                                                                                By accepting to be a Primary Moderator, you are agreeing
                                                                                                to Moderator Guidelines
                                                                                        </span>
                                                                                </div>
                                                                        </div>
                                                                        <div className="Submit">
                                                                                <Button variant="contained" onClick={startCommunity}>
                                                                                        Submit
                                                                                </Button>
                                                                                <span>2 of 2</span>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </>
                        ) : (
                                <>
                                        <div className="StartCommunity">
                                                <div className="StartCommunity-Container">
                                                        <div className="StartCommunity-Header">
                                                                <p>Start Community</p>
                                                                <button
                                                                        className="StartCommunity-Header--Close"
                                                                        onClick={props.close}
                                                                >
                                                                        x
                                                                </button>
                                                        </div>
                                                        <div className="StartCommunity-Body">Loading Data.....</div>
                                                </div>
                                        </div>
                                </>
                        )}
                </>
        );
}
export default StartCommunities;
