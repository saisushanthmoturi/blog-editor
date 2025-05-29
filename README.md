# Blog Editor Application

A full-stack blog editor application with auto-save functionality, built with Next.js, React, Node.js, Express, and MongoDB.

## 🚀 Features

### Frontend
- **Rich Blog Editor**: Clean, intuitive interface for writing and editing blogs
- **Auto-Save**: Automatic draft saving every 5 seconds after user stops typing and every 30 seconds during active writing
- **Draft Management**: Save drafts and come back to edit them anytime
- **Real-time Notifications**: Visual feedback for auto-save, publish, and error states
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Blog Management**: View, edit, and delete published blogs and drafts
- **Tag Support**: Organize blogs with comma-separated tags

### Backend
- **RESTful API**: Clean API design with proper HTTP methods and status codes
- **Data Validation**: Input validation using Joi
- **Error Handling**: Comprehensive error handling with meaningful messages
- **Security**: Rate limiting, CORS protection, and security headers
- **MongoDB Integration**: Efficient data storage with proper indexing

## 🛠️ Tech Stack

### Frontend
- **Next.js 13**: React framework for production
- **React 18**: UI library with hooks
- **TypeScript**: Type safety and better development experience
- **Axios**: HTTP client for API calls

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication (optional)
- **Joi**: Data validation library

## 📁 Project Structure

```
blog-editor-app/
├── backend/
│   ├── src/
│   │   ├── app.js              # Express app configuration
│   │   ├── config/
│   │   │   └── database.js     # MongoDB connection
│   │   ├── controllers/
│   │   │   └── blogController.js # Blog CRUD operations
│   │   ├── middleware/
│   │   │   ├── auth.js         # JWT authentication
│   │   │   └── validation.js   # Data validation
│   │   ├── models/
│   │   │   └── Blog.js         # Blog schema
│   │   ├── routes/
│   │   │   └── blogRoutes.js   # API routes
│   │   └── utils/
│   │       └── constants.js    # Backend constants
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BlogEditor.tsx  # Main blog editor component
│   │   │   ├── BlogList.tsx    # Blog listing component
│   │   │   ├── BlogItem.tsx    # Individual blog item
│   │   │   └── Notification.tsx # Toast notifications
│   │   ├── hooks/
│   │   │   ├── useAutoSave.ts  # Auto-save functionality
│   │   │   └── useDebounce.ts  # Debounce hook
│   │   ├── pages/
│   │   │   ├── index.tsx       # Homepage
│   │   │   ├── editor.tsx      # Blog editor page
│   │   │   ├── blogs.tsx       # Blog management page
│   │   │   └── _app.tsx        # Next.js app wrapper
│   │   ├── services/
│   │   │   └── api.ts          # API service layer
│   │   ├── types/
│   │   │   └── blog.ts         # TypeScript interfaces
│   │   └── utils/
│   │       └── constants.ts    # Frontend constants
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.js
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-editor-app
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blog_editor
   JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # For local MongoDB installation
   mongod
   
   # Or use MongoDB Atlas cloud database
   # Update MONGODB_URI in .env with your Atlas connection string
   ```

5. **Run the application**
   
   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```
   Server will start on http://localhost:5000

   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```
   Application will open on http://localhost:3000

### Quick Start (Windows)

#### Option 1: Using Batch Files (Recommended for Windows)
1. **Start Backend**: Double-click `start-backend.bat`
2. **Start Frontend**: Double-click `start-frontend.bat`
3. **Open Application**: Navigate to `http://localhost:3000`

#### Option 2: Manual Setup
1. **Install Dependencies**:
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend (in new terminal)
   cd frontend
   npm install
   ```

2. **Start MongoDB**: Ensure MongoDB service is running
   ```bash
   net start MongoDB
   # or if MongoDB is installed via Community Server
   mongod
   ```

3. **Start Backend** (Port 5000):
   ```bash
   cd backend
   npm run dev
   ```

4. **Start Frontend** (Port 3000):
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access Application**: Open `http://localhost:3000`

## 🧪 Testing the Application

### Test Setup Validation
Run the setup validation script:
```bash
node test-setup.js
```

### Manual Testing Checklist

#### 1. Auto-Save Functionality
- [ ] Create a new blog post
- [ ] Start typing content
- [ ] Wait 5 seconds after stopping typing → Check for "Auto-saved" notification
- [ ] Continue typing → Check for periodic auto-save every 30 seconds
- [ ] Refresh page → Verify content is preserved

#### 2. Blog Operations
- [ ] Create and save a draft
- [ ] Edit an existing draft
- [ ] Publish a blog post
- [ ] View published posts in blog list
- [ ] Filter blogs by status (All/Published/Drafts)
- [ ] Delete a blog post

#### 3. API Testing
Use tools like Postman or curl to test API endpoints:

```bash
# Get all blogs
curl http://localhost:5000/api/blogs

# Create a draft
curl -X POST http://localhost:5000/api/blogs/save-draft \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Blog","content":"Test content","tags":["test"]}'

# Publish a blog
curl -X POST http://localhost:5000/api/blogs/publish \
  -H "Content-Type: application/json" \
  -d '{"title":"Published Blog","content":"Published content","tags":["published"]}'
```

## 🎯 Usage

1. **Creating a Blog**
   - Visit the homepage and click "Start Writing"
   - Enter your blog title, content, and tags
   - The auto-save feature will save your work automatically
   - Click "Save Draft" to manually save or "Publish" to make it live

2. **Managing Blogs**
   - Visit the "Blogs" page to see all your blogs
   - Filter by "All Blogs", "Published", or "Drafts"
   - Edit any blog by clicking the "Edit" button
   - Delete blogs with the "Delete" button

3. **Auto-Save Feature**
   - Drafts are automatically saved 5 seconds after you stop typing
   - Also saves every 30 seconds while you're actively writing
   - Visual notifications confirm when auto-save occurs

## 🔧 Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Structure

- **Components**: Reusable UI components
- **Hooks**: Custom React hooks for business logic
- **Services**: API integration layer
- **Types**: TypeScript interfaces and types
- **Utils**: Utility functions and constants

## 🔒 Security Features

- Rate limiting on API endpoints
- CORS protection
- Input validation and sanitization
- JWT authentication (optional)
- Security headers with Helmet.js


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB team for the robust database
- Express.js community for the web framework
- All open-source contributors

---

Built with ❤️ for the coding community
