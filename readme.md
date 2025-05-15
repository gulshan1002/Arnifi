# Arnifi Backend

A Node.js/Express backend for the Arnifi project, providing authentication and blog APIs with MongoDB integration, JWT-based authentication, and Azure deployment support.

---

## Features

- User authentication (signup, login, logout) with JWT (stored in HTTP-only cookies)
- Blog CRUD (Create, Read, Update, Delete) operations
- MongoDB Atlas/CosmosDB integration
- Environment-based configuration (development/production)
- Docker support
- CI/CD pipeline with GitHub Actions and Azure Web App deployment
- Comprehensive API testing with Jest and Supertest

---

## Installation

```bash
# Clone the repository
git clone https://github.com/gulshan1002/Arnifi.git

# Navigate to the project directory
cd Arnifi

# Install dependencies
npm install
```

---

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
NODE_ENV=development
```

For production, use `.env.production` and set appropriate values.

---

## Usage

### Start the development server

```bash
npm start
```

### Run tests

```bash
npm test
```

### Build and run with Docker

```bash
docker build -t arnifi-backend .
docker run -p 3000:3000 arnifi-backend
```

---

## API Endpoints

### Auth

- `POST /auth/signup` – Register a new user (`username`, `email`, `password`)
- `POST /auth/login` – Login and receive JWT in cookie (`email`, `password`)
- `POST /auth/logout` – Logout user (clears cookie)

### Blogs

- `GET /blogs` – Get all blogs (requires authentication)
- `GET /blogs/:id` – Get a blog by ID (requires authentication)
- `POST /blogs` – Create a new blog (requires authentication)
- `PUT /blogs/:id` – Update a blog (requires authentication, must be author)
- `DELETE /blogs/:id` – Delete a blog (requires authentication, must be author)

---

## CI/CD

- Automated tests and deployment via GitHub Actions.
- Docker image is built and pushed to Azure Container Registry.
- Deployment to Azure Web App for Containers.

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---










- [Supertest](https://github.com/visionmedia/supertest)- [Jest](https://jestjs.io/)- [Azure](https://azure.microsoft.com/)- [MongoDB](https://www.mongodb.com/)- [Express.js](https://expressjs.com/)
## Acknowledgements
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Azure](https://azure.microsoft.com/)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/visionmedia/supertest)