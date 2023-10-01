# Truenorth app api

This is the api for the Truenorth application.

### Setup database

```
npx prisma init
```

If mysql is not installed:

```
docker run -d --rm -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=truenorth --name prisma_db -p 3307:3306 mysql:8.0
```
