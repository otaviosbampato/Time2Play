import "./App.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Unsigned/Welcome/Welcome.tsx";
import SignUp from "./pages/Unsigned/SignUp/SignUp.tsx";
import AdicionarQuadra from "./pages/Signed/Proprietario/AdicionarQuadra/AdicionarQuadra.tsx";

function App() {

  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/adicionarQuadra" element={<AdicionarQuadra />}></Route>


          {/* <Route path="/*" element={<NotFound />}></Route> */}

        </Routes>

      </Router>
    </>
  )
}

export default App
