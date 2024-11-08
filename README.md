
# MERN Real Estate Website

This project is a full-stack real estate web application built with the MERN stack (MongoDB, Express, React, Node.js). The app allows users to browse property listings, filter based on specific criteria, and manage real estate listings through a user-friendly interface.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [License](#license)

## Features
- **User Authentication:** Secure user authentication and authorization with JWT.
- **Property Listings:** Add, edit, view, and delete property listings.
- **Search & Filter:** Advanced filtering options to find listings based on location, price range, property type, and more.
- **Responsive Design:** Fully responsive layout for desktop and mobile views.
- **Admin Panel:** Admin users can manage listings and users through a dedicated interface.

## Demo
https://mern-real-state-web-site.onrender.com/

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/temesgen-abebayehu/mern-real-state-web-site.git
   cd mern-real-state-web-site
   ```

2. **Install dependencies for both backend and frontend:**
   ```bash
   # Backend dependencies
   npm install

   # Frontend dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and specify the following:
   ```env
   MONGO_URI=<your_mongo_db_connection_string>
   TOKEN_SECRET=<your_token_secret>
   PORT=<your_port>
   ```

4. **Run the app:**
   ```bash
   # Start backend server
   npm run dev

   # Start frontend server
   cd ../client
   npm run dev
   ```

## Technologies Used
- **Frontend:** React with vite
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Other Libraries:** Axios, bcrypt, dotenv, validator


## Usage
- Sign up or log in to access user features.
- Use the search and filter options to browse listings.
- Manage listings through the admin panel.

## License
This project is licensed under the MIT License.
