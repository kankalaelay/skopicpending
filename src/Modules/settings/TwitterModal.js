
import {Modal ,Button} from "react-bootstrap";
import styles from '../../Assets/css/settings/Modal.css'
function TwitterModal(props) {

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="SocailModals"
      >
        <Modal.Body>
<p>You want to tweet on Twitter</p>
    <div>
    <a href="http://dev.skopic.com:9090/skopicportal/twitter/redirecttoTwitter.htm" target="_self"><button>Continue</button></a>
    </div>
        </Modal.Body>
      </Modal>
    );
  }
  export default TwitterModal
