import "./App.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Unsigned/Welcome/Welcome.tsx";
import SignUp from "./pages/Unsigned/SignUp/SignUp.tsx";
import AdicionarQuadra from "./pages/Signed/Proprietario/AdicionarQuadra/AdicionarQuadra.tsx";
import ConfiguracoesPerfilProprietario from "./pages/Signed/Proprietario/ConfiguracoesPerfil/ConfiguracoesPerfil.tsx";
import MinhasQuadras from "./pages/Signed/Proprietario/MinhasQuadras/MinhasQuadras.tsx";

function App() {

  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>

          {/* Rotas do proprietário */}
          <Route path="/adicionarQuadra" element={<AdicionarQuadra />}></Route>
          <Route path="/minhasQuadras" element={<MinhasQuadras />}></Route>
          <Route path="/configuracoesPerfilProprietario" element={<ConfiguracoesPerfilProprietario />}></Route>

          {/* <Route path="/*" element={<NotFound />}></Route> */}
        </Routes>

      </Router>
    </>
  )
}

export default App
