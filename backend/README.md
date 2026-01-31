# Portfolio Backend

Backend API for portfolio contact form and admin panel.

## Features

- ✅ Contact form submission with validation
- ✅ Admin authentication with JWT
- ✅ Admin dashboard to view messages
- ✅ SQLite database for data storage
- ✅ Rate limiting and security middleware
- ✅ Input validation and sanitization
- ✅ Message status tracking (read/unread)
- ✅ Dashboard statistics

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment variables:**
   Copy `.env.example` to `.env` and update values:
   ```bash
   cp .env.example .env
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Start production server:**
   ```bash
   npm start
   ```

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

## Admin Credentials

- **Email:** sannikumargupta43@gmail.com
- **Password:** sanni8579@8579

## Database

Using SQLite for data storage. Database file: `database.sqlite`

### Tables
- `messages` - Contact form submissions
- `admins` - Admin users

## Security Features

- Helmet for security headers
- Rate limiting (100 requests per 15 minutes, 5 contact forms per hour)
- Input validation and sanitization
- JWT authentication for admin
- Password hashing with bcrypt
- CORS configuration

## Development

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

## Environment Variables

```env
PORT=5000
NODE_ENV=development
ADMIN_EMAIL=sannikumargupta43@gmail.com
ADMIN_PASSWORD=sanni8579@8579
JWT_SECRET=your-super-secret-jwt-key
DB_PATH=./database.sqlite
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```