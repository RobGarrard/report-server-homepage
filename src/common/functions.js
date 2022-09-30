// ----------------------------------------------------------------------------
/*
                                Global Functions
*/
// ----------------------------------------------------------------------------
// Utility functions not scoped to a particular class.



export async function sendEmail(content){
    // Send an email through the API on reports.itali.uq.edu.au/api/app-list.
    // Emails from the learninganalytics@uq.edu.au address can be sent by making
    // a POST request to this API and passing it a payload containing:
    // `fromAddress`, `subject`, and `message`.
    
    console.log("Sending email with following content:");
    console.log(content);

    // As for the initial GET request, we need to pass mellon cookies.
    const cookies = document.cookie;

    const response = await fetch(
        "https://reports.itali.uq.edu.au/api/app-list",
        {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                cookies: cookies,
            },
            body: JSON.stringify(content),
        }
    )
    .then((resp) => resp.json());
    
    console.log('Fetch response:');
    console.log(response);
}