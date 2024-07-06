import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Quiz App</h1>
      <nav>
        <Link href="/login">
          Login
        </Link>
        <Link href="/register">
          Register
        </Link>
      </nav>
    </div>
  );
};

export default Home;
