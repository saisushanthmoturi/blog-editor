const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    slug: {
        type: String,
        unique: true,
        sparse: true
    }
}, {
    timestamps: true
});

// Pre-save middleware to generate slug
blogSchema.pre('save', function(next) {
    if (this.title && this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
    next();
});

// Index for better query performance
blogSchema.index({ status: 1, createdAt: -1 });
blogSchema.index({ tags: 1 });

module.exports = mongoose.model('Blog', blogSchema);