import { getCsrfToken } from 'next-auth/react';
import { useState, useEffect } from 'react';

export const useCsrfToken = () => {
  const [csrfToken, setToken] = useState('');
  useEffect(() => {
    (async () => {
      const token = await getCsrfToken();
      setToken(token);
    })();
  }, []);

  return {
    csrfToken,
  };
};
