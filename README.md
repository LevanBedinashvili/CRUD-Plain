# Plain PHP API CRUD + AJAX

This project is a simple PHP-based CRUD (Create, Read, Update, Delete) API with a frontend implemented using AJAX. The backend follows object-oriented programming (OOP) and SOLID principles. The frontend uses AJAX to make asynchronous requests to the API, enabling seamless interaction without page reloads.

## Features

- **CRUD Operations**: Create, Read, Update, Delete records via an API.
- **AJAX Frontend**: Allows frontend interaction with the backend without page reloads.
- **PDO for Secure Database Interaction**: The API uses PDO for secure SQL queries and database interaction.
- **Design**: For design is used Bootstrap5

## Requirements

- Used PHP version: 8.2.12
- A MySQL database
- A web browser for testing the frontend

## Installation Guide

### 1. **Run the Backend API**
To start the backend API, you can use PHP's built-in server.

1. Open a terminal and navigate to  project's backend directory.
2. Run the following command to start the server:
    ```bash
    php -S localhost:8000
    ```

   This will start the PHP server on `http://localhost:8000`.

### 2. **Setup Frontend**
To set up the frontend:

- Simply open the `index.html` file in your preferred web browser. The frontend will interact with the backend API through AJAX requests.

### 3. **Database Setup**
Create a database and table for storing records:

1. Create a database in MySQL (e.g., `employee_crud`).
2. Execute the following SQL query to create a `employees` table:

    ```sql
      CREATE TABLE `employees` (
        `id` int(11) NOT NULL,
        `first_name` varchar(100) NOT NULL,
        `last_name` varchar(100) NOT NULL,
        `email` varchar(100) NOT NULL,
        `phone` varchar(100) NOT NULL,
        `position` varchar(100) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    ```

### 4. **Configure Database Connection**
Update the `config/Database.php` file with your database credentials (username, password, database name) for a successful connection.
