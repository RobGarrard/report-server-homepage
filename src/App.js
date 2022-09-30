// ----------------------------------------------------------------------------
/*
                      Learning Analytics Reports Homepage
*/
// ----------------------------------------------------------------------------
// Imports

// React
import React, { useEffect } from "react";

// Material UI
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Global state
import { useRecoilState } from "recoil";
import { appDataState, requestAccessState } from "./common/state.js";

// Custom Components
import { Header } from "./components/Header";
import { WelcomeMessage } from "./components/WelcomeMessage";
import { CardDeck } from "./components/CardDeck";
import { RequestAccessForm } from "./components/RequestAccessWindow";

// CSS
import "./App.css";

// Dummy app list for Development
import { dummyAppList } from "./common/globals.js";

// ----------------------------------------------------------------------------
// UQ Theme

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#4d2673",
      darker: "#4d2673",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

// ----------------------------------------------------------------------------
// Main method

function App() {
  // --------------------------------------------------------------------------
  // State variables

  // appDataState contains the username and app lists pulled from the API.
  // requestAccessState governs whether to display the Request Access form.
  const [appData, setAppData] = useRecoilState(appDataState);
  const [requestState, setRequestState] = useRecoilState(requestAccessState);

  async function pullData() {
    // Fetch data from the API and set the state variables.

    // The host is SAML authorized, so we need to pass the mellon-cookie
    // in the header of our GET request. Since this app and the API are on the
    // same host (reports.itali.uq.edu.au), we can read from the cookie jar.
    // We won't bother extracting the mellon-cookie, we just pass it all.
    const cookies = document.cookie;

    const data = await fetch("https://reports.itali.uq.edu.au/api/app-list", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        cookies: cookies,
      },
    })
      .then((resp) => resp.json())
      .catch(() => {
        console.log("No user found. Using dummy data.");
        return dummyAppList;
      });

    // Set the app data state variable.
    setAppData(data);

    // Set the username for the request access form.
    setRequestState((oldState) => {
      const newState = { ...oldState };
      newState.username = data.username;
      return newState;
    });
  }

  // --------------------------------------------------------------------------
  // On component mount, fetch app list data from API.
  useEffect(() => {
    pullData();
  }, []);

  // --------------------------------------------------------------------------
  // Page layout
  return (
    <ThemeProvider theme={theme}>
      <div className="page-content">
        <Header />
        <div className="main-column">
          <WelcomeMessage />
          {/* If username is non-null and there are apps for this user, show a
                'My Dashboards' section. Else, just show the full app list. */}
          {appData.username && appData.userAppList.length > 0 ? (
            <>
              <h2>My Dashboards ({appData.username})</h2>
              <CardDeck cards={appData.userAppList} />
              <h2>Other Dashboards</h2>
              <CardDeck cards={appData.remainingAppList} showButton={true} />
            </>
          ) : (
            <>
              <CardDeck cards={appData.fullAppList} />
            </>
          )}
        </div>
        <br></br>
        {/* If a Request Access button has been clicked, show the email form. */}
        {requestState.showWindow ? <RequestAccessForm /> : null}
      </div>
    </ThemeProvider>
  );
}

export default App;
