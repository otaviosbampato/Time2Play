import "./App.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Rotas unsigned
import Welcome from "./pages/Unsigned/Welcome/Welcome.tsx";
import RecuperaSenha from "./pages/Unsigned/RecuperaSenha1/RecuperaSenha.tsx";
import RecuperaSenhaCodigo from "./pages/Unsigned/RecuperaSenha2/RecuperaSenha2.tsx";
import RecuperaSenhaNovaSenha from "./pages/Unsigned/RecuperaSenha3/RecuperaSenha3.tsx";

// Rotas proprietário
import AdicionarQuadra from "./pages/Signed/Proprietario/AdicionarQuadra/AdicionarQuadra.tsx";
import ConfiguracoesPerfilProprietario from "./pages/Signed/Proprietario/ConfiguracoesPerfil/ConfiguracoesPerfil.tsx";
import MinhasQuadras from "./pages/Signed/Proprietario/MinhasQuadras/MinhasQuadras.tsx";
import VerReservas from "./pages/Signed/Proprietario/VerReservas/VerReservas.tsx";
import EditarQuadra from "./pages/Signed/Proprietario/EditarQuadra/EditarQuadra.tsx";

// Rotas do cliente
import CadstroCliente from "./pages/Unsigned/Cadastro/Cliente/CadastroCliente.tsx";
import QuadrasAlugadas from "./pages/Signed/Cliente/QuadrasAlugadas/quadrasAlugadas.tsx";
import QuadrasFavoritas from "./pages/Signed/Cliente/QuadrasFavoritas/quadrasFavoritas.tsx";
import ConfiguracoesPerfilCliente from "./pages/Signed/Cliente/ConfiguracoesPerfil/ConfiguracoesPerfil.tsx";
import VerReservasCliente from "./pages/Signed/Cliente/VerReservas/VerReservas.tsx";

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
          <Route path="/recuperaSenha" element={<RecuperaSenha />}></Route>
          <Route path="/recuperaSenhaCodigo" element={<RecuperaSenhaCodigo />}></Route>
          <Route path="/novaSenha" element={<RecuperaSenhaNovaSenha />}></Route>
          <Route path="/cadastro" element={<CadstroCliente />}></Route>

          {/* Rotas do proprietário */}
          <Route path="/adicionarQuadra" element={<AdicionarQuadra />}></Route>
          <Route path="/editarQuadra" element={<EditarQuadra quadra={initialQuadra} />}></Route>
          <Route path="/minhasQuadras" element={<MinhasQuadras />}></Route>
          <Route path="/verReservas" element={<VerReservas/>}></Route>
          <Route path="/configuracoesPerfilProprietario" element={<ConfiguracoesPerfilProprietario />}></Route>
          
          {/* Rotas do cliente */}
          <Route path="/quadrasAlugadas" element={<QuadrasAlugadas />}></Route>
          <Route path="/quadrasFavoritas" element={<QuadrasFavoritas />}></Route>
          <Route path="/configuracoesPerfil" element={<ConfiguracoesPerfilCliente email="email@email.com" nome="fred" senha="minhaSenha" />}></Route>
          <Route path="/verReservasCliente" element={<VerReservasCliente />}></Route>

          {/* <Route path="/*" element={<NotFound />}></Route> */}
        </Routes>

      </Router>
    </>
  )
}

export default App
