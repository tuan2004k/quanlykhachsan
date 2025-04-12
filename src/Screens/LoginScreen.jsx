import React from "react";

const LoginScreen = () => {
  return (
    <div className="flex h-screen">
      <div className="hidden md:flex md:w-1/2 relative">
        <img
          src="https://pistachiohotel.com/UploadFile/Gallery/Overview/a2.jpg"
          alt="Hotel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg bg-opacity-40 flex items-end p-8">
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

          <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-3 px-4 mb-4 hover:bg-gray-50 transition">
            <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" />
            Login with Google
          </button>

          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg py-3 px-4 mb-6 hover:bg-blue-700 transition">
            <img src="https://img.icons8.com/ios-filled/24/ffffff/facebook-new.png" alt="Facebook" />
            Login with Facebook
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email or Phone Number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="text-right">
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-indigo-600">
            Don't have an account?{" "}
            <a href="#" className="font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;