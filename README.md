# Task Management System

Source files for the Task Management System application built with Laravel and Next.js.

## Features

- Laravel backend with MySQL database
- Next.js frontend
- Authentication with Laravel Breeze
- Task management with CRUD operations
- Task filtering and sorting
- Task status updates
- Task assignment to users


## Technologies

- Laravel 10.x (with Breeze, Sail, and Sanctum)
- Next.js
- MySQL
- Shadcn UI (Tailwind CSS)
- Docker (optional)


## Folder Structure

- `client` - Contains the Next.js frontend application
- `server` - Contains the Laravel backend application

## Getting Started

To get started with the application, you need to set up the Laravel backend and Next.js frontend.

## Installation and Running the App

### Prerequisites
- PHP (Version 8.1.x)
- MySQL (Version 8.x)
- Composer
- Node.js ^18.x and npm

### Setting Up Laravel Backend

1. Clone the repository:

```bash
git clone https://github.com/ayequill/task-management-sys.git
```

2. Navigate to the Laravel directory:

```bash
cd task-management-sys/server
```

3. Install PHP dependencies using Composer:

```bash
composer install
```

4. Create a `.env` file by duplicating `.env.example` and updating the relevant configurations like database connection, frontend URL, etc.

```bash
cp .env.example .env
```

Update the following configurations in the `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

5. Generate application key:

```bash
php artisan key:generate
```

6. Run database migrations if everything is set up correctly:

```bash
php artisan migrate
```

7. Seed the database (if needed):

```bash
php artisan db:seed
```

8. Start the Laravel development server:

```bash
php artisan serve
```

### Running the App using Sail

1. Make sure you have Docker installed on your machine. Run the following command to install Sail's dependencies:

```bash
./vendor/bin/sail install
```

2. Start the Sail containers:

```bash
./vendor/bin/sail up -d
```

Sail uses default services like MySQL, Redis etc. You can customize the services by updating the `docker-compose.yml` file. Unless it will use the default ports. 

3. Access the application in your browser using `http://localhost`.

### Setting Up Next.js Frontend

1. Navigate to the Next.js directory:

```bash
cd ../client
```

2. Install Node.js dependencies:

```bash
npm install
```

### Running the Next.js App

1. Start the Next.js development server:

```bash
npm run dev
```

2. Access the Next.js app in your browser using `http://localhost:3000`.

### If all dependencies are installed, you can simply use pm2 to run the app.

1. Install pm2 globally:

```bash
npm install pm2 -g
```

2. Run both the Laravel and Next.js app using pm2:

```bash
pm2 start ecosystem.config.js
```

3. You check the status of the running apps using:

```bash
pm2 status
```

That's it! You have successfully installed and set up the Laravel and Next.js application with authentication using Breeze.