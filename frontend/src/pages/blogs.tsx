import { useRouter } from 'next/router';
import React, { useState } from 'react';
import BlogList from '../components/BlogList';

const BlogsPage: React.FC = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<'all' | 'published' | 'draft'>('all');

  const handleFilterChange = (filter: 'all' | 'published' | 'draft') => {
    setActiveFilter(filter);
  };

  const getFilterButtonStyle = (filter: string) => ({
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    backgroundColor: activeFilter === filter ? '#4299e1' : '#e2e8f0',
    color: activeFilter === filter ? 'white' : '#4a5568'
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        padding: '16px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: '#1a202c',
              margin: '0 0 8px 0'
            }}>
              📚 My Blogs
            </h1>
            <p style={{
              color: '#718096',
              margin: 0,
              fontSize: '1rem'
            }}>
              Manage your published articles and drafts
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={() => router.push('/')}
              style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                color: '#4a5568',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              ← Home
            </button>
            <button
              onClick={() => router.push('/editor')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4299e1',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              + New Blog
            </button>
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div style={{
            display: 'flex',
            gap: '4px',
            paddingTop: '16px',
            paddingBottom: '16px'
          }}>
            <button
              onClick={() => handleFilterChange('all')}
              style={getFilterButtonStyle('all')}
            >
              All Blogs
            </button>
            <button
              onClick={() => handleFilterChange('published')}
              style={getFilterButtonStyle('published')}
            >
              Published
            </button>
            <button
              onClick={() => handleFilterChange('draft')}
              style={getFilterButtonStyle('draft')}
            >
              Drafts
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px 20px'
      }}>
        <BlogList status={activeFilter} />
      </main>
    </div>
  );
};

export default BlogsPage;