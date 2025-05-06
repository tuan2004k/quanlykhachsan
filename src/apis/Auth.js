async function register(userData) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Đăng ký thành công:', data);
      return data;
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error.message);
      throw error;
    }
  }
  
  async function login(email, matKhau) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          matKhau,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Đăng nhập thành công:', data);
      return data;
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error.message);
      throw error;
    }
  }
  
  export { register, login };