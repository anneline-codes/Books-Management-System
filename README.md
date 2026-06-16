# 📚 Mugisha's Bookstore API

A REST API to manage books at Mugisha's bookstore in Kigali, built with Express.js, MongoDB, and Mongoose.

## Project Structure

```
mugisha-bookstore/
├── models/
│   └── Book.js        # Mongoose Book schema
├── routes/
│   └── books.js       # All CRUD routes
├── .env               # Environment variables
├── package.json
├── server.js          # App entry point
└── README.md
```

## Setup & Run
```
npm install
npm start          # production
npm run dev        # development (auto-restart with nodemon)
```

## API Endpoints

| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| GET    | `/`                | Health check        |
| POST   | `/api/books`       | Add a new book      |
| GET    | `/api/books`       | Get all books       |
| GET    | `/api/books/:id`   | Get one book by ID  |
| PUT    | `/api/books/:id`   | Update a book       |
| DELETE | `/api/books/:id`   | Delete a book       |

## Example Requests

### Add a book
```http
POST /api/books
Content-Type: application/json

{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "price": 3500
}
```

### Get all books
```http
GET /api/books
```

### Get one book
```http
GET /api/books/64f1a2b3c4d5e6f7a8b9c0d1
```

### Update a book
```http
PUT /api/books/64f1a2b3c4d5e6f7a8b9c0d1
Content-Type: application/json

{
  "price": 4000
}
```

### Delete a book
```http
DELETE /api/books/64f1a2b3c4d5e6f7a8b9c0d1
```

## Environment Variables (.env)

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/mugisha_bookstore
```
