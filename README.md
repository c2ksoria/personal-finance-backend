# API Rest for Personal Finances Project

This project that consists of an application for personal income and expense records. Where you can perform the basic CRUD operations: Create, Read, update and delete Movement records individually. Also are added a functionality can make some records semi automatic, just for show a fast testing propourses on fornt-end.


## Behind the scenes

Worked with mysql as the database engine and `Nodejs` on the backend and `Reactjs` on the frontend. Although it is very simple, it is very complete and interesting because it develops some very useful features and concepts in the software industry, among them we can name:
- Basic CRUD on both frontend and backend.
- Simple routes.
- Easy readable code.
- Ready to start testing (script for create database, tables and some values).
- Well use of handling errors.
- Possibility of creating multiple records at once, although this possibility is intended for sample purposes only; It works very well.
- Management of asynchronous functions for database queries.

### Technologies used:

Node.js and Express for the backend server.

MySQL as a relational database.

### Structure Project
```
personal-finance-backend/
├── src/
│   ├── Data/create_db.sh
│   ├── Controllers/movements.js
│   ├── Routes/routes.js
│   ├── Config/
│       ├────── config.js
│       └────── connection.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

controllers/: Contains the business logic for each endpoint.

routes/: Defines API routes and associates them with their corresponding controllers.

models/: Defines the data models and database access logic.

Data: Contains the script to create the database and the necessary tables.

## DB structure

This project uses a database with the following tables:

```
category – contains transaction categories (e.g., Food, Transportation, etc.)

type – defines the transaction type: Income or Expense

movements – main transaction table with date, amount, category, and type
```

# Installation and execution

## Prerequisites
Node.js (v14 or higher)

MySQL

Docker (optional, but recommended for a consistent development environment)

## Installation steps
Clon repository:

```
git clone https://github.com/c2ksoria/personal-finance-backend.git
cd personal-finance-backend
```

### Install dependencies:

```
npm install
```

Configure environment variables in a .env file:

```
// Enviroment Varialble for App Port
PORT = 3001

//Enviroment Varialble Data Base Setting:
DB_HOST = 'localhost'
DB_USER = 'root'
DB_NAME = 'finances'
DB_PASSWORD = '123456'
DB_PORT = '3306'

```
### Create a Mysql data

In order to create very fast all tables of the Data Base, I created a script in bash. Please read it, you can modify all neccesary fields in `create_db.sh` file, with is located in `scr/Data/`:

[create_db](https://github.com/c2ksoria/personal-finance-backend/blob/main/src/Data/create_db.sh)

For execute the script launch terminal on the main folder of this project, then execute this commands:

```
cd /src/Data
chmod +x create_db.sh
./create_db.sh
```

## How to Run

### Run on Develop

npm run dev

### Run on Production

Use or modify start script

# API - Endpoints

The application exposes several routes for interacting with money transactions. Each is detailed below:

### Configuration
`GET /getconfig`
Returns general configuration information (e.g., available categories and types).

### Transactions

`GET /movements`
Returns all transactions recorded in the database, including category, type, date, and amount.

`GET /movements/item?id={id}`
Returns a specific transaction based on its ID.

`POST /movements/add`
Adds a new transaction. The request body must include: category, type, details, date, and quantity.

`PUT /movements/update/:id`
Updates an existing transaction. The :id corresponds to the transaction to be modified.

`DELETE /movements/delete/?id={id}`
Deletes a move based on its ID.

### Utilities
`POST /movements/getrandom`
Generates or returns random moves for testing or development.