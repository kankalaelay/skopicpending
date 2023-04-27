import * as allActions from '../actions.constants';


//for notification data
export function receiveNotificationData(data) {
    return {
      type: allActions.RECIEVE_NOTIFICATIONS,
      payload: data
    };
  }
  
  export function fetchNotificationData(filterparams) {
    return {
      type: allActions.FETCH_NOTIFICATIONS,
      payload: filterparams
    };
  }

  //for notification viewstatus
  export function receiveNotificationStatus(statusdata) {
    return {
      type: allActions.RECIEVE_NOTIFICATIONS_STATUS,
      payload: statusdata
    };
  }
  
  export function fetchNotificationStatus(viewstatus) {
    return {
      type: allActions.FETCH_NOTIFICATIONS_STATUS,
      payload: viewstatus
    };
  }

  //for notificaton removing
  export function receiveNotificationRemoveStatus(statusdata) {
    return {
      type: allActions.RECIEVE_REMOVED_NOTIFICATIONS_STATUS,
      payload: statusdata
    };
  }
  
  export function fetchNotificationRemoveStatus(removestatus) {
    return {
      type: allActions.FETCH_REMOVED_NOTIFICATIONS_STATUS,
      payload: removestatus
    };
  }

  //for notificaton unfollow

  export function receiveNotificationUnfollowStatus(statusdata) {
    return {
      type: allActions.RECIEVE_UNFOLLOW_NOTIFICATIONS_STATUS,
      payload: statusdata
    };
  }
  
  export function fetchNotificationUnfollowStatus(removestatus) {
    return {
      type: allActions.FETCH_UNFOLLOW_NOTIFICATIONS_STATUS,
      payload: removestatus
    };
  }