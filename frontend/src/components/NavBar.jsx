import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);

  const logout = () => {
    dispatch({ type: "USER", payload: false });
    localStorage.clear();
  };

  const RenderMenu = () => {
    const isLoggedIn = localStorage.getItem("loggedin");
    const role = localStorage.getItem("role");

    return (
      <div>
        <nav
          className="flex justify-between px-16 py-3 shadow-md shadow-purple-500 text-white"
          style={styles}
        >
          <ul className="flex md:space-x-14 sm:space-x-10">
            <NavLink to="/" className="md:font-bold md:text-2xl sm:text-lg sm:font-bold">Olt Website</NavLink>
           
            {isLoggedIn && (
              <>
                <NavLink to="/quizmain" className="py-1 hover:font-semibold text-white">
                  <span className="fa-solid fa-gauge-simple-high"></span> Quizzes
                </NavLink>

                <NavLink to="/profile" className="py-1 hover:font-semibold text-white">
                  <span className="fa-solid fa-book"></span> Notes
                </NavLink>
                <NavLink to="/result" className="py-1 hover:font-semibold text-white">
                  <span className="fa-solid fa-square-poll-vertical "></span> Result
                </NavLink>
              </>
            )}
            {role === "admin" && (
              <NavLink to="/admin" className="py-1 hover:font-semibold text-white">
                <span className="fa-solid fa-book"></span> Admin Panel
              </NavLink>
            )}
            <a
              className="nav-link py-1 hover:font-semibold text-white"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#profile-modal"
            >
              <span className="fa-solid fa-address-card"></span> Contact
            </a>
          </ul>
          <ul className="flex space-x-8">
            {isLoggedIn ? (
              <Link
                to="/login"
                className="rounded-full px-2 py-1 hover:bg-purple-600 border-2 border-black outline outline-offset-2 outline-white hover:text-white"
                onClick={logout}
              >
                Logout
              </Link>
            ) : (
              <>
                <NavLink
                  to="/signup"
                  className=" border-2 border-black outline outline-offset-2 outline-white hover:text-white rounded-full px-2 place-content-center"
                >
                  Sign Up
                </NavLink>
                <NavLink
                  to="/login"
                  className="  border-2 border-black outline outline-offset-2 outline-white hover:text-white rounded-full px-2 place-content-center"
                >
                  Login
                </NavLink>
              </>
            )}
          </ul>
        </nav>
      </div>
    );
  };

  let styles = {
    backgroundImage: "linear-gradient(90deg,rgb(10,36,45),rgb(192,100,302))",
  };

  return (
    <>
      <RenderMenu />
      <div
        className="modal fade"
        id="profile-modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Contact Us
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={styles}>
              <a
                href="https://www.facebook.com/VIKASRRSSACHAN"
                className="fa fa-facebook fa-2x"
                style={iconStyle}
              ></a>
              <a
                href="https://x.com/vikassachan19"
                className="fa-brands fa-x-twitter fa-2x"
                style={iconStyle}
              ></a>
              <a
                href="https://www.instagram.com/vikassachan870/"
                className="fa fa-instagram fa-2x"
                style={iconStyle}
              ></a>
              <a
                href="https://api.whatsapp.com/send?phone=8299660036&text=I%20want%20to%20join%20the%20masterclass"
                className="fa fa-whatsapp fa-2x"
                style={iconStyle}
              ></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const iconStyle = {
  color: "white",
  margin: "20px 0px 0px 30px",
};

export default NavBar;
