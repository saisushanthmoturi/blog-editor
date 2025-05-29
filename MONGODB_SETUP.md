# MongoDB Setup Guide for Windows

## Quick Setup Options

### Option 1: MongoDB Community Server (Recommended)
1. **Download**: Visit https://www.mongodb.com/try/download/community
2. **Install**: Run the MSI installer with default settings
3. **Start Service**: MongoDB should auto-start as a Windows service
4. **Verify**: Open Command Prompt and run `mongo --version`

### Option 2: MongoDB Atlas (Cloud - No Local Installation)
1. **Sign up**: Visit https://www.mongodb.com/cloud/atlas
2. **Create cluster**: Follow the setup wizard
3. **Get connection string**: Copy the connection URI
4. **Update .env**: Replace `MONGODB_URI` with your Atlas connection string

### Option 3: Docker (If Docker is installed)
```bash
docker pull mongo
docker run -d -p 27017:27017 --name blog-mongo mongo
```

## Verifying MongoDB Installation

### Check if MongoDB is running:
```bash
# Check service status
net start | findstr MongoDB

# Test connection
mongo --eval "db.adminCommand('ping')"
```

### Start/Stop MongoDB Service:
```bash
# Start
net start MongoDB

# Stop
net stop MongoDB
```

## Default Connection Details
- **Host**: localhost
- **Port**: 27017
- **Database**: blog_editor (auto-created)
- **Connection String**: `mongodb://localhost:27017/blog_editor`

## Troubleshooting

### MongoDB Service Not Found
If you get "service name is invalid", try:
```bash
# List all MongoDB services
sc query type= service | findstr /i mongo

# Start with full service name
net start "MongoDB"
```

### Connection Refused
1. Check if MongoDB is running: `tasklist | findstr mongod`
2. Check port availability: `netstat -an | findstr 27017`
3. Try manual start: `mongod --dbpath C:\data\db`

### Access Denied
Run Command Prompt as Administrator

## MongoDB Compass (GUI Tool)
- Download: https://www.mongodb.com/products/compass
- Connect to: `mongodb://localhost:27017`
- View and manage your blog data visually

## Test Database Connection
After MongoDB is running, test the connection:
```bash
node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb://localhost:27017/blog_editor').then(() => console.log('✅ Connected')).catch(err => console.log('❌ Error:', err.message))"
```
