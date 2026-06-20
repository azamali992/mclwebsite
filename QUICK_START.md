# 🚀 MCL Website Backend - SETUP GUIDE

## ✅ What's Been Created

### Backend Infrastructure
- ✅ REST API with Express.js and MongoDB
- ✅ 4 Database models (Admin, Content, Product, Career)
- ✅ 5 API route files with full CRUD operations
- ✅ JWT Authentication & Password hashing
- ✅ Image upload system with Multer
- ✅ Error handling & validation middleware

### Admin Panel (Complete React Application)
- ✅ Professional login interface
- ✅ Dashboard with sidebar navigation
- ✅ Content Manager (edit any website section)
- ✅ Product Manager (add/edit/delete products)
- ✅ Career Manager (post job opportunities)
- ✅ Image Manager (upload & manage images)

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Set Up MongoDB (Choose One)

**Option A: MongoDB Atlas (Cloud - Recommended)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster (M0 free tier)
4. Create a database user with username and password
5. Click "Connect" → "Connect your application"
6. Copy the connection string

**Option B: Local MongoDB**
- Install MongoDB locally from [mongodb.com/download](https://www.mongodb.com/download)
- Connection string: `mongodb://localhost:27017/mclwebsite`

### Step 2: Configure Backend

```bash
cd backend
```

Edit `.env` file with your MongoDB connection:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mclwebsite
JWT_SECRET=change_this_to_a_random_secure_string
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

### Step 3: Initialize Database

Run the initialization script to create default admin user:

```bash
npm run init
```

You'll see output like:
```
✅ Database initialization completed!

📝 Next Steps:
1. Go to http://localhost:5173/admin
2. Login with email: admin@example.com
3. Login with password: admin123
```

### Step 4: Start Backend

```bash
npm start
```

You should see:
```
MongoDB Connected: cluster.mongodb.net
Server is running on port 5000
```

### Step 5: Start Frontend (in another terminal)

```bash
# Go to root directory
cd ..

# Install frontend dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Access the website: `http://localhost:5173`

### Step 6: Access Admin Panel

Visit: `http://localhost:5173/admin`

**Login with:**
- Email: `admin@example.com`
- Password: `admin123`

---

## 📱 Admin Panel Features

### Dashboard Navigation
- **Content**: Edit hero, about, footer, and other page sections
- **Products**: Add/edit/delete products with categories and features
- **Careers**: Post job openings with requirements
- **Images**: Upload images and get URLs for content

### Managing Content
1. Click "Add Content"
2. Choose section (hero, about, products, etc.)
3. Fill in details (title, description, text)
4. Click "Save Content"
5. Changes appear immediately on website

### Managing Products
1. Click "Add Product"
2. Enter product name, description, category
3. Add features (comma-separated)
4. Set price
5. Save - product appears on website

### Posting Careers
1. Click "Post Career"
2. Add position, department, location
3. List requirements (one per line)
4. Add responsibilities (one per line)
5. Save - job appears on careers page

### Uploading Images
1. Go to Images tab
2. Drag & drop images or click to browse
3. Once uploaded, click "Copy URL"
4. Use the URL in your content

---

## 🔗 API Endpoints (for reference)

### Authentication
```
POST /api/auth/login
POST /api/auth/register
GET /api/auth/verify
```

### Content
```
GET /api/content
GET /api/content/section/:section
POST /api/content (protected)
PUT /api/content/:id (protected)
DELETE /api/content/:id (protected)
```

### Products
```
GET /api/products
POST /api/products (protected)
PUT /api/products/:id (protected)
DELETE /api/products/:id (protected)
```

### Careers
```
GET /api/careers
POST /api/careers (protected)
PUT /api/careers/:id (protected)
DELETE /api/careers/:id (protected)
```

### Images
```
POST /api/upload/upload (protected)
DELETE /api/upload/:filename (protected)
```

---

## 🌐 Connect Frontend to Backend

Update your React components to fetch data from the backend:

```javascript
// Example: Fetching content
useEffect(() => {
  const token = localStorage.getItem('adminToken');
  fetch(`${import.meta.env.VITE_API_URL}/api/content/section/hero`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
}, []);
```

The API URL is configured in `.env.local`:
```env
VITE_API_URL=http://localhost:5000
```

---

## 🚢 Deployment Checklist

### Before Deploying:
- [ ] Test all CRUD operations locally
- [ ] Upload test images and verify
- [ ] Test admin login/logout
- [ ] Verify content updates appear on website
- [ ] Update MongoDB user password (production)

### MongoDB Setup for Production:
- [ ] Create production cluster
- [ ] Add network whitelist (your Render IP)
- [ ] Create production database user
- [ ] Get production connection string

### Backend Deployment (Render):
- [ ] Connect GitHub repository
- [ ] Set environment variables in Render dashboard
- [ ] Deploy backend
- [ ] Note the backend URL (e.g., https://mclwebsite-backend.onrender.com)

### Frontend Update:
- [ ] Update `.env.production` with backend URL
- [ ] Commit and push to main branch
- [ ] Deploy frontend (auto-deploys if using Netlify/Vercel)

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
npm start
```

### MongoDB Connection Error
- Check `.env` MONGO_URI is correct
- Verify IP whitelist in MongoDB Atlas (if using cloud)
- Ensure username/password match MongoDB user

### Admin Panel Shows Blank
- Open browser DevTools (F12)
- Check Console tab for errors
- Verify `VITE_API_URL` in `.env.local`
- Check backend is running

### Images Not Uploading
- Verify backend is running
- Check file size (max 10MB)
- Verify file format (JPG, PNG, GIF, WebP)
- Check browser console for errors

### CORS Errors
- Update `CORS_ORIGIN` in backend `.env`
- Restart backend server
- Clear browser cache

---

## 📚 File Structure

```
mclwebsite/
├── backend/                          # Backend server
│   ├── models/                      # Database schemas
│   ├── routes/                      # API routes
│   ├── controllers/                 # Business logic
│   ├── middleware/                  # Auth, error handling
│   ├── uploads/                     # Uploaded images
│   ├── scripts/
│   │   └── initializeDB.js         # Initialize admin
│   ├── server.js                    # Main server
│   ├── .env                         # Environment variables
│   └── package.json
│
├── src/
│   ├── pages/
│   │   └── Admin.jsx               # Admin page
│   └── components/
│       ├── AdminDashboard.jsx      # Dashboard
│       ├── AdminLogin.jsx          # Login form
│       └── AdminPanelComponents/   # Managers
│           ├── ContentManager.jsx
│           ├── ProductManager.jsx
│           ├── CareerManager.jsx
│           └── ImageManager.jsx
│
├── .env.local                        # Local API URL
├── .env.production                  # Production API URL
└── BACKEND_SETUP.md                # Detailed setup guide
```

---

## 💡 Next Steps

1. **Customize Admin Credentials**
   - Change `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`
   - Run `npm run init` again to update

2. **Update Website Content**
   - Go to Admin Panel
   - Edit hero, about, products, careers
   - Add images for sections

3. **Create User-Friendly Buttons**
   - Update frontend components to use API data
   - Connect "Contact Us" button to backend
   - Connect "Apply Now" button to careers

4. **Test Everything**
   - Create sample content
   - Upload test images
   - Test all CRUD operations

5. **Deploy to Production**
   - Follow deployment checklist
   - Monitor backend logs
   - Test on production

---

## ⚠️ Important Notes

1. **Security**: Change `JWT_SECRET` to a strong random string
2. **Admin Password**: Change default password in `.env`
3. **Database**: Use strong password for MongoDB user
4. **Uploads**: Keep `uploads/` folder in `.gitignore`
5. **CORS**: Update `CORS_ORIGIN` for production domain

---

## 📞 Support

For detailed setup instructions, see `BACKEND_SETUP.md` in the root directory.

For API documentation and examples, check the backend controllers and routes.

---

**Backend Ready to Use! 🎉**

Start the admin panel and begin managing your website content!
