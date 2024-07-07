import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from "../contex/userContext";


const Dashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
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
            {/* {user ? (
              <p>Welcome, {user.email}!</p>
            ) : (
              <p>Please log in to see your dashboard.</p>
            )} */}
          </Link>

          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>Dashboard</h1>
      </h2>
      <div>
        <Link href="/quiz">
          <button
            className="login-button"
            style={{
              width: "30%",
              marginLeft: "35%",
              padding: "10px",
              backgroundColor: "#0070f3",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Take a Quiz
          </button>
        </Link>
        <Link href="/admin">
          <button
            className="login-button"
            style={{
              width: "30%",
              padding: "10px",
              backgroundColor: "#0070f3",
              marginLeft: "35%",
              marginTop: "2%",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Admin Panel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;


// import { useRouter } from "next/router";
// import Link from "next/link";
// import Navbar from "../component/Navbar";

// const Dashboard = () => {
//   const router = useRouter();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     router.push("/login");
//   };

//   return (
//     <div>
//       <Navbar />
//       <h1>Dashboard</h1>
//       <button onClick={handleLogout}>Logout</button>
//       <div>
//         <Link href="/quiz">
//           Take a Quiz
//         </Link>
//         <Link href="/admin">
//           Admin Panel
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

