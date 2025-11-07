export const triggerHapticFeedback = () => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(50); // 50ms vibration
  }
};

export const isHapticSupported = () => {
  return typeof navigator !== 'undefined' && 'vibrate' in navigator;
};