import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BlogEditor from '../components/BlogEditor';
import { getBlogById } from '../services/api';
import { Blog } from '../types/blog';

const EditorPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchBlog = async () => {
                try {
                    setLoading(true);
                    const fetchedBlog = await getBlogById(id as string);
                    setBlog(fetchedBlog);
                } catch (err: any) {
                    setError(err.response?.data?.message || 'Failed to load blog');
                } finally {
                    setLoading(false);
                }
            };
            fetchBlog();
        }
    }, [id]);

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                <div>Loading blog...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                flexDirection: 'column'
            }}>
                <div style={{ color: '#e53e3e', marginBottom: '16px' }}>
                    Error: {error}
                </div>
                <button
                    onClick={() => router.push('/blogs')}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#4299e1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Back to Blogs
                </button>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
            {/* Header */}
            <header style={{
                backgroundColor: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                padding: '16px 0'
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    padding: '0 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h1 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#1a202c',
                        margin: 0
                    }}>
                        {blog ? 'Edit Blog' : 'Create New Blog'}
                    </h1>
                    <button
                        onClick={() => router.push('/blogs')}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: 'transparent',
                            color: '#4a5568',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        ← Back to Blogs
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main style={{ padding: '20px 0' }}>
                <BlogEditor blog={blog} />
            </main>
        </div>
    );
};

export default EditorPage;