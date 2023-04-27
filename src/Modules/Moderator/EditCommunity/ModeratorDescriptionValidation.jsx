import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";
import LocationTag from "../../Reusuablecomponents/LocationTag";

function ModeratorDescriptionValidation(props) {
  const [isLetterCount, setLetterCount] = useState(0);

  const [setLocationSelect, isLocationSelect] = React.useState(null);
  const [isLat, setLat] = React.useState(null);
  const [isLng, setLng] = React.useState(null);

  var inputDataLen;

  const ignoreSpaceandUrls = (mstrData, txtId) => {
    let inputData = mstrData;
    inputDataLen = inputData.length;
    let inputText = document.getElementById(txtId).value;
    inputText = inputText.replace(/\n/g, " ");
    let strArray = inputText.split(" ");
    let validlettercount = 0;
    let inputletters;
    for (inputletters = 0; inputletters < strArray.length; inputletters++) {
      if (
        strArray[inputletters].indexOf("http://") == -1 &&
        strArray[inputletters].indexOf("www.") == -1 &&
        strArray[inputletters].indexOf("https://") == -1 &&
        strArray[inputletters].indexOf("HTTP://") == -1 &&
        strArray[inputletters].indexOf("WWW.") == -1 &&
        strArray[inputletters].indexOf("HTTPS://") == -1
      ) {
        validlettercount = validlettercount + strArray[inputletters].length;
      } else if (
        strArray[inputletters].indexOf("http://") &&
        strArray[inputletters].indexOf("www.") &&
        strArray[inputletters].indexOf("https://") &&
        strArray[inputletters].indexOf("HTTP://") &&
        strArray[inputletters].indexOf("WWW.") &&
        strArray[inputletters].indexOf("HTTPS://")
      ) {
        validlettercount = validlettercount + strArray[inputletters].length;
      }
    }
    inputDataLen = validlettercount;
  };

  useEffect(() => {
    let output = "";
    if (props.desc) {
      for (let i = 0; i < props.desc.length; i++) {
        output = output.concat(props.desc[i]);
        ignoreSpaceandUrls(output, `PhotoDescriptionInput${props.index}`);
      }
    }
    // console.log(inputDataLen)
    setLetterCount(inputDataLen ? inputDataLen : 0);
  }, [props.desc]);

  const onDescriptionTextChange = (e, id) => {
    let TotalLetters = 200;
    let valueId = `PhotoDescriptionInput${id}`;
    let countId = `descriptionLetterCounter${id}`;
    let Letters = document.getElementById(valueId).value;
    props.setDescriptionText(e.target.value);
    ignoreSpaceandUrls(Letters, valueId);
    setLetterCount(inputDataLen);
    if (inputDataLen > TotalLetters) {
      document.getElementById(countId).style.color = "red";
      if (props.postbutton === "postbutton") {
        document.getElementById(props.postbutton).disabled = true;
      }
      props.setOverCountLimit(true);
    } else {
      document.getElementById(countId).style.color = "black";
      if (props.postbutton === "postbutton") {
        document.getElementById(props.postbutton).disabled = false;
      }
    }
    console.log(id);
  };

  return (
    <div>
      <InputTextarea
        placeholder="Add a description"
        className="photo-preview-description"
        onChange={(e) => onDescriptionTextChange(e, props.index)}
        id={`PhotoDescriptionInput${props.index}`}
        defaultValue={props.desc ? props.desc : null}
      />
      <div className="phototimeline-location-tag">
        <LocationTag
          isLocationSelect={props.isLocationSelect}
          setLat={props.setLat}
          setLng={props.setLng}
        />
        <div>
          <label id={`descriptionLetterCounter${props.index}`}>
            {isLetterCount}
          </label>
          <label>/200</label>
        </div>
      </div>
    </div>
  );
}

export default ModeratorDescriptionValidation;
