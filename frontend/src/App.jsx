import React, { createContext, useReducer, useEffect, useState } from "react";
import './App.css'
import NavBar from './components/NavBar'
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css"
import { initialState, reducer } from "./reducer/UseReducer";

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Semesters from "./mca/Semesters";
import First from "./mca/First";
import Second from "./mca/Second";
import Third from "./mca/Third";
import Fourth from "./mca/Fourth";
import Quiz from "./components/Quiz";
import AdminPanel from "./components/AdminPanel";
import QuizStart from "./components/QuizStart";
import AllQuiz from "./components/Admincomponent/AllQuiz";
import AllUser from "./components/Admincomponent/AllUser";
import AddQuiz from "./components/Admincomponent/AddQuiz";
import Result from "./components/Result";
import ViewResult from "./components/ViewResult";

export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <div>
          <Router>
            {/* <NavBar /> */}
            <Routes>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/semesters" element={<Semesters />}></Route>
              <Route path="/first" element={<First />}></Route>
              <Route path="/second" element={<Second />}></Route>
              <Route path="/third" element={<Third />}></Route>
              <Route path="/fourth" element={<Fourth />}></Route>
              <Route path="/quizmain" element={<Quiz />}></Route>
              <Route path="/start1" element={<QuizStart />}></Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="/result" element={<Result/>}></Route>
              <Route path="/result/myresult/:resultId" element={<ViewResult/>}></Route>

              {role === "admin" && (
                <>
                  <Route path="/admin" element={<AdminPanel />}></Route>
                  <Route path="/admin/allquiz" element={<AllQuiz />}></Route>
                  <Route path="/admin/alluser" element={<AllUser />}></Route>
                  <Route path="/admin/addquiz" element={<AddQuiz />}></Route>
                </>
              )}
            </Routes>
          </Router>
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
