import "./App.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Unsigned/Welcome/Welcome.tsx";
import SignUp from "./pages/Unsigned/SignUp/SignUp.tsx";
import AdicionarQuadra from "./pages/Signed/Proprietario/AdicionarQuadra/AdicionarQuadra.tsx";
import ConfiguracoesPerfilProprietario from "./pages/Signed/Proprietario/ConfiguracoesPerfil/ConfiguracoesPerfil.tsx";
import MinhasQuadras from "./pages/Signed/Proprietario/MinhasQuadras/MinhasQuadras.tsx";
import VerReservas from "./pages/Signed/Proprietario/VerReservas/VerReservas.tsx";
import EditarQuadra from "./pages/Signed/Proprietario/EditarQuadra/EditarQuadra.tsx";

function App() {

  const initialQuadra = {
    id: "1",
    localizacao: "Rua dos Esportes, 123",
    esporte: "futebol",
    descricao: "Quadra com gramado sintético, ideal para futebol amador.",
    preco: 100,
    imagens: [],
  };

  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>

          {/* Rotas do proprietário */}
          <Route path="/adicionarQuadra" element={<AdicionarQuadra />}></Route>
          <Route path="/editarQuadra" element={<EditarQuadra quadra={initialQuadra} />}></Route>
          <Route path="/minhasQuadras" element={<MinhasQuadras />}></Route>
          <Route path="/verReservas" element={<VerReservas/>}></Route>
          <Route path="/configuracoesPerfilProprietario" element={<ConfiguracoesPerfilProprietario />}></Route>

          {/* <Route path="/*" element={<NotFound />}></Route> */}
        </Routes>

      </Router>
    </>
  )
}

export default App
