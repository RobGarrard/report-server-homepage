// ----------------------------------------------------------------------------
/*
                             Request Access Popup
*/
// ----------------------------------------------------------------------------
// Popup window that appears  when the Request Access button is clicked on a
// card. Prefilled  with email template.

// ----------------------------------------------------------------------------
// Imports

// State variables
import { useState } from "react";
import { useRecoilState } from "recoil";
import { requestAccessState } from "../common/state";

// Un-indent strings broken over multiple lines.
import dedent from "dedent";

// Material UI objects
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from '@mui/lab/LoadingButton';

// Email sender
import { sendEmail } from "../common/functions";

// ----------------------------------------------------------------------------
// Component

export function RequestAccessForm() {
  // ------------------------------------------------------------------------
  // State variables

  const [requestState, setRequestState] = useRecoilState(requestAccessState);

  // Loading status of Send button
  const [loading, setLoading] = useState(false);

  // Does the email send successfully?
  const [deliveryFailed, setDeliveryFailed] = useState(false);

  // ------------------------------------------------------------------------
  // Non-state variables

  // Defaults values for form.
  var defaultMessage = dedent(
    `
        Hello,
        
        I'd like access to ${requestState.appName} please.
    
        Thanks!
        `
  );

  // Button style. Have 'Cancel' and 'Send' be same width.
  const buttonStyle = {
    width: "12ch",
  };

  // When an access request fails to deliver, show a message in a red box that
  // tells the user to contact us directly.
  const deliveryErrMessage = (
    <>
    <div style={{
      "display": "grid",
      "backgroundColor": "hsl(0, 70%, 70%)",
      "padding": "8px",
      "borderRadius": "4px",
      "fontWeight": "450",
    }}
    >
    
      Oops, something went wrong.<br/><br/>

      Please contact Learning Analytics at: 
      <a 
      href="mailto:learninganalytics@uq.edu.au"
      >
        learninganalytics@uq.edu.au
      </a> 
    </div>
    </>
  );

  // ------------------------------------------------------------------------
  // Event Functions

  // On Cancel click
  function cancelEvent() {
    // Update the request form state to close the window and zero out the
    // app name and delivery failed status.

    setDeliveryFailed(false);

    setRequestState((oldState) => {
      const newState = { ...oldState };

      newState.showWindow = false;
      newState.appName = null;

      return newState;
    });

  }

  function sendEvent() {
    // Invoke a lambda to send an access request email to Learning Analytics
    // with SES.

    // Turn on loading spinner
    setLoading(true);

    // Payload to be sent to the API.
    const payload = {
      fromAddress: document.getElementById("fromField").value,
      subject: document.getElementById("subjectField").value,
      message: document.getElementById("messageField").value,
    };

    // Try to send the email. If it succeeds, close the window.
    // If it fails, place an error message on the Request Access form.
    sendEmail(payload)
    .then((resp) => {
      // Make then spinner spin for a bit and close the window.  
      setTimeout(() => {
        setLoading(false);
        cancelEvent();
      }, 750);
      console.log('Request delivered successfully.');
    }
    )
    .catch((err) => {
        // Make then spinner spin for a second, then show the delivery failed
        // message.  
        setTimeout(() => {
          setLoading(false);
          setDeliveryFailed(true);
          }, 750);

        // On error, set the email delivery failed state.
        console.log('Request delivery failed:');
        console.log(err);
      }
    );
  }

  // ------------------------------------------------------------------------
  // Render
  return (
    <div className="request-access-form-container">
      <div className="request-access-form">
        <h2>Access Request</h2>
        {/* If delivery has failed, show user error message in red */}
        {deliveryFailed ? deliveryErrMessage: null}
        <TextField
          id="toField"
          label="To:"
          variant="outlined"
          defaultValue={"learning.analytics@uq.edu.au"}
          InputProps={{
            readOnly: true,
          }}
          />
        <TextField
          id="fromField"
          label="From:"
          variant="outlined"
          defaultValue={`${requestState.username}@uq.edu.au`}
          InputProps={{
            readOnly: true,
          }}
          />
        <TextField
          id="subjectField"
          label="Subject:"
          variant="outlined"
          defaultValue={`Access to ${requestState.appName}`}
          />
        <TextField
          id="messageField"
          minRows={5}
          label="Message:"
          variant="outlined"
          multiline={true}
          defaultValue={defaultMessage}
          />
        <div className="access-form-button-container">
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={() => cancelEvent()}
            >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            loading={loading}
            sx={buttonStyle}
            onClick={() => sendEvent()}
            >
            Send
          </LoadingButton>
        </div>
      </div>
  </div>
  );
}
