import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Notification from './components/Notification';
import BlogsPage from './pages/blogs';
import EditorPage from './pages/editor';
import Home from './pages/index';

const App = () => {
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <Router>
      <div>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={hideNotification}
          />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;