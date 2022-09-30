# Report Server Homepage

This repo contains a little React app for the ITaLI Learning Analytics report server's landing page ([https://reports.itali.edu.au](https://reports.itali.edu.au)).

The user gets a card deck of dashboards to which they already have access (according to the Postgres `dash_app_auth` database). The user can also see the remaining dashboards, each card having a 'Request Access' button that will fire off an email to learninganalytics@uq.edu.au if the request form is submitted.

## Changelog (v1.0.0)

- Initial release.

## Getting Started

Clone this repo and run:

```
npm install
npm start
```

Note that when running this app locally you will not be able to call the API. The API sits on the report server behind SSO authorization, and so
it may not be queried unless the correct mellon cookie is passed in the request. For local development, if the initial GET request fails, dummy data 
stored in `src/common/globals.js` is loaded instead. Sending emails is not possible locally, but the payload to be sent to the API is logged in the console. 

## Deployment

Run

`npm run build`

to compile. Place the files found in the `build/` directory on the report server under `/var/www/html/homepage/`.

That should be sufficient for the new homepage to appear at `https://reports.itali.uq.edu.au/homepage/`.

Note that `/var/www/html/` is the root directory for the Apache server, navigating to `https://reports.itali.uq.edu.au/` should
serve up the file called index.html in this directory. To make this url automatically redirect to the `/homepage/` extension, I've set
up a .htaccess file in the Apache root directory.

## Updating the page with new apps

When a new Dash app is developed and deployed to the report server, we want to have it listed on the homepage.

At the moment, user authorization is maintained in a Postgres database called `dash_app_auth`, in a table called `authorized_users`.

There is an additional table in this database called `app_description` that contains a title, brief description, and routing extension for each 
app we want to appear on the homepage. To add a new app to the homepage, a new row must be created in this table. 

To add a new row, edit the file `data/app_descriptions.csv`. Then, in that directory, run `python write_to_postgres.py`. This script appends the new 
entries found in the app_descriptions file to the database.

Important to note: by default, your new app will have the `default` (UQ) logo. If you want this app to have a custom logo, do the following:

1. Place your logo in the `src/assets/` directory. Make sure it has the same aspect ratio as the default UQ logo; I open them up with an image editor and 
extra padding to enforce the aspect ratio.

2. Modify the `src/common/globals.js` file to import this new logo and add it to the `logo` object.

3. Set the `logo` column in the app_descriptions csv to be the logo alias you gave it in the object above. If you have already deployed the app_descriptions
file to Postgres, you will need to edit it there as well, since the script only appends new entries and doesn't edit existing ones.