import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaEnvelope, FaLock, FaArrowRight, FaUserShield } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import axios from "./api/axios";
import useAuth from "./hooks/useAuth";
import logo from "./assets/graphics/logo04-clear.png";

function Login() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [userType, setUserType] = useState("admin");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const login = (loginData) => {
    return axios.post(
      "/auth/login",
      {
        ...loginData,
        userType,
      },
      {
        withCredentials: true,
      }
    );
  };

  const { mutate: loginMutate, isPending: loginLoading } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const { user, accessToken, userType } =
        response?.data?.data || response?.data;

      // Set auth context
      setAuth({
        user,
        accessToken,
        userType,
        isAuthenticated: true,
        roles: [user?.role] || [],
        userId: user?._id,
      });

      // Clear form and error messages
      reset();
      setErrMsg("");

      const welcomeMessage = `Welcome back ${
        user?.firstName || user?.fullName || user?.email
      }!`;
      toast.success(welcomeMessage);

      // Navigate based on user type
      if (userType === "admin") {
        navigate("/dashboard", { replace: true });
      }
    },
    onError: (err) => {
      const message =
        err?.response?.data?.message ||
        "Invalid credentials. Please try again.";
      setErrMsg(message);
      toast.error(message);
    },
  });

  const onSubmit = async (data) => {
    try {
      loginMutate(data);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-primary/5">
      <Helmet>
        <title>Login - MyJuakali | Admin control</title>
        <meta name="description" content="Sign in to your MyJuakali account." />
      </Helmet>

      {/* Main Content */}
      <div className="pt-16 pb-16">
        <div className="container mx-auto ">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center">
              {/* Login Form */}
              <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-md border border-gray-200 px-6 py-8 relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/50 rounded-full -translate-y-12 translate-x-12"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-secondary/40 rounded-full translate-y-10 -translate-x-10"></div>

                  <div className="relative z-10">
                    {/* Form Header */}
                    <div className="text-center mb-2 pb-1 border-b border-secondary/70">
                      <div className="inline-flex items-center justify-center w-12 h-12  rounded-xl mb-1">
                        <img src={logo} alt="" />
                      </div>
                      <h2 className="text-xl font-bold text-dark">MyJuakali</h2>
                      <p className="text-sm text-gray-600 mt-1">Management</p>
                    </div>

                    {/* Error Message */}
                    {errMsg && (
                      <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-lg">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">
                                !
                              </span>
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-red-700 text-sm font-medium">
                              {errMsg}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Form */}
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-5"
                    >
                      {/* Email Field */}
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-dark">
                          Email Address
                        </label>
                        <div className="relative group">
                          <FaEnvelope
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-sm transition-colors ${
                              errors.email
                                ? "text-red-500"
                                : "text-gray-400 group-focus-within:text-primary"
                            }`}
                          />
                          <input
                            type="email"
                            placeholder="Enter your email address"
                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white text-dark placeholder-gray-500 ${
                              errors.email
                                ? "border-red-500 bg-red-50"
                                : "border-gray-200 focus:border-primary"
                            }`}
                            disabled={loginLoading}
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Please enter a valid email address",
                              },
                            })}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Password Field */}
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-dark">
                          Password
                        </label>
                        <div className="relative group">
                          <FaLock
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-sm transition-colors ${
                              errors.password
                                ? "text-red-500"
                                : "text-gray-400 group-focus-within:text-primary"
                            }`}
                          />
                          <input
                            type={visiblePassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white text-dark placeholder-gray-500 ${
                              errors.password
                                ? "border-red-500 bg-red-50"
                                : "border-gray-200 focus:border-primary"
                            }`}
                            disabled={loginLoading}
                            {...register("password", {
                              required: "Password is required",
                            })}
                          />
                          <button
                            type="button"
                            onClick={() => setVisiblePassword(!visiblePassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                            disabled={loginLoading}
                          >
                            {visiblePassword ? (
                              <AiOutlineEyeInvisible size={18} />
                            ) : (
                              <AiOutlineEye size={18} />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                            {errors.password.message}
                          </p>
                        )}
                      </div>

                      {/* Forgot Password Link */}
                      <div className="text-right">
                        <Link
                          to="/forgot-password"
                          className="text-sm font-medium text-primary hover:text-secondary hover:underline transition-colors"
                        >
                          Forgot your password?
                        </Link>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={loginLoading}
                        className="w-full py-3 font-bold rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 text-base bg-primary hover:bg-primary/90 text-white transform hover:scale-[1.02]"
                      >
                        {loginLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Signing In...</span>
                          </>
                        ) : (
                          <>
                            <FaUserShield className="text-base" />
                            <span>Sign In</span>
                            <FaArrowRight className="text-sm" />
                          </>
                        )}
                      </button>
                    </form>

                    {/* Footer Note */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <p className="text-sm text-center text-gray-500">
                        Empowering Artisans || Powered By{" "}
                        <a
                          href="https://isosoftwares.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary text-sm font-semibold hover:underline"
                        >
                          Isosoft
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
