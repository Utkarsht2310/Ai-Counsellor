const ForgotPassword = () => {
  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <input placeholder="Enter your email" />
      <button className="btn-primary">Send reset link</button>

      <p style={{ marginTop: "10px", fontSize: "14px" }}>
        (Demo only for hackathon)
      </p>
    </div>
  );
};

export default ForgotPassword;
