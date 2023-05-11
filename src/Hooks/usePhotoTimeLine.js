import { useDispatch } from "react-redux";
import * as moderatorActions from "../store/actions/Moderator/moderatoractions";

export const usePhotoTimeLine = () => {
  const dispatch = useDispatch();
  const editDescription = (imgDetails) => {
    let formData = new FormData();
    formData.append("imageIds", imgDetails.imageId);
    formData.append("tenantId", imgDetails.tenantId);
  };
  const deletePhotoTimeLine = (imgDetails) => {
    let formData = new FormData();
    formData.append("imageIds", imgDetails.imageId);
    formData.append("tenantId", imgDetails.tenantId);
    dispatch(moderatorActions.deleteTimeLineImages({ formData }));
  };
  return {
    editDescription,
    deletePhotoTimeLine,
  };
};
