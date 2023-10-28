# Truenorth app api

This is the api for the Truenorth application.

### Env Setup

Install dependencies

```
npm install
```

Create a .env.development file with this:

```
DATABASE_URL="mysql://root:secret@localhost:3307/truenorth"
RANDOM_API_KEY="5878cbc4-8af3-4918-a6d7-3905f55cbd31"
PORT=4000
JWT_ACCESS_SECRET=123321
JWT_REFRESH_SECRET=123921
FRONTEND_WEBSITE="http://localhost:3000"
```

Create a .env.test file with this:

```
DATABASE_URL="mysql://root:secret@localhost:3307/test_truenorth"
JWT_ACCESS_SECRET=123321
JWT_REFRESH_SECRET=123921
```

### Setup database

If mysql is not installed:

```
docker run -d --rm -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=truenorth --name prisma_db -p 3307:3306 mysql:8.0
```

Run migrations

```
npm run migrate
```

Run seed

```
npm run seed
```

### Run development server

```
npm run dev
```

# API Endpoints Documentation

## Login Endpoint

- **URL:** `/api/v1/login`
- **Method:** `POST`
- **Description:** This endpoint is used to authenticate a user and obtain an access token.

### Request

- **Headers:**

  - `Content-Type`: `application/json`

- **Body:**
  ```json
  {
    "username": "example_username",
    "password": "example_password"
  }
  ```

## Refresh Token Endpoint

- **URL:** `/api/v1/refresh_token`
- **Method:** `POST`
- **Description:** This endpoint is used to refresh an expired access token by providing a valid refresh token through request cookies.

### Request

- **Headers:**

  - `Content-Type`: `application/json`

- **Cookies:**
  - `refreshToken`: `your_refresh_token_here`

### Response

- **Success Response (200 OK)**

  - **Body:**

  ```json
  {
    "accessToken": "new_access_token"
  }
  ```

## Create Operation Endpoint

- **URL:** `/api/v1/operations`
- **Method:** `POST`
- **Description:** This endpoint is used to make an operation.

### Request

- **Headers:**

  - `Content-Type`: `application/json`

- **Body:**
  ```json
  {
    "value1": "number",
    "value2": "number",
    "operationType": "string"
  }
  ```

### Response

- **Success Response (200 OK)**

  - **Body:**

  ```json
  {
    "result": "number"
  }
  ```

## Get all records Endpoint

- **URL:** `/api/v1/users/:user_id/records`
- **Method:** `GET`
- **Description:** This endpoint is used to retrieve all records from a user.

### Request

- **Headers:**

  - `Content-Type`: `application/json`

### Response

- **Success Response (200 OK)**

  - **Body:**

  ```json
  [
    {
      "id": "09ef2322-b8a4-49fd-970f-efb9d5f174a7",
      "userId": "bc682ca5-d1ae-4a61-a789-b3f4ab91b5ba",
      "operationId": "e563fad2-db73-42a5-9bbe-6ef750e90718",
      "amount": 12,
      "userBalance": 700,
      "operationResponse": "success",
      "deleted": false,
      "createdAt": "2023-10-27T03:32:14.548Z",
      "updatedAt": "2023-10-27T03:32:14.548Z"
    }
  ]
  ```

## Delete a record Endpoint

- **URL:** `/api/v1/records/:id`
- **Method:** `DELETE`
- **Description:** This endpoint is used to delete a record.

### Request

- **Headers:**

  - `Content-Type`: `application/json`

### Response

- **Success Response (200 OK)**

  - **Body:**

  ```json
  {
    "message": "Record deleted successfully"
  }
  ```
