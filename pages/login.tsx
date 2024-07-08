import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../component/Navbar";
import styles from "./login.module.css";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      router.push("http://localhost:3000/dashbroad");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div style={{ margin: "20px" }}>
          <span>Quizo App</span>
        </div>

        <div className="auth-buttons">
          <Link href="/">
            <button>Home</button>
          </Link>
          <Link href="/login">
            <button>Login</button>
          </Link>
        </div>
      </nav>
      <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Login</h2>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles["login-button"]} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
