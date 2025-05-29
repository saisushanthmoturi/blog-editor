const express = require('express');
const router = express.Router();
const {
    getAllBlogs,
    getBlogById,
    saveDraft,
    publishBlog,
    deleteBlog
} = require('../controllers/blogController');
const { optionalAuth } = require('../middleware/auth');

// GET /api/blogs - Get all blogs
router.get('/', optionalAuth, getAllBlogs);

// GET /api/blogs/:id - Get blog by ID
router.get('/:id', optionalAuth, getBlogById);

// POST /api/blogs/save-draft - Save or update draft
router.post('/save-draft', optionalAuth, saveDraft);

// PUT /api/blogs/save-draft/:id - Update existing draft
router.put('/save-draft/:id', optionalAuth, saveDraft);

// POST /api/blogs/publish - Publish new blog
router.post('/publish', optionalAuth, publishBlog);

// PUT /api/blogs/publish/:id - Update and publish existing blog
router.put('/publish/:id', optionalAuth, publishBlog);

// DELETE /api/blogs/:id - Delete blog
router.delete('/:id', optionalAuth, deleteBlog);

module.exports = router;