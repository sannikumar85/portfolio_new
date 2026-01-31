# Portfolio Project

Full-stack portfolio website with contact form and admin panel.

## Project Structure

```
portfolio/
├── frontend/           # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── backend/           # Node.js backend
│   ├── server.js
│   ├── public/
│   ├── package.json
│   └── ...
└── README.md          # This file
```

## Quick Start

### 1. Start Backend Server

```bash
cd backend
npm install
npm start
```

Backend will run on: **http://localhost:5000**

### 2. Start Frontend Server

```bash
cd frontend  
npm install
npm run dev
```

Frontend will run on: **http://localhost:5173**

## Features

### Frontend (React + Vite)
- ✅ Modern portfolio design
- ✅ Responsive layout
- ✅ Dark/Light theme
- ✅ Contact form with validation
- ✅ Project showcase
- ✅ About section with timeline
- ✅ Services section
- ✅ Optimized images

### Backend (Node.js + Express)
- ✅ Contact form API with validation
- ✅ Admin authentication system
- ✅ Message management (CRUD)
- ✅ SQLite database
- ✅ Rate limiting & security
- ✅ Admin dashboard
- ✅ JWT authentication

## Admin Panel

Access the admin panel at: **http://localhost:5000/admin**

### Admin Credentials:
- **Email:** sannikumargupta43@gmail.com  
- **Password:** sanni8579@8579

### Admin Features:
- 📊 Dashboard statistics
- 📧 View all contact messages
- ✅ Mark messages as read
- 🗑️ Delete messages
- 📱 Responsive design
- 🔐 Secure JWT authentication

## API Endpoints

### Public Endpoints
- `GET /api/health` - Server health check
- `POST /api/contact` - Submit contact form
- `POST /api/admin/login` - Admin login

### Admin Endpoints (Require Authentication)
- `GET /api/admin/messages` - Get all messages with pagination
- `GET /api/admin/stats` - Get dashboard statistics  
- `PATCH /api/admin/messages/:id/read` - Mark message as read
- `DELETE /api/admin/messages/:id` - Delete message

## Environment Variables

Backend uses `.env` file:

```env
PORT=5000
NODE_ENV=development
ADMIN_EMAIL=sannikumargupta43@gmail.com
ADMIN_PASSWORD=sanni8579@8579
JWT_SECRET=your-super-secret-jwt-key
DB_PATH=./database.sqlite
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

## Technology Stack

### Frontend
- React 19.2.0
- Vite 7.2.7
- Tailwind CSS
- React Router (Hash Router)
- React Icons

### Backend
- Node.js
- Express.js
- SQLite3
- JWT Authentication
- bcryptjs for password hashing
- Express Rate Limit
- Helmet for security
- CORS

## Security Features

- ✅ Rate limiting (100 requests per 15 min, 5 contact forms per hour)
- ✅ Input validation and sanitization
- ✅ Password hashing with bcrypt
- ✅ JWT authentication for admin
- ✅ CORS configuration
- ✅ Security headers with Helmet
- ✅ SQL injection prevention

## Contact Form Flow

1. User fills form on frontend
2. Frontend sends data to backend API
3. Backend validates and saves to SQLite
4. Admin can view messages in admin panel
5. Admin can mark as read or delete messages

## Development

### Start both servers simultaneously:

**Terminal 1 (Backend):**
```bash
cd backend && npm run dev
```

**Terminal 2 (Frontend):**
```bash  
cd frontend && npm run dev
```

### Database

SQLite database file: `backend/database.sqlite`

Tables:
- `messages` - Contact form submissions
- `admins` - Admin users

## Deployment

### Frontend
Deploy `frontend/` folder to Netlify, Vercel, or similar.

### Backend  
Deploy `backend/` folder to Heroku, Railway, or VPS.

Update CORS_ORIGINS in production to include your frontend domain.

## Testing

### Test Contact Form:
1. Go to http://localhost:5173/contact
2. Fill and submit the form
3. Check backend logs for success

### Test Admin Panel:
1. Go to http://localhost:5000/admin
2. Login with admin credentials
3. View submitted messages

## Support

For issues or questions, contact: sannikumargupta43@gmail.com