# Notflix 🎥

**Notflix** is a movie streaming web application inspired by Netflix. It is built using **Angular 17+** for the frontend and **Node.js 19+** (or NestJS) for the backend. The project integrates **TMDB API** to fetch movie data and offers features like user authentication, role management, and infinite scrolling.

---

## Features 🚀

### 🎬 Movie Browsing
- Fetch movie lists and details from TMDB API.
- Infinite scrolling to load more movies seamlessly.
- Reusable **Movie Item** components showcasing:
  - Movie Poster
  - Title
  - Additional Details

### 🔑 User Authentication
- **Register & Login**:
  - Secure user registration and login.
  - JWT-based authentication using Passport.js.
- Role-based access to pages and features (e.g., Admin/Super).

### 🛠 Core Functionalities
- Modular structure with lazy loading for optimized performance.
- Angular Material UI components for consistent design.
- Environment-specific configurations.

### 📹 Movie Trailers
- Integrated YouTube player to display trailers.
- Pop-up dialogs for a better viewing experience.

### ⚙️ Backend
- Node.js or NestJS-based backend.
- MongoDB integration with TypeORM.
- API for user management and movie data.

---

## Project Structure 🏗️

### Frontend
- **Core Module**: Services and singleton components.
- **Shared Module**: Reusable components, directives, and pipes.
- Feature modules for each page (e.g., Home, Login, Register, Movie List).

### Backend
- Authentication with Passport.js and JWT.
- Database setup using TypeORM for MongoDB.
- Movie data fetching module using Axios.

---

## Installation 🖥️

### Frontend
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular project:
   ```bash
   ng serve
   ```

### Backend
1. Clone the backend repository:
   ```bash
   git clone https://github.com/Show3567/movie-nodejs-backend.git
   ```
2. Navigate to the project directory and install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

---

## API Integration 🔗

- **TMDB API**: Fetch movie data using endpoints like:
  - Discover Movies: `/discover/movie`
  - Movie Details: `/movie/{movie_id}`
  - Movie Trailers: `/movie/{movie_id}/videos`
- **Authentication APIs**: Register and Login.

---

## Advanced Features 🌟

- **SSR (Server-Side Rendering)**: Improved SEO and initial load times.
- **Infinite Scrolling**: Load movies dynamically as users scroll down.
- **Scroll Position Memory**: Retain scroll position when navigating back to the movie list.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Clustered Node.js**: Leveraging multiple cores for improved performance.
- **Dockerized Deployment**: Build, push, and deploy with Docker.

---

## Deployment 🚢

- **Google Cloud Artifact Registry**:
  - Store Docker images.
- **Google Cloud Run**:
  - Host the containerized app.
- **CI/CD with Cloud Build**:
  - Automated deployment pipeline triggered by Git pushes.

---

## Future Enhancements 🔮

- Implement **rate-limiting** and caching for performance.
- Add localization support (i18n).
- Enhance monitoring with Prometheus/Grafana.
- Support for additional user roles and permissions.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
