import "./App.css"

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Welcome from "./pages/Unsigned/Welcome/Welcome";
import SignUp from "./pages/Unsigned/SignUp/SignUp";

function App() {

  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>


          {/* <Route path="/*" element={<NotFound />}></Route> */}

        </Routes>

      </Router>
    </>
  )
}

export default App
