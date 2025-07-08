
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/user-slices";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import backgroundImage from "../assets/background.jpg"; // Ensure this path is correct

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const submit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      if (response && response.data) {
        const { accountId, token, expired, authenticated, role } = response.data.result;

        console.log("Account ID:", accountId);
        console.log("Token:", token);

        localStorage.setItem("token", token);
        localStorage.setItem("accountId", accountId);
        // dispatch(
        //   login({
        //     accountId,
        //     token,
        //     expired,
        //     authenticated,
        //     role,
        //   })
        // );

        if (role === "EMPLOYEE") { navigate("/login/employee");
        } else if (role === "MANAGER") { navigate("/login/manager");
        } else {  navigate("/login/admin"); }
      }
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials and try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100" 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="p-5 rounded-3 shadow-lg w-25 d-flex flex-column justify-content-center"
        style={{
          minHeight: "450px",
          minWidth: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h3 className="text-center mb-4">Login to your account</h3>
        {errorMessage && <p className="text-center text-danger mb-3">{errorMessage}</p>}
        <form onSubmit={submit}>
          <div className="mb-3 position-relative">
            <div className="position-relative">
              <input
                type="input"
                className="form-control rounded-pill p-2 ps-4 pe-5"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <span className="position-absolute top-50 end-0 translate-middle-y me-3">
                <i className="bi bi-envelope"></i>
              </span>
            </div>
          </div>
          <div className="mb-3 position-relative">
            <div className="position-relative">
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control rounded-pill p-2 ps-4 pe-5"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                <i className={passwordVisible ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <a href="#" className="text-primary">
              Forget Password?
            </a>
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-pill">
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <a href="signup" className="text-primary">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;