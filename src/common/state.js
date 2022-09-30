// ----------------------------------------------------------------------------
/*
                             State Variables
*/
// ----------------------------------------------------------------------------

import { atom } from "recoil";

// App list pulled from API on page load
export const appDataState = atom({
  key: "appDataState",
  default: {
    username: null,
    fullAppList: [],
    userAppList: [],
    remainingAppList: [],
  },
});

// Does the 'Request Access' window need to be displayed?
// If so, what username do we prefill and what app is being requested?
export const requestAccessState = atom({
  key: "requestAccessState",
  default: {
    showWindow: false,
    username: null,
    appName: null,
  },
});
