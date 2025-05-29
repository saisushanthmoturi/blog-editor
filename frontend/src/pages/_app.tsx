import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          background-color: #f7fafc;
        }
        
        button:hover {
          opacity: 0.9;
        }
        
        input:focus,
        textarea:focus {
          border-color: #4299e1 !important;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
        }
      `}</style>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;