import React, { useEffect, useState } from 'react';
import { blogAPI } from '../services/api';
import { Blog } from '../types/blog';
import BlogItem from './BlogItem';

// Conditional import for Next.js router
let useRouter: any = null;
let useNavigate: any = null;

try {
  useRouter = require('next/router').useRouter;
} catch (error) {
  // Fallback for non-Next.js environments
  try {
    useNavigate = require('react-router-dom').useNavigate;
  } catch (routerError) {
    console.log('No router available');
  }
}

interface BlogListProps {
  status?: 'draft' | 'published' | 'all';
}

const BlogList: React.FC<BlogListProps> = ({ status = 'all' }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Use appropriate router based on environment
  const nextRouter = useRouter ? useRouter() : null;
  const navigate = useNavigate ? useNavigate() : null;

  const navigateTo = (path: string) => {
    if (nextRouter) {
      nextRouter.push(path);
    } else if (navigate) {
      navigate(path);
    } else if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  const fetchBlogs = async (page: number = 1) => {
    try {
      setLoading(true);
      const params = status !== 'all' ? { status, page } : { page };
      const response = await blogAPI.getAllBlogs(params);
      setBlogs(response.blogs);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [status]);

  const handleEdit = (id: string) => {
    navigateTo(`/editor?id=${id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogAPI.deleteBlog(id);
        fetchBlogs(currentPage);
      } catch (err: any) {
        alert(err.response?.data?.message || 'Failed to delete blog');
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchBlogs(newPage);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div>Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#e53e3e' }}>
        <div>Error: {error}</div>
        <button 
          onClick={() => fetchBlogs()}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            backgroundColor: '#4299e1',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
        <div>No blogs found.</div>
        <button
          onClick={() => navigateTo('/editor')}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            backgroundColor: '#48bb78',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Create Your First Blog
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        {blogs.map((blog, index) => {
          // Type assertion to handle React key prop properly
          const BlogItemComponent = BlogItem as any;
          return (
            <BlogItemComponent
              key={blog._id || `blog-${index}`}
              blog={blog}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          );
        })}
      </div>

      {totalPages > 1 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '8px',
          marginTop: '24px'
        }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            style={{
              padding: '8px 12px',
              backgroundColor: currentPage <= 1 ? '#e2e8f0' : '#4299e1',
              color: currentPage <= 1 ? '#a0aec0' : 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: currentPage <= 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Previous
          </button>
          
          <span style={{ margin: '0 16px', color: '#4a5568' }}>
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            style={{
              padding: '8px 12px',
              backgroundColor: currentPage >= totalPages ? '#e2e8f0' : '#4299e1',
              color: currentPage >= totalPages ? '#a0aec0' : 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;