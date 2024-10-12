## **README.md**


A full-stack web application with a Django backend (using SQLite) and a React frontend styled with Tailwind CSS. The backend processes uploaded CSV files using Pandas to infer data types, and the frontend allows users to upload these files and view results.


```
/fullstack-project
    /regex_app
    /data-frontend
    docker-compose.yml
```

### Technologies Used

- **Backend**: Django, Pandas, SQLite
- **Frontend**: React, Tailwind CSS
- **Docker**: Docker & Docker Compose for containerization

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Setting Up the Project

1. **Clone the repository**

    ```bash
    git clone rhombusai
    cd rhombusai
    ```

2. **Run the application with Docker Compose**

    ```bash
    docker-compose up --build
    ```

    This command will build and run both the backend and frontend services in Docker containers.


### Running Without Docker (Development Mode)

#### Backend (Django)

1. Navigate to the `regex_app` directory:

    ```bash
    cd regex_app
    ```

2. Install Python dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Run migrations and start the Django server:

    ```bash
    python manage.py migrate
    python manage.py runserver
    ```

    Backend will be available at [http://localhost:8000](http://localhost:8000).

#### Frontend (React)

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install Node.js dependencies:

    ```bash
    npm install
    ```

3. Start the React development server:

    ```bash
    npm start
    ```

    Frontend will be available at [http://localhost:3000](http://localhost:3000).

### Running Tests

#### Backend Tests (Django)

1. Navigate to the `regex_app` directory:

    ```bash
    cd regex_app
    ```

2. Run Django tests:

    ```bash
    python manage.py test
    ```

### Using the Application

1. Visit [http://localhost:3000](http://localhost:3000) to access the frontend.
2. Use the file upload form to select and upload a CSV file.
3. Processed data types will be inferred and displayed.

## Project Configuration

### Docker Compose

The `docker-compose.yml` file orchestrates the following services:
- `regex_app`: Runs the Django server on port `8000`.
- `frontend`: Serves the React app through Nginx on port `3000`.

