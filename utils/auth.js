const VALID_CREDENTIALS = {
  username: 'admin',
  password: 'password123'
};

export const login = (username, password) => {
  if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
    localStorage.setItem('isAuthenticated', 'true');
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('isAuthenticated');
};

export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
  return false;
};
