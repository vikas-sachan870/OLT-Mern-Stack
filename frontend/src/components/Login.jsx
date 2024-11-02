import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import NavBar from "./NavBar";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    document.title = "Login";
  }, []);

  let styles = {
    backgroundImage: "linear-gradient(90deg,rgb(10,36,45),rgb(192,100,302))",
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:1000/api/v1/login", {
        email,
        password,
      });

      if (response.data.result === "Success") {
        localStorage.setItem("loggedin", true);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        console.log("Login Success");
        alert("Login successful!");
        navigate("/profile");
        dispatch({ type: "USER", payload: true });
      } else {
        alert("Incorrect password! Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Invalid Credentials!");
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="main flex justify-center mt-16">
        <div className="w-[450px] shadow-xl">
          <div
            className="card-header text-white text-center rounded-t-md py-2"
            style={styles}
          >
            <span className="fa fa-user-plus fa-2x"></span>
            <h3 className="text-center font-bold text-2xl font-serif">
              Login Page
            </h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 rounded-b-md py-4"
          >
            <div className="mb-3 mx-5">
              <label htmlFor="exampleInputEmail1" className="text-xl">
                Email address
              </label>{" "}
              <br />{" "}
              <input
                name="email"
                type="email"
                className="rounded-md py-2 w-full mt-2 border-2 hover:outline outline-offset-1 outline-blue-300 hover:shadow-2xl"
                id="exampleInputEmail1"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="mb-3 mx-5">
              <label htmlFor="exampleInputPassword1" className="text-xl">
                Password
              </label>{" "}
              <br />
              <input
                name="pass"
                required
                type="password"
                className="rounded-md py-2 w-full mt-2 border-2 hover:outline outline-offset-1 outline-blue-300 hover:shadow-2xl"
                id="exampleInputPassword1"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="mt-4">
              <a href="#" className="text-black ml-5 hover:underline">
                Forgot Password?
              </a>
            </div>

            <div className="text-center text-2xl mt-2">
              <button
                className="border border-black px-2 py-1 my-2 rounded-lg hover:bg-slate-400 hover:text-white outline outline-1 outline-black"
                type="submit"
              >
                Submit
              </button>
            </div>

            <div className="">
              <p className="container my-2">
                Don&apos;t have an account?
                <Link to="/signup" className="hover:underline">
                  {" "}
                  SignUp
                </Link>
              </p>
              <div className="mt-3"></div>
            </div>
            
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
