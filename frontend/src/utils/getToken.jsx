export const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export const getRole = () => {
  return localStorage.getItem('role') || sessionStorage.getItem('role');
};
