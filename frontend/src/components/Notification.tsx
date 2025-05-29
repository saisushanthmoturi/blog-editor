import React, { useEffect, useState } from 'react';

export interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  duration = 3000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return { backgroundColor: '#48bb78', color: 'white' };
      case 'error':
        return { backgroundColor: '#f56565', color: 'white' };
      case 'warning':
        return { backgroundColor: '#ed8936', color: 'white' };
      case 'info':
      default:
        return { backgroundColor: '#4299e1', color: 'white' };
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        ...getTypeStyles()
      }}
    >
      <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{getIcon()}</span>
      <span style={{ fontWeight: '500' }}>{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        style={{
          marginLeft: '8px',
          background: 'transparent',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold'
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Notification;