# ToDo List Application

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5-green?style=for-the-badge&logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6-52B0E7?style=for-the-badge&logo=sequelize)](https://sequelize.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-EF4444?style=for-the-badge&logo=turborepo)](https://turbo.build/)

A modern, full-stack ToDo list application built with Next.js and Express in a monorepo architecture. This project demonstrates best practices for building scalable web applications with TypeScript, shared types, and a clean separation between frontend and backend.

## 🌟 Key Features

- ✅ **Complete CRUD Operations**: Create, read, update, and delete todos
- 🏗️ **Monorepo Architecture**: Shared types and utilities across frontend and backend
- 🔒 **Type Safety**: End-to-end TypeScript with shared type definitions
- 🚀 **Modern Stack**: Next.js 15 with App Router and Express 5
- 💾 **PostgreSQL Database**: Reliable data persistence with Sequelize ORM
- 🎨 **Modern UI**: Clean, responsive interface with Tailwind CSS 4
- 📦 **Workspace Management**: Yarn workspaces for efficient dependency management
- ⚡ **Hot Reload**: Fast development with tsx and Next.js Turbopack
- 🛡️ **Rate Limiting**: API protection with express-rate-limit
- 🔧 **Environment Configuration**: Easy setup with dotenv

## Technology Stack

### Frontend (`apps/to-do`)
- **Framework:** [Next.js](https://nextjs.org/) (v15.5.4 with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (v5)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
- **UI Components:** React 19

### Backend (`apps/to-do-api`)
- **Framework:** [Express](https://expressjs.com/) (v5)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (v5.9.3)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (v14+)
- **ORM:** [Sequelize](https://sequelize.org/) (v6.37.7)
- **Dev Tools:** [tsx](https://github.com/esbuild-kit/tsx) for hot reload
- **Security:** [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit)

### Shared (`packages/shared`)
- **Purpose:** Shared TypeScript types and utilities
- **Types:** `TToDo`, `TToDoCreate`, `TToDoUpdate`

### Build System
- **Monorepo:** [Turborepo](https://turbo.build/)
- **Package Manager:** [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [Yarn](https://yarnpkg.com/) (v1.22.x or later)
- [PostgreSQL](https://www.postgresql.org/) (v14.x or later)

## Getting Started

Follow these steps to set up and run the application locally:

### 1. Clone the Repository

```bash
git clone https://github.com/cristoferespindola/to-do-app.git
cd to-do-app
```

### 2. Install Dependencies

```bash
yarn install
```

This will install dependencies for all workspaces (frontend, backend, and shared package).

### 3. Set Up PostgreSQL Database

#### Start PostgreSQL (if using Homebrew on macOS):
```bash
brew services start postgresql@14
```

#### Create the database:
```bash
psql -U $USER -d postgres -c "CREATE DATABASE todo_db;"
```

### 4. Configure Environment Variables

#### Backend Configuration:

Create a `.env` file in `apps/to-do-api/`:

```bash
cd apps/to-do-api
cp .env.example .env
```

Edit `.env` with your database credentials:

```plaintext
# apps/to-do-api/.env
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_db
```

### 5. Run the Development Servers

#### Option A: Run both apps simultaneously (recommended)

From the root directory:

```bash
yarn dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

#### Option B: Run apps separately

**Backend:**
```bash
cd apps/to-do-api
yarn dev
```

**Frontend (in another terminal):**
```bash
cd apps/to-do
yarn dev
```

## API Endpoints

### Base URL: `http://localhost:3001/api`

#### Get All Todos
- **Endpoint:** `GET /todos`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "Buy groceries",
      "completed": false,
      "createdAt": "2025-10-08T13:43:13.701Z",
      "updatedAt": "2025-10-08T13:43:13.701Z"
    }
  ]
  ```

#### Create Todo
- **Endpoint:** `POST /todos`
- **Request Body:**
  ```json
  {
    "title": "New todo item"
  }
  ```
- **Response:** Returns the created todo object

#### Update Todo
- **Endpoint:** `PUT /todos/:id`
- **Request Body:**
  ```json
  {
    "title": "Updated title"
  }
  ```
- **Response:** Returns the updated todo object

#### Delete Todo
- **Endpoint:** `DELETE /todos/:id`
- **Response:**
  ```json
  {
    "message": "Todo deleted"
  }
  ```

## Project Structure

```
to-do-app/
├── apps/
│   ├── to-do/                    # Next.js Frontend
│   │   ├── src/
│   │   │   └── app/
│   │   │       ├── layout.tsx    # Root layout
│   │   │       ├── page.tsx      # Home page
│   │   │       └── globals.css   # Global styles
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── next.config.ts
│   │
│   └── to-do-api/                # Express Backend
│       ├── todos/
│       │   ├── model.ts          # Sequelize Todo model
│       │   └── routes.ts         # Todo routes
│       ├── helpers/
│       │   └── seed.ts           # Database seeding
│       ├── db.ts                 # Database configuration
│       ├── index.ts              # Express app entry
│       ├── package.json
│       ├── tsconfig.json
│       ├── .env.example          # Environment template
│       └── .gitignore
│
├── packages/
│   └── shared/                   # Shared Types Package
│       ├── src/
│       │   ├── types/
│       │   │   └── todos.ts      # Todo type definitions
│       │   └── index.ts          # Package exports
│       ├── package.json
│       └── tsconfig.json
│
├── package.json                  # Root workspace config
├── turbo.json                    # Turborepo configuration
├── yarn.lock
└── README.md
```

## Shared Types Package

The `@to-do/shared` package provides type-safe communication between frontend and backend:

```typescript
// packages/shared/src/types/todos.ts

export type TToDo = {
  id: number;
  title: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TToDoCreate = Omit<TToDo, 'id' | 'createdAt' | 'updatedAt'>

export type TToDoUpdate = Partial<TToDoCreate>
```

### Usage Example:

**Frontend:**
```typescript
import { TToDo } from '@to-do/shared';

const todos = await response.json() as TToDo[];
```

**Backend:**
```typescript
import { TToDo } from '@to-do/shared';

export const Todo = db.define<Model<TToDo, TodoCreationAttributes>>('Todo', {
  // ...
});
```

## Development Commands

### Root Level Commands:

```bash
# Install all dependencies
yarn install

# Run all apps in dev mode
yarn dev

# Build all apps
yarn build

# Clean all node_modules and build artifacts
yarn clean
```

### Frontend Commands:

```bash
cd apps/to-do

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run linter
yarn lint
```

### Backend Commands:

```bash
cd apps/to-do-api

# Start development server with hot reload
yarn dev

# Build TypeScript
yarn build

# Start production server
yarn start
```

## Database Management

### Seeding the Database

The application automatically seeds the database with sample todos on startup. To modify the seed data, edit `apps/to-do-api/helpers/seed.ts`.

### Reset Database

To reset the database (⚠️ **Warning: This deletes all data**):

```bash
psql -U $USER -d postgres
DROP DATABASE todo_db;
CREATE DATABASE todo_db;
\q
```

Then restart the backend server to re-run migrations and seed.

## Security Features

- **Rate Limiting**: API endpoints are protected with rate limiting (100 requests per 15 minutes)
- **Environment Variables**: Sensitive data stored in `.env` files (gitignored)
- **Input Validation**: Title validation on todo creation
- **CORS**: Configure CORS settings for production deployment

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set the root directory to `apps/to-do`
4. Deploy

### Backend (Railway/Render/Heroku)

1. Set environment variables in your hosting platform
2. Configure build command: `cd apps/to-do-api && yarn build`
3. Configure start command: `cd apps/to-do-api && yarn start`
4. Add PostgreSQL database addon

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License

Copyright (c) 2025 Cristofer Espindola

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Author

**Cristofer Espindola**

- GitHub: [@cristoferespindola](https://github.com/cristoferespindola)

---

Made with ❤️ and TypeScript
