//axios dependencies
import axios from 'axios';

//Action imports
import * as notificationActions from '../../actions/notificationsactions/notificationActionCreator';
import * as allActions from '../../actions/actions.constants';

const notificationService = (store) => next => action => {
  next(action)
  const devURL=`http://dev.skopic.com:9090/skopicportal`

  switch (action.type) {

    case allActions.FETCH_NOTIFICATIONS:

      axios.request({
        url: `${devURL}/jsonuser/notifications${action.payload}`,
        method: "GET",
        headers: {

                 },

        withCredentials: true,


      })
        .then((response) => {
          next(notificationActions.receiveNotificationData(response.data))


        })
        .catch((error) => {
          //  next({ type: "FETCH_SEARCH_DATA_ERROR", error });
          console.log(error)

        });
      break;


      case allActions.FETCH_NOTIFICATIONS_STATUS:

        axios.request({
          url: `${devURL}/jsonuser/notifications.html${action.payload}`,
          method: "GET",
          headers: {
          
          },
  
          withCredentials: true,
  
  
        })
          .then((response) => {
            console.log(response)
            next(notificationActions.receiveNotificationStatus(response.data))
  
  
          })
          .catch((error) => {
            //  next({ type: "FETCH_SEARCH_DATA_ERROR", error });
            console.log(error)
  
          });
        break;

        case allActions.FETCH_REMOVED_NOTIFICATIONS_STATUS:

          axios.request({
            url: `${devURL}/jsonuser/notifications.html${action.payload}`,
            method: "GET",
            headers: {
            
            },
    
            withCredentials: true,
    
    
          })
            .then((response) => {
              console.log(response)
              next(notificationActions.receiveNotificationRemoveStatus(response.data))
    
    
            })
            .catch((error) => {
              //  next({ type: "FETCH_SEARCH_DATA_ERROR", error });
              console.log(error)
    
            });
          break;

          case allActions.FETCH_UNFOLLOW_NOTIFICATIONS_STATUS:

            axios.request({
              url: `${devURL}/jsonuser/notifications.html${action.payload}`,
              method: "GET",
              headers: {
              
              },
      
              withCredentials: true,
      
      
            })
              .then((response) => {
                console.log(response)
                next(notificationActions.receiveNotificationUnfollowStatus(response.data))
      
      
              })
              .catch((error) => {
                //  next({ type: "FETCH_SEARCH_DATA_ERROR", error });
                console.log(error)
      
              });
            break;
  
    default: break;
  }
}
export default notificationService;