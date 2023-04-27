import React from 'react'
import GoogleMapReact from 'google-map-react'
import '../../Assets/css/ReusuableComponents/aboutMap.css'
import ContactMap from '../../Assets/images/contactMapIcon.svg'
import CloseButton from '../../Assets/images/CloseButton.svg'

import { Modal } from 'react-bootstrap';
// import styles from '../../Assets/css/home/Feed.module.css'
import { Dialog } from '@material-ui/core';

import backbutton from '../../Assets/images/locationtagbackbutton.png'
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../Assets/css/home/post.module.css'



const LocationPin = ({ text }) => (
    <div className="pin">
        <img src={ContactMap} className="pin-icon" />
        {/* <Icon icon={locationIcon} className="pin-icon" /> */}
        {/* <p className="pin-text">{text}</p> */}
    </div>
)


const useStyles = makeStyles({
    paperWidthSm: {
        borderRadius: 25,
        width: 650,
        overflow: "hidden",
        maxWidth: "none"

    }
});


function MapDialog(props) {


    const classes = useStyles();

    const { onClose, open } = props;

    const handleClose = () => {
        onClose(false);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} key={`simpleDialog2${props.id}`} classes={{ paperWidthSm: classes.paperWidthSm }}>
            <div className={styles.mapcontainer}>
                <div className={styles.addlocation}>
                    <a onClick={handleClose}><img src={backbutton} alt="backbutton" /></a>
                    <h5 className={styles.locationheading}>Address</h5>
                    <button className={styles.locationsubmit} onClick={handleClose}><img src={CloseButton}></img></button>
                </div>
                <div className="map">
                    {/* <h2 className="map-h2">Come Visit Us At Our Campus</h2> */}

                    <div className="google-map">
                        <input type="text" defaultValue={props.location.address} className="ContactAddress" />
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyAXEHjz5uTArWEC0q8-zpu_xXuHXJ2zOl8' }}
                            defaultCenter={props.location}
                            defaultZoom={props.zoomLevel}
                        >

                            <LocationPin
                                lat={props.location.lat}
                                lng={props.location.lng}
                                text={props.location.address}
                            />
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
        </Dialog>

    )

}

function AboutMap(props) {

    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);


    };

    const handleClose = () => {
        setOpen(false);

    };

    return (

        // <Modal
        //     {...props}
        //     size="md"
        //     className={styles.modal}
        //     aria-labelledby="contained-modal-title-vcenter"
        //     centered
        // >
        //     <div
        //         className={styles.modalbgcolor}
        //     >
        //         <Modal.Header closeButton
        //         // className={classes.heading}
        //         >
        //             Address
        //         </Modal.Header>

        <div>
            <a onClick={handleClickOpen} className="Address">4125 Blackford Avenue, San Jose, CA 97117</a>
            <MapDialog open={open} onClose={handleClose} location={props.location} zoomLevel={12}/>
        </div>
    )
}

export default AboutMap
