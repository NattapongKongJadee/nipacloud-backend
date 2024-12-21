# Installation & Guide

```
- npm install
- nodemon server.js
```
# Database
- Datastroage as JSON


# API -test

```
// POST
curl -X POST http://localhost:8000/api/tickets \
-H "Content-Type: application/json" \
-d '{
"title": "Bug in Production",
"description": "System crashes when saving a record.",
"contact": "user@example.com"
}'

// GET ALL
curl http://localhost:8000/api/tickets?sortBy=latestUpdate


//Update ticket
//curl -X PUT http://localhost:8000/api/tickets/1 \
-H "Content-Type: application/json" \
-d '{
"status": "accepted",
"description": "Issue identified, working on it."
}'
```
