import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useAuth } from "../../../context/AuthContext";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const floatRef = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.from(formRef.current.children, {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.2
      });

      gsap.to(floatRef.current, {
        y: -10,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await login(formData.email, formData.password);
      const role = response.user.role;

      gsap.to(floatRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          if (role === "STUDENT") navigate("/student/dashboard");
          if (role === "FACULTY") navigate("/faculty/dashboard");
          if (role === "ADMIN") navigate("/admin/dashboard");
        }
      });
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message || "Invalid credentials. Please try again.");

      gsap.to(floatRef.current, {
        x: [-8, 8, -8, 8, 0],
        duration: 0.4,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-card-float" ref={floatRef}>
        <div className="login-card glass-effect">
          <div className="login-header" ref={titleRef}>
            <h1 className="login-title text-gradient">
              College Leave Management
            </h1>
            <p className="login-subtitle">Sign in to continue</p>
          </div>

          <form className="login-form" ref={formRef} onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@college.edu"
              error={errors.email}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
              required
            />

            {errorMessage && (
              <div className="error-banner">
                <span>{errorMessage}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              loading={loading}
            >
              Sign In
            </Button>

            <div className="login-footer">
              <p className="login-help">
                Need help? Contact your administrator
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
