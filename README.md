# Node.js auth system

## Overview

This project is a Node.js application implementing user authentication features, including user login and registration. The application renders views using EJS and organizes its structure into separate files for controllers, routes, models, and middleware, ensuring a developer-friendly experience.

## Features

- User Registration
- User Login
- Displaying Views using EJS

## Structure

```
project-title
│
├── controllers
│   ├── authController.js
│   └── viewController.js
│
├── routes
│   ├── authRoutes.js
│   └── viewRoutes.js
│
├── models
│   ├── userModel.js
│   └── ...
│
├── middleware
│   ├── authMiddleware.js
│   └── ...
│
├── views
│   ├── login.ejs
│   ├── register.ejs
│   └── ...
│
├── app.js
└── package.json
```

## Setup and Installation

1. **Clone the repository**

```sh
git clone <repository-url>
cd <repository-name>
```

2. **Install dependencies**

```sh
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory and add the necessary environment variables. For example:

```
DB_STRING=mongodb+srv://<username>:<password>@cluster.mongodb.net/myFirstDatabase
SECRET_KEY=mysecretkey
```

4. **Start the server**

```sh
npm start
```

The application will be running on `http://localhost:<PORT>`, with the default port being `3000`.

## Usage

- Users can register by providing a username, email, and password.
- Registered users can log in by providing a valid email and password.
- Upon successful login, users will be redirected to the homepage/dashboard.

## Technologies Used

- Node.js
- Express.js
- EJS
- MongoDB/Mongoose (Optional, if using a database)

## Contributing

For contributing to this project, please fork the repository and submit a pull request with the proposed changes.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

Remember to customize the `README.md` file according to the specific details and requirements of your project, including the project title, repository URL, technologies used, and any additional setup, installation, or usage instructions.
