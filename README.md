# AccessiShop

AccessiShop is an accessibility-focused e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js). It is designed to simplify online shopping for users who face usability challenges by offering a clean UI, core shopping features, and user authentication.

## Features

- **Storefront**: Browse products by category.
- **Product Details**: Detailed view of products with simple descriptions for better readability.
- **Cart System**: Add, update, and remove items from a persistent shopping cart.
- **Authentication**: Secure user login and signup functionality.
- **Responsive Design**: Built to work across different screen sizes.
- **Dockerized**: Entire stack runs within Docker containers for easy deployment.

## Technology Stack

- **Frontend**: React, React Router, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **DevOps**: Docker, Docker Compose

## Project Structure

```text
AccessiShop/
├── client/           # React frontend
│   ├── src/          # Frontend source code
│   └── Dockerfile    # Docker config for frontend
├── server/           # Express backend
│   ├── models/       # Mongoose schemas
│   ├── controllers/  # API logic
│   ├── routes/       # API endpoints
│   └── Dockerfile    # Docker config for backend
├── docker-compose.yml # Orchestrates frontend, backend, and MongoDB
└── README.md         # Project documentation
```

## Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your machine.

### Running with Docker

The entire application can be started with a single command:

```bash
docker compose up --build
```

- **Frontend**: Accessible at [http://localhost:3000](http://localhost:3000)
- **Backend API**: Accessible at [http://localhost:5000](http://localhost:5000)
- **MongoDB**: Runs on port 27017

### Environment Variables

The application uses environment variables for configuration. In the `docker-compose.yml`, the following defaults are set for the backend:

- `MONGO_URI`: `mongodb://mongodb:27017/accessishop`
- `JWT_SECRET`: `your_jwt_secret_here`
- `PORT`: `5000`

## API Endpoints

### Auth
- `POST /api/auth/signup`: Register a new user
- `POST /api/auth/login`: Authenticate user & get token

### Products
- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a single product
- `POST /api/products`: Create a product (Admin)
- `PUT /api/products/:id`: Update a product (Admin)
- `DELETE /api/products/:id`: Delete a product (Admin)

### Cart (Requires Auth)
- `GET /api/cart`: Get current user's cart
- `POST /api/cart/add`: Add/Update item in cart
- `DELETE /api/cart/remove`: Remove item from cart
- `DELETE /api/cart/clear`: Empty the cart

## Recent Improvements

- **Dockerization**: Integrated multi-stage Docker builds and Docker Compose for seamless setup.
- **Code Quality**: Added JSDoc comments to all backend controllers and improved validation logic.
- **Security**: Enhanced email format and password strength validation during signup.
- **Documentation**: Completely revamped README with setup instructions and API details.
