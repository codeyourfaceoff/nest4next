import { getToken, GetTokenParams } from 'next-auth/jwt';

export const isSecureCookeEnvironment = () => {
  if (process.env.NEXTAUTH_URL.startsWith('https://')) return true;
  if (process.env.VERCEL) return true;
  if (process.env.NODE_ENV === 'production') return true;

  return false;
};

export const getNextAuthJwtToken = async (params?: GetTokenParams) => {
  return await getToken({
    secureCookie: isSecureCookeEnvironment(), // default the secureCookie flag the way the init lib will
    ...params,
  });
};
