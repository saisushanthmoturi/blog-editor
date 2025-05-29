import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAutoSave } from '../hooks/useAutoSave';
import { blogAPI } from '../services/api';
import { Blog, BlogFormData } from '../types/blog';
import Notification, { NotificationProps } from './Notification';

interface BlogEditorProps {
  blog?: Blog | null;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ blog }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    tags: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<NotificationProps | null>(null);
  const [blogId, setBlogId] = useState<string | undefined>(undefined);

  // Initialize form data when blog prop changes
  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        content: blog.content || '',
        tags: blog.tags ? blog.tags.join(', ') : ''
      });
      setBlogId(blog._id);
    }
  }, [blog]);

  const showNotification = (props: Omit<NotificationProps, 'onClose'>) => {
    setNotification({
      ...props,
      onClose: () => setNotification(null)
    });
  };

  const prepareBlogData = (status: 'draft' | 'published' = 'draft') => {
    return {
      title: formData.title.trim(),
      content: formData.content.trim(),
      tags: formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0),
      status
    };
  };

  // Auto-save configuration
  const { manualSave } = useAutoSave({
    blog: prepareBlogData('draft'),
    blogId,
    onSaveSuccess: (savedBlog) => {
      if (!blogId) {
        setBlogId(savedBlog._id);
        router.replace(`/editor?id=${savedBlog._id}`, undefined, { shallow: true });
      }
      showNotification({
        message: 'Draft auto-saved',
        type: 'info',
        duration: 2000
      });
    },
    onSaveError: (error) => {
      showNotification({
        message: `Auto-save failed: ${error}`,
        type: 'error'
      });
    }
  });

  const handleInputChange = (field: keyof BlogFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveDraft = async () => {
    if (!formData.title.trim()) {
      showNotification({
        message: 'Title is required',
        type: 'error'
      });
      return;
    }

    setIsLoading(true);
    try {
      const blogData = prepareBlogData('draft');
      const response = await blogAPI.saveDraft(blogData, blogId);
      
      if (!blogId && response.blog) {
        setBlogId(response.blog._id);
        router.replace(`/editor?id=${response.blog._id}`, undefined, { shallow: true });
      }
      
      showNotification({
        message: 'Draft saved successfully',
        type: 'success'
      });
    } catch (error: any) {
      showNotification({
        message: error.response?.data?.message || 'Failed to save draft',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      showNotification({
        message: 'Title and content are required',
        type: 'error'
      });
      return;
    }

    setIsLoading(true);
    try {
      const blogData = prepareBlogData('published');
      const response = await blogAPI.publishBlog(blogData, blogId);
      
      showNotification({
        message: 'Blog published successfully',
        type: 'success'
      });
      
      // Redirect to blogs list after successful publish
      setTimeout(() => {
        router.push('/blogs');
      }, 1500);
    } catch (error: any) {
      showNotification({
        message: error.response?.data?.message || 'Failed to publish blog',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {notification && <Notification {...notification} />}
      
      <div style={{ marginBottom: '24px' }}>
        <input
          type="text"
          value={formData.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('title', e.target.value)}
          placeholder="Enter blog title..."
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '1.5rem',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            outline: 'none',
            fontWeight: 'bold'
          }}
          onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
            e.target.style.borderColor = '#4299e1';
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            e.target.style.borderColor = '#e2e8f0';
          }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <textarea
          value={formData.content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('content', e.target.value)}
          placeholder="Write your blog content here..."
          rows={15}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '1rem',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            outline: 'none',
            fontFamily: 'inherit',
            lineHeight: '1.6',
            resize: 'vertical'
          }}
          onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) => {
            e.target.style.borderColor = '#4299e1';
          }}
          onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
            e.target.style.borderColor = '#e2e8f0';
          }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <input
          type="text"
          value={formData.tags}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('tags', e.target.value)}
          placeholder="Enter tags separated by commas (e.g., technology, programming, react)"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '1rem',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            outline: 'none'
          }}
          onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
            e.target.style.borderColor = '#4299e1';
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            e.target.style.borderColor = '#e2e8f0';
          }}
        />
        <small style={{ color: '#718096', fontSize: '0.875rem' }}>
          Separate tags with commas for better organization
        </small>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        justifyContent: 'flex-end',
        borderTop: '1px solid #e2e8f0',
        paddingTop: '20px'
      }}>
        <button
          onClick={() => router.push('/blogs')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#e2e8f0',
            color: '#4a5568',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          Cancel
        </button>
        
        <button
          onClick={manualSave}
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            backgroundColor: '#ed8936',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            opacity: isLoading ? 0.6 : 1
          }}
        >
          {isLoading ? 'Saving...' : 'Save Draft'}
        </button>
        
        <button
          onClick={handlePublish}
          disabled={isLoading || !formData.title.trim() || !formData.content.trim()}
          style={{
            padding: '12px 24px',
            backgroundColor: '#48bb78',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: (isLoading || !formData.title.trim() || !formData.content.trim()) ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            opacity: (isLoading || !formData.title.trim() || !formData.content.trim()) ? 0.6 : 1
          }}
        >
          {isLoading ? 'Publishing...' : 'Publish'}
        </button>
      </div>

      <div style={{ 
        marginTop: '16px', 
        padding: '12px', 
        backgroundColor: '#f7fafc', 
        borderRadius: '6px',
        fontSize: '0.875rem',
        color: '#4a5568'
      }}>
        <strong>💡 Auto-save:</strong> Your work is automatically saved every 5 seconds after you stop typing, 
        and every 30 seconds while you're actively writing.
      </div>
    </div>
  );
};

export default BlogEditor;