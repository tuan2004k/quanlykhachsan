import React, { useState } from 'react';
import './Login.css'; // Import CSS riêng
import ROSE from '../assets/Image/rosé.jpg'; // Import ảnh đúng cách

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'admin@example.com' && password === '123456') {
      setMessage('Đăng nhập thành công!');
    } else {
      setMessage('Sai email hoặc mật khẩu!');
    }
  };

  return (
    <div className="login-container">
      <img src={ROSE} alt="CR7" />
      <h2>Đăng nhập</h2>  
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            placeholder="Nhập email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            placeholder="Nhập mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default LoginScreen;
