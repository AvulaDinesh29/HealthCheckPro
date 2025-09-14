import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { toast } from 'react-toastify';
import "./changePassword.css";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useAuth();
  
  // Get email from location state (passed from OTP verification) or from user context
  const email = location.state?.email || user?.email;

  React.useEffect(() => {
    if (!email) {
      toast.error("Please verify your email via OTP before changing password.");
      navigate("/forgotPassword-1");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
    if (!passwordRegex.test(newPassword)) {
      toast.error("Password must be 6-12 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character.");
      return;
    }

    // Validate that the new passwords match
    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match. Please try again.");
      return;
    }

    try {
      if (!email) {
        toast.error("Unable to retrieve email. Please try the forgot password flow again.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          email: email,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Password changed successfully!");
        navigate("/"); // Redirect to login page
      } else {
        toast.error(data.message || "An error occurred while changing the password.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while processing your request.");
    }
  };

  return (
    <div className="change-password-container">
      <h1>Healthguard Pro</h1>
      <div className="change-password-box">
        <h2>Change Password</h2>
        <form className="change-password-form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          <button type="submit">Confirm</button>
        </form>
        <p className="back-to-login">
          Go back to <Link to="/">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default ChangePassword;

