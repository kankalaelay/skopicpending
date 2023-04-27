
import {Modal ,Button} from "react-bootstrap";
import styles from '../../Assets/css/settings/Modal.css'
function FBModal(props) {

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="SocailModals"
      >
        <Modal.Body>
<p>You want to share on Facebook Page</p>
    <div>
    <a href="http://dev.skopic.com:9090/skopicportal/facebook/loginURLForFBPage.html" target="_self"><button>Continue</button></a>
    </div>
        </Modal.Body>
      </Modal>
    );
  }
  export default FBModal
