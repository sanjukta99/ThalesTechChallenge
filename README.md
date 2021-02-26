# ThalesTechChallenge

## Tech Stack
The technology stack I have chosen to work with is:
1. Backend: Django REST Framework - Easy to make views that act like REST API requests and integrate with 3rd party API (in this case Slack API)
2. Frontend: ReactJS - Plenty of ready made libraries for UI components (in this case Material UI and react-simple-maps)
3. Database: Postgres - Requests are handled more efficiently than MySQL 
4. 3rd Party API: Slack API - to create a Notification Bot that updates a Slack Channel

## Functionality
1. Browse the list of Aiprorts in the AIRLAB database - view their ICAO, and list of SIDs and STARs
2. View the statistics of SIDs and STARs for each airport (where applicable)
3. Send a JSON message with the statistics of the SIDs and STARs for each airport to a Slack Channel through a Slack bot

## Bugs
1. On Airport Page the SIDs list only updates when the `SIDs` button is clicked; it should ideally be automatically populated once component is mounted

## Further Scope
1. Make use of the Slack API and Asynchronous AIRLAB API to create Slack notifications for changing data **automatically** without needing user input by clicking any buttons
2. Improved CI/CD using Dockerfiles to create image of the Django project that will then be built and deployed on Azure using Azure Image Registry and Azure App Services