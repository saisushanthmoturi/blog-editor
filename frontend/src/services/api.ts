// @ts-nocheck
import axios from 'axios';
import { ApiResponse, Blog, BlogListResponse } from '../types/blog';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token if available
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    }
    return Promise.reject(error);
  }
);

export const blogAPI = {
  // Get all blogs
  getAllBlogs: async (params?: { status?: string; page?: number; limit?: number }): Promise<BlogListResponse> => {
    const response = await api.get(API_ENDPOINTS.BLOGS, { params });
    return response.data;
  },

  // Get blog by ID
  getBlogById: async (id: string): Promise<Blog> => {
    const response = await api.get(`${API_ENDPOINTS.BLOGS}/${id}`);
    return response.data;
  },

  // Save draft
  saveDraft: async (blog: Partial<Blog>, id?: string): Promise<ApiResponse> => {
    if (id) {
      const response = await api.put(`${API_ENDPOINTS.SAVE_DRAFT}/${id}`, blog);
      return response.data;
    } else {
      const response = await api.post(API_ENDPOINTS.SAVE_DRAFT, blog);
      return response.data;
    }
  },

  // Publish blog
  publishBlog: async (blog: Partial<Blog>, id?: string): Promise<ApiResponse> => {
    if (id) {
      const response = await api.put(`${API_ENDPOINTS.PUBLISH}/${id}`, blog);
      return response.data;
    } else {
      const response = await api.post(API_ENDPOINTS.PUBLISH, blog);
      return response.data;
    }
  },

  // Delete blog
  deleteBlog: async (id: string): Promise<ApiResponse> => {
    const response = await api.delete(`${API_ENDPOINTS.BLOGS}/${id}`);
    return response.data;
  },
};

// Legacy exports for backward compatibility
export const getAllBlogs = blogAPI.getAllBlogs;
export const getBlogById = blogAPI.getBlogById;
export const saveDraft = blogAPI.saveDraft;
export const publishBlog = blogAPI.publishBlog;
export const deleteBlog = blogAPI.deleteBlog;