import Link from "next/link";
import Navbar from "../component/Navbar";
import Banner from "../component/Banner";

const Home = () => {
  return (
    // <div>
    //   <nav>
    //     <Link href="/login">Login</Link>
    //     <Link href="/register">Register</Link>
    //   </nav>
    //   <h1>Welcome to Quiz App</h1>
    // </div>

    <div className="container">
      <Navbar />
      <div className="hero">
        <Banner />
      </div>
      {/* Other content of the homepage */}
    </div>
  );
};

export default Home;
