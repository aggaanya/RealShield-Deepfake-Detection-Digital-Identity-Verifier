import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

const TOAST_TIMEOUT = 5000;

// Simple toast store with Zustand 5
export const useToastStore = create((set, get) => ({
  toasts: [],
  
  addToast: (toast) => {
    const id = toast.id || uuidv4();
    const newToast = {
      id,
      ...toast,
      duration: toast.duration || TOAST_TIMEOUT,
    };
    
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));
    
    // Auto dismiss
    if (newToast.duration !== Infinity) {
      setTimeout(() => {
        get().dismissToast(id);
      }, newToast.duration);
    }
    
    return id;
  },
  
  dismissToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
  
  updateToast: (id, toast) => {
    set((state) => ({
      toasts: state.toasts.map((t) => (t.id === id ? { ...t, ...toast } : t)),
    }));
  },
}));

// Convenience hook for components
export function useToast() {
  const { toasts, addToast, dismissToast, updateToast } = useToastStore();
  
  return {
    toasts,
    toast: (props) => {
      return addToast(props);
    },
    dismiss: (toastId) => dismissToast(toastId),
    update: (toastId, props) => updateToast(toastId, props),
  };
}
