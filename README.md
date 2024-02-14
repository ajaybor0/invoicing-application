# Project Documentation

This documentation provides an overview of the project structure, API endpoints, database models, and instructions for setting up the project. The project is built using React.js, Node.js, Express.js, and MongoDB.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Setup Instructions](#setup-instructions)
3. [API Endpoints](#api-endpoints)
4. [Database Models](#database-models)

## Project Overview

This Invoicing App is designed to streamline the invoicing process for businesses or individuals by providing essential features such as client information storage, quick invoice generation, and easy invoice sending.

**Live App Demo** : [https://invoicing-application.vercel.app/](https://invoicing-application.vercel.app/)

## Setup Instructions

#### Step 1: Clone the repository

```bash
git clone https://github.com/ajaybor0/invoicing-application.git
```

```bash
cd invoicing-application
```

#### Step 2: Create Your Accounts

- Create a MongoDB database and obtain your MongoDB URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- Create a Twilio account and obtain your Account Sid, Auth Token & Phone Number from [Twilio](https://www.twilio.com/en-us).
- Create a Brevo account and generate a new SMTP Key from [Brevo](https://www.brevo.com/)

#### Step 3: Edit the Environment File

- Rename the `.env.example` file to `.env` and add the following environment variables:

`backend`

```
NODE_ENV=development
PORT=5000
JWT_SECRET=add_your_jwt_secret
MONGO_URI=add_your_mongo_uri

EMAIL_HOST=add_your_email_host
EMAIL_PORT=add_your_email_port
EMAIL_USER=add_your_user_email
EMAIL_PASS=add_your_email_pass
EMAIL_FROM=add_your_email_from

TWILIO_ACCOUNT_SID=add_your_twilio_account_sid
TWILIO_AUTH_TOKEN=add_your_twilio_auth_token
TWILIO_PHONE_NUMBER=add_your_twilio_phone_number
```

`frontend`

```
VITE_NODE_ENV=development
VITE_BACKEND_SERVER=your_backend_server_url
```

#### Step 4: Install Backend Dependencies

In your terminal, navigate to the /backend directory

```bash
cd backend
```

run the following command to install the backend dependencies:

```bash
npm install
```

This command will install all the required packages specified in the package.json file.

#### Step 5: Run the Backend Server

In the same terminal, run the following command to start the backend server:

```bash
npm run dev
```

This command will start the backend server, and it will listen for incoming requests.

#### Step 6: Install Frontend Dependencies

Open a new terminal window , and run the following command to install the frontend dependencies:

```bash
cd frontend
```

```bash
npm install
```

#### Step 7: Run the Frontend Server

After installing the frontend dependencies, run the following command in the same terminal to start the frontend server:

```bash
npm run dev
```

This command will start the frontend server, and you'll be able to access the website on `localhost:5173` in your web browser.

## API Endpoints

### 1. Register user

- **Endpoint:** `POST /api/v1/users`
- **Input:**
  - `name` (string)
  - `email` (string)
  - `password` (string)

### 2. Log In user

- **Endpoint:** `POST /api/v1/users/login`
- **Input:**
  - `email` (string)
  - `password` (string)

### 3. Save Client

- **Endpoint:** `POST /api/v1/clients`
- **Input:**
  - `name` (string)
  - `email` (string)
  - `phone` (string, including country code)
  - `picture` (string, optional)
- **Authorization:** JWT token required

### 4. Get Clients

- **Endpoint:** `GET /api/v1/clients`
- **Authorization:** JWT token required

### 5. Create Invoice

- **Endpoint:** `POST /api/v1/invoices`
- **Input:**
  - `userId` (objectId)
  - `clientId` (objectId)
  - `items` (array of items)
  - `totalAmount` (number)
  - `status` (boolean)
- **Authorization:** JWT token required

### 6. Get Invoices

- **Endpoint:** `GET /api/v1/invoices`
- **Authorization:** JWT token required

### 7. Get Invoices

- **Endpoint:** `GET /api/v1/invoices/:id`
- **Input:**
  - `invoiceId` (objectId)
- **Authorization:** JWT token required

### 8. Send Invoice

- **Endpoint:** `POST /api/v1/invoices/send-invoice/:id`
- **Input:**
  - `invoiceId` (objectId)
- **Authorization:** JWT token required

### 9. Update Invoice to Paid

- **Endpoint:** `PUT /api/v1/invoices/pay/:id`
- **Input:**
  - `invoiceId` (objectId)
  - `status` (boolean)
- **Authorization:** JWT token required

### 10. Upload Image

- **Endpoint:** `POST /api/v1/uploads`
- **Input:**
- `image` (file, optional)
- **Authorization:** JWT token required

## Database Models

### 1. User Model

```javascript
{
  _id: ObjectId, // Generate by MongoDB
  name: String,
  email: String,
  password: String
}
```

### 2. Client Model

```javascript
{
  _id: ObjectId, // Generate by MongoDB
  userId: ObjectId, // Reference to User Model
  name: String,
  email: String,
  phone: String, // Including country code
  picture: String
}
```

### 3. Invoice Model

#### Item Schema

```javascript
{
  item: String,
  rate: Number,
  hours: Number
}
```

```javascript
{
  _id: ObjectId, // Generate by MongoDB
  userId: ObjectId, // Reference to User Model
  clientId: ObjectId, // Reference to Client Model
  items: Array, // Item schema
  dueDate: Date,
  status: Boolean,
  totalAmount: Number,
  paymentTerms: String //'NET 30'
}
```
