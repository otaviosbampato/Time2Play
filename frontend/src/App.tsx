import "./App.css"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Rotas unsigned
import Welcome from "./pages/Unsigned/Welcome/Welcome.tsx";
import RecuperaSenha from "./pages/Unsigned/RecuperaSenha1/RecuperaSenha.tsx";
import RecuperaSenhaCodigo from "./pages/Unsigned/RecuperaSenha2/RecuperaSenha2.tsx";
import RecuperaNovaSenha from "./pages/Unsigned/RecuperaSenha3/RecuperaSenha3.tsx";

// Rotas proprietário
import AdicionarQuadra from "./pages/Signed/Proprietario/AdicionarQuadra/AdicionarQuadra.tsx";
//import ConfiguracoesProprietario from "./pages/Signed/Proprietario/ConfiguracoesPerfil/ConfiguracoesPerfil.tsx";
import MinhasQuadras from "./pages/Signed/Proprietario/MinhasQuadras/MinhasQuadras.tsx";
import VerReservas from "./pages/Signed/Proprietario/VerReservas/VerReservas.tsx";
import EditarQuadra from "./pages/Signed/Proprietario/EditarQuadra/EditarQuadra.tsx";

// Rotas do cliente
import CadstroCliente from "./pages/Unsigned/Cadastro/Cliente/CadastroCliente.tsx";
import ConfiguracoesPerfilCliente from "./pages/Signed/Cliente/ConfiguracoesPerfil/ConfiguracoesPerfil.tsx";
import VerReservasCliente from "./pages/Signed/Cliente/VerReservas/VerReservas.tsx";
import VerQuadras from "./pages/Signed/Cliente/VerQuadras/VerQuadras.tsx";
import VerQuadra from "./pages/Signed/Cliente/VerQuadra/VerQuadra.tsx";

import { ProtectedRoutes } from "./shared/utils/ProtectedRoutes.tsx";
import AuthProvider from "./shared/context/AuthProvider.tsx";
import CadastroProprietario from "./pages/Unsigned/Cadastro/Proprietario/CadastroProprietario.tsx";

function App() {


  return (
    <>
      <Router>

        <AuthProvider>

        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/recuperaSenha" element={<RecuperaSenha />}></Route>
          <Route path="/recuperaSenhaCodigo" element={<RecuperaSenhaCodigo />}></Route>
          <Route path="/cadastroCliente" element={<CadstroCliente />}></Route>
          <Route path="/cadastroProprietario" element={<CadastroProprietario />}></Route>
          <Route path="/recuperaNovaSenha" element={<RecuperaNovaSenha />}></Route>

          {/* Rotas do proprietário */}
          <Route element={<ProtectedRoutes adminOnly />}>
            <Route path="/adicionarQuadra" element={<AdicionarQuadra />}></Route>
            <Route path="/editarQuadra" element={<EditarQuadra />}></Route>
            <Route path="/minhasQuadras" element={<MinhasQuadras />}></Route>
            <Route path="/verReservas" element={<VerReservas/>}></Route>
            {/* <Route path="/configuracoesProprietario" element={<ConfiguracoesProprietario email="otavio@email.com" nome="otavio" senha="minhaSenha"/>}></Route> */}
          </Route>
          
          {/* Rotas do cliente */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/verQuadras" element={<VerQuadras />}></Route>
            <Route path="/verQuadra" element={<VerQuadra />}></Route>
            <Route path="/quadrasAlugadas" element={<VerReservasCliente />}></Route>
            <Route path="/configuracoesPerfil" element={<ConfiguracoesPerfilCliente email="email@email.com" nome="fred" senha="minhaSenha" />}></Route>
            <Route path="/verReservasCliente" element={<VerReservasCliente />}></Route>

          </Route>

          {/* <Route path="/*" element={<NotFound />}></Route> */}
        </Routes>

        </AuthProvider>

      </Router>
    </>
  )
}

export default App
