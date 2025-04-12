import React from 'react';
import LoginScreen from './Screens/LoginScreen'; 
import SignUpScreen from './Screens/SignUp/SignUpScreen';// Điều chỉnh đường dẫn theo cấu trúc thư mục

function App() {
  return (
    <div className="app">
      <LoginScreen />
      <SignUpScreen/>
    </div>

  );
};
export default App;