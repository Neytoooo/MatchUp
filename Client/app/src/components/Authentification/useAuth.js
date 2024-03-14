export function useAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return isLoggedIn; 
  }

  function logout() {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  }
  
  