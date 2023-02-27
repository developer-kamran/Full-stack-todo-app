import jwt_decode from 'jwt-decode';

export const getTokenFromStorage = () => {
  let token = localStorage.getItem('authTokens');
  if (token) return JSON.parse(token);
  return token;
};
export const getUserFromStorage = () => {
  let user = localStorage.getItem('authTokens');
  if (user) return jwt_decode(user);
  return user;
};
