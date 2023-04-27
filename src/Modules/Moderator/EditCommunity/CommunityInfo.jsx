import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button as MuiButton, Box, Dialog } from "@mui/material";

import PolygonMap from "./Polygon";

import { styled } from "@mui/material/styles";
import MapIcon from "../../../Assets/images/MapIcon.svg"

const Button = styled(MuiButton)({
  paddingLeft: "25px",
  paddingRight: "25px",
  marginTop: "20px",
  marginBottom: "20px",
  alignSelf: "center",
});

const useStyles = makeStyles({
  paperWidthSm: {
    width: 650,
    overflow: "hidden",
    maxWidth: "none",
  },
});

const CommunityInfoInput = ({
  placeholdertext,
  labelText,
  styleClass,
  parentStyleClass,
  country_list,
  state_list,
  setState,
  value,
  ctryDropdwnVal,
  stDropdwnVal,
  allCountries,
}) => {
  const [newCountry, setNewCountry] = useState("");
  const [newstateList, setNewStateList] = useState([]);

  useEffect(() => {
    setNewStateList(state_list);
    setNewCountry(ctryDropdwnVal);
  }, [state_list]);

  const onValueChange = (e) => {
    setNewCountry(e.target.value);
    setNewStateList(allCountries[newCountry]);
    // console.log(newstateList)
  };

  return (
    <div
      className={`${parentStyleClass ? parentStyleClass : "communityInfo-input"
        }`}
    >
      <form>
        <p>
          {labelText}:<span>*</span>
        </p>
        {labelText === "Description" ? (
          <textarea
            placeholder={placeholdertext}
            className={styleClass}
            value={value}
          />
        ) : labelText === "Country" || labelText === "State" ? (
          <Dropdown
            className="country-dropdown"
            value={labelText === "Country" ? newCountry : stDropdwnVal}
            options={labelText === "Country" ? country_list : newstateList}
            onChange={onValueChange}
          />
        ) : (
          <input
            placeholder={placeholdertext}
            className={styleClass}
            value={value}
          />
        )}
      </form>
    </div>
  );
};
const CommunityInfo = (props) => {
  const classes = useStyles();
  const community_tenant_list = useSelector(
    (state) => state.EditCommunityReducer.communityTenantList?.tenantList
  );
  const tenant_list = useSelector(
    (state) => state.EditCommunityReducer.communityTenantList?.statesList
  );
  const [isCountry, setCountry] = React.useState([]);
  const [isState, setState] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [editCommunityItem, setEditCommunityItem] = useState({});

  useEffect(() => {
    const filtered = community_tenant_list.filter(
      (item) => item.id == props.tenantId
    )[0];
    setEditCommunityItem(filtered)
  }, [community_tenant_list, props.tenantId]);

  const {
    name,
    description,
    city,
    country,
    state,
    address1,
    zipcode,
  } = editCommunityItem;


  useEffect(() => {
    let countryArray = [];
    if (tenant_list && Object.keys(tenant_list).length !== 0) {
      Object.keys(tenant_list).map((country) => {
        countryArray.push(country);
      });
    }
    setCountry([...isCountry, ...countryArray]);
  }, [tenant_list]);

  useEffect(() => {
    if (tenant_list && Object.keys(tenant_list).length !== 0) {
      setState(tenant_list[country]);
    }
  }, [isCountry]);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const mapCommunity = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <CommunityInfoInput
            placeholdertext={"Enter Community Name"}
            labelText="Community Name"
            styleClass="communityNameInput"
            value={name}
          />
          <CommunityInfoInput
            placeholdertext={"Enter Description"}
            labelText="Description"
            styleClass="communityNameInput communityDescriptionInput"
            value={description}
          />

          <CommunityInfoInput
            labelText="Country"
            country_list={isCountry}
            setState={setState}
            ctryDropdwnVal={country}
            allCountries={tenant_list}
          />

          <div className="addressandcity">
            <CommunityInfoInput
              placeholdertext={"18900 Prospect Road"}
              labelText="Address"
              styleClass="communityNameInput"
              parentStyleClass="mediumInput1"
              value={address1}
            />
            <CommunityInfoInput
              placeholdertext={"18900 Prospect Road"}
              labelText="City"
              styleClass="communityNameInput"
              parentStyleClass="mediumInput2"
              value={city}
            />
          </div>
          <div className="addressandcity">
            {tenant_list && Object.keys(tenant_list).length !== 0 ? (
              <CommunityInfoInput
                labelText="State"
                parentStyleClass="mediumInput1"
                state_list={isState}
                stDropdwnVal={state}
              />
            ) : null}
            <CommunityInfoInput
              placeholdertext={"18900 Prospect Road"}
              labelText="Zip Code"
              styleClass="communityNameInput"
              parentStyleClass="mediumInput2"
              value={zipcode}
            />
          </div>
          <div>
            <button onClick={mapCommunity}>
              <img src={MapIcon} alt="Map-Icon" />
              Edit Map Community
            </button>
          </div>

          <Button type="submit" variant="contained">
            Save
          </Button>
        </div>
      </form>

      {isOpen ? (
        <Dialog
          open={isOpen}
          onClose={handleClose}
          classes={{ paperWidthSm: classes.paperWidthSm }}
        >
          <PolygonMap {...editCommunityItem}  onMapClose={handleClose}/>
        </Dialog>
      ) : null}
    </>
  );
};

export default CommunityInfo;
