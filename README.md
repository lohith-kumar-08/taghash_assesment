# TagHash Assessment Project

## Project Setup and Instructions

### Backend Setup

1. *Clone the repository:*
   ```
   git clone https://github.com/lohith-kumar-08/taghash_assesment.git
   cd server

2. Install necessary packages:
npm install nodemon knex express pg cors jest
npm install -g knex

3. Run database migrations:
cd db
knex migrate:latest

4. Create a .env file inside the db directory:
touch .env

5. Add the following credentials to the .env file:
DB_CLIENT = "postgresql"
DB_NAME = database_name
DB_USER = postgres_user_name
DB_PASSWORD = user_password

6. Start the server:
cd .. # go back to the server directory
npm start

The server will start at port 8080.

7. Running Tests

npm test

## Frontend Setup
1. Install global dependencies:
npm install -g jest

2. Install project dependencies:
npm install chart.js
npm install react-chartjs-2
npm install @mui/material
npm install @emotion/react @emotion/styled
npm install react-scripts
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom

3. Run the frontend:
npm run dev

4. References and Resources
Knex.js Documentation
Jest Documentation
Nodemon Documentation
Express.js Documentation
Material UI Documentation
Chart.js Documentation

## Codebase Documentation

Backend Routes
GET /: Server status check.

Response: Server Started
POST /votes: Insert a vote into the database.

Request Body: { name: 'string', voting_choice: boolean, casted_at: 'date' }
Response: Vote recorded successfully
GET /data: Get all votes from the database.

Response: { data: [ { id, name, voting_choice, casted_at }, ... ] }
GET /counts: Get the count of votes for a given voting_choice grouped by casted_at.

Query Parameter: voting_choice (true/false)
Response: { data: [ { count, casted_at }, ... ] }
GET /results: Get the count of votes grouped by voting_choice.

Response: { data: [ { count, voting_choice }, ... ] }

Running the Backend Server
Ensure PostgreSQL is running and the credentials in .env are correct.
Run npm start to start the server at port 8080.
Use tools like Postman or your web browser to interact with the routes.
Running the Frontend
Navigate to the frontend directory (if separate) and ensure dependencies are installed.
Run npm run dev to start the frontend server.
Open your browser and navigate to the provided URL to interact with the application.

### Running Tests
To run the tests, use:

npm test