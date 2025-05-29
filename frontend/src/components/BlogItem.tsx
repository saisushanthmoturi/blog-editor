import React from 'react';
import { Blog } from '../types/blog';

interface BlogItemProps {
  blog: Blog;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const BlogItem: React.FC<BlogItemProps> = ({ blog, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div style={{
      border: '1px solid #e1e5e9',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '16px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          margin: '0 0 8px 0',
          color: '#1a202c'
        }}>
          {blog.title}
        </h3>
        <span style={{
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          backgroundColor: blog.status === 'published' ? '#48bb78' : '#ed8936',
          color: 'white'
        }}>
          {blog.status.toUpperCase()}
        </span>
      </div>
      
      <p style={{ 
        color: '#4a5568', 
        marginBottom: '12px',
        lineHeight: '1.5'
      }}>
        {truncateContent(blog.content)}
      </p>
      
      {blog.tags && blog.tags.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                backgroundColor: '#edf2f7',
                color: '#4a5568',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                marginRight: '8px',
                marginBottom: '4px'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        fontSize: '0.875rem',
        color: '#718096'
      }}>
        <span>
          Updated: {blog.updatedAt ? formatDate(blog.updatedAt) : 'Unknown'}
        </span>
        <div>
          <button
            onClick={() => onEdit(blog._id!)}
            style={{
              backgroundColor: '#4299e1',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              marginRight: '8px',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(blog._id!)}
            style={{
              backgroundColor: '#f56565',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;