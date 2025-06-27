import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  type?: ToastType;
  title: string;
  message?: string;
  position?: 'top' | 'bottom';
  duration?: number;
}

export function showToast({
  type = 'success',
  title,
  message = '',
  position = 'top',
  duration = 3000,
}: ToastProps) {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position,
    visibilityTime: duration,
    autoHide: true,
    topOffset: 30,
  });
}
