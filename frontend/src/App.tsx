import "./App.css"

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Welcome from "./pages/Unsigned/Welcome/Welcome";

function App() {

  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Welcome />}></Route>
  


          {/* <Route path="/*" element={<NotFound />}></Route> */}

        </Routes>

      </Router>
    </>
  )
}

export default App
