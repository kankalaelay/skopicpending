import * as allActions from '../actions.constants';

//feed data 
export function receiveFeedData(data) {
  return {
    type: allActions.RECIEVE_FEED_DATA,
    payload: data
  };
}

export function fetchFeedData(feedfilters) {
  return {
    type: allActions.FETCH_FEED_DATA,
    payload: feedfilters
  };
}

//follow unfollow status

export function receiveFollowData(data) {
  return {
    type: allActions.RECIEVE_FOLLOW_DATA,
    payload: data
  };
}

export function fetchFollowData(followunfollowparams) {
  return {
    type: allActions.FETCH_FOLLOW_DATA,
    payload: followunfollowparams
  };
}

//voteup status
export function receiveVoteUpStatus(data) {
  return {
    type: allActions.RECIEVE_VOTEUP_STATUS,
    payload: data
  };
}

export function fetchVoteUpStatus(voteupparams) {
  return {
    type: allActions.FETCH_VOTEUP_STATUS,
    payload: voteupparams
  };
}


//followed user countlist

export function receiveFollowerCount(data) {
  return {
    type: allActions.RECIEVE_FOLLOWER_COUNT,
    payload: data
  };
}

export function fetchFollowerCount(id, type) {
  return {
    type: allActions.FETCH_FOLLOWER_COUNT,
    payload: { id, type }
  };
}

//Delete User Post

export function receiveDeleteStatus(data) {
  return {
    type: allActions.RECIEVE_DELETE_STATUS,
    payload: data
  };
}

export function fetchDeleteStatus(messageid) {
  return {
    type: allActions.FETCH_DELETE_STATUS,
    payload: messageid
  };
}

//fetch report status

export function receiveReportStatus(data) {
  return {
    type: allActions.RECIEVE_REPORT_STATUS,
    payload: data
  };
}

export function fetchReportStatus(reportparams) {
  return {
    type: allActions.FETCH_REPORT_STATUS,
    payload: reportparams
  };
}

//fetch to send a  report 

export function receiveReportData(reportdata) {
  return {
    type: allActions.RECIEVE_REPORT_DATA,
    payload: reportdata
  };
}

export function fetchReportData(reportparams) {
  return {
    type: allActions.FETCH_REPORT_DATA,
    payload: reportparams
  };
}

//Posting a childsay 

export function receiveChildSayResponseData(responseData) {
  return {
    type: allActions.RECIEVE_RESPONSE_OF_POSTED_CHILDSAY_DATA,
    payload: responseData
  };
}

export function postChildSayData(childSayparams) {
  return {
    type: allActions.POST_CHILDSAY_DATA,
    payload: childSayparams
  };
}


//Posting a Mail 

export function receiveMailData(responseData) {
  return {
    type: allActions.RECIEVE_RESPONSE_OF_A_MAIL_DATA,
    payload: responseData
  };
}

export function postaMailData(mailparams) {
  return {
    type: allActions.POST_A_MAIL_DATA,
    payload: mailparams
  };
}


//Edit a Psot 

export function receiveEditPostResponse(responseData) {
  return {
    type: allActions.RECIEVE_RESPONSE_OF_EDIT_A_POST,
    payload: responseData
  };
}

export function editaPost(editParams) {
  return {
    type: allActions.EDIT_A_POST,
    payload: editParams
  };
}

//edit a update
export function receiveEditUpdateResponse(responseData) {
  return {
    type: allActions.RESPONSE_OF_EDIT_A_UPDATE,
    payload: responseData
  };
}

export function editaUpdate(editParams) {
  return {
    type: allActions.EDIT_A_UPDATE,
    payload: editParams
  };
}

//change a community
export function responseofCommunityChange(communitychangeresponseData) {
  return {
    type: allActions.RESPONSE_OF_CHANGE_COMMUNITY,
    payload: communitychangeresponseData
  };
}

export function changeCommunity(name, id) {
  return {
    type: allActions.CHANGE_COMMUNITY,
    payload: { name, id }
  };
}

//fetchh contirbutors 
export function responseofContributors(contirbutorsdata) {
  return {
    type: allActions.RECEIVE_CONTIRBUTORS_RESPONSE,
    payload: contirbutorsdata
  };
}

export function fetchcontirbutors(params) {
  return {
    type: allActions.FETCH_CONTRIBUTORS,
    payload: params
  };
}


//
export function responseOfEditBio(bioUpdateData) {
  return {
    type: allActions.RECEIVE_EDIT_BIO_RESPONSE,
    payload: bioUpdateData
  };
}

export function fetchEditBio(params) {
  return {
    type: allActions.FETCH_EDIT_BIO,
    payload: params
  };
}

//Asks u can ansewer
export function fetchSayAskData(value) {
  return {
    type: allActions.FETCH_SAY_ASK_DATA,
    payload: value
  }
}

export function recieveSayAskData(data) {
  return {
    type: allActions.RECIEVE_SAY_ASK_DATA,
    payload: data
  }
}


//Says u can ansewer
export function fetchAskSayData(value) {
  return {
    type: allActions.FETCH_ASK_SAY_DATA,
    payload: value
  }
}

export function recieveAskSayData(data) {
  return {
    type: allActions.RECIEVE_ASK_SAY_DATA,
    payload: data
  }
}

//settings 
export function fetchSettings(value) {
  return {
    type: allActions.FETCH_SETTINGS,
    payload: value
  }
}

export function recieveSettings(data) {
  return {
    type: allActions.RECIEVE_SETTINGS,
    payload: data
  }
}

//@username 
export function fetchUserNames(value) {
  return {
    type: allActions.FETCH_USERNAME,
    payload: value
  }
}

export function recieveUserNames(usernamechardata) {
  return {
    type: allActions.RECIEVE_USERNAME,
    payload: usernamechardata
  }
}
//Ask your community
export function askYourCommunity(value) {
  return {
    type: allActions.ASK_YOUR_COMMUNITY,
    payload: value
  }
}

export function recieveaskYourCommunity(data) {
  return {
    type: allActions.RECIEVE_ASK_YOUR_COMMUNITY,
    payload: data
  }
}

//moderating communitys list
export function getModeratingCommunitys(value) {
  return {
    type: allActions.GET_MODERATE_COMMUNITYS,
    payload: value
  }
}

export function receiveModeratingCommunitys(data) {
  return {
    type: allActions.RECIEVE_MODERATE_COMMUNITYS,
    payload: data
  }
}


//hashtag check
export function fetchHash(value) {
  return {
    type: allActions.FETCH_HASH,
    payload: value
  }
}

export function receiveHash(data) {
  return {
    type: allActions.RECIEVE_HASH,
    payload: data
  }
}
export function newHash() {
  return {
    type: allActions.NEW_HASH,

  }
}


//hash(#) check
export function getHashCheck(text) {
  return {
    type: allActions.GET_HASH_CHECK,
    payload: text
  }
}

export function receiveHashCheck(data) {
  return {
    type: allActions.RECIEVE_HASH_CHECK,
    payload: data
  }
}

//post tag
export function getPostTag(text) {
  return {
    type: allActions.GET_POST_TAG,
    payload: text
  }
}

export function receivePostTag(data) {
  return {
    type: allActions.RECIEVE_POST_TAG,
    payload: data
  }
}

//post update
export function getUpdatePsot(text) {
  return {
    type: allActions.GET_UPDATE_POST,
    payload: text
  }
}

export function receiveUpdatePost(data) {
  return {
    type: allActions.RECIEVE_UPDATE_POST,
    payload: data
  }
}

//post ContactMessage
export function getContactSubmit(text) {
  return {
    type: allActions.GET_CONTACT_SUBMIT,
    payload: text
  }
}

export function receiveContactSubmit(data) {
  return {
    type: allActions.RECIEVE_CONTACT_SUBMIT,
    payload: data
  }
}