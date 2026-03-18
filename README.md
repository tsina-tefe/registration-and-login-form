# RegForm

A simple registration and login project with a static frontend and a Node.js + Express + MySQL backend.

## Features

- User registration
- User login
- Password hashing with bcrypt
- Basic form validation in the browser

## Tech Stack

- Frontend: HTML, CSS, JavaScript, Bootstrap
- Backend: Node.js, Express
- Database: MySQL

## Project Structure

```text
regForm/
├── public/          # Static frontend files
├── server/          # Express API and DB connection
├── package.json
└── README.md
```

## Prerequisites

- Node.js
- MySQL server
- npm

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with your database and server settings:

```env
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
```

## Run the Project

Start the backend server from the `server` folder:

```bash
cd server
node app
```

Then open frontend pages in your browser:

- `public/register.html`
- `public/login.html`

## Notes

- The frontend currently calls the backend at `http://localhost:3000`.
- If you deploy frontend to GitHub Pages, you must deploy backend separately and update API URLs.
