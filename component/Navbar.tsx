import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    // <nav>
    //   <Link href="/">Home</Link>
    //   <Link href="/login">Login</Link>
    //   <Link href="/register">Register</Link>
    //   <Link href="/admin">Admin</Link>
    // </nav>

    <nav className="navbar">
      <div style={{ margin: "20px" }}>
        <span>Quizo App</span>
      </div>
      {/* <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/quizzes">Quizzes</Link>
        <Link href="/profile">Profile</Link>
      </div> */}
      <div className="auth-buttons">
        <Link href="/">
          <button>Home</button>
        </Link>
        <Link href="/login">
          <button>Login</button>
        </Link>
        <Link href="/register">
          <button>Register</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
