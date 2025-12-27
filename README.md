# AccessiShop

AccessiShop is an accessibility-focused e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js). It is designed to simplify online shopping for users who face usability challenges by offering a clean UI, core shopping features, and user authentication.

## Features

- **Storefront**: Browse products by category.
- **Product Details**: Detailed view of products with simple descriptions for better readability.
- **Cart System**: Add, update, and remove items from a persistent shopping cart.
- **Authentication**: Secure user login and signup functionality.
- **Responsive Design**: Built to work across different screen sizes.
- **Dockerized**: Entire stack runs within Docker containers for easy deployment.

## Accessibility and Alternative Navigation

This project is built with an "Accessibility First" mindset, ensuring that users who cannot or prefer not to use a traditional mouse and keyboard can still shop with ease.

### Alternative Navigation Options

- **Smart Keyboard Navigation**: Users can navigate the entire website using only the **Tab** key. The focus follows a logical order (from top to bottom, left to right), ensuring that users don't get lost.
- **Visible Focus Indicators**: Every interactive element (buttons, links, inputs) has a clear, high-contrast visual outline when selected via keyboard, so users always know exactly where they are.
- **Skip to Content**: A hidden "Skip to content" link is available for keyboard users, allowing them to jump over the navigation menu and get straight to the products.

### Keyboard-Only Usage

Everything you can do with a mouse, you can do with a keyboard:
- Browse products and categories.
- Open product details and view images.
- Add items to the cart and update quantities.
- Complete the login and signup processes safely.

### Voice-Based Interaction (Web Speech API)

For users who find typing difficult, we have integrated voice-based searching:
- **How it works**: Simply click the microphone icon in any search bar and speak.
- **Speech-to-Text**: The website uses the Web Speech API to convert your spoken words into text instantly.
- **Effortless Searching**: Spoken words automatically filter the product catalog, removing the need for high-speed typing.

### Accessibility-Focused Features

- **Clear Labels**: Every input field (like Email or Password) has a visible, high-contrast label so users know exactly what info is required.
- **Semantic HTML**: We use meaningful HTML tags (like `<button>`, `<nav>`, and `<main>`) so that Screen Readers can accurately describe the page to visually impaired users.
- **Large Interaction Areas**: Buttons and links are designed with enough padding to be easily clickable or selectable.

### Fallback Behavior

We have designed the system to be resilient:
- **No Speech Support?**: If a browser doesn't support voice input, the microphone icon is automatically hidden, and the user can still use the traditional keyboard or screen-reader navigation.
- **Permission Denied?**: If a user denies microphone access, the system gracefully stays on text-based input, ensuring no functionality is broken.

### Who Benefits?

- **Users with motor impairments** who find it difficult to use a mouse or keyboard.
- **Users with visual challenges** who rely on screen readers and keyboard sequences.
- **Hands-free users** who prefer speaking over typing.
- **Everyone** who appreciates a clean, intuitive, and high-contrast user interface.

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

Run the following command in the **project root folder** (where the `docker-compose.yml` file is located) to start the entire application:

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
