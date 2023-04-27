import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '../../../Assets/images/CloseButton.svg'


// css
import '../../../Assets/css/Moderator/EditCommunitys.css'


import { useSelector, useDispatch } from 'react-redux'

import * as moderatorActions from '../../../store/actions/Moderator/moderatoractions'
import { PhotoInfo } from './Phototimeline';
import AlertBox from '../ReusableModeratorComponents/AlertBox';









function SimpleDialog(props) {

    const dispatch = useDispatch()


    const { onClose, selectedValue, open } = props;
    const [isOverPhotoCount] = React.useState(true)
    const [isImageChecked, setCheckedImage] = React.useState([]);
    const [isTenantID, setTenantID] = React.useState(null)
    const [isUpdateText, setUpdateText] = React.useState()
    const [isDelete, setDelete] = React.useState(false)
    const [isopen, setOpen] = React.useState(false);
    const [RemoveStatus,setRemoveStatus]=React.useState(false)
    const [alertOpen,setAlertOpen]=React.useState(false)
    const [isPhotoDescription,setPhotoDescription]=React.useState('')


    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };




    const onApply = () => {
        if (isImageChecked.length !== 0) {
            // console.log(isImageChecked, "+++", isTenantID)

            dispatch(moderatorActions.deleteTimeLineImages(`imageIds=${isImageChecked}&&tenantId=${isTenantID}`))

            // setTimeout(() => {


            // }, 500)


            setDelete(true)
            handleClose()
            props.popUpClose()
            // setRemoveStatus(true)
            dispatch(moderatorActions.fetchTenantList())

            dispatch(moderatorActions.fetchPhotoTimeLineList(`tenantId=${isTenantID}`))
            setAlertOpen(true)


        }
        else {
            setUpdateText("Same Text")
            // dispatch(moderatorActions.updateTimeLineImagesDescription(`tenantId=${isTenantID}&&imageId=${}&&tmlPhotoDesc=${isPhotoDescription}`))

        }

    }

    return (
        <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth="true">

            <DialogTitle><div className='remove-photo-header'><span>Uploded Photo's, you can edit Description (or) Photo's choose to Remove</span>  <img src={CloseIcon} alt="close" onClick={handleClose} /></div></DialogTitle>

            <div className='remove-unwanted-photo'>
                <PhotoInfo isOverPhotoCount={isOverPhotoCount} setCheckedImage={setCheckedImage} isImageChecked={isImageChecked} setTenantID={setTenantID} isUpdateText={isUpdateText} isDelete={isDelete} setPhotoDescription={setPhotoDescription}/>
            </div>
            <div>
                <Button onClick={onApply}>Apply</Button>
            </div>

            <AlertBox open={alertOpen} setOpen={setAlertOpen}/>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

const RemovePhoto = (props) => {

    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState();

    const handleClickOpen = () => {
        setOpen(true);


        dispatch(moderatorActions.fetchPhotoTimeLineList(`tenantId=${props.isTenantID}&&remove=remove`))

    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
           Your gallery is full,  <span className='click-here' onClick={handleClickOpen}>
                click here
            </span> to delete uploaded photos.
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                popUpClose={props.handleClose}
            />
        </div>
    );
};

export default RemovePhoto;


// export default function SimpleDialogDemo() {

// }
