## Introduction
This document provides detailed information about the usage of the "person" API. The API allows you to perform CRUD (Create, Read, Update, Delete) operations on a "person" resource.

## Endpoints

### 1. Create a Person
- URL: `/api/:name` or `/api`
- Method: POST
- Request Body (JSON):
  ```json
  {
    "name": "John Doe",
  }

- Response (JSON):
  ```json
  {
    "_id": "5f723e717e0d362ca4620d7d",
    "name": "John Doe",
  }

### 2. Read a Person
- URL: `/api/:param`
- Method: GET
- Response (JSON):
  ```json
  {
    "_id": "5f723e717e0d362ca4620d7d",
    "name": "John Doe",
  }

### 3. Update a Person
- URL: `/api/:param`
- Method: PUT
- Request Body (JSON):
  ```json
  {
    "name": "Updated Name",
  }

- Response (JSON):
  ```json
  {
    "_id": "5f723e717e0d362ca4620d7d",
    "name": "Updated Name",
  }

### 4. Delete a person
- URL: `/api/:param`
- Method: DELETE
- Response (JSON):
  ```json
  {
    "message": "Person deleted successfully"
  }

# Database Modelling: (Bonus)
The database model defines the structure and behavior of the "user" resource. It ensures data integrity and validation.
![uml](/screenshots/uml.png)

## Sample Usage

### Create a Person
- **POST `/api/:name`**: This route allows you to create a new person (user) by providing their name as a parameter. You can also check the JSON body for the name, allowing you to create a person either by providing the name in the URL parameter or in the request body.

### Create a Person with JSON Body
- **POST `/api/`**: This route is similar to the previous one, but it allows you to create a new person with the name provided in the JSON body.

### Read a Person
Retrieve a Person by ID or Name
- **GET `/api/:idOrName`**: This route allows you to retrieve a person (user) by either their ID or name. The idOrName parameter in the URL can be either an ID or a name, and the api will determine the appropriate way to query the database based on the input

### Update a Person
Update a Person by ID or Name
- **PUT `/api/:idOrName`**: This route allows you to update a person (user) by either their ID or name. Similar to the GET route, it takes the idOrName parameter and updates the person based on the provided fields in the request body.

### Delete a Person
Delete a Person by ID or Name
- **DELETE `/api/:idOrName`**: This route allows you to delete a person (user) by either their ID or name. Like the GET and PUT routes, it takes the idOrName parameter and deletes the person based on whether it's an ID or a name.

## Limitations and Assumptions
- This API assumes that names are unique identifiers for persons.
- Validation is minimal in this example, and would need enhancement for production use.
- Additional fields can be included in requests and responses based on requirements.

## Setup and Deployment
- Clone the repository: git clone https://github.com/remy01gh/hng-stageTwo
- Install dependencies: npm install
- Configure your MongoDB connection in the code.
- Start the server: npm start
- The API will be available at https://remy-tasktwo-hng.onrender.com/

For deployment, refer to the deployment documentation of your hosting platform.