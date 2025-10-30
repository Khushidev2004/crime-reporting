import React, { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes – assume success
      setMessage("Password reset link sent! Please check your email.");
      setEmail("");
    } catch (error) {
      setMessage("Failed to send reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      / Inside your return()
<div className="page-container">
  {/* ✅ Add this div for the accent bar */}
  <div className="accent-bar"></div>

  <div className="text-center">
    <h2>Reset Your Password</h2>
    <p>Enter your email address and we’ll send you a link to reset your password.</p>
  </div>

  {/* ... rest of your form */}
</div>

      {message && (
        <div
          className={`mb-4 p-3 rounded text-sm ${
            message.includes("sent") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
          role="alert"
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="you@example.com"
            aria-describedby="email-help"
          />
          <p id="email-help" className="mt-1 text-xs text-gray-500">
            We’ll send a password reset link to this email.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isSubmitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          }`}
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <a href="/login" className="text-sm text-blue-600 hover:underline">
          ← Back to Login
        </a>
      </div>
    </div>
  );
};

export default ResetPassword;