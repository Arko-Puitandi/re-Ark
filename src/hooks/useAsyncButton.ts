import { useState, useCallback } from 'react';

interface UseAsyncButtonOptions {
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
  successDuration?: number;
  errorDuration?: number;
}

export function useAsyncButton(
  asyncFn: (...args: any[]) => Promise<any>,
  {
    onSuccess,
    onError,
    successDuration = 2000,
    errorDuration = 2000,
  }: UseAsyncButtonOptions = {}
) {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setState('loading');
        const result = await asyncFn(...args);
        setState('success');
        onSuccess?.(result);
        setTimeout(() => {
          setState('idle');
          setMessage('');
        }, successDuration);
        return result;
      } catch (error) {
        setState('error');
        onError?.(error);
        setTimeout(() => {
          setState('idle');
          setMessage('');
        }, errorDuration);
        throw error;
      }
    },
    [asyncFn, onSuccess, onError, successDuration, errorDuration]
  );

  return {
    execute,
    state,
    isLoading: state === 'loading',
    isSuccess: state === 'success',
    isError: state === 'error',
    message,
    setMessage,
  };
}