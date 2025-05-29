import React, { useEffect } from 'react';

// Conditional import for Next.js Head component
let Head: any = null;
let useRouter: any = null;

try {
  Head = require('next/head').default;
  useRouter = require('next/router').useRouter;
} catch (error) {
  // Fallback for non-Next.js environments
  console.log('Next.js not available, using document title');
}

const HomePage: React.FC = () => {
  // Use Next.js router if available, otherwise create a simple navigation function
  const router = useRouter ? useRouter() : {
    push: (path: string) => {
      if (typeof window !== 'undefined') {
        window.location.href = path;
      }
    }
  };

  // Set document title when not using Next.js
  useEffect(() => {
    if (!Head && typeof document !== 'undefined') {
      document.title = 'Blog Editor - Create and Manage Your Blogs';
    }
  }, []);

  const HeadComponent = Head ? (
    <Head>
      <title>Blog Editor - Create and Manage Your Blogs</title>
      <meta name="description" content="A powerful blog editor with auto-save functionality" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    </Head>
  ) : null;

  return (
    <>
      {HeadComponent}
      
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#f7fafc',
        display: 'flex',
        flexDirection: 'column'
      }}>
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
            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: '#1a202c',
              margin: 0
            }}>
              📝 Blog Editor
            </h1>
            <nav style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={() => router.push('/blogs')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: '#4a5568',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                View Blogs
              </button>
              <button
                onClick={() => router.push('/editor')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#4299e1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
              >
                Create Blog
              </button>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px'
        }}>
          <div style={{
            maxWidth: '600px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '24px'
            }}>
              ✍️
            </div>
            
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: '#1a202c',
              marginBottom: '16px',
              lineHeight: '1.2'
            }}>
              Your Story Starts Here
            </h2>
            
            <p style={{
              fontSize: '1.25rem',
              color: '#4a5568',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              Create, edit, and publish beautiful blogs with our powerful editor. 
              Features auto-save, draft management, and seamless publishing.
            </p>

            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => router.push('/editor')}
                style={{
                  padding: '16px 32px',
                  backgroundColor: '#4299e1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                Start Writing
              </button>
              
              <button
                onClick={() => router.push('/blogs')}
                style={{
                  padding: '16px 32px',
                  backgroundColor: 'white',
                  color: '#4a5568',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1.125rem',
                  fontWeight: '600'
                }}
              >
                Browse Blogs
              </button>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section style={{
          backgroundColor: 'white',
          padding: '60px 20px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h3 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#1a202c',
              marginBottom: '48px'
            }}>
              Why Choose Our Blog Editor?
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '24px'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚡</div>
                <h4 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#1a202c',
                  marginBottom: '12px'
                }}>
                  Auto-Save
                </h4>
                <p style={{
                  color: '#4a5568',
                  lineHeight: '1.6'
                }}>
                  Never lose your work. Our smart auto-save feature saves your progress 
                  every 5 seconds and every 30 seconds during active writing.
                </p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '24px'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📝</div>
                <h4 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#1a202c',
                  marginBottom: '12px'
                }}>
                  Draft Management
                </h4>
                <p style={{
                  color: '#4a5568',
                  lineHeight: '1.6'
                }}>
                  Save drafts and come back anytime. Organize your published 
                  and draft blogs with ease.
                </p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '24px'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚀</div>
                <h4 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#1a202c',
                  marginBottom: '12px'
                }}>
                  Instant Publishing
                </h4>
                <p style={{
                  color: '#4a5568',
                  lineHeight: '1.6'
                }}>
                  Publish your blogs instantly with one click. Share your 
                  thoughts with the world effortlessly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          backgroundColor: '#2d3748',
          color: 'white',
          textAlign: 'center',
          padding: '24px 20px'
        }}>
          <p style={{ margin: 0 }}>
            © 2025 Blog Editor. Built with Next.js, React, and Node.js.
          </p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;