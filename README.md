# CRUD Application (Node + Express + MongoDB)

A minimal full-stack CRUD app that demonstrates **Create, Read, Update, Delete** with a simple HTML/JS frontend and an Express API.

## Features
- REST API: `/api/items` with POST, GET, PUT, DELETE
- Search by title (`/api/items?q=term`)
- Vanilla JS frontend with live list + edit/delete
- MongoDB via Mongoose
- Ready for local or cloud deployment (Render/Heroku + MongoDB Atlas)

## Getting Started

### 1) Clone & Install
```bash
git clone https://github.com/<your-username>/crud-app.git
cd crud-app
npm install
2) Configure Environment
Copy .env.example to .env and set MONGO_URI. For local MongoDB:

ini
Copy
Edit
MONGO_URI=mongodb://127.0.0.1:27017/crud_app
PORT=3000
3) Run
bash
Copy
Edit
npm start    # or: npm run dev
Open http://localhost:3000.

API
POST /api/items – create { title, description?, done? }

GET /api/items – list (optional ?q=search and ?sort=field)

GET /api/items/:id – get by id

PUT /api/items/:id – update any fields

DELETE /api/items/:id – remove

Deploy
Backend: Render/Heroku (set MONGO_URI env var).

Database: MongoDB Atlas.

Frontend is served by Express from public/.

License
MIT

markdown
Copy
Edit

---

## How to use this
1. Create a new folder `crud-app`, copy the files above into it using the same structure.
2. Run `npm install`.
3. Set up MongoDB locally or use MongoDB Atlas; put the URI in `.env`.
4. Run `npm start`, open `http://localhost:3000`, and you’ll have a working CRUD app.
5. Create a new GitHub repo and push this folder. Submit the repo link (and optional live link if you deploy).

If you want this in a different stack (e.g., **Django**, **Flask**, **Spring Boot**, or **React frontend**), say t