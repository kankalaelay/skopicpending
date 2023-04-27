import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import locationpinchildpost from '../../Assets/images/locationpinchildpost.png'
import Pin from '../../Assets/images/Pin.png'

import backbutton from '../../Assets/images/locationtagbackbutton.png'

import styles from '../../Assets/css/home/post.module.css'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { formatRelative } from 'date-fns'
import asksaylocationtag from '../../Assets/images/asksaylocationtag.svg';

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import Geocode from "react-geocode";



const useStyles = makeStyles({
    paperWidthSm: {
        borderRadius: 25,
        width: 650,
        overflow: "hidden",
        maxWidth: "none"

    }
});

//maps functionality



function SimpleDialog(props) {
    const classes = useStyles();

    const [libraries] = useState(['places']);
    Geocode.setApiKey("AIzaSyAXEHjz5uTArWEC0q8-zpu_xXuHXJ2zOl8");
    const mapContainerStyle = {
        width: "45vw",
        height: "60vh",
        borderRadius: 25

    }
    const center = {
        lat: 17.385044,
        lng: 78.486671,
    }
    const options = {
        disableDefaultUI: true
    }

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAXEHjz5uTArWEC0q8-zpu_xXuHXJ2zOl8",
        libraries
    });

    const [markers, setMarkers] = useState([])
    const [selected, setSelected] = useState('')
    const [isAddress, setAddress] = useState()


    const onMapClick = (event) => {
        setMarkers(
            {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),

            },


        )
        Geocode.fromLatLng(event.latLng.lat(), event.latLng.lng()).then(
            (response) => {
                const address = response.results[0].formatted_address;
                console.log(address);
                setAddress(address)

            },
            (error) => {
                console.error(error);
            })
    }

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, [])

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng })
        mapRef.current.setZoom(14);
    }, [])


    if (loadError) return "Error Loading maps"
    if (!isLoaded) return "Loading maps"
    const { onClose, open } = props;

    const handleClose = () => {
        onClose(false);
    };


    const onLocationSubmit = () => {

        // console.log(isAddress)
        props.isLocationSelect(isAddress)
        props.setLat(markers.lat)
        props.setLng(markers.lng)
        handleClose();
        setSelected(null)
        setMarkers([])


    }



    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} key={`simpleDialog2${props.id}`} classes={{ paperWidthSm: classes.paperWidthSm }}>
            <div className={styles.mapcontainer}>
                <div className={styles.addlocation}>
                    <a onClick={handleClose}><img src={backbutton} alt="backbutton" /></a>
                    <h5 className={styles.locationheading}>Add Location</h5>
                    <button className={styles.locationsubmit} onClick={onLocationSubmit}>Done</button>
                </div>
                <Search panTo={panTo} isLocationSelect={props.isLocationSelect} setLat={props.setLat} setLng={props.setLng} id={props.id} key={`LocationSearch${props.id}`} />
                <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center} options={options}
                    onClick={onMapClick}
                    onLoad={onMapLoad}
                >
                    {
                        <Marker position={{
                            lat: parseFloat(markers.lat), lng: parseFloat(markers.lng)
                        }}
                            onMouseOver={() => {
                                setSelected(markers)
                                // console.log(markers.lat,markers.lng)
                            }}
                            icon={{
                                url: "/Pin.png",
                                scaledSize: new window.google.maps.Size(30, 30),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15)
                            }}
                        />

                    }
                    {selected ? (<InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => {
                        setSelected('')
                    }}>
                        <div>
                            <p>{isAddress}</p>
                        </div>
                    </InfoWindow>) : null}
                </GoogleMap>
            </div>
        </Dialog>
    );
}



SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};




export default function LocationTag(props) {

    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);


    };

    const handleClose = () => {
        setOpen(false);

    };

    return (
        <React.Fragment>
            {
            <a className={`${!props.isPostings&&styles.locationpinchildpost}`}><img src={locationpinchildpost} onClick={handleClickOpen} /></a>
            }
            <SimpleDialog open={open} onClose={handleClose} isLocationSelect={props.isLocationSelect} setLat={props.setLat} setLng={props.setLng} id={props.id} />

        </React.Fragment>
    );
}
function Search({ panTo, isLocationSelect, setLat, setLng }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete({
        requestOptions: {
            location: {
                lat: () => 17.385044,
                lng: () => 78.486671,
            },
            radius: 200 * 1000
        }
    })


    return (
        <div className={styles.locationsearch} >
            <Combobox onSelect={async (address) => {
                setValue(address, true);
                clearSuggestions()
                try {
                    const results = await getGeocode({ address });
                    const { lat, lng } = await getLatLng(results[0]);
                    panTo({ lat, lng });
                    isLocationSelect(address)
                    setLat(lat)
                    setLng(lng)
                    // console.log(address,lat,lng)

                }
                catch (error) {
                    console.log("Error!")

                }

            }}>
                <ComboboxInput value={value} onChange={(e) => {
                    e.preventDefault();        
                    setValue(e.target.value);    
                }}
                    disabled={!ready}
                    placeholder="Search location"
                    className={styles.comboinput}
                />
                <ComboboxPopover className={styles.comboboxdropdown}>
                    <ComboboxList>
                        {status === "OK" && data.map(({ index, description }) => (
                            <ComboboxOption key={index} value={description} />
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}
