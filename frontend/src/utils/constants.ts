export const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://your-api-domain.com';

export const API_ENDPOINTS = {
  BLOGS: '/api/blogs',
  SAVE_DRAFT: '/api/blogs/save-draft',
  PUBLISH: '/api/blogs/publish',
} as const;

export const BLOG_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
} as const;

export const AUTO_SAVE_DELAY = 5000; // 5 seconds
export const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

export const TOAST_MESSAGES = {
  DRAFT_SAVED: 'Draft saved successfully',
  BLOG_PUBLISHED: 'Blog published successfully',
  BLOG_DELETED: 'Blog deleted successfully',
  ERROR_SAVING: 'Error saving blog',
  ERROR_PUBLISHING: 'Error publishing blog',
  ERROR_LOADING: 'Error loading blogs',
} as const;