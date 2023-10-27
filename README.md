# Truenorth app api

This is the api for the Truenorth application.

### Env Setup

create a .env.development file with this:

```
DATABASE_URL="mysql://root:secret@localhost:3307/truenorth"
RANDOM_API_KEY="5878cbc4-8af3-4918-a6d7-3905f55cbd31"
PORT=4000
JWT_ACCESS_SECRET=123321
JWT_REFRESH_SECRET=123921
FRONTEND_WEBSITE="http://localhost:3000"
```

create a .env.test file with this:

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
npm install
npm run dev
```
