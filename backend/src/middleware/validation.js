const Joi = require('joi');

const validateBlog = (blog) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(200).required().messages({
            'string.empty': 'Title is required',
            'string.min': 'Title must be at least 3 characters long',
            'string.max': 'Title cannot exceed 200 characters'
        }),
        content: Joi.string().min(10).required().messages({
            'string.empty': 'Content is required',
            'string.min': 'Content must be at least 10 characters long'
        }),
        tags: Joi.alternatives().try(
            Joi.array().items(Joi.string().trim()),
            Joi.string()
        ).optional(),
        status: Joi.string().valid('draft', 'published').optional(),
        author: Joi.string().optional()
    });

    return schema.validate(blog);
};

const validateBlogMiddleware = (req, res, next) => {
    const { error } = validateBlog(req.body);
    if (error) {
        return res.status(400).json({ 
            message: 'Validation error', 
            details: error.details.map(detail => detail.message)
        });
    }
    next();
};

module.exports = {
    validateBlog,
    validateBlogMiddleware
};