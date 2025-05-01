import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../Components/InputField";
import Button from "../Components/Button";
import Hotel from "../assets/Image/Hotel.jpg";
import { login } from "../apis/Auth";

const LoginScreen = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Regex kiểm tra email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  // Regex kiểm tra số điện thoại
  const phoneRegex = /^[0-9]{10,15}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Kiểm tra email hoặc số điện thoại
    if (!emailOrPhone) {
      newErrors.emailOrPhone = "Please enter your email or phone number.";
    } else if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      newErrors.emailOrPhone = "Please enter a valid email or phone number.";
    }

    // Kiểm tra mật khẩu
    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    // Nếu không có lỗi, gọi API login
    if (Object.keys(newErrors).length === 0) {
      try {
        // Xóa token cũ để tránh xung đột
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Gọi hàm login
        const data = await login(emailOrPhone, password);
        console.log("Đăng nhập thành công:", data);

        // Lưu token và thông tin người dùng
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        // Chuyển hướng dựa trên vai trò
        if (data.user?.role === "Quản trị viên") {
          navigate('/admin/dashboard'); // Chuyển hướng cho admin
        } else {
          navigate('/user/home'); // Chuyển hướng cho người dùng thường
        }
      } catch (error) {
        console.error("Lỗi khi đăng nhập:", error.message);
        setErrors({ api: error.message || "Email hoặc mật khẩu không đúng" });
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="md:flex md:w-1/2 relative hidden">
        <img src={Hotel} alt="Hotel" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-opacity-40 flex items-end p-8">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-4">
              Effortless Hotel Management for Exceptional Guest Experiences
            </h2>
            <p className="text-lg">Discover the finest hotels from all over the world.</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Welcome to <span className="text-indigo-600">8 BROSS</span>
          </h2>

          <Button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-3 px-4 mb-4 hover:bg-gray-50 transition">
            <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" />
            Login with Google
          </Button>

          <Button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg py-3 px-4 mb-6 hover:bg-blue-700 transition">
            <img src="https://img.icons8.com/ios-filled/24/ffffff/facebook-new.png" alt="Facebook" />
            Login with Facebook
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              type="text"
              placeholder="Email or Phone Number"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              error={errors.emailOrPhone}
            />
            {errors.emailOrPhone && <p className="text-red-500 text-sm">{errors.emailOrPhone}</p>}
            
            <InputField
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            
            {errors.api && <p className="text-red-500 text-sm">{errors.api}</p>}

            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-indigo-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
            </Button>
          </form>

          <p className="text-center mt-6 text-indigo-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;