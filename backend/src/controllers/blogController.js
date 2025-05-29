const Blog = require('../models/Blog');
const { validateBlog } = require('../middleware/validation');

// Get all blogs with filtering
exports.getAllBlogs = async (req, res) => {
    try {
        const { status, limit = 20, page = 1, tags } = req.query;
        const filter = {};
        
        if (status) {
            filter.status = status;
        }
        
        if (tags) {
            filter.tags = { $in: tags.split(',') };
        }

        const blogs = await Blog.find(filter)
            .sort({ updatedAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const total = await Blog.countDocuments(filter);

        res.json({
            blogs,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: 'Error fetching blogs', error: error.message });
    }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid blog ID' });
        }
        res.status(500).json({ message: 'Error fetching blog', error: error.message });
    }
};

// Save or update draft
exports.saveDraft = async (req, res) => {
    try {
        const { error } = validateBlog(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { title, content, tags = [] } = req.body;
        const blogId = req.params.id;

        let blog;
        
        if (blogId) {
            // Update existing blog
            blog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    title,
                    content,
                    tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),
                    status: 'draft'
                },
                { new: true, runValidators: true }
            );
            
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
        } else {
            // Create new blog
            blog = new Blog({
                title,
                content,
                tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),
                status: 'draft'
            });
            
            await blog.save();
        }

        res.json({ message: 'Draft saved successfully', blog });
    } catch (error) {
        console.error('Error saving draft:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error saving draft', error: error.message });
    }
};

// Publish blog
exports.publishBlog = async (req, res) => {
    try {
        const { error } = validateBlog(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { title, content, tags = [] } = req.body;
        const blogId = req.params.id;

        let blog;
        
        if (blogId) {
            // Update and publish existing blog
            blog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    title,
                    content,
                    tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),
                    status: 'published'
                },
                { new: true, runValidators: true }
            );
            
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
        } else {
            // Create and publish new blog
            blog = new Blog({
                title,
                content,
                tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),
                status: 'published'
            });
            
            await blog.save();
        }

        res.json({ message: 'Blog published successfully', blog });
    } catch (error) {
        console.error('Error publishing blog:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error publishing blog', error: error.message });
    }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid blog ID' });
        }
        res.status(500).json({ message: 'Error deleting blog', error: error.message });
    }
};