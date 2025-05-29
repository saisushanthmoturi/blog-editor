const BLOG_STATUS = {
    DRAFT: 'draft',
    PUBLISHED: 'published'
};

const API_MESSAGES = {
    BLOG_NOT_FOUND: 'Blog not found',
    DRAFT_SAVED: 'Draft saved successfully',
    BLOG_PUBLISHED: 'Blog published successfully',
    BLOG_DELETED: 'Blog deleted successfully',
    VALIDATION_ERROR: 'Validation error',
    SERVER_ERROR: 'Internal server error'
};

const PAGINATION = {
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100
};

module.exports = {
    BLOG_STATUS,
    API_MESSAGES,
    PAGINATION
};