const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware - configured to allow CORS
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Contact form specific rate limit
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact form submissions per hour
  message: 'Too many contact form submissions, please try again later.'
});

// CORS configuration - Allow multiple origins for production
const allowedOrigins = [
  'https://portfolio-new-b6ld.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Allow any vercel.app subdomain or listed origins
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(null, true); // Allow all origins for now - remove this in strict production
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files (admin panel)
app.use('/admin', express.static(path.join(__dirname, 'public')));

// Root route - API health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio API is running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      messages: '/api/messages',
      login: '/api/admin/login',
      admin: '/admin'
    }
  });
});

// API health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});

// Serve admin panel at root admin route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Database setup
const dbPath = process.env.DB_PATH || './database.sqlite';
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
  // Messages table
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    read_status BOOLEAN DEFAULT FALSE
  )`);

  // Admin table (for future expansion)
  db.run(`CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Create default admin if not exists
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (adminEmail && adminPassword) {
    const hashedPassword = bcrypt.hashSync(adminPassword, 10);
    db.run(
      'INSERT OR IGNORE INTO admins (email, password_hash) VALUES (?, ?)',
      [adminEmail, hashedPassword],
      (err) => {
        if (err) {
          console.error('Error creating admin user:', err);
        } else {
          console.log('Admin user initialized');
        }
      }
    );
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid token.' });
  }
};

// Input validation middleware
const validateContactForm = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('mobile')
    .optional()
    .trim()
    .isMobilePhone()
    .withMessage('Please provide a valid mobile number'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
    .escape()
];

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Portfolio Backend Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Contact form submission
app.post('/api/contact', contactLimiter, validateContactForm, (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const { name, email, mobile, message } = req.body;

  // Insert into database
  const stmt = db.prepare(`
    INSERT INTO messages (name, email, mobile, message) 
    VALUES (?, ?, ?, ?)
  `);

  stmt.run([name, email, mobile || null, message], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to save message. Please try again.'
      });
    }

    res.json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      messageId: this.lastID
    });
  });

  stmt.finalize();
});

// Admin login
app.post('/api/admin/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 1 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input data'
    });
  }

  const { email, password } = req.body;

  // Check admin credentials
  db.get(
    'SELECT * FROM admins WHERE email = ?',
    [email],
    (err, admin) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Verify password
      const isValidPassword = bcrypt.compareSync(password, admin.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          adminId: admin.id, 
          email: admin.email 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        message: 'Login successful',
        token,
        admin: {
          id: admin.id,
          email: admin.email
        }
      });
    }
  );
});

// Get all messages (admin only)
app.get('/api/admin/messages', verifyToken, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  // Get total count
  db.get('SELECT COUNT(*) as total FROM messages', (err, countResult) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch messages'
      });
    }

    // Get messages with pagination
    db.all(
      `SELECT * FROM messages 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [limit, offset],
      (err, messages) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({
            success: false,
            message: 'Failed to fetch messages'
          });
        }

        res.json({
          success: true,
          messages,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(countResult.total / limit),
            totalMessages: countResult.total,
            limit
          }
        });
      }
    );
  });
});

// Mark message as read (admin only)
app.patch('/api/admin/messages/:id/read', verifyToken, (req, res) => {
  const messageId = req.params.id;

  db.run(
    'UPDATE messages SET read_status = TRUE WHERE id = ?',
    [messageId],
    function(err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to update message'
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          success: false,
          message: 'Message not found'
        });
      }

      res.json({
        success: true,
        message: 'Message marked as read'
      });
    }
  );
});

// Delete message (admin only)
app.delete('/api/admin/messages/:id', verifyToken, (req, res) => {
  const messageId = req.params.id;

  db.run(
    'DELETE FROM messages WHERE id = ?',
    [messageId],
    function(err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to delete message'
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          success: false,
          message: 'Message not found'
        });
      }

      res.json({
        success: true,
        message: 'Message deleted successfully'
      });
    }
  );
});

// Get dashboard stats (admin only)
app.get('/api/admin/stats', verifyToken, (req, res) => {
  const queries = {
    total: 'SELECT COUNT(*) as count FROM messages',
    unread: 'SELECT COUNT(*) as count FROM messages WHERE read_status = FALSE',
    today: `SELECT COUNT(*) as count FROM messages WHERE DATE(created_at) = DATE('now')`,
    thisWeek: `SELECT COUNT(*) as count FROM messages WHERE DATE(created_at) >= DATE('now', '-7 days')`
  };

  const stats = {};
  let completed = 0;

  Object.keys(queries).forEach(key => {
    db.get(queries[key], (err, result) => {
      if (err) {
        console.error(`Error fetching ${key} stats:`, err);
        stats[key] = 0;
      } else {
        stats[key] = result.count;
      }

      completed++;
      if (completed === Object.keys(queries).length) {
        res.json({
          success: true,
          stats
        });
      }
    });
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nReceived SIGINT. Closing database connection...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio Backend Server running on port ${PORT}`);
  console.log(`📧 Admin email: ${process.env.ADMIN_EMAIL}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`📊 Database: ${dbPath}`);
});

module.exports = app;
