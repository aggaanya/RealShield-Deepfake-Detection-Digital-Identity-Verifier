import { useNotifications } from '@/components/ui/notification-system';

// Helper functions for showing notifications using our tech-themed notification system
// compatible with Zustand 5 and React 19

// Convenience functions that can be imported and used directly
export const showSuccessNotification = (message, options = {}) => {
  const { success } = useNotifications();
  return success({
    title: options.title || 'Success',
    message: message,
    duration: options.duration || 5000,
    position: options.position || 'top-right',
    actions: options.actions || [],
  });
};

export const showErrorNotification = (message, options = {}) => {
  const { error } = useNotifications();
  return error({
    title: options.title || 'Error',
    message: message,
    duration: options.duration || 5000,
    position: options.position || 'top-right',
    actions: options.actions || [],
  });
};

export const showInfoNotification = (message, options = {}) => {
  const { info } = useNotifications();
  return info({
    title: options.title || 'Information',
    message: message,
    duration: options.duration || 5000,
    position: options.position || 'top-right',
    actions: options.actions || [],
  });
};

export const showWarningNotification = (message, options = {}) => {
  const { warning } = useNotifications();
  return warning({
    title: options.title || 'Warning',
    message: message,
    duration: options.duration || 5000,
    position: options.position || 'top-right',
    actions: options.actions || [],
  });
};

export const showShieldNotification = (message, options = {}) => {
  const { shield } = useNotifications();
  return shield({
    title: options.title || 'RealShield',
    message: message,
    duration: options.duration || 5000,
    position: options.position || 'top-right',
    actions: options.actions || [],
  });
};

// For backward compatibility with previous API
export default {
  addNotification: showInfoNotification,
  dismissNotification: (id) => {
    // ID will be returned by notification functions
    // but we don't need to manually dismiss since auto-dismiss is built-in
    console.log('Notification dismissed:', id);
  },
  clearNotifications: () => {
    // Not directly supported, but notifications auto-dismiss anyway
    console.log('Clear notifications called');
  },
};
