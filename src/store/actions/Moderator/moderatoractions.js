import * as allActions from "../actions.constants";

//for moderating communities list
export function receiveModeratingCommunityList(data) {
  return {
    type: allActions.RECIEVE_MODERATING_COMMUNITYS_LIST,
    payload: data,
  };
}

export function fetchModeratingCommunityList(moderatorCommunityListParams) {
  return {
    type: allActions.FETCH_MODERATING_COMMUNITYS_LIST,
    payload: moderatorCommunityListParams,
  };
}

//for photo timeline  list
export function receivePhotoTimeLineList(data) {
  return {
    type: allActions.RECIEVE_TIMELINE_IMAGES_LIST,
    payload: data,
  };
}

export function fetchPhotoTimeLineList(phototimelinefetchparams) {
  return {
    type: allActions.FETCH_TIMELINE_IMAGES_LIST,
    payload: phototimelinefetchparams,
  };
}

//upload photo to photo timeline
export function receivePhotoUploadstatus(data) {
  return {
    type: allActions.RECIEVE_UPLOAD_PHOTO_STATUS,
    payload: data,
  };
}

export function uploadPhototoPhototimeline(uploadphotoparams) {
  console.log(uploadphotoparams);
  return {
    type: allActions.UPLOAD_PHOTO_TO_PHOTO_TIMELINE,
    payload: uploadphotoparams,
  };
}

//to get tenantlist at moderator section
export function receiveTenantList(data) {
  return {
    type: allActions.RECIEVE_TENANT_LIST,
    payload: data,
  };
}

export function fetchTenantList(tenantlistparams) {
  return {
    type: allActions.FETCH_TENANT_LIST,
    payload: tenantlistparams,
  };
}

export function getTenantList(tenantlist) {
  return {
    type: allActions.GET_TENANT_LIST,
    payload: tenantlist,
  };
}

//to delete timeline images
export function receiveDeletedTimeLineImagesResponse(data) {
  return {
    type: allActions.RECIEVE_DELETE_TIMELINE_IMAGE_RESPONSE,
    payload: data,
  };
}

export function deleteTimeLineImages(deleteparams) {
  return {
    type: allActions.DELETE_TIMELINE_IMAGE,
    payload: deleteparams,
  };
}

//to update timeline images description
export function receiveTimeLineImagesUpdateResponse(data) {
  return {
    type: allActions.RECIEVE_TIMELINE_IMAGE_DESC_UPDATE_RESPONSE,
    payload: data,
  };
}

export function updateTimeLineImagesDescription(updatedescparams) {
  return {
    type: allActions.UPDATE_TIMELINE_IMAGE_DESC,
    payload: updatedescparams,
  };
}

// manage members community moderators actions

export const fetchManageMembersData = (id) => {
  return {
    type: allActions.FETCH_MANAGE_MEMBERS_DATA,
    payload: id,
  };
};
export const receiveManageMembersData = (data) => {
  return {
    type: allActions.RECIEVE_MANAGE_MEMBERS_DATA,
    payload: data,
  };
};

// Manage members community Block members moderators actions

export const fetchBlockMembersData = (idData) => {
  return {
    type: allActions.FETCH_BLOCK_MEMBERS_DATA,
    payload: idData,
  };
};
export const recieveBlockMembersData = (data) => {
  return {
    type: allActions.RECIEVE_BLOCK_MEMBERS_DATA,
    payload: data,
  };
};

// Manage members community getBlockUserData in members moderators actions
export const fetchBlockedUsersData = (id) => {
  return {
    type: allActions.FETCH_BLOCKED_USERS_DATA,
    payload: id,
  };
};
export const recieveBlockedUsersData = (data) => {
  return {
    type: allActions.RECIEVE_BLOCKED_USERS_DATA,
    payload: data,
  };
};

// Manage members community warnUserCommunity in members moderators actions
export const fetchwarnUserCommunity = (id) => {
  return {
    type: allActions.FETCH_WARN_USER_COMMUNITY,
    payload: id,
  };
};
export const recievewarnUserCommunity = (data) => {
  return {
    type: allActions.RECIEVE_WARN_USER_COMMUNITY,
    payload: data,
  };
};

// Manage members community Invite Members in submenu of ManageMembers actions

export const fetchInviteMembersData = (id) => {
  return {
    type: allActions.FETCH_INVITE_MEMBERS_DATA,
    payload: id,
  };
};
export const recieveInviteMembersData = (data) => {
  return {
    type: allActions.RECIEVE_INVITE_MEMBERS_DATA,
    payload: data,
  };
};

// Manage members community Invite as Moderator in submenu of ManageMembers actions

export const fetchInviteAsModerator = (id) => {
  return {
    type: allActions.FETCH_INVITE_AS_MODERATOR,
    payload: id,
  };
};
export const recieveInviteAsModerator = (data) => {
  return {
    type: allActions.RECIEVE_INVITE_AS_MODERATOR,
    payload: data,
  };
};

// Manage members community Remove as Moderator in submenu of ManageMembers actions

export const fetchRemoveAsModerator = (id) => {
  return {
    type: allActions.FETCH_REMOVE_AS_MODERATOR,
    payload: id,
  };
};
export const recieveRemoveAsModerator = (data) => {
  return {
    type: allActions.RECIEVE_REMOVE_AS_MODERATOR,
    payload: data,
  };
};

//////Manage content Modearator section  calls start from here

//Manage content community ActionItems in Moderator
export const fetchActionItemsData = (data) => {
  return {
    type: allActions.FETCH_ACTION_ITEMS_DATA,
    payload: data,
  };
};
export const recieveActionItemsData = (data) => {
  return {
    type: allActions.RECIEVE_ACTION_ITEMS_DATA,
    payload: data,
  };
};

//Manage content community PrivateTags in Moderator
export const fetchPrivateTagsData = (data) => {
  return {
    type: allActions.FETCH_PRIVATE_TAG_DATA,
    payload: data,
  };
};
export const recievePrivateTagsData = (data) => {
  return {
    type: allActions.RECIEVE_PRIVATE_TAG_DATA,

    payload: data,
  };
};

//Manage content community ActivityLog in Moderator

export const fetchActivityLogData = (data) => {
  return {
    type: allActions.FETCH_ACTIVITY_LOG_DATA,
    payload: data,
  };
};
export const recieveActivityLogData = (data) => {
  return {
    type: allActions.RECIEVE_ACTIVITY_LOG_DATA,
    payload: data,
  };
};

export const updateCommunityRules = (data) => {
  return {
    type: allActions.UPDATE_COMMUNITY_RULE,
    payload: data,
  };
};
