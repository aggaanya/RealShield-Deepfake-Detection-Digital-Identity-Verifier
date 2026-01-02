import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Info, CheckCircle, AlertTriangle, AlertOctagon, Shield } from 'lucide-react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

// Individual notification component
export const TechNotification = ({
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  actions = [],
  position = 'top-right',
  className,
}) => {
  const [progress, setProgress] = useState(100);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-close with progress animation
  useEffect(() => {
    if (duration === Infinity || isHovered) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateProgress = () => {
      const now = Date.now();
      const remaining = endTime - now;
      if (remaining <= 0) {
        onClose();
        return;
      }

      const newProgress = (remaining / duration) * 100;
      setProgress(newProgress);
      animationRef.current = requestAnimationFrame(updateProgress);
    };

    const animationRef = { current: requestAnimationFrame(updateProgress) };

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [duration, isHovered, onClose]);

  // Icon mapping based on notification type
  const iconMap = {
    info: <Info className="h-5 w-5 text-blue-500" />,
    success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    error: <AlertOctagon className="h-5 w-5 text-rose-500" />,
    shield: <Shield className="h-5 w-5 text-shield-500" />
  };

  // Background styling based on type
  const getBgStyle = () => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-l-emerald-500';
      case 'warning':
        return 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-l-amber-500';
      case 'error':
        return 'bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20 border-l-rose-500';
      case 'shield':
        return 'bg-gradient-to-r from-shield-50 to-blue-50 dark:from-shield-900/20 dark:to-blue-900/20 border-l-shield-500';
      case 'info':
      default:
        return 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-blue-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -15, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'relative w-full max-w-sm rounded-lg shadow-lg backdrop-blur-sm border-l-4',
        getBgStyle(),
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Progress bar */}
      {duration !== Infinity && (
        <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-lg overflow-hidden">
          <div
            className="h-full bg-blue-500/30"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 pr-8">
        <div className="flex gap-3">
          <div className="flex-shrink-0 mt-0.5">{iconMap[type]}</div>
          <div className="flex-1">
            {title && <h5 className="font-medium text-sm mb-1">{title}</h5>}
            {message && <p className="text-sm text-muted-foreground">{message}</p>}
            
            {/* Action buttons */}
            {actions.length > 0 && (
              <div className="flex gap-3 mt-3">
                {actions.map((action, i) => (
                  <button
                    key={i}
                    onClick={action.onClick}
                    className="text-xs py-1.5 px-3 rounded font-medium bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          aria-label="Close notification"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    </motion.div>
  );
};

// Notification container with positioning
export const NotificationsContainer = ({ position = 'top-right', children }) => {
  // Map position to CSS classes
  const positionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-center': 'top-0 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2'
  };

  return (
    <div
      className={cn(
        'fixed z-50 p-4 flex flex-col gap-3 max-h-screen overflow-hidden w-full max-w-sm',
        positionClasses[position]
      )}
    >
      <AnimatePresence>
        {children}
      </AnimatePresence>
    </div>
  );
};

// Root notification system
const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [portalRoot, setPortalRoot] = useState(null);

  // Setup portal container
  useEffect(() => {
    let root = document.getElementById('notification-portal');
    if (!root) {
      root = document.createElement('div');
      root.id = 'notification-portal';
      document.body.appendChild(root);
    }
    setPortalRoot(root);

    return () => {
      if (root && root.parentNode) {
        root.parentNode.removeChild(root);
      }
    };
  }, []);

  // Remove notification by ID
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Add a new notification
  const addNotification = ({ 
    type = 'info',
    title, 
    message, 
    duration = 5000,
    position = 'top-right',
    actions = []
  }) => {
    const id = Date.now().toString();
    
    setNotifications((prev) => [
      ...prev,
      { id, type, title, message, duration, position, actions }
    ]);
    
    return id;
  };

  // Group notifications by position
  const groupedNotifications = notifications.reduce((acc, notification) => {
    const { position = 'top-right' } = notification;
    if (!acc[position]) acc[position] = [];
    acc[position].push(notification);
    return acc;
  }, {});

  if (!portalRoot) return null;

  return createPortal(
    <>
      {Object.entries(groupedNotifications).map(([position, notifs]) => (
        <NotificationsContainer key={position} position={position}>
          {notifs.map((notification) => (
            <TechNotification
              key={notification.id}
              {...notification}
              onClose={() => removeNotification(notification.id)}
            />
          ))}
        </NotificationsContainer>
      ))}
    </>,
    portalRoot
  );
};

// Create a hook to use the notification system
let notifyFn = () => {
  console.error('NotificationSystem not initialized');
  return '';
};

export const NotificationsProvider = ({ children }) => {
  const notificationRef = React.useRef(null);
  
  notifyFn = ({ type, title, message, duration, position, actions }) => {
    if (notificationRef.current) {
      return notificationRef.current.addNotification({
        type, title, message, duration, position, actions
      });
    }
    return '';
  };
  
  return (
    <>
      {children}
      <NotificationSystem ref={notificationRef} />
    </>
  );
};

// Export notification hook
export const useNotifications = () => {
  const notify = React.useCallback(
    ({ type, title, message, duration, position, actions }) => {
      return notifyFn({ type, title, message, duration, position, actions });
    },
    []
  );

  return {
    notify,
    info: (opts) => notify({ type: 'info', ...opts }),
    success: (opts) => notify({ type: 'success', ...opts }),
    warning: (opts) => notify({ type: 'warning', ...opts }),
    error: (opts) => notify({ type: 'error', ...opts }),
    shield: (opts) => notify({ type: 'shield', ...opts }),
  };
};

export default NotificationSystem;
