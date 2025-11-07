// src/core/buttonUtils.ts
export const handleAsyncClick = async (
  onClick: ((...args: any[]) => Promise<any>) | undefined,
  setAsyncState: (state: 'idle' | 'loading' | 'success' | 'error') => void,
  setFeedbackText: (text: string) => void,
  feedback?: { success?: string; error?: string }
) => {
  if (!onClick) return;
  
  try {
    setAsyncState('loading');
    await onClick();
    setAsyncState('success');
    if (feedback?.success) {
      setFeedbackText(feedback.success);
      setTimeout(() => setFeedbackText(''), 2000);
    }
  } catch (err) {
    setAsyncState('error');
    if (feedback?.error) {
      setFeedbackText(feedback.error);
      setTimeout(() => setFeedbackText(''), 2000);
    }
  } finally {
    setTimeout(() => setAsyncState('idle'), 2000);
  }
};