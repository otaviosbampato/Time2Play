import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./App.css"

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Welcome from "./pages/Unsigned/Welcome";

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
