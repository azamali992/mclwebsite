# MCL Website Backend & Admin Panel Setup Guide

## Overview
This is a complete backend solution for the MCL website with:
- **REST API** built with Node.js and Express
- **MongoDB** for data storage (cloud-based)
- **JWT Authentication** for admin access
- **Admin Panel** for managing content, products, and careers
- **Image Upload** functionality with local storage

## Project Structure

```
backend/
├── config/
│   └── db.js                 # Database connection
├── models/
│   ├── Admin.js             # Admin user model
│   ├── Content.js           # Website content model
│   ├── Product.js           # Product model
│   └── Career.js            # Career posting model
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   ├── contentRoutes.js     # Content management routes
│   ├── productRoutes.js     # Product routes
│   ├── careerRoutes.js      # Career routes
│   └── uploadRoutes.js      # Image upload routes
├── controllers/
│   ├── authController.js    # Auth logic
│   ├── contentController.js # Content logic
│   ├── productController.js # Product logic
│   ├── careerController.js  # Career logic
│   └── uploadController.js  # Upload logic
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   └── errorHandler.js      # Error handling middleware
├── uploads/                 # Uploaded images directory
├── server.js                # Main server entry point
├── package.json             # Dependencies
└── .env                     # Environment variables
```

## Prerequisites

1. **Node.js** (v16+)
2. **MongoDB Account** (MongoDB Atlas - free tier available)
3. **npm** or **yarn**

## Installation & Setup

### 1. Backend Setup

```bash
cd backend
npm install
```

### 2. Configure MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Create a database user with password
5. Get your connection string

### 3. Environment Variables

Create a `.env` file in the backend folder:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mclwebsite

# JWT Secret (change this to a secure random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Admin Credentials (for initial setup)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

# Server
PORT=5000
NODE_ENV=development

# CORS Origins (comma-separated)
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

### 4. Run Backend Locally

```bash
npm start
# or for development with auto-reload
npm run dev
```

Backend should be running at `http://localhost:5000`

### 5. Frontend Environment Setup

In the root directory, create or update `.env.local`:

```env
VITE_API_URL=http://localhost:5000
```

### 6. Run Frontend

```bash
npm run dev
```

Access the website at `http://localhost:5173`

## Admin Panel Access

**URL:** `http://localhost:5173/admin`

**Demo Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register new admin
- `GET /api/auth/verify` - Verify token

### Content Management
- `GET /api/content` - Get all content
- `GET /api/content/section/:section` - Get content by section
- `GET /api/content/:section/:key` - Get specific content
- `POST /api/content` - Create content (protected)
- `PUT /api/content/:id` - Update content (protected)
- `DELETE /api/content/:id` - Delete content (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

### Careers
- `GET /api/careers` - Get all career postings
- `GET /api/careers/:id` - Get career by ID
- `POST /api/careers` - Create career posting (protected)
- `PUT /api/careers/:id` - Update career posting (protected)
- `DELETE /api/careers/:id` - Delete career posting (protected)

### Image Upload
- `POST /api/upload/upload` - Upload image (protected)
- `DELETE /api/upload/:filename` - Delete image (protected)

## Deployment Guide

### Backend Deployment (Render)

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Connect GitHub Repository**
   - Create a new "Web Service"
   - Select your GitHub repository
   - Connect

3. **Configure Service**
   - Name: `mclwebsite-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add Environment Variables**
   - Go to Environment tab
   - Add all variables from `.env`:
     - MONGO_URI
     - JWT_SECRET
     - ADMIN_EMAIL
     - ADMIN_PASSWORD
     - NODE_ENV=production
     - CORS_ORIGIN=your-frontend-domain.com

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the backend URL (e.g., `https://mclwebsite-backend.onrender.com`)

### Frontend Deployment (Netlify/Vercel)

1. **Update .env.production**
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

2. **Commit and Push**
   ```bash
   git add .
   git commit -m "Update backend API URL"
   git push
   ```

3. **Deploy to Netlify/Vercel**
   - Frontend will auto-deploy when you push to main branch

### MongoDB Atlas Setup for Production

1. **Create Production Cluster**
   - Go to MongoDB Atlas
   - Create a new cluster (M0 free tier)
   - Configure security:
     - Network Access: Add your Render IP
     - Or use IP Whitelist: 0.0.0.0/0 (less secure but convenient)

2. **Create Database User**
   - Username: `mcluser`
   - Auto-generate password
   - Save credentials securely

3. **Get Connection String**
   - Click "Connect"
   - Select "Connect your application"
   - Copy connection string
   - Replace `<password>` with actual password

## Admin Panel Features

### Content Management
- Edit hero section, about, footer text
- Manage page content by section
- Reorder content items

### Product Management
- Add/edit/delete products
- Upload product images
- Manage categories and prices
- Add product features

### Career Management
- Post job openings
- Manage requirements and responsibilities
- Track job types (Full-time, Part-time, etc.)
- Set salary ranges

### Image Management
- Upload multiple images at once
- Copy image URLs for use in content
- Delete unused images
- Support for JPG, PNG, GIF, WebP

## Troubleshooting

### MongoDB Connection Issues
- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas
- Ensure username/password are correct

### CORS Errors
- Update `CORS_ORIGIN` in backend .env
- Restart backend server

### Image Upload Fails
- Check file size (max 10MB)
- Verify file format (JPG, PNG, GIF, WebP)
- Ensure backend server is running

### Admin Login Issues
- Reset password by updating Admin document in MongoDB
- Clear browser cookies
- Try incognito mode

## Next Steps

1. ✅ Backend is set up
2. ✅ Admin panel is ready
3. ✅ MongoDB connection configured
4. ✅ Image upload working
5. **Next:** Connect frontend components to API endpoints
6. **Next:** Deploy to production

## File Locations

```
Project Root
├── backend/              # Backend server
├── src/
│   ├── pages/
│   │   └── Admin.jsx    # Admin page
│   └── components/
│       ├── AdminDashboard.jsx
│       ├── AdminLogin.jsx
│       └── AdminPanelComponents/
│           ├── ContentManager.jsx
│           ├── ProductManager.jsx
│           ├── CareerManager.jsx
│           └── ImageManager.jsx
├── .env.local           # Local environment
└── .env.production      # Production environment
```

## Support

For issues or questions:
1. Check the API endpoints documentation
2. Review MongoDB connection string
3. Verify all environment variables are set
4. Check backend logs for errors

---

**Created with ❤️ for MCL Website**
