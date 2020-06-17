"# Datepicker-backend"

## Development

This app was developed by a team of three members: Veronika Maisuradze, Makiyo Rönkkö and Olabisi Odusanya. The aim is to allow friends, colleagues and acquaintances pick a suitable date to meet for a get-together, party or other meetings.

## Software

The application utilizes the MERN stack: Mongoose, Express, React and Node js. On reaching the URL, the user has the option to either log in (if previously registered) or register, if they're totally new to the app. Once registered, this information will be stored in the database and the user will be taken to the log in page where the username and password, used for the registration will be used to reach the landing page. Once there, the user can create a new event complete with the date, title and some description of the event which will also be stored in the database like the user's registration details. There is also the option to view all the events that have been created on the right side of the page and pick the one most suitable to them.

## Installation

To be tested, the 'npm install' command should be typed into the console before it can work. This ensures that every dependencies required for the app to work is up-to-date.

## Connection

The backend was built with the Nodejs which was connected to the MongoDB to store the user details and the event details while the frontend (user interface) was built using the react js. Both applications were connected and are linked to each other and also deployed on heroku. The frontend design was made using the react bootstrap and the base app, (app.js) uses the hooks implementation of the react functional component as opposed to the 'state' in class component.
